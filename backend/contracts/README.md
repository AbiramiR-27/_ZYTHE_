# Zythe Smart Contracts

This directory contains the smart contracts for the Zythe prediction market platform, powered by Chainlink price feeds and World ID verification.

## Contract Overview

### ZythePredictionMarket.sol

The main contract that manages prediction markets on-chain. Features include:

- **Market Creation**: Admin can create prediction markets with custom strike prices and resolution times
- **Predictions**: Users can place predictions (bets) on market outcomes using ETH
- **Price Feed Integration**: Chainlink price feeds determine market outcomes
- **Reward Distribution**: Winners receive proportional shares of loser pools minus platform fees
- **World ID Integration**: Support for human verification via World ID

**Key State Variables:**
- `markets`: Mapping of market ID to market details
- `predictions`: Mapping of prediction ID to prediction details
- `platformFeePercentage`: Fee taken from winnings (default 2%)
- `minimumStakeAmount`: Minimum bet amount (default 0.01 ETH)

**Main Functions:**
```solidity
// Admin
createMarket(...) -> marketId
resolveMarket(marketId)
verifyWorldID(user)
setPriceFeed(priceFeed)

// User
placePrediction(marketId, prediction) payable
claimWinnings(predictionId)

// View
getMarket(marketId) -> Market
getMarketPredictions(marketId) -> uint256[]
getPrediction(predictionId) -> Prediction
getActiveMarketsCount() -> uint256
```

### MockPriceFeed.sol

A test price feed contract implementing Chainlink's AggregatorV3Interface. Used for development and testing on local networks.

**Functions:**
```solidity
updatePrice(newPrice) - Update the current price
latestRoundData() -> (roundId, answer, startedAt, updatedAt, answeredInRound)
getRoundData(roundId) -> round data
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Hardhat
- Solidity compiler 0.8.20

### Installation

```bash
# Install Hardhat globally (optional)
npm install -g hardhat

# Install project dependencies
npm install

# Verify Solidity installation
npx hardhat --version
```

### Compilation

```bash
npm run contract:compile
```

This generates the contract ABIs in the `artifacts/` directory, which are used by the frontend.

## Deployment

### Local Testing (Hardhat Node)

```bash
# Terminal 1: Start local blockchain
npm run contract:node

# Terminal 2: Deploy to localhost
npm run contract:deploy-local
```

### Sepolia Testnet Deployment

1. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

2. Configure your `.env.local` with:
   - `SEPOLIA_RPC_URL` - Infura, Alchemy, or other RPC provider
   - `PRIVATE_KEY` - Your wallet's private key
   - `ETHERSCAN_API_KEY` - For contract verification

3. Get Sepolia ETH from faucet: https://sepolia-faucet.pk910.de/

4. Deploy:
   ```bash
   npm run contract:deploy
   ```

5. (Optional) Deploy mock price feed for testing:
   ```bash
   npm run contract:deploy-mock
   ```

## Integration with Frontend

After deployment, update `lib/web3/config.ts` with the deployed contract address:

```typescript
export const ZYTHE_MARKET_ADDRESS = '0x...'; // Your deployed address
```

The frontend uses Wagmi to interact with the contract through the ABI defined in `lib/web3/abi.ts`.

## Testing

```bash
npm run contract:test
```

## Contract Addresses (Sepolia Testnet)

Update these after deployment:

```
ZythePredictionMarket: 0x...
ETH/USD Feed: 0x694AA1769357215DE4FAC081bf1f309aDC325306
BTC/USD Feed: 0x1b44F3514812d835EB1BFAaf6146391458b3EeB2
```

## Chainlink Price Feeds on Sepolia

| Pair | Address |
|------|---------|
| ETH/USD | 0x694AA1769357215DE4FAC081bf1f309aDC325306 |
| BTC/USD | 0x1b44F3514812d835EB1BFAaf6146391458b3EeB2 |
| MATIC/USD | 0xd0D5e3DB44DE649C231e3FE4E9A35220eb39e159 |
| LINK/USD | 0xc1E409dc87d1fdfda80e8eFf52D79B8C0657D5D0 |

Reference: [Chainlink Sepolia Feeds](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1)

## Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks on fund transfers
- **Ownable**: Role-based access control for admin functions
- **SafeMath**: Built into Solidity 0.8+ (automatic overflow/underflow checks)
- **Price Feed Validation**: Checks price feed returns valid data

## Gas Optimization

Estimated gas costs:
- Create Market: ~250,000 gas
- Place Prediction: ~120,000 gas
- Resolve Market: ~150,000 gas
- Claim Winnings: ~100,000 gas

## Future Improvements

- [ ] Upgradeable contract pattern (UUPS)
- [ ] Multi-sig governance
- [ ] Decentralized market creation
- [ ] Advanced resolution mechanisms (oracles)
- [ ] Cross-chain support
- [ ] Liquidity pools for better odds

## Troubleshooting

### "Contract does not exist"
- Ensure contract is deployed to the network
- Check RPC URL is correct
- Verify network ID matches expected network

### "Market already resolved"
- Market has already been resolved
- Cannot place predictions on resolved markets
- Can only claim winnings after resolution

### "Insufficient balance"
- Contract doesn't have enough ETH to pay winnings
- Ensure sufficient funds were staked in market

## License

MIT - See LICENSE file for details
