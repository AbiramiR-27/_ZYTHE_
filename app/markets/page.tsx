'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { MarketCard } from '@/components/market/MarketCard';
import { useMarkets } from '@/hooks/useMarkets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Market } from '@/lib/types';
import { Search, Loader2 } from 'lucide-react';

type Category = 'All' | 'Crypto' | 'Economics' | 'Sports' | 'Politics' | 'Entertainment' | 'Other';
type SortOption = 'newest' | 'trending' | 'ending-soon' | 'most-volume';

export default function MarketsPage() {
  const { markets, loading } = useMarkets();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');

  const categories: Category[] = ['All', 'Crypto', 'Economics', 'Sports', 'Politics', 'Entertainment', 'Other'];

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let result = markets;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(m =>
        m.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => b.deadline.getTime() - a.deadline.getTime());
        break;
      case 'trending':
        result = [...result].sort((a, b) => b.participants - a.participants);
        break;
      case 'ending-soon':
        result = [...result].sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
        break;
      case 'most-volume':
        result = [...result].sort((a, b) => b.volume - a.volume);
        break;
    }

    return result;
  }, [markets, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Markets</h1>
            <p className="text-foreground/60">
              Browse {filteredMarkets.length} active prediction markets
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-6 mb-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Search markets..."
                className="pl-10 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm text-foreground/60 self-center">Sort by:</span>
              {(['trending', 'newest', 'ending-soon', 'most-volume'] as SortOption[]).map((option) => (
                <Button
                  key={option}
                  variant={sortBy === option ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy(option)}
                  className="text-xs"
                >
                  {option === 'ending-soon' && 'Ending Soon'}
                  {option === 'most-volume' && 'Most Volume'}
                  {option === 'newest' && 'Newest'}
                  {option === 'trending' && 'Trending'}
                </Button>
              ))}
            </div>
          </div>

          {/* Markets Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredMarkets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/60 text-lg">No markets found</p>
              <p className="text-foreground/40 text-sm mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
