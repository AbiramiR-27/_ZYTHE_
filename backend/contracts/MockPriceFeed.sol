// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title MockPriceFeed
 * @dev A mock Chainlink price feed for testing purposes
 */
contract MockPriceFeed is AggregatorV3Interface {
    uint8 private _decimals;
    string private _description;
    uint256 private _version = 1;

    int256 private _price;
    uint80 private _roundId;

    constructor(uint8 decimals_, string memory description_, int256 initialPrice) {
        _decimals = decimals_;
        _description = description_;
        _price = initialPrice;
        _roundId = 1;
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function description() external view override returns (string memory) {
        return _description;
    }

    function version() external view override returns (uint256) {
        return _version;
    }

    function getRoundData(uint80 roundId_)
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (roundId_, _price, block.timestamp, block.timestamp, roundId_);
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (_roundId, _price, block.timestamp, block.timestamp, _roundId);
    }

    function updatePrice(int256 newPrice) external {
        _price = newPrice;
        _roundId++;
    }
}
    