import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { authService } from '@/services/auth';

// Define User type based on backend response
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'doctor' | 'receptionist' | 'patient';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('hms_token');
      const storedUser = localStorage.getItem('hms_user');

      if (token && storedUser) {
        try {
          // Verify token by fetching profile
          // This ensures the token is still valid
          const profile = await authService.getProfile();
          setUser(profile);
          // Update stored user data
          localStorage.setItem('hms_user', JSON.stringify(profile));
        } catch (error: any) {
          // If token is invalid (401), clear storage
          if (error.response && error.response.status === 401) {
            console.error('Auth initialization failed: Token expired or invalid', error);
            logout();
          } else {
            // If it's another error (e.g. network), keep the user logged in with stored data
            // but maybe show a warning or retry
            console.warn('Auth initialization warning: Could not verify token, using stored user data', error);
            setUser(JSON.parse(storedUser));
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (data: any) => {
    // Store tokens and user data
    localStorage.setItem('hms_token', data.access);
    localStorage.setItem('hms_refresh_token', data.refresh);
    localStorage.setItem('hms_user', JSON.stringify(data.user));

    setUser(data.user);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hms_token');
    localStorage.removeItem('hms_refresh_token');
    localStorage.removeItem('hms_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRequireAuth = (allowedRoles?: string[]) => {
  const { user, isAuthenticated } = useAuth();

  const hasAccess = isAuthenticated && (!allowedRoles || (user && allowedRoles.includes(user.role)));

  return { user, isAuthenticated, hasAccess };
};
