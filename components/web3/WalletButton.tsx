'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletButton() {
  return (
    <div className="flex items-center gap-2">
      <ConnectButton
        showBalance={true}
        label="Connect Wallet"
        accountStatus="address"
      />
    </div>
  );
}
