import React from 'react';
import WalletStatus from './WalletStatus';

const App = () => {
  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: '#0d0d0d',
      minHeight: '100vh',
      color: '#f0c420',
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '14px',
      lineHeight: '1.6',
    }}>
      <h1 style={{
        fontSize: '24px',
        marginBottom: '1rem',
        color: '#f0c420',
        borderBottom: '1px solid #f0c420',
        paddingBottom: '0.5rem',
      }}>
        YEET WALLET CONNECT
      </h1>
      <WalletStatus />
    </div>
  );
};

export default App;