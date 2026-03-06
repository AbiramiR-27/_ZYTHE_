// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ZythePredictionMarket
 * @dev A decentralized prediction market powered by Chainlink price feeds
 */
contract ZythePredictionMarket is Ownable, ReentrancyGuard {
    // Structs
    struct Market {
        uint256 id;
        string title;
        string description;
        address priceFeed;
        uint256 strikePrice;
        uint256 resolutionTime;
        bool resolved;
        bool outcome;
        uint256 totalYesAmount;
        uint256 totalNoAmount;
        uint256 createdAt;
    }

    struct Prediction {
        uint256 marketId;
        address predictor;
        bool prediction;
        uint256 amount;
        uint256 createdAt;
        bool claimed;
    }

    // State variables
    uint256 public marketCounter;
    uint256 public predictionCounter;
    uint256 public platformFeePercentage = 2;
    uint256 public minimumStakeAmount = 0.01 ether;

    // Mappings
    mapping(uint256 => Market) public markets;
    mapping(uint256 => Prediction) public predictions;
    mapping(uint256 => uint256[]) public marketPredictions;
    mapping(address => uint256) public stakes;
    mapping(address => bool) public worldIDVerified;

    // Events
    event MarketCreated(uint256 indexed marketId, string title, uint256 strikePrice, uint256 resolutionTime);
    event PredictionPlaced(uint256 indexed marketId, address indexed predictor, bool prediction, uint256 amount);
    event MarketResolved(uint256 indexed marketId, bool outcome, uint256 totalYesAmount, uint256 totalNoAmount);
    event WinningsClaimed(uint256 indexed predictionId, address indexed predictor, uint256 amount);
    event WorldIDVerified(address indexed user);
    event EmergencyWithdraw(address indexed owner, uint256 amount);

    // Modifiers
    modifier marketExists(uint256 _marketId) {
        require(_marketId < marketCounter, "Market does not exist");
        _;
    }

    modifier marketNotResolved(uint256 _marketId) {
        require(!markets[_marketId].resolved, "Market already resolved");
        _;
    }

    modifier marketCanResolve(uint256 _marketId) {
        require(markets[_marketId].resolutionTime <= block.timestamp, "Market cannot be resolved yet");
        _;
    }
    
    modifier onlyVerified() {
        require(worldIDVerified[msg.sender], "User not verified with World ID");
        _;
    }

    constructor() {
        marketCounter = 0;
        predictionCounter = 0;
    }

    /**
     * @dev Mark user as World ID verified
     */
    function verifyWorldID(address _user) external onlyOwner {
        require(_user != address(0), "Invalid user address");
        worldIDVerified[_user] = true;
        emit WorldIDVerified(_user);
    }

    /**
     * @dev Create a new prediction market
     */
    function createMarket(
        string memory _title,
        string memory _description,
        address _priceFeed,
        uint256 _strikePrice,
        uint256 _resolutionTime
    ) external onlyOwner returns (uint256) {
        require(_resolutionTime > block.timestamp, "Resolution time must be in future");
        require(_strikePrice > 0, "Strike price must be greater than 0");
        require(_priceFeed != address(0), "Invalid price feed address");

        uint256 marketId = marketCounter;
        
        markets[marketId] = Market({
            id: marketId,
            title: _title,
            description: _description,
            priceFeed: _priceFeed,
            strikePrice: _strikePrice,
            resolutionTime: _resolutionTime,
            resolved: false,
            outcome: false,
            totalYesAmount: 0,
            totalNoAmount: 0,
            createdAt: block.timestamp
        });

        marketCounter++;
        emit MarketCreated(marketId, _title, _strikePrice, _resolutionTime);
        return marketId;
    }

    /**
     * @dev Place a prediction on a market
     */
    function placePrediction(
        uint256 _marketId,
        bool _prediction
    ) external payable 
        marketExists(_marketId) 
        marketNotResolved(_marketId) 
        onlyVerified()
        nonReentrant 
    {
        require(msg.value >= minimumStakeAmount, "Stake below minimum");
        require(block.timestamp < markets[_marketId].resolutionTime, "Market prediction period ended");

        uint256 predictionId = predictionCounter;
        
        predictions[predictionId] = Prediction({
            marketId: _marketId,
            predictor: msg.sender,
            prediction: _prediction,
            amount: msg.value,
            createdAt: block.timestamp,
            claimed: false
        });

        if (_prediction) {
            markets[_marketId].totalYesAmount += msg.value;
        } else {
            markets[_marketId].totalNoAmount += msg.value;
        }

        stakes[msg.sender] += msg.value;
        marketPredictions[_marketId].push(predictionId);
        predictionCounter++;

        emit PredictionPlaced(_marketId, msg.sender, _prediction, msg.value);
    }

    /**
     * @dev Resolve a market using Chainlink price feed
     */
    function resolveMarket(uint256 _marketId) external 
        marketExists(_marketId) 
        marketNotResolved(_marketId) 
        marketCanResolve(_marketId) 
        nonReentrant 
    {
        Market storage market = markets[_marketId];
        require(market.priceFeed != address(0), "Price feed not set");

        AggregatorV3Interface feed = AggregatorV3Interface(market.priceFeed);
        (, int256 price, , , ) = feed.latestRoundData();
        require(price > 0, "Invalid price feed data");

        uint256 currentPrice = uint256(price);
        market.outcome = currentPrice >= market.strikePrice;
        market.resolved = true;

        emit MarketResolved(_marketId, market.outcome, market.totalYesAmount, market.totalNoAmount);
    }

    /**
     * @dev Claim winnings from a resolved market
     */
    function claimWinnings(uint256 _predictionId) external nonReentrant {
        Prediction storage prediction = predictions[_predictionId];
        require(!prediction.claimed, "Winnings already claimed");
        require(msg.sender == prediction.predictor, "Only predictor can claim");
        
        Market storage market = markets[prediction.marketId];
        require(market.resolved, "Market not resolved");

        bool isWinner = (prediction.prediction == market.outcome);
        require(isWinner, "Prediction did not win");

        uint256 winnerPool;
        uint256 loserPool;
        
        if (prediction.prediction) {
            winnerPool = market.totalYesAmount;
            loserPool = market.totalNoAmount;
        } else {
            winnerPool = market.totalNoAmount;
            loserPool = market.totalYesAmount;
        }

        require(winnerPool > 0, "Winner pool is zero");

        uint256 shareOfLoserPool = (loserPool * prediction.amount) / winnerPool;
        uint256 platformFee = (shareOfLoserPool * platformFeePercentage) / 100;
        uint256 totalWinnings = prediction.amount + shareOfLoserPool - platformFee;

        prediction.claimed = true;
        (bool success, ) = payable(msg.sender).call{value: totalWinnings}("");
        require(success, "Transfer failed");

        emit WinningsClaimed(_predictionId, msg.sender, totalWinnings);
    }

    // View functions
    function getMarket(uint256 _marketId) external view marketExists(_marketId) returns (Market memory) {
        return markets[_marketId];
    }

    function getMarketPredictions(uint256 _marketId) external view returns (uint256[] memory) {
        return marketPredictions[_marketId];
    }

    function getPrediction(uint256 _predictionId) external view returns (Prediction memory) {
        return predictions[_predictionId];
    }

    function getActiveMarketsCount() external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < marketCounter; i++) {
            if (!markets[i].resolved && markets[i].resolutionTime > block.timestamp) {
                count++;
            }
        }
        return count;
    }

    function hasUserPredicted(uint256 _marketId, address _user) external view returns (bool) {
        uint256[] memory predictionIds = marketPredictions[_marketId];
        for (uint256 i = 0; i < predictionIds.length; i++) {
            if (predictions[predictionIds[i]].predictor == _user) {
                return true;
            }
        }
        return false;
    }

    function getUserPrediction(uint256 _marketId, address _user) external view returns (Prediction memory) {
        uint256[] memory predictionIds = marketPredictions[_marketId];
        for (uint256 i = 0; i < predictionIds.length; i++) {
            if (predictions[predictionIds[i]].predictor == _user) {
                return predictions[predictionIds[i]];
            }
        }
        revert("User has not predicted in this market");
    }

    // Owner functions
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Emergency withdraw failed");
        emit EmergencyWithdraw(owner(), balance);
    }

    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 10, "Fee too high");
        platformFeePercentage = _newFee;
    }

    function updateMinimumStake(uint256 _newMinimum) external onlyOwner {
        require(_newMinimum > 0, "Minimum stake must be positive");
        minimumStakeAmount = _newMinimum;
    }

    receive() external payable {}
}