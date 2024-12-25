import React, { useEffect } from 'react';
import Layout from '../components/common/Layout';
import PlazaList from '../components/toll-plaza/PlazaList';
import PlazaForm from '../components/toll-plaza/PlazaForm';
import { useTollPlazas } from '../contexts/TollPlazaContext';

interface TollPlaza {
  id: string;
  name: string;
  location: string;
  boothCount: number;
}

const TollPlazaManagement: React.FC = () => {
  const { plazas, addPlaza, removePlaza } = useTollPlazas();

  useEffect(() => {
    // Simulating API call to fetch existing plazas
    const fetchPlazas = async () => {
      const mockPlazas: TollPlaza[] = [
        { id: '1', name: 'Plaza A', location: 'NH-1, KM 50', boothCount: 4 },
        { id: '2', name: 'Plaza B', location: 'NH-2, KM 100', boothCount: 6 },
      ];
      mockPlazas.forEach(plaza => addPlaza(plaza));
    };

    if (plazas.length === 0) {
      fetchPlazas();
    }
  }, [addPlaza, plazas.length]);

  const handleAddPlaza = (newPlaza: Omit<TollPlaza, 'id'>) => {
    const addedPlaza: TollPlaza = {
      ...newPlaza,
      id: Date.now().toString(), // Generate a mock ID
    };

    addPlaza(addedPlaza);
  };

  const handleRemovePlaza = (id: string) => {
    // Simulating API call to remove a plaza
    removePlaza(id);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Toll Plaza Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Add New Plaza</h2>
            <PlazaForm onSubmit={handleAddPlaza} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Existing Plazas</h2>
            <PlazaList plazas={plazas} onRemove={handleRemovePlaza} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TollPlazaManagement;