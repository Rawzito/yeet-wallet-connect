import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnectButtonOnly = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <WalletMultiButton />
    </div>
  );
};

export default WalletConnectButtonOnly;