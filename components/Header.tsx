// components/Header.tsx
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Header01 from './Header01';
import Header02 from './Header02';
import Header03 from './Header03';

interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome = false }: HeaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // クエリパラメータ (?v=1, 2, 3) またはパス (/v2, /v3) からバージョンを判定
  let version = 1;
  const vParam = searchParams.get('v');
  
  if (vParam === '2' || pathname.startsWith('/v2')) {
    version = 2;
  } else if (vParam === '3' || pathname.startsWith('/v3')) {
    version = 3;
  }

  // プレゼン用: トグルボタンを押すたびに 1 → 2 → 3 → 1 と切り替える
  const toggleVersion = () => {
    const params = new URLSearchParams(searchParams.toString());
    const nextVersion = version === 3 ? 1 : version + 1;
    
    if (nextVersion === 1) {
      params.delete('v');
    } else {
      params.set('v', nextVersion.toString());
    }
    
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <>
      {/* バージョンに応じたヘッダーの出し分け（isHomeを渡す） */}
      {version === 1 && <Header01 isHome={isHome} />}
      {version === 2 && <Header02 isHome={isHome} />}
      {version === 3 && <Header03 isHome={isHome} />}

      {/* プレゼン用: 画面右下に小さく浮く切り替えトグルボタン */}
      <div className="fixed bottom-16 right-16 z-50">
        <button
          onClick={toggleVersion}
          className="bg-black/80 hover:bg-black text-white text-[12px] font-bold px-12 py-8 rounded-full shadow-lg border border-white/20 backdrop-blur-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-6"
        >
          <span 
            className={`w-8 h-8 rounded-full inline-block ${
              version === 1 ? 'bg-green-400' : version === 2 ? 'bg-blue-400' : 'bg-yellow-400'
            }`} 
          />
          <span className="w-[100px] text-left">表示中: Ver.{version}</span>
          <span className="text-[10px] opacity-70 underline bg-white/20 px-6 py-2 rounded-full">切替</span>
        </button>
      </div>
    </>
  );
}