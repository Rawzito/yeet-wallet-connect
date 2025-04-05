import React from 'react';
import WalletStatus from './WalletStatus';

const App = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <h1>YEET Wallet Connect 🔥</h1>
      <WalletStatus />
    </div>
  );
};

export default App;