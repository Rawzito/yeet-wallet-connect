// Dual Liquidity Pool UI for YEET Meme Olympics

import React, { useState } from 'react';

const PoolCard = ({ pairName, tokenA, tokenB }) => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');

  const handleAddLiquidity = () => {
    alert(`Add Liquidity: ${amountA} ${tokenA} + ${amountB} ${tokenB}`);
  };

  return (
    <div className="p-4 rounded-2xl shadow-md bg-black text-yellow-400 w-full max-w-md mx-auto border border-yellow-600">
      <h2 className="text-xl font-bold mb-2">{pairName}</h2>
      <p className="mb-4 text-sm text-yellow-300">
        Add liquidity to qualify for the $Y33T airdrop!
        <br /> Everyone gets an airdrop, but the winning pool earns 2x!
      </p>
      <input
        type="number"
        placeholder={`Amount of ${tokenA}`}
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-yellow-900 text-white border border-yellow-700 focus:outline-none"
      />
      <input
        type="number"
        placeholder={`Amount of ${tokenB}`}
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-yellow-900 text-white border border-yellow-700 focus:outline-none"
      />
      <button
        onClick={handleAddLiquidity}
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl border border-yellow-500 shadow-lg transition duration-200"
      >
        ➕ Add Liquidity
      </button>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 24 * 60 * 60); // 30 days in seconds

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="text-yellow-300 font-mono text-sm mt-4">
      ⏳ Snapshot in: {formatTime(timeLeft)}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-950 to-black p-6 text-center text-white space-y-10">
      <h1 className="text-3xl font-bold text-yellow-400">🔥 YEET Meme Olympics LP Gauntlet 🔥</h1>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <PoolCard pairName="$Y33T / DOGE" tokenA="Y33T" tokenB="DOGE" />
        <div className="text-3xl font-extrabold text-red-500">VS</div>
        <PoolCard pairName="$Y33T / TRUMP" tokenA="Y33T" tokenB="TRUMP" />
      </div>
      <CountdownTimer />
    </div>
  );
}

