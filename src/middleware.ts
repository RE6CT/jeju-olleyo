import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { PATH } from './constants/path.constants';

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

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set(name, value, options);
        },
        remove(name, options) {
          response.cookies.delete(name);
        },
      },
    },
  );

  // 세션 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 공개 페이지 목록
  const publicPages = [
    PATH.HOME,
    PATH.SIGNIN,
    PATH.FORGOT_PASSWORD,
    PATH.RESET_PASSWORD,
    PATH.CALLBACK,
  ];

  const isPublicPage = publicPages.some((page) => pathname.startsWith(page));
  const isHomePage = pathname === PATH.HOME;
  const isAuthPage = pathname === PATH.SIGNIN || pathname === PATH.SIGNUP;

  // 인증 체크
  if (!session && !isPublicPage && !isHomePage) {
    // 인증되지 않은 사용자가 보호된 경로에 접근, 로그인 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = PATH.SIGNIN;
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // 이미 인증된 사용자가 로그인/회원가입 페이지에 접근할 경우 홈으로 리다이렉트
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(PATH.HOME, request.url));
  }

  return response;
}

// 매처 패턴 - 미들웨어를 적용할 경로 지정
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
