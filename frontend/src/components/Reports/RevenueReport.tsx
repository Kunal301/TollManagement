import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface RevenueData {
  byVehicleType: {
    [key: string]: number;
  };
  byBooth: {
    _id: string;
    total: number;
  }[];
  total: number;
}

export default function RevenueReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    if (from && to) {
      setFromDate(from);
      setToDate(to);
      fetchRevenueData(from, to);
    }
  }, [location]);

  const fetchRevenueData = async (start: string, end: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/transactions/revenue', {
        params: { startDate: start, endDate: end }
      });
      setRevenueData(response.data);
    } catch (err) {
      setError('Failed to fetch revenue data');
      console.error('Error fetching revenue data:', err);
    }
    setIsLoading(false);
  };

  const handleDateChange = () => {
    if (fromDate && toDate) {
      navigate(`/revenue-report?from=${fromDate}&to=${toDate}`);
      fetchRevenueData(fromDate, toDate);
    } else {
      alert('Please select both From and To dates');
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="bg-white px-4 py-3 flex items-center gap-4 shadow mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Revenue Report</h1>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">From:</span>
          <input
            type="datetime-local"
            className="border rounded-lg px-3 py-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">To:</span>
          <input
            type="datetime-local"
            className="border rounded-lg px-3 py-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleDateChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update
        </button>
      </div>

      {revenueData && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Vehicle Type</th>
                  <th className="px-4 py-3 text-left">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(revenueData.byVehicleType).map(([type, amount]) => (
                  <tr key={type} className="border-b">
                    <td className="px-4 py-3">{type}</td>
                    <td className="px-4 py-3">₹{amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3">₹{revenueData.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Booth</th>
                  <th className="px-4 py-3 text-left">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.byBooth.map((booth) => (
                  <tr key={booth._id} className="border-b">
                    <td className="px-4 py-3">{booth._id}</td>
                    <td className="px-4 py-3">₹{booth.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}