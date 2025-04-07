import { getServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  // if "redirectTo" is in param, use it as the redirect URL
  // otherwise fallback to "next" param, or default to home
  const redirectTo =
    searchParams.get('redirectTo') || searchParams.get('next') || '/';

  if (code) {
    const supabase = await getServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const vercelUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const baseUrl = isLocalEnv ? origin : vercelUrl;

      // 상대 경로인 경우 baseUrl과 결합
      const redirectUrl = redirectTo.startsWith('/')
        ? `${baseUrl}${redirectTo}`
        : redirectTo;

      return NextResponse.redirect(redirectUrl);
    } else {
      console.error('Auth callback 에러:', error);
    }
  }

  // 오류 발생 시 홈으로 리다이렉트 (오류 페이지 대신)
  return NextResponse.redirect(`${origin}/`);
}
