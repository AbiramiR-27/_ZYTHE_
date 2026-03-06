const { ethers } = require("hardhat");

async function main() {
  console.log("📡 Deploying ZythePredictionMarket...");

  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No accounts configured. Check PRIVATE_KEY in your .env file.");
  }
  const deployer = signers[0];
  console.log("Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  const ZytheMarket = await ethers.getContractFactory("ZythePredictionMarket");
  const market = await ZytheMarket.deploy();

  await market.waitForDeployment();

  const address = await market.getAddress();
  console.log("\n✅ ZythePredictionMarket deployed to:", address);

  const fs = require("fs");
  fs.writeFileSync("marketAddress.txt", address);
  console.log("📝 Address saved to marketAddress.txt");

  console.log("\n🔍 View on Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${address}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error.message);
  process.exitCode = 1;
});