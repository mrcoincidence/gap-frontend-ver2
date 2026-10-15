// components/Header01.tsx
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
  ChevronLeft,
  User,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  isHome?: boolean;
}

export default function Header01({ isHome = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // モバイルメニュー階層管理 (1: トップ, 2: サブカテゴリー, 3: 下層メニュー)
  const [menuLevel, setMenuLevel] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('メンズ');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('カテゴリー');

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

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [announcements.length]);

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

  const categories = ['メンズ', 'ウィメンズ', 'キッズ', 'ベビー', 'GapX'];

  // メガメニューが開いている時（activeMenuがある時）は透過を解除して白にする
  const isTransparent = isHome && !isScrolled && !activeMenu;
  const navTextColor = !isTransparent ? 'text-gap-dark hover:text-gap-navy' : 'text-white hover:opacity-80';
  const logoFill = !isTransparent ? '#001b3d' : '#ffffff';

  // メガメニュー＆モバイル共通データ定義
  const megaMenuData = {
    newArrivals: {
      title: "新着商品",
      items: ["全ての新商品", "トップス", "ボトムス", "アクセサリー"]
    },
    featured: {
      title: "ピックアップ",
      items: ["Gap Hoodie Day", "Momijiコレクション", "オンラインストア限定", "今週のベストセラー", "セール"]
    },
    categories: {
      title: "カテゴリー",
      items: [
        "全ての新商品",
        "Tシャツ・トップス",
        "パーカー・スウェット上下",
        "セットアップ",
        "シャツ",
        "デニム",
        "パンツ・ボトムス",
        "アウター・ジャケット",
        "セーター・カーディガン",
        "パジャマ・下着"
      ]
    },
    accessories: {
      title: "アクセサリー",
      items: ["全ての新商品", "バッグ", "帽子・キャップ", "ベルト", "スカーフ", "靴下", "ペット"]
    },
    collaborations: {
      title: "コラボレーション",
      items: ["Gap × A.P.C.", "ONE PIECE", "ザ・シンプソンズ"]
    }
  };

  const subCategoryList = [
    megaMenuData.newArrivals,
    megaMenuData.featured,
    megaMenuData.categories,
    megaMenuData.accessories,
    megaMenuData.collaborations
  ];

  const currentSubCategoryObj = subCategoryList.find(sub => sub.title === selectedSubCategory) || megaMenuData.categories;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setMenuLevel(1);
    }, 300);
  };

  return (
    <>
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

      {/* 1. Top Bar: モバイル時は非表示 */}
      <div className="hidden lg:block bg-gap-navy text-white py-2 px-[24px] lg:px-24 w-full font-sans relative z-50">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-11 md:text-12">
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

          <div className="flex items-center gap-20 text-white flex-shrink-0">
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

      {/* 2. Main Bar: メガメニュー展開時は白背景になり、レイアウトシフトなしで自然に接続 */}
      <div 
        onMouseLeave={() => setActiveMenu(null)}
        className={`sticky top-0 w-full z-40 transition-colors duration-200 font-sans ${
          isHome && !isScrolled 
            ? `${isTransparent ? 'bg-transparent' : 'bg-white shadow-sm'} py-[16px] -mb-[76px] md:-mb-[86px]`
            : `bg-white ${isScrolled ? 'py-[8px] shadow-sm' : 'py-[16px]'}`
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-[24px] lg:px-24 flex items-center justify-between">
          
          {/* 左寄せ: GAP ロゴ */}
          <div className="flex-shrink-0 flex items-center pr-8 md:pr-24">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity" aria-label="GAP ホーム">
              <svg 
                className={`transition-all duration-200 w-auto ${
                  isScrolled ? 'h-[32px]' : 'h-[44px] md:h-[54px]'
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
              <div
                key={cat}
                onMouseEnter={() => setActiveMenu(cat)}
                className="relative py-2 cursor-pointer flex items-center"
              >
                <Link 
                  href="/products" 
                  className={`transition-colors py-1 flex items-center ${navTextColor} ${
                    activeMenu === cat ? '!text-gap-navy underline decoration-2 underline-offset-8' : ''
                  }`}
                >
                  {cat}
                </Link>
              </div>
            ))}
          </nav>

          {/* 右寄せ: 検索 ＆ アイコンエリア */}
          <div className="flex items-center gap-2 sm:gap-6 md:gap-12 pl-0 md:pl-24 flex-shrink-0">
            <div className="hidden md:flex items-center relative w-[160px] lg:w-[200px]">
              <input 
                type="search" 
                placeholder="検索" 
                className={`w-full rounded-full py-4 pl-14 pr-32 text-12 focus:outline-none transition-all ${
                  !isTransparent 
                    ? 'bg-gap-gray border border-gap-border-dark text-gap-dark placeholder:text-gap-muted focus:border-gap-navy' 
                    : 'bg-white/20 border border-white/40 text-white placeholder:text-white/80 focus:bg-white/30 focus:border-white'
                }`}
              />
              <Search size={15} className={`absolute right-10 ${!isTransparent ? 'text-gap-muted' : 'text-white/80'}`} />
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
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1.5 transition-colors flex-shrink-0 ${navTextColor} cursor-pointer`}
              aria-label="メニュー開閉"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {/* =========================================================
           4. 6カラム メガメニュー (デスクトップ)
           ========================================================= */}
        {activeMenu === 'メンズ' && (
          <div 
            onMouseEnter={() => setActiveMenu('メンズ')}
            onMouseLeave={() => setActiveMenu(null)}
            className="hidden lg:block absolute top-full left-0 w-full bg-white shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <div className="max-w-[1600px] mx-auto px-[24px] lg:px-24 pt-12 pb-16">
              <div className="grid grid-cols-6 gap-14 items-start">
                
                {/* 1カラム目: プロモーション画像エリア (2:3 比率) */}
                <div className="col-span-1">
                  <Link href="/products" className="group block select-none">
                    <div className="relative aspect-[2/3] w-full rounded-[2px] overflow-hidden bg-gray-100 mb-8 shadow-sm border border-gray-100">
                      <img
                        src="/images/products/hoodie/01/hd-01-green-1.jpg"
                        alt="プロモーション"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-[13px] font-bold text-gap-dark group-hover:text-gap-navy group-hover:underline">
                      <span>新作コレクションを見る</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </div>

                {/* 2カラム目: 新着商品 */}
                <div className="col-span-1 flex flex-col">
                  <h3 className="text-[13px] font-bold text-gap-dark pb-4 mb-4 border-b border-gray-100 tracking-wide">
                    {megaMenuData.newArrivals.title}
                  </h3>
                  <ul className="space-y-4 text-[13px]">
                    {megaMenuData.newArrivals.items.map((item) => (
                      <li key={item}>
                        <Link 
                          href="/products" 
                          className="text-gray-600 hover:text-gap-navy hover:underline transition-colors block py-0.5"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3カラム目: ピックアップ */}
                <div className="col-span-1 flex flex-col">
                  <h3 className="text-[13px] font-bold text-gap-dark pb-4 mb-4 border-b border-gray-100 tracking-wide">
                    {megaMenuData.featured.title}
                  </h3>
                  <ul className="space-y-4 text-[13px]">
                    {megaMenuData.featured.items.map((item) => {
                      const isSale = item === 'セール';
                      return (
                        <li key={item}>
                          <Link 
                            href="/products" 
                            className={`transition-colors block py-0.5 ${
                              isSale 
                                ? 'text-gap-red font-bold hover:underline' 
                                : 'text-gray-600 hover:text-gap-navy hover:underline'
                            }`}
                          >
                            {item}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* 4カラム目: カテゴリー */}
                <div className="col-span-1 flex flex-col">
                  <h3 className="text-[13px] font-bold text-gap-dark pb-4 mb-4 border-b border-gray-100 tracking-wide">
                    {megaMenuData.categories.title}
                  </h3>
                  <ul className="space-y-4 text-[13px]">
                    {megaMenuData.categories.items.map((item) => (
                      <li key={item}>
                        <Link 
                          href="/products" 
                          className="text-gray-600 hover:text-gap-navy hover:underline transition-colors block py-0.5"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5カラム目: アクセサリー */}
                <div className="col-span-1 flex flex-col">
                  <h3 className="text-[13px] font-bold text-gap-dark pb-4 mb-4 border-b border-gray-100 tracking-wide">
                    {megaMenuData.accessories.title}
                  </h3>
                  <ul className="space-y-4 text-[13px]">
                    {megaMenuData.accessories.items.map((item) => (
                      <li key={item}>
                        <Link 
                          href="/products" 
                          className="text-gray-600 hover:text-gap-navy hover:underline transition-colors block py-0.5"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6カラム目: コラボレーション */}
                <div className="col-span-1 flex flex-col">
                  <h3 className="text-[13px] font-bold text-gap-dark pb-4 mb-4 border-b border-gray-100 tracking-wide">
                    {megaMenuData.collaborations.title}
                  </h3>
                  <ul className="space-y-4 text-[13px]">
                    {megaMenuData.collaborations.items.map((item) => (
                      <li key={item}>
                        <Link 
                          href="/products" 
                          className="text-gray-600 hover:text-gap-navy hover:underline transition-colors block py-0.5 font-medium"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================
         5. モバイル ドロワー
         ========================================================= */}
      <div 
        onClick={closeMobileMenu}
        className={`lg:hidden fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div 
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-[88%] max-w-[380px] bg-white z-50 flex flex-col font-sans select-none shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* ドロワー最上部バー */}
        <div className="h-[64px] px-[36px] flex items-center justify-between flex-shrink-0 pt-4">
          <div>
            {menuLevel === 2 && (
              <button
                onClick={() => setMenuLevel(1)}
                className="flex items-center gap-4 text-[14px] font-bold text-gap-dark cursor-pointer py-4"
              >
                <ChevronLeft size={20} />
                <span>すべて</span>
              </button>
            )}
            {menuLevel === 3 && (
              <button
                onClick={() => setMenuLevel(2)}
                className="flex items-center gap-4 text-[14px] font-bold text-gap-dark cursor-pointer py-4"
              >
                <ChevronLeft size={20} />
                <span>{selectedCategory}</span>
              </button>
            )}
          </div>

          <button
            onClick={closeMobileMenu}
            className="flex items-center justify-center p-0 mr-[2px] text-gray-700 hover:text-black cursor-pointer ml-auto transition-colors"
            aria-label="閉じる"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        {/* 300%幅スライダーコンテナ */}
        <div className="flex-1 overflow-hidden relative">
          <div 
            className="flex w-[300%] h-full transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(menuLevel - 1) * (100 / 3)}%)`
            }}
          >

            {/* LEVEL 1: トップレベル */}
            <div className="w-1/3 h-full overflow-y-auto flex flex-col justify-between px-[36px] pb-24 pt-4">
              
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMenuLevel(2);
                    }}
                    className="w-full flex items-center justify-between py-6 text-[18px] font-bold text-gap-dark hover:text-gap-navy cursor-pointer text-left"
                  >
                    <span>{cat}</span>
                    <ChevronRight size={18} className="text-gray-400 stroke-[2.2]" />
                  </button>
                ))}
              </div>

              <div className="pt-16 border-t border-gray-100 my-12">
                <p className="text-[13px] text-gray-600 mb-12 leading-relaxed font-medium">
                  最新のコレクションや会員限定のオファーをお届けします。
                </p>
                <div className="flex items-center gap-10">
                  <button 
                    onClick={closeMobileMenu}
                    className="flex-1 h-[44px] bg-gap-navy text-white rounded-full font-bold text-[13px] hover:bg-[#001b3d] transition-colors shadow-sm cursor-pointer"
                  >
                    登録する
                  </button>
                  <button 
                    onClick={closeMobileMenu}
                    className="flex-1 h-[44px] border border-gray-300 rounded-full font-bold text-[13px] text-black hover:border-black transition-colors cursor-pointer"
                  >
                    ログイン
                  </button>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-100 pb-8 space-y-10">
                <Link
                  href="#"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-10 text-[13px] font-bold text-gray-700 hover:text-black transition-colors"
                >
                  <HelpCircle size={17} className="text-gray-500" />
                  <span>ヘルプ</span>
                </Link>

                <Link
                  href="#"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-10 text-[13px] font-bold text-gray-700 hover:text-black transition-colors"
                >
                  <ShoppingBag size={17} className="text-gray-500" />
                  <span>カート</span>
                </Link>

                <Link
                  href="#"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-10 text-[13px] font-bold text-gray-700 hover:text-black transition-colors"
                >
                  <MapPin size={17} className="text-gray-500" />
                  <span>店舗検索</span>
                </Link>
              </div>

            </div>

            {/* LEVEL 2: 中カテゴリー */}
            <div className="w-1/3 h-full overflow-y-auto flex flex-col justify-between px-[36px] pb-24 pt-4">
              <div>
                <h2 className="text-[22px] font-bold text-gap-dark mb-12">
                  {selectedCategory}
                </h2>

                <div className="space-y-1">
                  {subCategoryList.map((sub) => (
                    <button
                      key={sub.title}
                      onClick={() => {
                        setSelectedSubCategory(sub.title);
                        setMenuLevel(3);
                      }}
                      className="w-full flex items-center justify-between py-7 text-[15px] font-bold text-gray-800 hover:text-black cursor-pointer text-left border-b border-gray-50"
                    >
                      <span>{sub.title}</span>
                      <ChevronRight size={18} className="text-gray-400 stroke-[2.2]" />
                    </button>
                  ))}

                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="block py-10 text-[13px] font-bold text-gap-navy underline pt-12"
                  >
                    すべての{selectedCategory}商品を見る
                  </Link>
                </div>
              </div>
            </div>

            {/* LEVEL 3: 最下層リンク一覧 */}
            <div className="w-1/3 h-full overflow-y-auto flex flex-col justify-between px-[36px] pb-24 pt-4">
              <div>
                <h2 className="text-[22px] font-bold text-gap-dark mb-12">
                  {selectedSubCategory}
                </h2>

                <div className="space-y-0.5">
                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="block py-6 text-[13px] font-bold text-gap-navy underline mb-4"
                  >
                    すべての商品を見る
                  </Link>

                  {currentSubCategoryObj.items.map((item) => {
                    const isSale = item === 'セール';
                    return (
                      <Link
                        key={item}
                        href="/products"
                        onClick={closeMobileMenu}
                        className={`block py-6 text-[14px] font-normal transition-colors border-b border-gray-50 ${
                          isSale ? 'text-gap-red font-bold' : 'text-gray-700 hover:text-black'
                        }`}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}