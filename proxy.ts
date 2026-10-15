// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  // ローカル開発環境（npm run dev）のときは認証をスキップ
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.BASIC_AUTH_USER || 'gap';
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'secret2026';

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication Required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// 静的アセット以外の全ルートに適用
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};