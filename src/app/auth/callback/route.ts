import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const provider = searchParams.get('provider'); // provider 파라미터 읽기
  const redirectTo = searchParams.get('redirectTo') || '/';

  if (code) {
    const supabase = await getServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const vercelUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const baseUrl = isLocalEnv ? origin : vercelUrl;
      const redirectUrl = redirectTo.startsWith('/')
        ? `${baseUrl}${redirectTo}`
        : redirectTo;

      const response = NextResponse.redirect(redirectUrl);
      // provider가 있다면 쿠키에 저장
      if (provider) {
        // 7일간 유지하는 예시 (옵션은 필요에 따라 조정)
        response.cookies.set('provider', provider, {
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      return response;
    } else {
      console.error('Auth callback 에러:', error);
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
