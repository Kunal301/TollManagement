import React, { useState } from 'react';

interface FASTagPaymentProps {
  onPaymentComplete: (transactionId: string) => void;
}

const FASTagPayment: React.FC<FASTagPaymentProps> = ({ onPaymentComplete }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // In a real application, this would be an API call to process the FASTag payment
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
      const mockTransactionId = 'FT' + Math.random().toString(36).substr(2, 9);
      onPaymentComplete(mockTransactionId);
    } catch (err) {
      setError('Failed to process FASTag payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">FASTag Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            placeholder="Enter vehicle number"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process FASTag Payment'}
        </button>
      </form>
    </div>
  );
};

export default FASTagPayment;