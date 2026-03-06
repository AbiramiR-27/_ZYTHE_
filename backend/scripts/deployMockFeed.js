const { ethers } = require("hardhat");

async function main() {
  console.log("📡 Deploying MockPriceFeed...");

  const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
  const mockFeed = await MockPriceFeed.deploy(
    8,                           // decimals
    "ETH/USD Mock Feed",         // description
    BigInt(2000) * BigInt(10**8) // initial price: $2000
  );

  await mockFeed.waitForDeployment();

  const address = await mockFeed.getAddress();
  console.log("✅ MockPriceFeed deployed to:", address);
  console.log("Decimals:", await mockFeed.decimals());
  console.log("Description:", await mockFeed.description());

  const fs = require("fs");
  fs.writeFileSync("mockFeedAddress.txt", address);
  console.log("📝 Address saved to mockFeedAddress.txt");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error.message);
  process.exitCode = 1;
});