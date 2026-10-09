// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  MapPin, 
  HelpCircle, 
  ChevronRight,
  Package,
  User
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // プロモーション Carousel 用コンテンツ
  const announcements = [
    {
      text: "表示価格より2点で30％OFF 3点以上で40％OFF",
      linkText: "詳しくはこちら",
      href: "#"
    },
    {
      text: "税込5,000円以上のご注文で送料無料",
      linkText: "詳細はこちら",
      href: "#"
    },
    {
      text: "新規会員登録で1,000ポイントプレゼント",
      linkText: "会員登録はこちら",
      href: "#"
    }
  ];
  const [announceIndex, setAnnounceIndex] = useState(0);

  // 3秒ごとに自動スライド・ループ処理
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  // スクロール状態の検知
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextAnnounce = () => {
    setAnnounceIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
  };

  const categories = ['メンズ', 'ウィメンズ', 'キッズ', '小物', 'GapX'];

  // スクロール状態に応じたテキスト・アイコンカラー
  const navTextColor = isScrolled ? 'text-gap-dark hover:text-gap-navy' : 'text-white hover:opacity-80';
  const logoFill = isScrolled ? '#000000' : '#ffffff';

  return (
    <>
      {/* 左から右へ移動するスライドアニメーション用CSS */}
      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-right {
          animation: slideRight 0.4s ease-out forwards;
        }
      `}</style>

      {/* =========================================================
         1. Top Bar (GAP Navy背景)
         ========================================================= */}
      <div className="bg-gap-navy text-white py-2 px-12 md:px-16 lg:px-24 w-full font-sans relative z-50">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-11 md:text-12">
          
          {/* 左側: プロモーションメッセージ ＋ 右矢印（＞） */}
          <div className="flex items-center gap-6 overflow-hidden">
            <div className="relative overflow-hidden h-18 flex items-center">
              <div 
                key={announceIndex} 
                className="font-bold tracking-wider animate-slide-right flex items-center gap-6 whitespace-nowrap"
              >
                <span>{announcements[announceIndex].text}</span>
                <a 
                  href={announcements[announceIndex].href} 
                  style={{ textDecoration: 'underline' }}
                  className="!text-white hover:opacity-80 transition-opacity text-11 font-medium whitespace-nowrap"
                >
                  {announcements[announceIndex].linkText}
                </a>
              </div>
            </div>

            <button 
              onClick={nextAnnounce} 
              className="p-1 text-white hover:opacity-70 transition-opacity flex-shrink-0" 
              aria-label="次へ"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* 右側: 店舗検索・ヘルプ・ログイン */}
          <div className="hidden lg:flex items-center gap-20 text-white flex-shrink-0">
            <Link href="#" className="flex items-center gap-4 hover:opacity-80 text-white">
              <MapPin size={14} />
              <span>店舗検索</span>
            </Link>
            <Link href="#" className="flex items-center gap-4 hover:opacity-80 text-white">
              <HelpCircle size={14} />
              <span>ヘルプ</span>
            </Link>
            <Link href="#" className="flex items-center gap-4 font-medium text-white hover:opacity-80">
              <User size={14} />
              <span>ログイン</span>
            </Link>
          </div>

        </div>
      </div>

      {/* =========================================================
         2. Main Bar (Sticky Header: 正確な16px余白とマイナスマージン計算)
         ========================================================= */}
      <div className={`sticky top-0 w-full z-50 transition-all duration-300 font-sans ${
        isScrolled 
          ? 'bg-white py-3 shadow-md border-b border-gap-border mb-0' 
          : 'bg-transparent pt-[16px] pb-[16px] -mb-[76px] md:-mb-[86px]'
      }`}>
        <div className="max-w-[1600px] mx-auto px-12 md:px-16 lg:px-24 flex items-center justify-between">
          
          {/* 左寄せ: GAP ロゴ */}
          <div className="flex-shrink-0 flex items-center pr-8 md:pr-24">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity" aria-label="GAP ホーム">
              <svg 
                className={`transition-all duration-200 w-auto ${
                  isScrolled ? 'h-[28px] md:h-[32px]' : 'h-[44px] md:h-[54px]'
                }`} 
                viewBox="0 0 104 78" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M44.5482 42.163L48.2103 11.4375L52.3532 42.163H44.5482ZM62.6332 72.2933V72.3505L53.7891 0.76413H47.8605L39.2653 71.604C38.7576 74.1496 38.4986 75.7065 34.46 75.7771V77.0853H44.9114V75.7771C41.9522 75.7771 40.6138 74.0722 40.9097 72.2462L44.3935 43.5115H52.5213L56.18 73.208C56.18 74.9902 55.9883 75.6426 53.8261 75.7805H52.7937V77.0886H66.7222V75.7805H66.3523C65.877 75.8059 65.4014 75.735 64.9542 75.5719C64.507 75.4088 64.0974 75.157 63.75 74.8316C63.4025 74.5062 63.1245 74.1138 62.9326 73.6782C62.7406 73.2426 62.6388 72.7727 62.6332 72.2967" fill={logoFill}/>
                <path d="M18.7829 1.76296C18.7829 2.99037 17.9994 2.89285 17.3672 2.50277C15.1416 1.00071 12.5411 0.149396 9.85816 0.0445921C8.56315 -0.0850542 7.25543 0.0688158 6.02588 0.495511C4.79633 0.922206 3.67442 1.61149 2.73811 2.51548C1.8018 3.41947 1.07355 4.51648 0.603941 5.7303C0.134334 6.94411 -0.0653591 8.24561 0.0187349 9.54438V66.2573C0.0927155 76.1101 5.3218 77.9395 10.4702 78C13.1668 77.8546 15.773 76.9781 18.0095 75.4645C18.867 75.1282 19.8086 75.9151 19.8086 77.3712H21.4731V43.5318H24.8359V42.1261H10.7123V43.5318H14.7846V72.3438C14.8021 72.9143 14.7053 73.4824 14.4999 74.0148C14.2945 74.5472 13.9846 75.0331 13.5885 75.444C13.1924 75.8548 12.7181 76.1822 12.1935 76.4069C11.669 76.6316 11.1047 76.7491 10.5341 76.7524C9.9768 76.7339 9.42878 76.6047 8.92198 76.3721C8.41519 76.1396 7.95976 75.8086 7.58227 75.3982C7.20477 74.9878 6.91276 74.5064 6.72327 73.982C6.53378 73.4576 6.4506 72.9007 6.47859 72.3438V7.29469C6.47859 5.52925 6.8384 1.40651 9.84135 1.43341C12.3197 1.43341 14.0482 3.71336 14.8485 7.1501C15.7216 12.4428 16.177 17.796 16.2104 23.1602C16.2104 24.401 16.6711 24.8247 18.0263 24.8247H20.6425V0.717143H18.7829V1.76296Z" fill={logoFill}/>
                <path d="M88.7388 39.3081V1.99157H92.2327C92.8732 1.99055 93.5074 2.11741 94.0983 2.36471C94.6891 2.612 95.2246 2.97476 95.6734 3.43172C96.1222 3.88868 96.4753 4.43064 96.712 5.02582C96.9486 5.62101 97.0641 6.25745 97.0515 6.89783V37.4989C97.0885 38.0997 96.9986 38.7015 96.7877 39.2653C96.5768 39.8291 96.2497 40.3422 95.8276 40.7713C95.4054 41.2004 94.8978 41.5359 94.3376 41.756C93.7773 41.9761 93.1771 42.0758 92.5757 42.0487H88.7388V39.3081ZM92.2596 0.780975H78.3579V1.99157H82.0132V73.6183C81.9292 75.1685 81.3407 75.7166 79.0977 75.8041H78.3579V77.1088H94.0115V75.8041H92.3672C89.7409 75.7133 88.7724 74.6473 88.7219 72.3774V43.5754H93.2819C99.9166 43.5754 103.706 40.3976 103.706 36.1404V8.85159C103.706 4.5977 100.451 0.780975 92.2495 0.780975" fill={logoFill}/>
              </svg>
            </Link>
          </div>

          {/* 中央寄せ: カテゴリーメニュー */}
          <nav className="hidden lg:flex items-center gap-28 font-bold text-15 px-16">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href="#" 
                className={`transition-colors py-2 ${navTextColor}`}
              >
                {cat}
              </Link>
            ))}
          </nav>

          {/* 右寄せ: 検索 ＆ アイコンエリア */}
          <div className="flex items-center gap-2 sm:gap-6 md:gap-12 pl-0 md:pl-24 flex-shrink-0">
            <div className="hidden md:flex items-center relative w-[160px] lg:w-[200px]">
              <input 
                type="search" 
                placeholder="検索" 
                className={`w-full rounded-full py-4 pl-14 pr-32 text-12 focus:outline-none transition-all ${
                  isScrolled 
                    ? 'bg-gap-gray border border-gap-border-dark text-gap-dark placeholder:text-gap-muted focus:border-gap-navy' 
                    : 'bg-white/20 border border-white/40 text-white placeholder:text-white/80 focus:bg-white/30 focus:border-white'
                }`}
              />
              <Search size={15} className={`absolute right-10 ${isScrolled ? 'text-gap-muted' : 'text-white/80'}`} />
            </div>

            <button className={`md:hidden p-1.5 transition-colors ${navTextColor}`} aria-label="検索">
              <Search size={20} />
            </button>

            <Link href="#" className={`p-1.5 transition-colors ${navTextColor}`} aria-label="お気に入り">
              <Heart size={20} />
            </Link>

            <Link href="#" className={`relative flex items-center justify-center p-1.5 transition-colors ${navTextColor}`} aria-label="カート">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-gap-red text-white text-[9px] font-bold rounded-full h-14 min-w-[14px] px-2 flex items-center justify-center border border-white leading-none">
                0
              </span>
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 transition-colors flex-shrink-0 ${navTextColor}`}
              aria-label="メニュー開閉"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================
         3. Mobile Hamburger Drawer Menu
         ========================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-white z-50 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200 font-sans">
          <div className="p-20">
            <p className="text-12 font-bold text-gap-muted mb-12 uppercase tracking-wider">カテゴリー</p>
            <ul className="space-y-16">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link 
                    href="#" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-20 font-bold text-gap-dark"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gap-gray p-20 border-t border-gap-border space-y-12">
            <Link 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="primary-btn w-full text-center block"
            >
              ログイン / 新規会員登録
            </Link>

            <div className="grid grid-cols-2 gap-12 text-13 font-medium text-gap-dark pt-8">
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-8 py-8 border-b border-gap-border">
                <HelpCircle size={16} /> ヘルプ＆ガイド
              </Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-8 py-8 border-b border-gap-border">
                <ShoppingBag size={16} /> カート
              </Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-8 py-8 border-b border-gap-border">
                <Package size={16} /> 注文履歴
              </Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-8 py-8 border-b border-gap-border">
                <MapPin size={16} /> 店舗検索
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}