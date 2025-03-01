'use client';

import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import nookies from 'nookies';

const publicPaths = ['/', '/login', '/registration', '/forgot-password'];

type AuthContextType = {
	user: any;
	loading: boolean;
	error: Error | undefined;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	error: undefined,
	logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, loading, error] = useAuthState(auth);
	const [authChecked, setAuthChecked] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	useEffect(() => {
		const isPublicPath = publicPaths.some(
			(path) => pathname === path || pathname?.startsWith(`${path}/`)
		);

		if (!isPublicPath && !loading && !user && authChecked) {
			console.log({ isPublicPath, user, authChecked });
			router.push(`/login?returnUrl=${encodeURIComponent(pathname || '/')}`);
		}
		if (!loading && !authChecked) {
			setAuthChecked(true);
		}
	}, [user, loading, router, pathname, authChecked]);

	useEffect(() => {
		const syncToken = async () => {
			if (user) {
				try {
					const token = await user.getIdToken();

					nookies.set(undefined, 'firebase-auth-token', token, {
						maxAge: 30 * 24 * 60 * 60, // 30 days
						path: '/',
						secure: process.env.NODE_ENV === 'production',
						sameSite: 'strict',
					});
				} catch (error) {
					console.error('Error getting auth token:', error);
				}
			} else if (!loading) {
				nookies.destroy(undefined, 'firebase-auth-token', { path: '/' });
			}
		};

		syncToken();

		const refreshInterval = setInterval(syncToken, 10 * 60 * 1000); // every 10 minutes

		return () => clearInterval(refreshInterval);
	}, [user, loading]);

	const logout = async () => {
		try {
			await signOut(auth);
			nookies.destroy(undefined, 'firebase-auth-token', { path: '/' });
			router.push('/login');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, error, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export const useIsAuthenticated = () => {
	const { user, loading } = useAuth();
	return { isAuthenticated: !!user, loading };
};
