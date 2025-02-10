import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import api from "../services/api";
import Layout from '../components/common/Layout';
// import RevenueChart from '../components/dashboard/RevenueChart';
import TransactionSummary from '../components/dashboard/TransactionSummary';
// import ActivePlazas from '../components/dashboard/ActivePlazas';
// import { useTollPlazas } from '../contexts/TollPlazaContext';

interface DashboardData {
  totalTransactions: number;
  totalRevenue: number;
}

const Dashboard: React.FC = () => {
  // const { plazas } = useTollPlazas();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalTransactions: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get<DashboardData>('/api/dashboard');
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <Layout><div className="container mx-auto px-4 py-8">Loading...</div></Layout>;
  if (error) return <Layout><div className="container mx-auto px-4 py-8 text-red-500">Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransactionSummary 
            totalRevenue={dashboardData.totalRevenue} 
            totalTransactions={dashboardData.totalTransactions} 
          />
          {/* <ActivePlazas count={plazas.length} /> */}
        </div>
        <div className="mt-8">
          {/* <RevenueChart /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;