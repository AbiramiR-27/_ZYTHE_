'use client';

import React, { useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rainbowKitConfig } from '@/lib/web3/config';
import '@rainbow-me/rainbowkit/styles.css';

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
};

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => createQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={rainbowKitConfig}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
