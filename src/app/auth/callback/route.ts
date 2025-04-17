import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/constants/auth.constants';
import { PATH } from '@/constants/path.constants';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const provider = searchParams.get('provider'); // provider 파라미터 읽기
  const redirectTo = searchParams.get('redirectTo') || PATH.HOME;

  if (code) {
    const supabase = await getServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const vercelUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const baseUrl = isLocalEnv ? origin : vercelUrl;
      const redirectUrl = redirectTo.startsWith(PATH.HOME)
        ? `${baseUrl}${redirectTo}`
        : redirectTo;

      // 프로바이더 정보를 쿠키에 저장
      const response = NextResponse.redirect(redirectUrl);
      if (provider) {
        response.cookies.set('provider', provider, {
          maxAge: 60 * 60 * 24 * 7, // 7일간 유지
          path: PATH.HOME,
          httpOnly: false, // JavaScript에서 접근 가능하도록
        });
      }

      return response;
    } else {
      console.error('Auth callback 에러:', error);
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
