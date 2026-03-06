'use client';

import { useState, useCallback } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { Market, Prediction } from '@/lib/types';
import { CONTRACT_CONFIG, DEMO_MARKETS } from './config';
import { PREDICTION_MARKET_ABI } from './abi';

// Hook to read markets from contract
export function useReadMarkets() {
  const [markets, setMarkets] = useState<Market[]>(DEMO_MARKETS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      // In production, this would use wagmi's useContractRead
      // For now, we use demo data
      setMarkets(DEMO_MARKETS);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch markets');
    } finally {
      setLoading(false);
    }
  }, []);

  return { markets, loading, error, refetch };
}

// Hook to predict on a market
export function usePredictMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(
    async (marketId: string, prediction: 'yes' | 'no', amount: string) => {
      try {
        setLoading(true);
        // In production, this would write to contract via wagmi
        // Simulate transaction
        await new Promise(resolve => setTimeout(resolve, 1000));
        setError(null);
        return true;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Prediction failed';
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { predict, loading, error };
}

// Hook to claim rewards
export function useClaimRewardsMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const claimRewards = useCallback(async (marketId: string) => {
    try {
      setLoading(true);
      // In production, this would write to contract
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError(null);
      return { amount: '0.5' };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Claim failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { claimRewards, loading, error };
}

// Hook to get user's predictions
export function useUserPredictions(address?: string) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!address) return;

    try {
      setLoading(true);
      // In production, this would read from contract
      setPredictions([]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
    } finally {
      setLoading(false);
    }
  }, [address]);

  return { predictions, loading, error, refetch };
}

// Hook to create a market
export function useCreateMarketMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMarket = useCallback(
    async (question: string, category: string, deadline: Date, resolutionSource: string) => {
      try {
        setLoading(true);
        // In production, this would write to contract
        await new Promise(resolve => setTimeout(resolve, 1000));
        setError(null);
        return { marketId: Date.now().toString() };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Market creation failed';
        setError(errorMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createMarket, loading, error };
}

// Hook to listen to contract events
export function useMarketEvents() {
  const [events, setEvents] = useState<any[]>([]);

  const setupEventListeners = useCallback(() => {
    // In production, use ethers.js or viem to listen to events
    // For now, this is a placeholder
    console.log('[v0] Event listeners setup (demo mode)');
  }, []);

  return { events, setupEventListeners };
}

// Hook for Chainlink price feeds
export function useChainlinkFeed(feed: string) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      // In production, this would read from Chainlink oracle
      // Demo data
      const demoPrice = feed.includes('BTC') ? 42500 : feed.includes('ETH') ? 2300 : 1.05;
      setPrice(demoPrice);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price');
    } finally {
      setLoading(false);
    }
  }, [feed]);

  return { price, loading, error, refetch };
}
