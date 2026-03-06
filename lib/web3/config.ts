import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';

const projectId = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID || 'f8a4e3d9b2c1f9e5a7d3b2f1c9e4a8d5';

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Zythe',
  projectId: projectId,
  chains: [sepolia],
  ssr: true,
});

// Smart Contract Configuration
export const CONTRACT_CONFIG = {
  address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x') as `0x${string}`,
  chainId: sepolia.id,
  rpc: sepolia.rpcUrls.default.http[0],
};

// World ID Configuration
export const WORLD_ID_CONFIG = {
  appId: process.env.NEXT_PUBLIC_WORLD_ID_APP_ID || 'app_staging_12345',
  actionId: process.env.NEXT_PUBLIC_WORLD_ID_ACTION_ID || 'zythe-predict',
};

// Demo Markets (for testing without contract)
export const DEMO_MARKETS = [
  {
    id: '1',
    question: 'Will Bitcoin reach $100,000 by end of 2025?',
    category: 'Crypto',
    yesOdds: 65,
    noOdds: 35,
    participants: 1234,
    volume: 125.5,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    status: 'active',
    resolved: false,
  },
  {
    id: '2',
    question: 'Will Ethereum outperform Bitcoin in 2025?',
    category: 'Crypto',
    yesOdds: 42,
    noOdds: 58,
    participants: 856,
    volume: 98.2,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active',
    resolved: false,
  },
  {
    id: '3',
    question: 'Will the Fed cut interest rates in Q1 2025?',
    category: 'Economics',
    yesOdds: 71,
    noOdds: 29,
    participants: 2103,
    volume: 215.7,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    status: 'active',
    resolved: false,
  },
];
