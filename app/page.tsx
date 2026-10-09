// app/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const shopProducts = [
    {
      id: 1,
      name: 'CashSoft カシミヤタッチ ジップアップパーカー',
      price: '¥ 11,900',
      img: '/images/products/shop-now-01.jpg',
      url: 'https://www.gap.co.jp/gap/cashsoft-zip-hoodie/1186092026.html?mlink=JP_HP_EINSTEIN_RECENTLY',
      colors: [
        { name: 'ネイビー', hex: '#002554' },
        { name: 'ヘザーグレー', hex: '#9e9e9e' },
        { name: 'ブラック', hex: '#111111' },
        { name: 'ベージュ', hex: '#d4b89b' },
      ],
    },
    {
      id: 2,
      name: 'CashSoft カシミヤタッチ リラックスフィット GAPロゴセーター',
      price: '¥ 10,900',
      img: '/images/products/shop-now-02.jpg',
      url: 'https://www.gap.co.jp/gap/cashsoft-relaxed-logo-sweater/908042006.html?mlink=JP_HP_EINSTEIN_RECENTLY',
      colors: [
        { name: 'ナチュラル', hex: '#f0ede6' },
        { name: 'ネイビー', hex: '#002554' },
        { name: 'ブラウン', hex: '#5c4033' },
      ],
    },
    {
      id: 3,
      name: 'リラックスフィット GAPロゴパーカー (キッズ)',
      price: '¥ 6,990',
      img: '/images/products/shop-now-03.jpg',
      url: 'https://www.gap.co.jp/gap/kids-relaxed-gap-logo-hoodie/915580016.html?mlink=JP_HP_EINSTEIN_RECENTLY',
      colors: [
        { name: 'グリーン', hex: '#4a7c59' },
        { name: 'レッド', hex: '#dc3545' },
        { name: 'グレー', hex: '#bcbcbc' },
        { name: 'イエロー', hex: '#eab308' },
      ],
    },
    {
      id: 4,
      name: 'グラフィック ドルマンTシャツ (キッズ)',
      price: '¥ 3,990',
      img: '/images/products/shop-now-04.jpg',
      url: 'https://www.gap.co.jp/gap/kids-graphic-dolman-t-shirt/1181307006.html?mlink=JP_HP_EINSTEIN_RECENTLY',
      colors: [
        { name: 'ホワイト', hex: '#ffffff' },
        { name: 'ピンク', hex: '#f43f5e' },
        { name: 'ライトブルー', hex: '#38bdf8' },
      ],
    },
  ];

  const promoBanners = [
    {
      title: 'DENIM COLLECTION',
      subtitle: '洗練されたシルエットと究極の履き心地',
      img: '/images/campaigns/banner-01.jpg',
    },
    {
      title: 'GAP LOGO SWEATS',
      subtitle: 'アイコンロゴで楽しむ秋のスタイリング',
      img: '/images/campaigns/banner-02.jpg',
    },
    {
      title: 'OUTERWEAR SPECIAL',
      subtitle: '季節の変わり目に映えるライトアウター',
      img: '/images/campaigns/banner-03.jpg',
    },
  ];

  // 定番プロダクト背景透過サムネイル
  const essentialCategories = [
    { name: 'Tシャツ', img: '/images/products/thum-tshirt.png', fallback: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80' },
    { name: 'ジャケット', img: '/images/products/thum-jacket.png', fallback: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&auto=format&fit=crop&q=80' },
    { name: 'パーカー', img: '/images/products/thum-hoodie.png', fallback: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80' },
    { name: 'セーター', img: '/images/products/thum-sweater.png', fallback: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80' },
    { name: 'ジーンズ', img: '/images/products/thum-jeans.png', fallback: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80' },
    { name: 'チノパンツ', img: '/images/products/thum-chino.png', fallback: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&auto=format&fit=crop&q=80' },
  ];

  // 4カラム・カテゴリーテキストリンク
  const seoNavigationColumns = [
    {
      title: 'ピックアップ',
      links: [
        'すべての新着商品',
        'ベストセラー・人気商品',
        '秋のおすすめアイテム',
        'GAP 1969 デニムコレクション',
        'CashSoft カシミヤタッチ',
      ],
    },
    {
      title: 'ジーンズ',
      links: [
        'すべてのジーンズ',
        'ルーズフィット デニム',
        'ストレート デニム',
        'スリムフィット デニム',
        'デニムジャケット',
      ],
    },
    {
      title: 'パーカー',
      links: [
        'すべてのパーカー＆スウェット',
        'GAPロゴ パーカー',
        'ジップアップパーカー',
        'クルーネックスウェット',
        'オーバーサイズ フーディー',
      ],
    },
    {
      title: 'アクセサリー',
      links: [
        'すべてのアクセサリー',
        'キャップ＆ハット',
        'バッグ＆バックパック',
        'ソックス＆アンダーウェア',
        'ベルト＆小物',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <main className="w-full">
        
        {/* =========================================================
           1. Main Hero section (Headerと同じ max-w-[1600px] + px にAlign)
           ========================================================= */}
        <section className="relative w-full h-screen min-h-[500px] bg-black overflow-hidden flex items-end pb-32 md:pb-48">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/hero/main-hero.jpg"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Headerのインナーと同じ幅・Padding構成 */}
          <div className="w-full max-w-[1600px] mx-auto px-12 md:px-16 lg:px-24 relative z-10">
            <div className="text-left text-white max-w-[800px]">
              <div className="mb-16">
                <img 
                  src="/images/logo/logo-gap-apc.svg" 
                  alt="GAP × A.P.C." 
                  className="h-36 md:h-52 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.logo-apc-fallback')) {
                      const fallback = document.createElement('h1');
                      fallback.className = 'logo-apc-fallback text-36 md:text-50 font-bold tracking-tight drop-shadow-md';
                      fallback.innerText = 'GAP × A.P.C.';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              <p className="text-[20px] font-medium mb-24 opacity-90 drop-shadow leading-snug">
                ふたつの世界。ひとつのコレクション。エフォートレスなスタイルという共通言語
              </p>

              <div>
                <a 
                  href="#" 
                  className="inline-block bg-white text-gap-navy border-2 border-white font-bold text-14 px-16 py-6 transition-all duration-300 hover:bg-transparent hover:text-white uppercase tracking-wider"
                >
                  コレクションをチェック
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
           2. Sub Hero section (左右カード内PaddingをHeaderと同一指定)
           ========================================================= */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2">
          {/* 左カード */}
          <div className="relative h-[80vh] md:h-[calc(100vh-100px)] min-h-[450px] bg-black overflow-hidden flex items-end px-12 md:px-16 lg:px-24 pb-24 md:pb-32">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
              poster="/images/hero/sub-hero-left.jpg"
            >
              <source src="/videos/sub-hero-01.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 text-white">
              <h2 className="text-28 md:text-35 font-bold mb-8">WOMEN'S FALL ESSENTIALS</h2>
              <p className="text-14 md:text-16 mb-12 opacity-90">快適さと洗練を両立した秋のウィメンズスタイル</p>
              <div>
                <a 
                  href="#" 
                  className="inline-block bg-white text-gap-navy border-2 border-white font-bold text-14 px-16 py-6 transition-all duration-300 hover:bg-transparent hover:text-white uppercase tracking-wider"
                >
                  ウィメンズをショップ
                </a>
              </div>
            </div>
          </div>

          {/* 右カード */}
          <div className="relative h-[80vh] md:h-[calc(100vh-100px)] min-h-[450px] bg-black overflow-hidden flex items-end px-12 md:px-16 lg:px-24 pb-24 md:pb-32">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
              poster="/images/hero/sub-hero-right.jpg"
            >
              <source src="/videos/sub-hero-02.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 text-white">
              <h2 className="text-28 md:text-35 font-bold mb-8">MEN'S MODERN DENIM</h2>
              <p className="text-14 md:text-16 mb-12 opacity-90">上質なファブリックと多様なシルエットのメンズデニム</p>
              <div>
                <a 
                  href="#" 
                  className="inline-block bg-white text-gap-navy border-2 border-white font-bold text-14 px-16 py-6 transition-all duration-300 hover:bg-transparent hover:text-white uppercase tracking-wider"
                >
                  メンズをショップ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
           3. Shop now section
           ========================================================= */}
        <section className="max-w-[1600px] mx-auto px-16 lg:px-24 py-48 md:py-64">
          <div className="flex items-center justify-between mb-24">
            <h2 className="text-24 md:text-28 font-bold text-gap-dark">SHOP NOW</h2>
            
            <div className="flex items-center gap-16">
              <a href="#" className="text-13 font-bold text-gap-dark hover:text-gap-navy">
                全て見る →
              </a>
              <div className="flex gap-8">
                <button className="p-8 border border-gap-border-dark rounded-full hover:bg-gap-gray" aria-label="前へ">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-8 border border-gap-border-dark rounded-full hover:bg-gap-gray" aria-label="次へ">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-24 overflow-x-auto">
            {shopProducts.map((product) => (
              <a 
                key={product.id} 
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[3/4] bg-gap-gray overflow-hidden mb-12 border border-gap-border">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <h3 className="text-14 font-bold text-gap-dark mb-4 truncate group-hover:underline">
                  {product.name}
                </h3>

                <p className="text-14 font-bold text-gap-dark mb-4">{product.price}</p>

                <div className="flex items-center gap-6 py-6 px-4 overflow-visible">
                  {product.colors.map((col, cIndex) => (
                    <span 
                      key={cIndex}
                      title={col.name}
                      style={{ backgroundColor: col.hex }}
                      className={`inline-block w-[18px] h-[18px] rounded-full border border-gap-border-dark flex-shrink-0 ${
                        cIndex === 0 ? 'ring-2 ring-gap-dark ring-offset-2' : ''
                      }`}
                    />
                  ))}
                  <span className="text-11 text-gap-muted ml-4 font-medium">
                    ({product.colors.length})
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* =========================================================
           4. Promotional Banner section
           ========================================================= */}
        <section className="max-w-[1600px] mx-auto px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {promoBanners.map((banner, index) => (
              <div key={index} className="relative aspect-[2/3] bg-gap-gray overflow-hidden border border-gap-border group cursor-pointer">
                <img 
                  src={banner.img} 
                  alt={banner.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 p-12 md:p-16 text-white z-10 flex flex-col items-start">
                  <h3 className="text-20 md:text-24 font-bold mb-4 tracking-tight">
                    {banner.title}
                  </h3>
                  <p className="text-12 md:text-13 mb-12 opacity-90">
                    {banner.subtitle}
                  </p>
                  <a 
                    href="#" 
                    className="inline-block bg-white text-gap-navy border-2 border-white font-bold text-12 px-14 py-4 transition-all duration-300 hover:bg-transparent hover:text-white uppercase tracking-wider"
                  >
                    詳しく見る
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
           5. SEO & Navigation List Section
           ========================================================= */}
        <section className="bg-white pt-[100px] pb-48 md:pb-64">
          <div className="max-w-[1200px] mx-auto px-16 lg:px-24">
            
            <div className="text-center mb-20 md:mb-28">
              <h2 className="text-42 md:text-60 font-black tracking-widest text-gap-dark mb-12 uppercase">
                GAP STYLE
              </h2>
              <p className="text-14 md:text-16 text-gap-muted font-medium max-w-[600px] mx-auto leading-relaxed">
                最新トレンドから定番モデルまで。<br className="hidden sm:inline" />
                あなたの毎日を進化させるスタイルを見つけよう。
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-16 md:gap-24 mb-24 md:mb-32 text-center">
              {essentialCategories.map((cat, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="group flex flex-col items-center justify-center p-8 rounded-lg hover:bg-gap-gray transition-colors"
                >
                  <div className="w-80 h-80 md:w-[120px] md:h-[120px] flex items-center justify-center mb-8 overflow-hidden">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = cat.fallback;
                      }}
                    />
                  </div>
                  <span className="text-13 font-bold text-gap-dark group-hover:text-gap-navy">
                    {cat.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-24 md:gap-32 border-t border-gap-border pt-32">
              {seoNavigationColumns.map((col, cIdx) => (
                <div key={cIdx}>
                  <h3 className="text-15 md:text-16 font-bold text-gap-dark mb-16">
                    {col.title}
                  </h3>
                  <ul className="space-y-10">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a 
                          href="#" 
                          className="text-13 text-gap-muted hover:text-gap-dark transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* フッター */}
      <Footer />

    </div>
  );
}