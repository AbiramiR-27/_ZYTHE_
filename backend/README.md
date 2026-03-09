# Zythe Backend

This folder contains smart contracts, deployment scripts, and blockchain development resources for Zythe.

## Structure
- `contracts/`: Solidity smart contracts (PredictionMarket, MockPriceFeed)
- `hardhat.config.js`: Hardhat configuration
- `scripts/`: Deployment and utility scripts (deploy, resolveMarkets)
- `marketAddress.txt`, `mockFeedAddress.txt`: Deployed contract addresses

## Usage
1. Install dependencies:
   ```sh
   npm install
   ```
2. Compile contracts:
   ```sh
   npx hardhat compile
   ```
3. Run tests:
   ```sh
   npx hardhat test
   ```
4. Deploy contracts:
   ```sh
   npx hardhat run scripts/deploy.js --network sepolia
   ```
5. Resolve markets:
   ```sh
   npx hardhat run scripts/resolveMarkets.js --network sepolia
   ```

## Integration
- Frontend uses contract ABIs from `/lib/web3/abi.ts`.
- CRE workflow resolves markets using contract functions.

## License
MIT
