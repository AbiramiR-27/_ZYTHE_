'use client';

import { useChainlinkFeed } from '@/lib/web3/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, TrendingUp, TrendingDown } from 'lucide-react';

interface ChainlinkFeedDisplayProps {
  feed: string;
  title: string;
}

export function ChainlinkFeedDisplay({ feed, title }: ChainlinkFeedDisplayProps) {
  const { price, loading, error } = useChainlinkFeed(feed);

  if (loading) {
    return (
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-foreground/50">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription>Current Chainlink oracle price</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">
            {price?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-500">
            <TrendingUp className="h-3 w-3" />
            <span>Live data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
