// src/services/auth.ts

import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials and try again.');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed. Please try again.');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch current user. Please log in again.');
  }
};

export const registerUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('User registration failed. Please try again.');
  }
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  try {
    await api.post('/auth/change-password', { oldPassword, newPassword });
  } catch (error) {
    throw new Error('Password change failed. Please check your current password and try again.');
  }
};

export const resetPasswordRequest = async (email: string): Promise<void> => {
  try {
    await api.post('/auth/reset-password-request', { email });
  } catch (error) {
    throw new Error('Password reset request failed. Please check your email and try again.');
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  try {
    await api.post('/auth/reset-password', { token, newPassword });
  } catch (error) {
    throw new Error('Password reset failed. Please try again or request a new reset link.');
  }
};