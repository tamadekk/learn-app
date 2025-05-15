import { User } from 'firebase/auth';

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	error: Error | undefined;
	logout: () => Promise<void>;
	isAuthenticated: boolean;
}

export interface AuthOperationResult {
	success: boolean;
	error?: string;
}

export type LoginResult = AuthOperationResult;
export type RegistrationResponse = AuthOperationResult;
