'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function MarketCardSkeleton() {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          <div className="h-5 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-2 w-full bg-muted rounded animate-pulse" />
          <div className="h-2 w-full bg-muted rounded animate-pulse" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MarketCardSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <MarketCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-5 w-full bg-muted rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-32 w-full bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="h-96 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
