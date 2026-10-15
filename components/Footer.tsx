// components/Footer.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Footer01 from './Footer01';
import Footer02 from './Footer02';
import Footer03 from './Footer03';

function FooterSwitcher() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let version = 1;
  const vParam = searchParams.get('v');
  if (vParam === '2' || pathname.startsWith('/v2')) {
    version = 2;
  } else if (vParam === '3' || pathname.startsWith('/v3')) {
    version = 3;
  }

  return (
    <>
      {version === 1 && <Footer01 />}
      {version === 2 && <Footer02 />}
      {version === 3 && <Footer03 />}
    </>
  );
}

export default function Footer() {
  return (
    <Suspense fallback={<Footer01 />}>
      <FooterSwitcher />
    </Suspense>
  );
}