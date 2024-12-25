import React from 'react';
import { Link } from 'react-router-dom';

interface TollPlaza {
  id: string;
  name: string;
  location: string;
  boothCount: number;
}

interface PlazaListProps {
  plazas: TollPlaza[];
  onRemove: (id: string) => void;
}

const PlazaList: React.FC<PlazaListProps> = ({ plazas, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {plazas.map((plaza) => (
          <li key={plaza.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                <Link to={`/toll-plazas/${plaza.id}`}>{plaza.name}</Link>
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {plaza.boothCount} booths
                </span>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  {plaza.location}
                </p>
              </div>
              <button
                onClick={() => onRemove(plaza.id)}
                className="mt-2 sm:mt-0 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlazaList;