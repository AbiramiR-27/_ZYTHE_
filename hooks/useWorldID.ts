'use client';

import { useState, useCallback } from 'react';

export interface WorldIDVerificationResult {
  nullifierHash: string;
  merkleRoot: string;
  proof: string;
}

export function useWorldID() {
  const [verified, setVerified] = useState(false);
  const [nullifierHash, setNullifierHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user was previously verified
  const checkVerification = useCallback(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('worldid_nullifier');
      if (stored) {
        setVerified(true);
        setNullifierHash(stored);
      }
    }
  }, []);

  const handleVerification = useCallback((result: WorldIDVerificationResult) => {
    try {
      setLoading(true);
      // Store the nullifier hash in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('worldid_nullifier', result.nullifierHash);
      }
      setVerified(true);
      setNullifierHash(result.nullifierHash);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetVerification = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('worldid_nullifier');
    }
    setVerified(false);
    setNullifierHash(null);
  }, []);

  return {
    verified,
    nullifierHash,
    loading,
    error,
    checkVerification,
    handleVerification,
    resetVerification,
  };
}
