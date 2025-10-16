import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer' | 'ward-coordinator' | 'social-media' | 'survey-team' | 'truth-team';
  avatar?: string;
  permissions: string[];
  ward?: string;
  constituency?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  isWorker: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'admin@bettroi.com', 
    role: 'admin',
    permissions: ['view_all', 'edit_all', 'manage_users', 'export_data', 'verify_submissions'],
    constituency: 'All'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'analyst@bettroi.com', 
    role: 'analyst',
    permissions: ['view_analytics', 'verify_submissions', 'export_data'],
    constituency: 'Central District'
  },
  { 
    id: '3', 
    name: 'Bob Wilson', 
    email: 'viewer@bettroi.com', 
    role: 'viewer',
    permissions: ['view_dashboard'],
    constituency: 'South District'
  },
  { 
    id: '4', 
    name: 'Priya Sharma', 
    email: 'coordinator@bettroi.com', 
    role: 'ward-coordinator',
    permissions: ['submit_data', 'view_ward_data', 'verify_local'],
    ward: 'Ward 15',
    constituency: 'North District'
  },
  { 
    id: '5', 
    name: 'Rahul Kumar', 
    email: 'social@bettroi.com', 
    role: 'social-media',
    permissions: ['submit_data', 'view_social_trends'],
    constituency: 'East District'
  },
  { 
    id: '6', 
    name: 'Anjali Patel', 
    email: 'survey@bettroi.com', 
    role: 'survey-team',
    permissions: ['submit_data', 'view_survey_results'],
    constituency: 'West District'
  },
  { 
    id: '7', 
    name: 'Vikram Singh', 
    email: 'truth@bettroi.com', 
    role: 'truth-team',
    permissions: ['submit_data', 'verify_submissions', 'view_alerts'],
    constituency: 'Central District'
  }
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [storedUser, setStoredUser] = useLocalStorage<User | null>('user', null);
  // Ensure user has permissions array even if loaded from corrupted localStorage
  const user = storedUser && storedUser.permissions ? storedUser : (storedUser ? { ...storedUser, permissions: [] } : null);
  const setUser = setStoredUser;
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) || user?.role === 'admin' || false;
  };

  const isWorker = (): boolean => {
    return ['ward-coordinator', 'social-media', 'survey-team', 'truth-team'].includes(user?.role || '');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    hasPermission,
    isWorker
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}