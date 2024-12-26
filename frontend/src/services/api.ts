import axios,{ AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://tollmanagement-a7vi.onrender.com';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL || 'https://tollmanagement-a7vi.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},(error) => {
  return Promise.reject(error);
});

export default api;