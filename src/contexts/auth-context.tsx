'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FitnessAPI } from '@/lib/api/fitness-api';

type User = {
  jwt: string;
  accountType?: string;
};

type AuthContextType = {
  user: User | null;
  login: (jwt: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Load user from localStorage on startup
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setUser({ jwt: token });
    }
  }, []);

  const login = (jwt: string) => {
    const userData = { jwt };
    setUser(userData);
    localStorage.setItem('jwt', jwt);
    
    // Redirect based on user type (you'll need to decode the JWT to get the role)
    router.push('/dashboard/trainer/programs');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};