'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { WalletButton } from '@/components/web3/WalletButton';
import { WorldIDButton } from '@/components/web3/WorldIDButton';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <span className="hidden sm:inline">Zythe</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/markets" className="text-foreground/70 hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/resolved" className="text-foreground/70 hover:text-foreground transition-colors">
              Resolved
            </Link>
            <Link href="/profile" className="text-foreground/70 hover:text-foreground transition-colors">
              Profile
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <WorldIDButton />
          <ThemeToggle />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
