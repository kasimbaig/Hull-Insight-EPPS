import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logoutUser } from '@/services/apiService';

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  hasPermission: (module: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app load
    const checkAuthStatus = async () => {
      try {
        const storedAuthData = localStorage.getItem('authData');
        console.log('Stored auth data:', storedAuthData);
        
        if (storedAuthData) {
          const authData = JSON.parse(storedAuthData);
          console.log('Parsed auth data:', authData);
          
          // Check if we have both user data and access token
          if (authData.access) {
            // First restore the token for API requests
            const { restoreTokenFromStorage } = await import('@/services/apiService');
            restoreTokenFromStorage();
            
            // Then set the user data
            if (authData.user) {
              setUser(authData.user);
            } else {
              // If no user data in authData, create a basic user from available data
              const userData = {
                id: authData.user_id || '1',
                username: authData.username || 'user',
                email: authData.email || 'user@navy.mil',
                firstName: authData.first_name || 'Naval',
                lastName: authData.last_name || 'Officer',
                role: authData.role || 'Administrator',
                permissions: authData.permissions || ['all']
              };
              setUser(userData);
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('authData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // The token is already set in localStorage by the loginUser function in apiService
    // We just need to ensure the API client has the token
    import('@/services/apiService').then(({ restoreTokenFromStorage }) => {
      restoreTokenFromStorage();
    });
  };

  const logout = async () => {
    try {
      // Call logout API if user exists
      if (user?.id) {
        await logoutUser(parseInt(user.id));
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      localStorage.removeItem('authData');
      localStorage.removeItem('rememberMe');
    }
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    
    // For now, return true for all permissions
    // In a real app, you would check against user.permissions array
    return true;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
