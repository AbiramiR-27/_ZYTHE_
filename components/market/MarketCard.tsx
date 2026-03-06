'use client';

import Link from 'next/link';
import { Market } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users } from 'lucide-react';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const daysRemaining = Math.ceil((market.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Link href={`/markets/${market.id}`}>
      <Card className="border-border/40 hover:border-primary/50 transition-all cursor-pointer h-full hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
              {market.category}
            </div>
            <span className="text-xs text-foreground/50 font-medium">
              {daysRemaining}d left
            </span>
          </div>
          <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2">
            {market.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Odds Display */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/70">YES</span>
                <span className="font-semibold text-primary">{market.yesOdds}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all"
                  style={{ width: `${market.yesOdds}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/70">NO</span>
                <span className="font-semibold text-accent">{market.noOdds}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all"
                  style={{ width: `${market.noOdds}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-foreground/60 pt-2 border-t border-border/40">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{market.participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{market.volume.toFixed(2)} ETH</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
