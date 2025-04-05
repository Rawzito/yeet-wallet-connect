import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletStatus = () => {
  const { publicKey, connected } = useWallet();
  const [isEligible, setIsEligible] = useState(null);

  useEffect(() => {
    if (publicKey) {
      const key = publicKey.toString();

      // Replace this logic with real checks later (token/NFT)
      const eligible = key.endsWith("A") || key.includes("YEET");
      setIsEligible(eligible);
    } else {
      setIsEligible(null);
    }
  }, [publicKey]);

  return (
    <div style={{
      backgroundColor: '#111',
      color: '#fff',
      padding: '1rem',
      borderRadius: '12px',
      boxShadow: '0 0 10px #00ff99',
      marginBottom: '20px'
    }}>
      <h2>Wallet Status</h2>
      <WalletMultiButton />
      {connected && publicKey && (
        <>
          <p><strong>Address:</strong> {publicKey.toString()}</p>
          <p><strong>Eligibility:</strong> {isEligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
        </>
      )}
      {!connected && (
        <p>Please connect your wallet to continue.</p>
      )}
    </div>
  );
};

export default WalletStatus;