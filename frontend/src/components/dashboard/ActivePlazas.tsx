// src/components/dashboard/ActivePlazas.tsx

import React from 'react';

interface ActivePlazasProps {
  count: number;
}

const ActivePlazas: React.FC<ActivePlazasProps> = ({ count }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Active Plazas</h3>
      <p className="text-sm text-gray-600 mb-4">Number of Active Plazas today</p>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};

export default ActivePlazas;