'use client';

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMarkets } from '@/hooks/useMarkets';
import { useParams } from 'next/navigation';
import { Loader2, TrendingUp, Users, Clock, Link as LinkIcon } from 'lucide-react';
import { PredictionInterface } from '@/components/market/PredictionInterface';

export default function MarketDetailPage() {
  const params = useParams();
  const { getMarketById, loading } = useMarkets();
  const market = getMarketById(params.id as string);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Market Not Found</h1>
            <p className="text-foreground/60">This market could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const daysRemaining = Math.ceil((market.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.ceil((market.deadline.getTime() - Date.now()) / (1000 * 60 * 60)) % 24;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
            <a href="/markets" className="hover:text-foreground transition-colors">Markets</a>
            <span>/</span>
            <span className="truncate">{market.question.substring(0, 50)}...</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Question Card */}
              <Card className="border-border/40">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-md">
                      {market.category}
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-md ${
                      market.status === 'active' 
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                        : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                    }`}>
                      {market.status === 'active' ? 'Active' : market.resolved ? 'Resolved' : 'Pending'}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {market.question}
                  </h1>
                </CardHeader>
              </Card>

              {/* Odds Display */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Prediction Odds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* YES Odds */}
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <span className="text-base font-semibold">YES</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{market.yesOdds}%</div>
                        <p className="text-xs text-foreground/60 mt-1">Probability</p>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
                        style={{ width: `${market.yesOdds}%` }}
                      />
                    </div>
                  </div>

                  {/* NO Odds */}
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <span className="text-base font-semibold">NO</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">{market.noOdds}%</div>
                        <p className="text-xs text-foreground/60 mt-1">Probability</p>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all"
                        style={{ width: `${market.noOdds}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Details */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Market Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Participants</span>
                      </div>
                      <p className="text-2xl font-bold">{market.participants.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Total Volume</span>
                      </div>
                      <p className="text-2xl font-bold">{market.volume.toFixed(2)} ETH</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Time Remaining</span>
                      </div>
                      <p className="text-2xl font-bold">{daysRemaining}d {hoursRemaining}h</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground/60">
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-sm">Resolution Source</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">{market.resolutionSource || 'Chainlink'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants List */}
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Participants</CardTitle>
                  <CardDescription>Users who recently made predictions on this market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20" />
                          <div>
                            <p className="text-sm font-medium">0x{Math.random().toString(16).slice(2, 10)}</p>
                            <p className="text-xs text-foreground/50">{Math.random() > 0.5 ? 'Predicted YES' : 'Predicted NO'}</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold">{(Math.random() * 0.5 + 0.01).toFixed(3)} ETH</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Prediction Interface */}
            <div className="lg:col-span-1">
              <PredictionInterface market={market} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
