import React, { createContext, useContext, useState, useEffect } from 'react';
import { localAPI, type User } from '@/lib/localStorageAPI';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => User;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = localAPI.getCurrentUserData();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = (email: string, name: string): User => {
    const loggedInUser = localAPI.login(email, name);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    localAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}