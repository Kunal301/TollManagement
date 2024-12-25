import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would check for an existing auth token
    // and validate it with the backend
    const checkAuth = async () => {
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = { id: '1', name: 'John Doe', role: 'Admin' };
        setUser(mockUser);
      } catch (error) {
        console.error('Auth check failed', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic here
    setUser({ id: '1', name: 'John Doe', role: 'Admin' });
  };

  const logout = () => {
    // Implement logout logic here
    setUser(null);
  };

  return { user, loading, login, logout };
};