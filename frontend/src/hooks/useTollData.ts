import { useState, useEffect } from 'react';

interface TollData {
  plazaId: string;
  revenue: number;
  vehicleCount: number;
}

export const useTollData = (plazaId: string) => {
  const [tollData, setTollData] = useState<TollData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTollData = async () => {
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: TollData = {
          plazaId,
          revenue: Math.floor(Math.random() * 10000),
          vehicleCount: Math.floor(Math.random() * 1000),
        };
        setTollData(mockData);
      } catch (error) {
        console.error('Failed to fetch toll data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTollData();
  }, [plazaId]);
  
  return { tollData, loading };
};