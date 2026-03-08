import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  // ── 1. Get or deploy MockPriceFeed ──────────────────────────────────────────
  let mockFeedAddress;
  if (fs.existsSync("mockFeedAddress.txt")) {
    mockFeedAddress = fs.readFileSync("mockFeedAddress.txt", "utf8").trim();
    console.log("\n📌 Using existing MockPriceFeed at:", mockFeedAddress);
  } else {
    console.log("\n📡 Deploying MockPriceFeed...");
    const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
    const mockFeed = await MockPriceFeed.deploy(
      8,
      "ETH/USD Mock Feed",
      BigInt(2000) * BigInt(10 ** 8) // $2000 initial price
    );
    await mockFeed.waitForDeployment();
    mockFeedAddress = await mockFeed.getAddress();
    fs.writeFileSync("mockFeedAddress.txt", mockFeedAddress);
    console.log("✅ MockPriceFeed deployed to:", mockFeedAddress);
  }

  // ── 2. Connect to ZythePredictionMarket ────────────────────────────────────
  const marketAddress = fs.readFileSync("marketAddress.txt", "utf8").trim();
  console.log("\n📌 ZythePredictionMarket at:", marketAddress);

  const ZytheMarket = await ethers.getContractAt("ZythePredictionMarket", marketAddress);

  // ── 3. Create test market (resolves in 5 minutes) ──────────────────────────
  const strikePrice = BigInt(2500) * BigInt(10 ** 8); // $2500 with 8 decimals
  const resolutionTime = BigInt(Math.floor(Date.now() / 1000) + 5 * 60); // 5 min from now

  console.log("\n🛒 Creating test market...");
  console.log("  Title:           Will ETH price exceed $2500 in the next 5 minutes?");
  console.log("  Strike price:    $2500 (", strikePrice.toString(), "raw )");
  console.log("  Resolution time:", new Date(Number(resolutionTime) * 1000).toISOString());
  console.log("  Price feed:     ", mockFeedAddress);

  const tx = await ZytheMarket.createMarket(
    "Will ETH price exceed $2500 in 5 minutes?",
    "Test market for CRE workflow simulation. Resolves using MockPriceFeed at $2500 strike.",
    mockFeedAddress,
    strikePrice,
    resolutionTime
  );

  console.log("\n⏳ Waiting for confirmation...", tx.hash);
  const receipt = await tx.wait();
  console.log("✅ Market created! Block:", receipt.blockNumber);

  // ── 4. Read back the market ────────────────────────────────────────────────
  const totalMarkets = await ZytheMarket.marketCounter();
  const marketId = totalMarkets - 1n;
  const market = await ZytheMarket.getMarket(marketId);

  console.log("\n📊 Created market #" + marketId.toString() + ":");
  console.log("  Title:          ", market.title);
  console.log("  Strike price:   ", market.strikePrice.toString());
  console.log("  Resolution time:", new Date(Number(market.resolutionTime) * 1000).toISOString());
  console.log("  Resolved:       ", market.resolved);

  console.log("\n🔍 Etherscan: https://sepolia.etherscan.io/tx/" + tx.hash);
  console.log("\n✅ Done! Now run the CRE simulation:");
  console.log("   cd ..\\ && cd zythe");
  console.log("   cre workflow simulate my-workflow --target staging-settings");
  console.log("   (wait >5 minutes for deadline to pass, then simulate again to see resolution)");
}

main().catch((error) => {
  console.error("❌ Failed:", error.message);
  process.exitCode = 1;
});
