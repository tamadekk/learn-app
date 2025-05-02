'use client';

import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import nookies from 'nookies';
import { auth } from '@/../firebase/clientApp';
import {
	COOKIE_NAME,
	COOKIE_MAX_AGE,
	TOKEN_REFRESH_INTERVAL,
} from '@/constants/constants';
import { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();

	const setCookie = useCallback(async (token: string) => {
		try {
			nookies.set(undefined, COOKIE_NAME, token, {
				maxAge: COOKIE_MAX_AGE,
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
			});
			return true;
		} catch (error) {
			console.error('Error setting auth cookie:', error);
			return false;
		}
	}, []);

	const clearCookie = useCallback(() => {
		try {
			nookies.destroy(undefined, COOKIE_NAME, { path: '/' });
			return true;
		} catch (error) {
			console.error('Error clearing auth cookie:', error);
			return false;
		}
	}, []);

	useEffect(() => {
		const syncToken = async () => {
			if (!user) {
				if (!loading) {
					clearCookie();
				}
				return;
			}

			try {
				const token = await user.getIdToken(true);
				await setCookie(token);
			} catch (error) {
				console.error('Error syncing auth token:', error);
				clearCookie();
			}
		};

		syncToken();
		const refreshInterval = setInterval(syncToken, TOKEN_REFRESH_INTERVAL);

		return () => clearInterval(refreshInterval);
	}, [user, loading, setCookie, clearCookie]);

	const logout = useCallback(async () => {
		try {
			await signOut(auth);
			clearCookie();
			router.push('/login');
		} catch (error) {
			console.error('Error during logout:', error);
			throw error;
		}
	}, [router, clearCookie]);

	const value: AuthContextType = {
		user: user || null,
		loading,
		error,
		logout,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const useIsAuthenticated = () => {
	const { isAuthenticated, loading } = useAuth();
	return { isAuthenticated, loading };
};
