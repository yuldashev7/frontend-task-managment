import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/app/config/i18n';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const localeMatch = pathname.match(
    new RegExp(`^/(${routing.locales.join('|')})`)
  );
  const currentLocale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  const pathWithoutLocale =
    pathname.replace(new RegExp(`^/(${routing.locales.join('|')})/?`), '/') ||
    '/';

  const isAdminArea = pathWithoutLocale.startsWith('/admin');
  const isUserArea = pathWithoutLocale.startsWith('/user');
  const isLogin = pathWithoutLocale.startsWith('/login');

  if (!token && !refreshToken && (isAdminArea || isUserArea)) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url)
    );
  }

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const userRole = decoded.role;

      if (isLogin) {
        const dashboardPath =
          userRole === 'PM' ? '/admin/dashboard' : '/user/dashboard';
        return NextResponse.redirect(
          new URL(`/${currentLocale}${dashboardPath}`, request.url)
        );
      }

      if (userRole !== 'PM' && isAdminArea) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/user/dashboard`, request.url)
        );
      }

      if (userRole === 'PM' && isUserArea) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/admin/dashboard`, request.url)
        );
      }
    } catch (error) {
      console.error('JWT DEKODLASHDA XATOLIK:', error);
      if (!refreshToken) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/login`, request.url)
        );
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(uz|en|ru)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
