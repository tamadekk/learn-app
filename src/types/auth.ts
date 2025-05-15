import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | undefined;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

export interface RegistrationResponse {
  success: boolean;
  error?: string;
}
