// ZythePredictionMarket Contract ABI — matches deployed contract
export const PREDICTION_MARKET_ABI = [
  // ── Write functions ──────────────────────────────────────────
  {
    inputs: [
      { name: '_title', type: 'string' },
      { name: '_description', type: 'string' },
      { name: '_priceFeed', type: 'address' },
      { name: '_strikePrice', type: 'uint256' },
      { name: '_resolutionTime', type: 'uint256' },
    ],
    name: 'createMarket',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_marketId', type: 'uint256' },
      { name: '_prediction', type: 'bool' },
    ],
    name: 'placePrediction',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: '_marketId', type: 'uint256' }],
    name: 'resolveMarket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_predictionId', type: 'uint256' }],
    name: 'claimWinnings',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '_user', type: 'address' }],
    name: 'verifyWorldID',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // ── View functions ───────────────────────────────────────────
  {
    inputs: [{ name: '_marketId', type: 'uint256' }],
    name: 'getMarket',
    outputs: [
      {
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'priceFeed', type: 'address' },
          { name: 'strikePrice', type: 'uint256' },
          { name: 'resolutionTime', type: 'uint256' },
          { name: 'resolved', type: 'bool' },
          { name: 'outcome', type: 'bool' },
          { name: 'totalYesAmount', type: 'uint256' },
          { name: 'totalNoAmount', type: 'uint256' },
          { name: 'createdAt', type: 'uint256' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_marketId', type: 'uint256' }],
    name: 'getMarketPredictions',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_predictionId', type: 'uint256' }],
    name: 'getPrediction',
    outputs: [
      {
        components: [
          { name: 'marketId', type: 'uint256' },
          { name: 'predictor', type: 'address' },
          { name: 'prediction', type: 'bool' },
          { name: 'amount', type: 'uint256' },
          { name: 'createdAt', type: 'uint256' },
          { name: 'claimed', type: 'bool' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getActiveMarketsCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_marketId', type: 'uint256' },
      { name: '_user', type: 'address' },
    ],
    name: 'hasUserPredicted',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_marketId', type: 'uint256' },
      { name: '_user', type: 'address' },
    ],
    name: 'getUserPrediction',
    outputs: [
      {
        components: [
          { name: 'marketId', type: 'uint256' },
          { name: 'predictor', type: 'address' },
          { name: 'prediction', type: 'bool' },
          { name: 'amount', type: 'uint256' },
          { name: 'createdAt', type: 'uint256' },
          { name: 'claimed', type: 'bool' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketCounter',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'worldIDVerified',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ── Events ───────────────────────────────────────────────────
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'marketId', type: 'uint256' },
      { indexed: false, name: 'title', type: 'string' },
      { indexed: false, name: 'strikePrice', type: 'uint256' },
      { indexed: false, name: 'resolutionTime', type: 'uint256' },
    ],
    name: 'MarketCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'marketId', type: 'uint256' },
      { indexed: true, name: 'predictor', type: 'address' },
      { indexed: false, name: 'prediction', type: 'bool' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'PredictionPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'marketId', type: 'uint256' },
      { indexed: false, name: 'outcome', type: 'bool' },
      { indexed: false, name: 'totalYesAmount', type: 'uint256' },
      { indexed: false, name: 'totalNoAmount', type: 'uint256' },
    ],
    name: 'MarketResolved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'predictionId', type: 'uint256' },
      { indexed: true, name: 'predictor', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'WinningsClaimed',
    type: 'event',
  },
] as const;

// Chainlink Price Feeds for Sepolia Testnet
export const CHAINLINK_FEEDS = {
  'BTC/USD': '0x1b44F3514812d835EB1BEab5e6b6D91364e3FB17',
  'ETH/USD': '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  'MATIC/USD': '0xd0D5e3DB44DE4E61D21e69642f06867b9525659B',
  'LINK/USD': '0xc1e633Dc6213E63C5F3330466687e85A1BAeda4a',
} as const;

export type ChainlinkFeed = keyof typeof CHAINLINK_FEEDS;
