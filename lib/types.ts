export interface Market {
  id: string;
  question: string;
  description?: string;
  category: 'Crypto' | 'Economics' | 'Sports' | 'Politics' | 'Entertainment' | 'Other';
  yesOdds: number;
  noOdds: number;
  participants: number;
  volume: number;
  deadline: Date;
  status: 'active' | 'pending' | 'resolved';
  resolved: boolean;
  outcome?: 'yes' | 'no';
  resolution?: 'yes' | 'no' | 'canceled';
  resolutionSource?: string;
  chainlinkFeed?: string;
  strikePrice?: string;
  priceFeed?: string;
}

export interface Prediction {
  id: string;
  marketId: string;
  userAddress: string;
  prediction: 'yes' | 'no';
  amount: number; // in ETH
  timestamp: Date;
  won?: boolean;
}

export interface UserProfile {
  address: string;
  verified: boolean;
  worldIdNullifier?: string;
  predictions: Prediction[];
  totalPredictions: number;
  totalWins: number;
  totalVolume: number;
  winRate: number;
  joinedAt: Date;
}

export interface PredictionStats {
  totalPredictions: number;
  totalVolume: number;
  totalWins: number;
  winRate: number;
  profitLoss: number;
}
