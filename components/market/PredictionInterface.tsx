'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { CONTRACT_CONFIG } from '@/lib/web3/config';
import { PREDICTION_MARKET_ABI } from '@/lib/web3/abi';
import { useWorldID } from '@/hooks/useWorldID';
import { WorldIDButton } from '@/components/web3/WorldIDButton';
import { Market } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface PredictionInterfaceProps {
  market: Market;
}

export function PredictionInterface({ market }: PredictionInterfaceProps) {
  const [selectedPrediction, setSelectedPrediction] = useState<'yes' | 'no' | null>(null);
  const [amount, setAmount] = useState('0.01');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { verified, checkVerification } = useWorldID();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  const handlePredict = async () => {
    if (!selectedPrediction) {
      toast.error('Please select YES or NO');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!verified) {
      toast.error('World ID verification required');
      return;
    }
    if (!address) {
      toast.error('Connect your wallet');
      return;
    }
    setLoading(true);
    try {
      const tx = await writeContractAsync({
        address: CONTRACT_CONFIG.address,
        abi: PREDICTION_MARKET_ABI,
        functionName: 'placePrediction',
        args: [BigInt(market.id), selectedPrediction === 'yes'],
        value: BigInt(Math.floor(parseFloat(amount) * 1e18)),
      });
      toast.success(`Transaction sent! Hash: ${tx}`);
      setSubmitted(true);
      setTimeout(() => {
        setSelectedPrediction(null);
        setAmount('0.01');
        setSubmitted(false);
      }, 3000);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to submit prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/40 sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Make a Prediction</CardTitle>
        <CardDescription>Stake ETH to predict the outcome</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {submitted && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Prediction submitted!</p>
              <p className="text-xs text-green-600/70 dark:text-green-400/70">Your stake has been recorded.</p>
            </div>
          </div>
        )}

        {/* Warning & World ID Button */}
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-amber-600 dark:text-amber-400">
              World ID verification required to predict. Make sure you're verified before staking.
            </p>
            <div className="mt-2">
              <WorldIDButton />
            </div>
          </div>
        </div>

        {/* YES/NO Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={selectedPrediction === 'yes' ? 'default' : 'outline'}
            className={`h-24 flex flex-col items-center justify-center gap-1 transition-all ${
              selectedPrediction === 'yes' 
                ? 'bg-primary border-primary' 
                : 'border-border/40'
            }`}
            onClick={() => setSelectedPrediction('yes')}
            disabled={loading}
          >
            <span className="text-xs text-foreground/60">Prediction</span>
            <span className="text-2xl font-bold">YES</span>
            <span className="text-xs text-foreground/60">{market.yesOdds}%</span>
          </Button>

          <Button
            variant={selectedPrediction === 'no' ? 'default' : 'outline'}
            className={`h-24 flex flex-col items-center justify-center gap-1 transition-all ${
              selectedPrediction === 'no' 
                ? 'bg-accent border-accent' 
                : 'border-border/40'
            }`}
            onClick={() => setSelectedPrediction('no')}
            disabled={loading}
          >
            <span className="text-xs text-foreground/60">Prediction</span>
            <span className="text-2xl font-bold">NO</span>
            <span className="text-xs text-foreground/60">{market.noOdds}%</span>
          </Button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Stake Amount (ETH)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.001"
              min="0.001"
              max="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
              disabled={loading}
              className="h-9"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAmount('0.01')}
              disabled={loading}
              className="px-2"
            >
              0.01
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAmount('0.1')}
              disabled={loading}
              className="px-2"
            >
              0.1
            </Button>
          </div>
        </div>

        {/* Potential Payout */}
        {selectedPrediction && amount && parseFloat(amount) > 0 && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border/40">
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground/60">Potential payout</span>
              <span className="font-semibold">
                {selectedPrediction === 'yes' 
                  ? (parseFloat(amount) * (100 / market.yesOdds)).toFixed(3)
                  : (parseFloat(amount) * (100 / market.noOdds)).toFixed(3)
                } ETH
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handlePredict}
          disabled={loading || !selectedPrediction || !amount}
          className="w-full h-10 mt-2"
          size="lg"
        >
          {loading ? 'Submitting...' : 'Confirm Prediction'}
        </Button>

        {/* Info Text */}
        <p className="text-xs text-foreground/50 text-center mt-4">
          Testnet only. No real ETH will be transferred.
        </p>
      </CardContent>
    </Card>
  );
}
