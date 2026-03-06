'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { useWorldID } from '@/hooks/useWorldID';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Trophy, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { verified, checkVerification } = useWorldID();

  // Initialize verification check
  React.useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-foreground/60">Please connect your wallet to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">My Profile</h1>
            <p className="text-foreground/60">Manage your account and view your prediction history</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Wallet Card */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Wallet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                    <p className="text-xs text-foreground/60 mb-1">Address</p>
                    <p className="text-sm font-mono break-all">
                      {address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-foreground/60 mb-1">Network</p>
                      <p className="text-sm font-semibold">Sepolia</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-foreground/60 mb-1">Balance</p>
                      <p className="text-sm font-semibold">0.5 ETH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Card */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {verified ? (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Verified</p>
                        <p className="text-xs text-green-600/70 dark:text-green-400/70">You are verified with World ID</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Not Verified</p>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">Complete World ID verification to predict</p>
                      </div>
                    </div>
                  )}
                  <Button variant="outline" className="w-full">
                    {verified ? 'Update Verification' : 'Verify with World ID'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">Total Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-xs text-foreground/60 mt-2">All time</p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">Win Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">62%</p>
                    <p className="text-xs text-foreground/60 mt-2">8 out of 13 resolved</p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">Total Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">2.45 ETH</p>
                    <p className="text-xs text-foreground/60 mt-2">Total staked</p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">Profit/Loss</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-500">+0.32 ETH</p>
                    <p className="text-xs text-foreground/60 mt-2">Net profit</p>
                  </CardContent>
                </Card>
              </div>

              {/* Prediction History */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Prediction History</CardTitle>
                  <CardDescription>Your recent market predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">
                            Will Bitcoin reach $100,000 by end of 2025?
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              Predicted YES
                            </Badge>
                            <span className="text-xs text-foreground/60">
                              5 days ago
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">0.05 ETH</p>
                          <p className="text-xs text-foreground/60 mt-1">
                            {i % 2 === 0 ? '✓ Won' : '○ Pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard Position */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Leaderboard Position
                  </CardTitle>
                  <CardDescription>Your ranking among all predictors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">42</p>
                      <p className="text-sm text-foreground/60 mt-2">Current Rank</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold">1,234</p>
                      <p className="text-sm text-foreground/60 mt-2">Total Players</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-green-500">+8</p>
                      <p className="text-sm text-foreground/60 mt-2">Rank Change</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
