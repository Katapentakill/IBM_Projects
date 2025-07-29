// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCurrentUser, logoutUser as apiLogout } from '@/lib/api';

type User = {
  id: string;
  email: string;
  name?: string;
  token: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (userData: User & { token: string }) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          // En una app real, verificaríamos el token almacenado
          setUser({
            ...currentUser,
            token: localStorage.getItem('token') || 'mock-token'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData: User & { token: string }) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};