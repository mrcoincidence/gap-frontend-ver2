// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // ローカル開発環境（npm run dev）のときは認証をスキップしてそのまま通す
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Base64デコードしてユーザー名とパスワードを抽出
    const [user, pwd] = atob(authValue).split(':');

    // Vercelに設定する環境変数から取得（未設定時の予備値も指定可）
    const validUser = process.env.BASIC_AUTH_USER || 'gap';
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'secret2026';

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }

  // 認証が通っていない場合は401を返し、ブラウザの入力ポップアップを表示
  return new NextResponse('Authentication Required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// 静的リソース（CSS/JS/画像等）以外の全ページ・APIに適用
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};