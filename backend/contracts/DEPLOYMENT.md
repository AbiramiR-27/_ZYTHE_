# Zythe Smart Contracts - Deployment Guide

## Overview

The Zythe prediction market platform consists of two main smart contracts:

1. **ZythePredictionMarket.sol** - Main contract for creating and managing prediction markets
2. **MockPriceFeed.sol** - Test price feed for development (not for production)

## Network Configuration

### Sepolia Testnet (Recommended for Testing)

- Network ID: 11155111
- RPC URL: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
- Chain Link Data Feeds Available: Yes

### Chainlink Price Feeds on Sepolia

The following Chainlink price feeds are available on Sepolia:

| Asset Pair | Contract Address |
|-----------|------------------|
| BTC/USD | 0x1b44F3514812d835EB1BFAaf6146391458b3EeB2 |
| ETH/USD | 0x694AA1769357215DE4FAC081bf1f309aDC325306 |
| MATIC/USD | 0xd0D5e3DB44DE649C231e3FE4E9A35220eb39e159 |
| LINK/USD | 0xc1E409dc87d1fdfda80e8eFf52D79B8C0657D5D0 |

## Deployment Steps

### 1. Install Dependencies

```bash
npm install --save-dev hardhat @openzeppelin/contracts @chainlink/contracts
npm install --save-dev hardhat-ethers ethers
```

### 2. Create hardhat.config.js

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

### 3. Deploy Main Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Deploy Mock Price Feed (for testing)

```bash
npx hardhat run scripts/deployMockFeed.js --network sepolia
```

## Environment Variables

Create a `.env` file in the project root:

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

## Contract Functions

### ZythePredictionMarket

#### Admin Functions

- `createMarket(title, description, priceFeed, strikePrice, resolutionTime)` - Create new prediction market
- `resolveMarket(marketId)` - Resolve market using Chainlink price feed
- `verifyWorldID(user)` - Mark user as World ID verified
- `setPriceFeed(priceFeed)` - Set price feed address

#### User Functions

- `placePrediction(marketId, prediction)` - Place a bet (send ETH with call)
- `claimWinnings(predictionId)` - Claim winnings from resolved market

#### View Functions

- `getMarket(marketId)` - Get market details
- `getMarketPredictions(marketId)` - Get all predictions for a market
- `getPrediction(predictionId)` - Get prediction details
- `getActiveMarketsCount()` - Get count of active markets

## Testing

### Local Testing

```bash
npx hardhat test
```

### Sepolia Testing

1. Get Sepolia ETH from faucet: https://sepolia-faucet.pk910.de/
2. Deploy contracts to Sepolia
3. Interact using frontend or contract interactions

## Security Considerations

- All user funds are held in the contract
- Markets require admin to resolve
- Platform fee: 2% of winnings
- Minimum stake: 0.01 ETH
- ReentrancyGuard prevents reentrancy attacks
- Access control via Ownable for admin functions

## Gas Optimization

- Market creation: ~250k gas
- Prediction placement: ~120k gas
- Market resolution: ~150k gas
- Claim winnings: ~100k gas

## Monitoring & Upgrades

For production deployment, consider:

1. Using UUPS proxy pattern for upgradeable contracts
2. Implementing multi-sig governance
3. Adding circuit breaker for emergency scenarios
4. Regular security audits

## Troubleshooting

### Price Feed Returns 0
- Verify price feed address is correct
- Ensure price feed is available on the network
- Check AggregatorV3Interface import is correct

### Market Resolution Fails
- Verify market resolution time has passed
- Ensure price feed data is available
- Check contract has necessary permissions

### Claim Winnings Fails
- Verify market is resolved
- Ensure prediction is correct
- Check contract has sufficient balance
