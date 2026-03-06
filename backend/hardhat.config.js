require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const sepoliaKey = process.env.PRIVATE_KEY?.trim();
const validKey = /^0x[a-fA-F0-9]{64}$/.test(sepoliaKey || "");
if (sepoliaKey && !validKey) {
  console.warn("⚠️  PRIVATE_KEY in .env is not a valid 64-hex-char private key — accounts will be empty.");
}
const sepoliaAccounts = validKey ? [sepoliaKey] : [];

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia.publicnode.com",
      accounts: sepoliaAccounts,
    },
    hardhat: {},
    localhost: {},
  },
};
