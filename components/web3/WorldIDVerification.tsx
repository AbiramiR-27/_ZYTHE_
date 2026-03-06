'use client';

import { useEffect, useState } from 'react';
import { useWorldID } from '@/hooks/useWorldID';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface WorldIDVerificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorldIDVerification({ isOpen, onClose }: WorldIDVerificationProps) {
  const { verified, loading, handleVerification, resetVerification } = useWorldID();
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateVerification = async () => {
    setIsSimulating(true);
    try {
      // Simulate World ID verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      handleVerification({
        nullifierHash: '0x' + Math.random().toString(16).slice(2),
        merkleRoot: '0x' + Math.random().toString(16).slice(2),
        proof: '0x' + Math.random().toString(16).slice(2),
      });
    } finally {
      setIsSimulating(false);
      setTimeout(onClose, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>World ID Verification</DialogTitle>
          <DialogDescription>
            Verify your humanity to make predictions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {verified ? (
            <>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Verified</p>
                  <p className="text-xs text-green-600/70 dark:text-green-400/70">
                    Your World ID has been verified. You can now make predictions.
                  </p>
                </div>
              </div>
              <Button onClick={resetVerification} variant="outline" className="w-full">
                Reset Verification
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">How it works:</h3>
                <ol className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">1</span>
                    <span>Click the button below to open World ID verification</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">2</span>
                    <span>Complete the biometric verification process</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary">3</span>
                    <span>You'll be verified as a unique human</span>
                  </li>
                </ol>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  This is a demo. Click below to simulate verification on testnet.
                </p>
              </div>

              <Button
                onClick={handleSimulateVerification}
                disabled={isSimulating || loading}
                className="w-full gap-2"
              >
                {isSimulating || loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  'Verify with World ID'
                )}
              </Button>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-border/40">
          <p className="text-xs text-foreground/50">
            World ID by Worldcoin provides proof of humanity while preserving privacy through cryptographic verification.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
