# Zythe - Decentralized Prediction Market Platform

Zythe is a Web3-enabled prediction market platform built with Next.js 16, Wagmi, and World ID verification. It leverages Chainlink for oracle data feeds and CRE for automated market resolution.

## Overview

Zythe enables users to:
- Make predictions on real-world events
- Stake ETH on outcomes
- Earn rewards for accurate predictions
- Browse, create, and resolve markets
- Verify humanity with World ID

## Features

- **Wallet Connection**: RainbowKit + Wagmi for seamless wallet integration
- **World ID Verification**: Proof-of-humanity for Sybil resistance
- **Market Browser**: Filter, sort, and search active markets
- **Prediction Interface**: Stake ETH, view odds, and submit predictions
- **Portfolio Tracking**: View history, win rate, and earnings
- **Leaderboard**: Compete globally with top predictors
- **Chainlink Integration**: Oracle-powered market resolution
- **CRE Workflow**: Automated market resolution via Chainlink Runtime Environment
- **Dark/Light Mode**: Theme toggle
- **Mobile Responsive**: Works on all devices

## Getting Started

### Installation

```bash
git clone <repo-url>
cd zythe
pnpm install
pnpm dev
```
App runs at `http://localhost:3000`

### Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_WAGMI_PROJECT_ID=your_rainbowkit_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_WORLD_ID_APP_ID=your_world_id_app_id
NEXT_PUBLIC_WORLD_ID_ACTION_ID=your_world_id_action_id
```

## Pages

- **Home** (`/`): Hero, features, featured markets
- **Markets** (`/markets`): List, filter, sort, search, real-time odds
- **Market Detail** (`/markets/[id]`): Full info, prediction UI, participants, oracle data
- **Profile** (`/profile`): Wallet info, World ID status, stats, history, leaderboard
- **Resolved** (`/resolved`): Completed markets, outcomes, leaderboard

## Architecture

### Tech Stack
- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4, shadcn/ui
- Web3: Wagmi, Viem, RainbowKit
- Verification: World ID
- Notifications: Sonner
- State: React + Wagmi

### Directory Structure
```
/app
  ├── page.tsx (Home)
  ├── /markets
  │   ├── page.tsx (Markets list)
  │   └── /[id]/page.tsx (Market detail)
  ├── /profile/page.tsx (User profile)
  └── /resolved/page.tsx (Resolved markets)

/components
  ├── /web3 (Wallet, World ID)
  ├── /market (Prediction UI)
  ├── /layout (Header, theme toggle)
  └── /ui (shadcn/ui)

/lib
  ├── /web3 (ABIs, config, hooks)
  ├── types.ts
  └── utils.ts

/hooks (Custom React hooks)
```

## Integration

- **Smart Contracts**: See `/backend/contracts` and `/zythe/contracts` for Solidity sources.
- **CRE Workflow**: `/zythe/my-workflow` automates market resolution.
- **Frontend**: `/app` and `/components` for UI and contract interaction.

## License
MIT
- Participant and volume stats

### Market Detail (`/markets/[id]`)
Detailed market view with:
- Full market information
- Prediction interface
- Recent participants
- Chainlink oracle data
- Make predictions UI

### Profile (`/profile`)
User dashboard showing:
- Wallet information
- World ID verification status
- Prediction statistics
- Win rate and P&L tracking
- Full prediction history
- Leaderboard position

### Resolved (`/resolved`)
View resolved markets and leaderboard:
- Completed market listings
- Resolution outcomes
- Top predictor leaderboard
- Global statistics

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Web3**: Wagmi, Viem, RainbowKit
- **Verification**: World ID (Worldcoin)
- **Notifications**: Sonner
- **State Management**: React built-in + Wagmi hooks

### Directory Structure
```
/app
  ├── page.tsx (Home)
  ├── /markets
  │   ├── page.tsx (Markets list)
  │   └── /[id]/page.tsx (Market detail)
  ├── /profile/page.tsx (User profile)
  └── /resolved/page.tsx (Resolved markets)

/components
  ├── /web3 (Web3 & wallet components)
  ├── /market (Market-specific components)
  ├── /layout (Header, theme toggle)
  └── /ui (shadcn/ui components)

/lib
  ├── /web3 (Contract ABIs, config, Wagmi hooks)
  ├── types.ts (TypeScript interfaces)
  └── utils.ts (Utility functions)

/hooks (Custom React hooks)
```

## 🔗 Web3 Integration

### Supported Networks
- **Sepolia Testnet**: Primary development network
- **Chain ID**: 11155111

### Contract Integration
The platform includes hooks for contract interaction:
- `useReadMarkets()` - Fetch markets
- `usePredictMutation()` - Submit predictions
- `useClaimRewardsMutation()` - Claim winnings
- `useCreateMarketMutation()` - Create markets
- `useChainlinkFeed()` - Read price feeds

### Demo Mode
The platform runs in demo mode with mock data and simulated transactions. No real ETH is transferred. This is perfect for testing without testnet tokens.

## 🌍 World ID Integration

### How It Works
1. User clicks "Verify with World ID" button
2. Opens World ID verification dialog
3. Completes biometric verification
4. Verification status is stored locally
5. User can now make predictions

### Verification Flow
- **Nullifier Hash**: Stored in localStorage for session persistence
- **One-time Verification**: Each human verified once globally
- **Privacy-Preserving**: No personal data stored on chain

## 📊 Chainlink Oracle Integration

### Supported Price Feeds (Sepolia)
- BTC/USD: `0x1b44F3514812d835EB1BEab5e6b6D91364e3FB17`
- ETH/USD: `0x694AA1769357215DE4FAC081bf1f309aDC325306`
- MATIC/USD: `0xd0D5e3DB44DE4E61D21e69642f06867b9525659B`
- LINK/USD: `0xc1e633Dc6213E63C5F3330466687e85A1BAeda4a`

Markets can be tied to specific Chainlink feeds for oracle-powered resolution.

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB) - Main brand color
- **Accent**: Orange (#F97316) - Secondary actions
- **Background**: Dark theme with light mode support
- **Border Radius**: 12px standard, 8px for smaller elements

### Typography
- **Font**: Geist (system default)
- **Headings**: Bold, up to 6xl
- **Body**: Regular, 14-16px

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🧪 Testing

The application includes demo features for testing:
- **Mock Markets**: Pre-populated sample market data
- **Simulated Transactions**: 2-second delays simulating blockchain
- **Demo Mode Banner**: Visual indicator of testnet operation
- **No Real Transactions**: All interactions are simulated

## 📦 Dependencies

Key dependencies:
- `next@16.1.6` - React framework
- `react@19.2.4` - UI library
- `tailwindcss@4.2.0` - Styling
- `wagmi@2.13.0` - Web3 hooks
- `viem@2.27.0` - Ethereum library
- `rainbowkit@2.1.3` - Wallet connection
- `@worldcoin/idkit@2.0.0` - World ID verification
- `sonner@1.7.1` - Toast notifications

## 🚢 Deployment

### Vercel Deployment

```bash
# Push to GitHub
git push origin main

# Automatic deployment via Vercel
# Settings > Environment Variables > Add NEXT_PUBLIC_* variables
```

### Environment Variables for Production
```env
NEXT_PUBLIC_WAGMI_PROJECT_ID=production_id
NEXT_PUBLIC_CONTRACT_ADDRESS=mainnet_contract
NEXT_PUBLIC_WORLD_ID_APP_ID=production_app_id
NEXT_PUBLIC_WORLD_ID_ACTION_ID=production_action_id
```

## 🔒 Security Considerations

- **World ID**: Prevents Sybil attacks through human verification
- **Wallet Integration**: Uses RainbowKit for secure wallet connection
- **Row-Level Security**: (When using Supabase) Restricts user data access
- **Input Validation**: All user inputs are validated before submission
- **Testnet Only**: Demo mode prevents real fund transfers

## 📖 API Reference

### Custom Hooks

#### useMarkets()
Fetches and manages market data.
```typescript
const { markets, loading, error, getMarketById, getActiveMarkets } = useMarkets();
```

#### useWorldID()
Manages World ID verification state.
```typescript
const { verified, handleVerification, checkVerification } = useWorldID();
```

#### usePredictMutation()
Submits a prediction on a market.
```typescript
const { predict, loading } = usePredictMutation();
await predict(marketId, 'yes', '0.01');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🏆 Chainlink Hackathon

Built for the Chainlink Hackathon with:
- Chainlink Price Feeds for oracle data
- World ID for human verification
- Sepolia testnet support
- Multi-chain ready architecture

## 📞 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Check existing documentation
- Review the code comments for technical details

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [Chainlink Documentation](https://docs.chain.link)
- [World ID Documentation](https://docs.worldcoin.org)
- [shadcn/ui Components](https://ui.shadcn.com)

---

Built with 🚀 for the Chainlink Hackathon
