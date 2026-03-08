import hre from "hardhat";
const { ethers } = hre;
import fs from "fs";

async function main() {
  const [caller] = await ethers.getSigners();
  console.log("Using account:", caller.address);

  const marketAddress = fs.readFileSync("marketAddress.txt", "utf8").trim();
  const ZytheMarket = await ethers.getContractAt("ZythePredictionMarket", marketAddress);

  const count = await ZytheMarket.marketCounter();
  console.log(`\nTotal markets: ${count}`);

  for (let i = 0n; i < count; i++) {
    const market = await ZytheMarket.getMarket(i);
    const now = BigInt(Math.floor(Date.now() / 1000));

    console.log(`\nMarket #${i}: "${market.title}"`);
    console.log(`  Resolved:        ${market.resolved}`);
    console.log(`  Resolution time: ${new Date(Number(market.resolutionTime) * 1000).toISOString()}`);
    console.log(`  Deadline passed: ${market.resolutionTime <= now}`);

    if (market.resolved) {
      console.log(`  ✅ Already resolved — outcome: ${market.outcome ? "YES (price >= strike)" : "NO (price < strike)"}`);
      continue;
    }

    if (market.resolutionTime > now) {
      console.log(`  ⏳ Deadline not yet reached, skipping`);
      continue;
    }

    console.log(`  🔄 Resolving...`);
    const tx = await ZytheMarket.resolveMarket(i);
    console.log(`  ⏳ Waiting for confirmation... ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`  ✅ Resolved at block ${receipt.blockNumber}`);

    const resolved = await ZytheMarket.getMarket(i);
    console.log(`  Outcome: ${resolved.outcome ? "YES ✅ (price >= strike)" : "NO ❌ (price < strike)"}`);
    console.log(`  🔍 https://sepolia.etherscan.io/tx/${tx.hash}`);
  }
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exitCode = 1;
});
