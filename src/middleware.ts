import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_ROUTES } from './constants/auth.constants';
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

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 알려진 페이지 경로 목록 (존재하는 페이지들)
  // 여기에 애플리케이션의 모든 유효한 경로를 추가해야 합니다
  const validPaths = [
    PATH.HOME,
    PATH.SIGNIN,
    PATH.SIGNUP,
    PATH.MYPLAN,
    PATH.SEARCH,
    PATH.COMMUNITY,
    PATH.FORGOT_PASSWORD,
    PATH.RESET_PASSWORD,
    PATH.CALLBACK,
    PATH.PLAN_NEW,
    PATH.ACCOUNT,
    PATH.BOOKMARKS,
    PATH.LIKES,
    PATH.COMMENTS,
    PATH.RESERVATIONS,
    PATH.TICKET,
    PATH.PLACES,
  ];

  // 유효한 경로 패턴을 더 세밀하게 정의
  // 동적 ID 경로의 경우, 유효한 ID 패턴을 정규식으로 정의
  // 예: 숫자로만 이루어진 ID만 허용
  const validPathPatterns = [
    {
      PLAN_DETAIL: PATH.PLAN_DETAIL,
      pattern: /^\/plan-detail\/\d+$/,
    },
    {
      CATEGORIES: PATH.CATEGORIES,
      pattern: /^\/categories\/[a-z]+$/,
    },
    {
      SEARCH: PATH.SEARCH,
      pattern: /^\/search\/[a-z]+$/,
    },
    {
      BOOKMARKS: PATH.BOOKMARKS,
      pattern: /^\/bookmarks\/[a-z]+$/,
    },
    {
      PLACES: PATH.PLACES,
      pattern: /^\/places\/\d+$/,
    },

    // 다른 경로들
  ];

  // 경로가 유효한지 확인
  const isValidPath =
    validPaths.some((path) => {
      if (path === '/') {
        return pathname === '/';
      }
      return pathname === path;
    }) ||
    validPathPatterns.some(({ PLAN_DETAIL, pattern }) => {
      if (pathname === PLAN_DETAIL) return true;
      if (pattern && pattern.test(pathname)) return true;
      return false;
    });

  // 경로가 유효하지 않으면 Next.js의 not-found로 처리
  if (!isValidPath) {
    // 미들웨어에서는 직접 notFound()를 호출할 수 없으므로,
    // 대신 404 페이지로 리다이렉트하거나 Next.js가 처리하도록 함
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  try {
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
          remove(name) {
            response.cookies.delete(name);
          },
        },
      },
    );

    // 세션 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    // 세션 오류 처리
    if (sessionError) {
      console.error('세션 확인 중 오류 발생:', sessionError);

      // 세션 오류가 발생한 경우에도 공개 페이지는 접근 가능하도록 함
      const isPublicPage = AUTH_ROUTES.PUBLIC_ROUTES.some((page) => {
        if (page === '/') return pathname === '/';
        return pathname.startsWith(page);
      });

      if (!isPublicPage) {
        // 보호된 페이지의 경우 로그인 페이지로 리다이렉트
        const url = request.nextUrl.clone();
        url.pathname = PATH.SIGNIN;
        url.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(url);
      }

      // 공개 페이지는 계속 진행
      return response;
    }

    // 공개 페이지 확인 (루트 경로 특별 처리)
    const isPublicPage = AUTH_ROUTES.PUBLIC_ROUTES.some((page) => {
      // 루트 경로('/')는 정확히 일치할 때만 true
      if (page === '/') {
        return pathname === '/';
      }
      // 다른 경로는 startsWith 사용
      return pathname.startsWith(page);
    });

    const isAuthPage = pathname === PATH.SIGNIN || pathname === PATH.SIGNUP;
    const isProtectedPage = pathname === PATH.PLAN_NEW || !isPublicPage;

    // 유효한 경로이면서 인증이 필요한 페이지에 로그인 없이 접근 시
    if (!session && isProtectedPage) {
      // 인증되지 않은 사용자가 보호된 경로에 접근, 로그인 페이지로 리다이렉트
      const url = request.nextUrl.clone();
      url.pathname = PATH.SIGNIN;
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    // 이미 인증된 사용자가 로그인/회원가입 페이지에 접근할 경우 처리
    if (session && isAuthPage) {
      // redirectTo 쿼리 파라미터가 있는지 확인
      const redirectTo = request.nextUrl.searchParams.get('redirectTo');

      if (redirectTo) {
        // redirectTo 파라미터가 있으면 해당 URL로 리다이렉트
        return NextResponse.redirect(new URL(redirectTo, request.url));
      } else {
        // redirectTo 파라미터가 없으면 기본적으로 홈으로 리다이렉트
        return NextResponse.redirect(new URL(PATH.HOME, request.url));
      }
    }

    if (pathname === PATH.BOOKMARKS) {
      return NextResponse.redirect(
        new URL(`${PATH.BOOKMARKS}/all`, request.url),
      );
    }

    return response;
  } catch (error) {
    console.error('미들웨어 실행 중 오류 발생:', error);

    // 오류 발생 시 기본적으로 응답 반환 (공개 페이지는 접근 가능하도록)
    return response;
  }
}

// 매처 패턴 - 미들웨어를 적용할 경로 지정
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
