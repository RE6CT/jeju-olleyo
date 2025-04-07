// src/middleware.ts
import { updateSession } from '@/lib/supabase/middleware';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * 인증 상태를 확인하고 접근 제어를 수행하는 미들웨어
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 리소스 및 API 요청은 바로 통과
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|js|css|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // Supabase 인증 세션 갱신 및 쿠키 처리
  const response = await updateSession(request);

  // 중복 확인을 피하기 위해 pathname에서 trailing slash 제거
  const cleanPath = pathname.replace(/\/$/, '');

  // 공개 페이지와 보호된 페이지 구분
  const isAuthPage = cleanPath === '/sign-in' || cleanPath === '/sign-up';
  const isPublicPage = isPublicRoute(cleanPath);
  const isHomePage = cleanPath === '' || cleanPath === '/';

  // URL에서 인증 토큰 정보 추출
  const authToken = request.cookies.get('sb-bgznxwfpnvskfzsiisrn-auth-token.0');
  const refreshToken = request.cookies.get(
    'sb-bgznxwfpnvskfzsiisrn-auth-token.1',
  );
  const hasAuthTokens = !!authToken || !!refreshToken;

  // 인증 상태가 아니고, 보호된 페이지에 접근하려는 경우 로그인 페이지로 리다이렉트
  if (!hasAuthTokens && !isPublicPage && !isHomePage) {
    const redirectUrl = new URL('/sign-in', request.nextUrl.origin);
    // 원래 접근하려던 경로를 redirectTo 파라미터로 전달
    redirectUrl.searchParams.set('redirectTo', cleanPath);
    return NextResponse.redirect(redirectUrl);
  }

  // 이미 인증된 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (hasAuthTokens && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  return response;
}

/**
 * 공개 접근 가능한 경로인지 확인하는 함수
 */
function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/auth/callback',
  ];

  return publicRoutes.some((route) => pathname.startsWith(route));
}

/**
 * 매우 간단한 matcher 패턴 사용
 */
export const config = {
  matcher: [
    '/(.*)', // 모든 요청에 미들웨어 적용
  ],
};
