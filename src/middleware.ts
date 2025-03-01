import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
	'/',
	'/join-us',
	'/blog',
	'/pricing',
	'/about',
	'/login',
	'/registration',
];

const isPublicPath = (path: string) => {
	return publicPaths.some((publicPath) => {
		if (publicPath === path) return true;
		return path.startsWith(`${publicPath}/`);
	});
};

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (
		isPublicPath(pathname) ||
		pathname.startsWith('/_next/') ||
		pathname.includes('.')
	) {
		return NextResponse.next();
	}

	const authCookie = request.cookies.get('firebase-auth-token')?.value;

	if (!authCookie) {
		const redirectTo = encodeURIComponent(pathname);
		return NextResponse.redirect(
			new URL(`/login?returnUrl=${redirectTo}`, request.url)
		);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|_vercel|fonts|images|public|api).*)'],
};
