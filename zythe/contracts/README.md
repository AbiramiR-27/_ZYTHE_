# Zythe Contracts

This folder contains the Solidity smart contracts for the Zythe prediction market platform.

## Contracts
- `ZythePredictionMarket.sol`: Main contract for creating, resolving, and managing prediction markets.
- `MockPriceFeed.sol`: Chainlink-compatible mock price feed for testing.

## Deployment
- Use Hardhat scripts in the backend folder to deploy contracts to Sepolia or other networks.
- Contract addresses are stored in `marketAddress.txt` and `mockFeedAddress.txt` after deployment.

## Integration
- The frontend interacts with these contracts via Wagmi and Viem using the ABI in `/lib/web3/abi.ts`.
- CRE workflows can resolve markets automatically using contract functions.

## Testing
- Run `npx hardhat test` in the backend folder to test contract logic.

## License
MIT.