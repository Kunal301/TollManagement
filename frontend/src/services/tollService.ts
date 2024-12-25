import api from './api';

export interface TollPlaza {
  id: string;
  name: string;
  location: string;
  boothCount: number;
}

export const getTollPlazas = async (): Promise<TollPlaza[]> => {
  const response = await api.get('/toll-plazas');
  return response.data;
};

export const createTollPlaza = async (plazaData: Omit<TollPlaza, 'id'>): Promise<TollPlaza> => {
  const response = await api.post('/toll-plazas', plazaData);
  return response.data;
};

export const updateTollPlaza = async (id: string, plazaData: Partial<TollPlaza>): Promise<TollPlaza> => {
  const response = await api.put(`/toll-plazas/${id}`, plazaData);
  return response.data;
};

export const deleteTollPlaza = async (id: string): Promise<void> => {
  await api.delete(`/toll-plazas/${id}`);
};