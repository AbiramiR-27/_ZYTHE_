'use client';

import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DemoModeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-50">
      <div className="bg-card border border-amber-500/30 rounded-lg p-4 shadow-lg">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Demo Mode Active</h3>
            <p className="text-xs text-foreground/70">
              This is a testnet demo. No real ETH will be transferred. Mock data is being used.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
