import { updateSession } from '@/lib/supabase/middleware';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * 인증 상태를 확인하고 접근 제어를 수행하는 미들웨어
 * @param request - 요청 객체
 * @returns 응답 객체
 */
export async function middleware(request: NextRequest) {
  // 정적 리소스 및 API 요청은 바로 통과
  if (isStaticResource(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Supabase 인증 세션 갱신 및 쿠키 처리
  const response = await updateSession(request);

  // 중복 확인을 피하기 위해 pathname에서 trailing slash 제거
  const pathname = request.nextUrl.pathname.replace(/\/$/, '');

  // 공개 페이지와 보호된 페이지 구분
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';
  const isPublicPage = isPublicRoute(pathname);
  const isHomePage = pathname === '' || pathname === '/';

  // URL에서 인증 토큰 정보 추출
  const authToken = request.cookies.get('sb-access-token');
  const refreshToken = request.cookies.get('sb-refresh-token');
  const hasAuthTokens = !!authToken || !!refreshToken;

  // 인증 상태가 아니고, 보호된 페이지에 접근하려는 경우 로그인 페이지로 리다이렉트
  if (!hasAuthTokens && !isPublicPage && !isHomePage) {
    const redirectUrl = new URL('/sign-in', request.nextUrl.origin);
    // 원래 접근하려던 경로를 redirectTo 파라미터로 전달
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 이미 인증된 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (hasAuthTokens && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  return response;
}

/**
 * 정적 리소스 경로인지 확인하는 함수
 * @param pathname - 요청 경로
 * @returns 정적 리소스 여부
 */
function isStaticResource(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|gif|webp|js|css|woff|woff2)$/) !==
      null
  );
}

/**
 * 공개 접근 가능한 경로인지 확인하는 함수
 * @param pathname - 요청 경로
 * @returns 공개 경로 여부
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
 * 미들웨어가 적용될 경로 패턴 설정
 */
export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청에 미들웨어 적용:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - 이미지 파일들
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
