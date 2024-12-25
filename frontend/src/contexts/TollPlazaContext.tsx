// src/contexts/TollPlazaContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface TollPlaza {
  id: string;
  name: string;
  location: string;
  boothCount: number;
}

interface TollPlazaContextType {
  plazas: TollPlaza[];
  addPlaza: (plaza: TollPlaza) => void;
  removePlaza: (id: string) => void;
}

const TollPlazaContext = createContext<TollPlazaContextType | undefined>(undefined);

export const useTollPlazas = () => {
  const context = useContext(TollPlazaContext);
  if (!context) {
    throw new Error('useTollPlazas must be used within a TollPlazaProvider');
  }
  return context;
};

export const TollPlazaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [plazas, setPlazas] = useState<TollPlaza[]>([]);

  useEffect(() => {
    const storedPlazas = localStorage.getItem('tollPlazas');
    if (storedPlazas) {
      setPlazas(JSON.parse(storedPlazas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tollPlazas', JSON.stringify(plazas));
  }, [plazas]);

  const addPlaza = (plaza: TollPlaza) => {
    setPlazas((prevPlazas) => [...prevPlazas, plaza]);
  };

  const removePlaza = (id: string) => {
    setPlazas((prevPlazas) => prevPlazas.filter((plaza) => plaza.id !== id));
  };

  return (
    <TollPlazaContext.Provider value={{ plazas, addPlaza, removePlaza }}>
      {children}
    </TollPlazaContext.Provider>
  );
};