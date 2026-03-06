'use client';

import { useState, useEffect } from 'react';
import { useReadContract, usePublicClient } from 'wagmi';
import { formatEther } from 'viem';
import { Market } from '@/lib/types';
import { DEMO_MARKETS, CONTRACT_CONFIG } from '@/lib/web3/config';
import { PREDICTION_MARKET_ABI } from '@/lib/web3/abi';

export function useMarkets() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isContractConfigured = CONTRACT_CONFIG.address !== '0x';

  const { data: marketCount } = useReadContract(
    isContractConfigured
      ? {
          address: CONTRACT_CONFIG.address,
          abi: PREDICTION_MARKET_ABI,
          functionName: 'marketCounter',
        }
      : undefined
  );

  const publicClient = usePublicClient();

  useEffect(() => {
    if (!isContractConfigured || marketCount === undefined) {
      // Fall back to demo data
      setMarkets(DEMO_MARKETS);
      setLoading(false);
      return;
    }

    const loadMarkets = async () => {
      try {
        setLoading(true);
        const count = Number(marketCount);
        if (count === 0) {
          setMarkets([]);
          return;
        }

        const results = await Promise.all(
          Array.from({ length: count }, (_, i) =>
            publicClient!.readContract({
              address: CONTRACT_CONFIG.address,
              abi: PREDICTION_MARKET_ABI,
              functionName: 'getMarket',
              args: [BigInt(i)],
            })
          )
        );

        const mapped: Market[] = (results as any[]).map((m) => ({
          id: m.id.toString(),
          question: m.title,
          description: m.description,
          category: 'Crypto' as Market['category'],
          yesOdds:
            m.totalYesAmount + m.totalNoAmount > 0n
              ? Math.round(
                  (Number(m.totalYesAmount) /
                    Number(m.totalYesAmount + m.totalNoAmount)) *
                    100
                )
              : 50,
          noOdds:
            m.totalYesAmount + m.totalNoAmount > 0n
              ? Math.round(
                  (Number(m.totalNoAmount) /
                    Number(m.totalYesAmount + m.totalNoAmount)) *
                    100
                )
              : 50,
          participants: 0,
          volume: parseFloat(formatEther(m.totalYesAmount + m.totalNoAmount)),
          deadline: new Date(Number(m.resolutionTime) * 1000),
          status: m.resolved ? 'resolved' : 'active',
          resolved: m.resolved,
          outcome: m.resolved ? (m.outcome ? 'yes' : 'no') : undefined,
          strikePrice: m.strikePrice.toString(),
          priceFeed: m.priceFeed,
        }));

        setMarkets(mapped);
        setError(null);
      } catch (err) {
        console.error('Failed to load markets from contract, falling back to demo:', err);
        setMarkets(DEMO_MARKETS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    loadMarkets();
  }, [marketCount, isContractConfigured, publicClient]);

  const getMarketById = (id: string) => markets.find(m => m.id === id);
  const getMarketsByCategory = (category: Market['category']) => markets.filter(m => m.category === category);
  const getActiveMarkets = () => markets.filter(m => m.status === 'active' && !m.resolved);
  const getResolvedMarkets = () => markets.filter(m => m.resolved);

  return {
    markets,
    loading,
    error,
    getMarketById,
    getMarketsByCategory,
    getActiveMarkets,
    getResolvedMarkets,
  };
}
