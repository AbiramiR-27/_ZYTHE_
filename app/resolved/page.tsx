'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp } from 'lucide-react';

export default function ResolvedPage() {
  const [activeTab, setActiveTab] = useState('markets');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Resolved Markets</h1>
            <p className="text-foreground/60">
              View completed markets and leaderboard
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Markets Tab */}
            <TabsContent value="markets" className="space-y-4 mt-6">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-border/40 hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">
                            {i % 2 === 0 
                              ? 'Will Bitcoin reach $100,000 by end of 2025?'
                              : 'Will Ethereum outperform Bitcoin in 2025?'
                            }
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              Crypto
                            </Badge>
                            <span className="text-xs text-foreground/60">
                              Resolved {i + 1} days ago
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            i % 3 === 0 ? 'text-green-500' : i % 3 === 1 ? 'text-red-500' : 'text-gray-500'
                          }`}>
                            {i % 3 === 0 ? 'YES' : i % 3 === 1 ? 'NO' : 'CANCELED'}
                          </div>
                          <p className="text-xs text-foreground/60 mt-1">Resolution</p>
                        </div>
                      </div>

                      {/* Resolution Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Correct Predictors</p>
                          <p className="font-semibold">{Math.floor(Math.random() * 500) + 100}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Incorrect Predictors</p>
                          <p className="font-semibold">{Math.floor(Math.random() * 500) + 100}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Total Volume</p>
                          <p className="font-semibold">{(Math.random() * 200 + 50).toFixed(1)} ETH</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="mt-6">
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Top Predictors
                  </CardTitle>
                  <CardDescription>Users with the highest win rates and profits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/40">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">0x{Math.random().toString(16).slice(2, 10)}</p>
                            <p className="text-xs text-foreground/60">
                              {Math.floor(Math.random() * 50) + 10} predictions
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {(Math.random() * 0.5 + 0.1).toFixed(2)} ETH
                          </p>
                          <p className="text-xs text-green-500">
                            {Math.floor(Math.random() * 30) + 60}% win rate
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">
                      Total Markets Resolved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">156</p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">
                      Active Predictors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">1,234</p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground/60">
                      Total Rewards Distributed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">542.3 ETH</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
