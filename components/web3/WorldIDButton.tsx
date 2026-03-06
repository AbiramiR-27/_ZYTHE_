'use client';

import { useState } from 'react';
import { useWorldID } from '@/hooks/useWorldID';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { WorldIDVerification } from './WorldIDVerification';

export function WorldIDButton() {
  const { verified } = useWorldID();
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowDialog(true)}
        className="gap-2"
      >
        {verified ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Verified
          </>
        ) : (
          <>
            <Circle className="h-4 w-4 text-amber-500" />
            Verify
          </>
        )}
      </Button>
      <WorldIDVerification isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </>
  );
}
