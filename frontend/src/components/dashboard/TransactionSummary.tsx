// src/components/dashboard/TransactionSummary.tsx

import React from 'react';

interface TransactionSummaryProps {
  totalRevenue: number;
  totalTransactions: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ totalRevenue, totalTransactions }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Revenue</h2>
        <p className="text-sm text-gray-600 mb-4">Today's total revenue across all plazas</p>
        <p className="text-3xl font-bold text-blue-600">₹{totalRevenue.toFixed(2)}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Transactions</h2>
        <p className="text-sm text-gray-600 mb-4">Number of transactions today</p>
        <p className="text-3xl font-bold text-green-600">{totalTransactions}</p>
      </div>
    </>
  );
};

export default TransactionSummary;