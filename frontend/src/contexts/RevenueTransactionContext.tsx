import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Transaction {
  id: string;
  amount: number;
  plazaId: string;
  timestamp: string;
}

interface RevenueTransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getTotalRevenue: () => number;
  getTotalTransactions: () => number;
}

const RevenueTransactionContext = createContext<RevenueTransactionContextType | undefined>(undefined);

export const useRevenueTransactions = () => {
  const context = useContext(RevenueTransactionContext);
  if (!context) {
    throw new Error('useRevenueTransactions must be used within a RevenueTransactionProvider');
  }
  return context;
};

export const RevenueTransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  const getTotalRevenue = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalTransactions = () => {
    return transactions.length;
  };

  return (
    <RevenueTransactionContext.Provider value={{ transactions, addTransaction, getTotalRevenue, getTotalTransactions }}>
      {children}
    </RevenueTransactionContext.Provider>
  );
};