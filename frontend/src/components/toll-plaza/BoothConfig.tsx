import React, { useState } from 'react';

interface Booth {
  id: string;
  name: string;
  operator: string;
}

const BoothConfig: React.FC = () => {
  const [booths, setBooths] = useState<Booth[]>([
    { id: '1', name: 'Booth 1', operator: 'John Doe' },
    { id: '2', name: 'Booth 2', operator: 'Jane Smith' },
  ]);

  const [newBooth, setNewBooth] = useState<Omit<Booth, 'id'>>({ name: '', operator: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBooth(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBooth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = (booths.length + 1).toString();
    setBooths(prev => [...prev, { ...newBooth, id }]);
    setNewBooth({ name: '', operator: '' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Booth Configuration</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage booth details and operators</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {booths.map((booth) => (
            <li key={booth.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{booth.name}</p>
                <p className="text-sm text-gray-500">{booth.operator}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAddBooth} className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newBooth.name}
            onChange={handleInputChange}
            placeholder="Booth Name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="operator"
            value={newBooth.operator}
            onChange={handleInputChange}
            placeholder="Operator Name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Booth
        </button>
      </form>
    </div>
  );
};

export default BoothConfig;