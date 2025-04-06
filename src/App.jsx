import { Buffer } from 'buffer';
window.Buffer = Buffer;

import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import * as solanaWeb3 from '@solana/web3.js';

const App = () => {
  const { publicKey, signTransaction, connected } = useWallet();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [minimal, setMinimal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("minimal") === "true") {
      setMinimal(true);
    }
  }, []);

  const buyY33T = async () => {
    try {
      if (!connected || !publicKey) {
        setMessage("Please connect your wallet.");
        return;
      }

      const solAmount = parseFloat(amount);
      if (isNaN(solAmount) || solAmount <= 0) {
        setMessage("Enter a valid SOL amount.");
        return;
      }

      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
      const toPubkey = new solanaWeb3.PublicKey("FdNensSUfLU1EENxo3AdGeYN6S1MNjuyRjjWqRDpp1TZ");

      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey,
          lamports: solAmount * solanaWeb3.LAMPORTS_PER_SOL,
        })
      );

      transaction.feePayer = publicKey;
      const blockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash.blockhash;

      const signed = await signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(txid);

      setMessage(`✅ Transaction sent! TXID: ${txid}`);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Transaction failed: ${err.message || err}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <WalletMultiButton />
      {!minimal && (
        <>
          <div style={{ marginTop: '1.5rem' }}>
            <input
              type="number"
              placeholder="Enter SOL amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '10px', width: '200px', borderRadius: '8px' }}
            />
            <br />
            <button
              onClick={buyY33T}
              style={{ marginTop: '1rem', padding: '12px 24px', backgroundColor: '#00ffcc', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}
            >
              Buy $Y33T Now
            </button>
          </div>
          <p style={{ marginTop: '1rem', color: '#0f0' }}>{message}</p>
          <p style={{ fontSize: '0.9em', color: '#aaa' }}>
            ✅ Compatible with Phantom, Solflare, and Cronos On-Chain Wallet (Solana)
          </p>
        </>
      )}
    </div>
  );
};

export default App;