'use client'


import React, { useState } from 'react';

import { ArrowLeft, Scale } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


interface VehicleType {
  id: string;
  name: string;
  description: string;
  baseRate: number;
}
interface VehicleEntry {
  vehicleNo: string
  vehicleType: string
  journeyType: string
  vehicleWeight: string
  price: number
  boothNo: string
}
const vehicleTypes: VehicleType[] = [
  { id: '1', name: 'Car', description: 'Standard 4-wheeler', baseRate: 100 },
  { id: '2', name: 'LCV', description: 'Light Commercial Vehicle', baseRate: 150 },
  { id: '3', name: 'Truck', description: 'Heavy goods vehicle', baseRate: 300 },
  { id: '4', name: 'Bus', description: 'Passenger bus', baseRate: 250 },
  { id: '5', name: 'Multi-axle', description: 'Multi-axle vehicle', baseRate: 400 },
];

interface VehicleClassificationProps {
  onClassify: (vehicleType: VehicleType) => void;
}

const VehicleClassification: React.FC<VehicleClassificationProps> = ({ onClassify }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const handleClassification = () => {
    const vehicle = vehicleTypes.find(v => v.id === selectedVehicle);
    if (vehicle) {
      onClassify(vehicle);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Vehicle Classification</h2>
      <div className="mb-4">
        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
          Select Vehicle Type
        </label>
        <select
          id="vehicleType"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a vehicle type</option>
          {vehicleTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} - {type.description}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleClassification}
        disabled={!selectedVehicle}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        Classify Vehicle
      </button>
    </div>
  );
};

export default VehicleClassification;