import React, { useState, useEffect } from 'react';

interface OfflineModeProps {
  onSyncData: () => void;
}

const OfflineMode: React.FC<OfflineModeProps> = ({ onSyncData }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineTransactions, setOfflineTransactions] = useState<number>(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Simulating loading offline transactions from local storage
    const loadOfflineTransactions = () => {
      const storedTransactions = localStorage.getItem('offlineTransactions');
      setOfflineTransactions(storedTransactions ? parseInt(storedTransactions, 10) : 0);
    };

    loadOfflineTransactions();
  }, []);

  const handleSync = () => {
    if (isOnline && offlineTransactions > 0) {
      onSyncData();
      setOfflineTransactions(0);
      localStorage.setItem('offlineTransactions', '0');
    }
  };

  // Simulating offline transaction creation
  const addOfflineTransaction = () => {
    const newCount = offlineTransactions + 1;
    setOfflineTransactions(newCount);
    localStorage.setItem('offlineTransactions', newCount.toString());
  };

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${isOnline ? 'border-green-500' : 'border-red-500'} border-2`}>
      <h2 className="text-2xl font-bold mb-4">Connection Status</h2>
      <p className={`text-lg font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
        {isOnline ? 'Online' : 'Offline'}
      </p>
      <p className="mt-2">
        Offline transactions: {offlineTransactions}
      </p>
      <button
        onClick={handleSync}
        disabled={!isOnline || offlineTransactions === 0}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        Sync Offline Data
      </button>
      <button
        onClick={addOfflineTransaction}
        className="mt-2 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Simulate Offline Transaction
      </button>
    </div>
  );
};

export default OfflineMode;