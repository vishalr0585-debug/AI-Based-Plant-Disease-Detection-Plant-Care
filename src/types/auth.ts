export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'farmer' | 'researcher' | 'expert';
  location?: string;
  joinDate: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: 'farmer' | 'researcher' | 'expert';
  location?: string;
}