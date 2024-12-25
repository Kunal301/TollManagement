import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import RevenueReport from '../components/Reports/RevenueReport';
import TransactionReport from '../components/Reports/TransactionReport';
// import AuditLog from '../components/Reports/AuditLog'

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'revenue' | 'transactions' | 'audit'>('revenue');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`${
                  activeTab === 'revenue'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('revenue')}
              >
                Revenue
              </button>
              <button
                className={`${
                  activeTab === 'transactions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
              </button>
              {/* <button
                className={`${
                  activeTab === 'audit'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`}
                onClick={() => setActiveTab('audit')}
              >
                Audit Log
              </button> */}
            </nav>
          </div>
        </div>
        {activeTab === 'revenue' && <RevenueReport />}
        {activeTab === 'transactions' && <TransactionReport />}
        {/* {activeTab === 'audit' && <AuditLog />} */}
      </div>
    </Layout>
  );
};

export default Reports;