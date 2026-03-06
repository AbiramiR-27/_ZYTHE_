import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto max-w-screen-2xl px-4 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Predict the Future,
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Earn Rewards</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
                Join Zythe, the decentralized prediction market powered by Chainlink and verified by World ID. Make accurate predictions on real-world events and stake ETH to earn rewards.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/markets">
                <Button size="lg" className="gap-2">
                  Explore Markets
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl font-bold text-primary">10,234</div>
                <p className="text-sm text-foreground/60">Active Predictions</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl font-bold text-primary">1,234</div>
                <p className="text-sm text-foreground/60">Verified Users</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl font-bold text-primary">425 ETH</div>
                <p className="text-sm text-foreground/60">Total Volume</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto max-w-screen-2xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Zythe?</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              The most secure and transparent prediction market platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Chainlink Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Reliable oracle data ensures accurate market resolutions on real-world events
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-2">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>World ID Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Each prediction is from a unique verified human, preventing fraud and Sybil attacks
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardHeader className="space-y-2">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Real Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn actual ETH rewards for making accurate predictions on market outcomes
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Markets Preview */}
        <section className="container mx-auto max-w-screen-2xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Markets</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Explore trending prediction markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border/40 hover:border-primary/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                      Crypto
                    </div>
                    <span className="text-xs text-foreground/50">30 days left</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    Will Bitcoin reach $100,000 by end of 2025?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>YES</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-primary rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>NO</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-accent rounded-full" />
                    </div>
                  </div>
                  <div className="text-xs text-foreground/60 pt-2">
                    1,234 participants • 125.5 ETH volume
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/markets">
              <Button size="lg" variant="outline">
                View All Markets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="container mx-auto max-w-screen-2xl px-4 py-16">
          <div className="bg-card border border-border/40 rounded-xl p-8 sm:p-12">
            <p className="text-center text-sm font-medium text-foreground/60 mb-8">
              Trusted by the leading blockchain infrastructure providers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
              <div className="h-10 px-4 rounded-lg bg-muted flex items-center justify-center font-semibold text-foreground/80">
                Chainlink
              </div>
              <div className="h-10 px-4 rounded-lg bg-muted flex items-center justify-center font-semibold text-foreground/80">
                World ID
              </div>
              <div className="h-10 px-4 rounded-lg bg-muted flex items-center justify-center font-semibold text-foreground/80">
                Sepolia Testnet
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="/markets" className="hover:text-foreground transition-colors">Markets</Link></li>
                <li><Link href="/resolved" className="hover:text-foreground transition-colors">Resolved</Link></li>
                <li><Link href="/profile" className="hover:text-foreground transition-colors">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
            <p>&copy; 2025 Zythe. All rights reserved.</p>
            <p>Built for the Chainlink Hackathon</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
