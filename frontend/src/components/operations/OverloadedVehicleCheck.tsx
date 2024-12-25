import React, { useState } from 'react';

interface OverloadedVehicleCheckProps {
  onOverloadDetected: (additionalFee: number) => void;
}

const OverloadedVehicleCheck: React.FC<OverloadedVehicleCheckProps> = ({ onOverloadDetected }) => {
  const [weight, setWeight] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [overloadFee, setOverloadFee] = useState<number | null>(null);

  const checkOverload = () => {
    const weightNum = parseFloat(weight);
    let maxWeight = 0;
    let fee = 0;

    switch (vehicleType) {
      case 'car':
        maxWeight = 1500; // kg
        break;
      case 'lcv':
        maxWeight = 3500; // kg
        break;
      case 'truck':
        maxWeight = 12000; // kg
        break;
      default:
        maxWeight = 0;
    }

    if (weightNum > maxWeight) {
      const overloadPercentage = (weightNum - maxWeight) / maxWeight;
      fee = Math.round(overloadPercentage * 100) * 10; // ₹10 per 1% overload
      setOverloadFee(fee);
      onOverloadDetected(fee);
    } else {
      setOverloadFee(0);
      onOverloadDetected(0);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Overloaded Vehicle Check</h2>
      <div className="mb-4">
        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select vehicle type</option>
          <option value="car">Car</option>
          <option value="lcv">LCV</option>
          <option value="truck">Truck</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Vehicle Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter vehicle weight"
        />
      </div>
      <button
        onClick={checkOverload}
        disabled={!weight || !vehicleType}
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        Check for Overload
      </button>
      {overloadFee !== null && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded">
          <p>{overloadFee > 0 ? `Overload detected! Additional fee: ₹${overloadFee}` : 'No overload detected.'}</p>
        </div>
      )}
    </div>
  );
};

export default OverloadedVehicleCheck;