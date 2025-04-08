import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const provider = searchParams.get('provider') || 'email';

  const response = NextResponse.json({ success: true });
  response.cookies.set('provider', provider, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false, // 꼭 있어야 함! JS에서 접근하려면
  });
  return response;
}
