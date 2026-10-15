// components/Footer.tsx
'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import Footer01 from './Footer01';
import Footer02 from './Footer02';
import Footer03 from './Footer03';

export default function Footer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // ヘッダーと同じ条件で判定
  let version = 1;
  const vParam = searchParams.get('v');
  
  if (vParam === '2' || pathname.startsWith('/v2')) {
    version = 2;
  } else if (vParam === '3' || pathname.startsWith('/v3')) {
    version = 3;
  }

  return (
    <>
      {/* バージョンに応じたフッターの出し分け */}
      {version === 1 && <Footer01 />}
      {version === 2 && <Footer02 />}
      {version === 3 && <Footer03 />}
    </>
  );
}