// app/hoodie-day/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowDown, ArrowUpRight, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const hoodieList = [
  {
    id: '01',
    slug: 'henrys-pizza',
    name: "Henry's Pizza",
    location: "Osaka, Japan",
    category: 'Special Collaboration',
    price: 8990,
    themeColor: '#001b3d',
    description: "Henry's PIZZA（ヘンリーズ・ピザ）は、日本人グラフィックアーティストVERDYが2023年に地元・大阪でオープンしたニューヨークスタイルのピザショップ。",
    bgImage: '/images/hoodie-day/01-bg.jpg',
    cardVideo: '/videos/hoodie-day/01-card.mp4',
    productImage: '/images/hoodie-day/01-product.jpg',
    thumbImage: '/images/hoodie-day/01-thumb.png',
  },
  {
    id: '02',
    slug: 'eduardo-sarabia',
    name: "Eduardo Sarabia",
    location: "Mexico City, Mexico",
    category: 'Special Collaboration',
    price: 7990,
    themeColor: '#4a5568',
    description: "Eduardo Sarabia（エドゥアルド・サラビア）は、物語を創作の核に据え、実体験と想像上のストーリーをもとに視覚言語を築いている。[cite: 10]",
    bgImage: '/images/hoodie-day/02-bg.jpg',
    cardVideo: '/videos/hoodie-day/02-card.mp4',
    productImage: '/images/hoodie-day/02-product.jpg',
    thumbImage: '/images/hoodie-day/02-thumb.png',
  },
  {
    id: '03',
    slug: 'come-tees',
    name: "Come Tees",
    location: "Los Angeles, USA",
    category: 'Special Collaboration',
    price: 9990,
    themeColor: '#1a202c',
    description: "2009年に設立されたCome Tees（カムティーズ）。 LAの活気あるアンダーグラウンド・アートシーンを背景に、コミュニティの中から生まれたブランド。[cite: 10]",
    bgImage: '/images/hoodie-day/03-bg.jpg',
    cardVideo: '/videos/hoodie-day/03-card.mp4',
    productImage: '/images/hoodie-day/03-product.jpg',
    thumbImage: '/images/hoodie-day/03-thumb.png',
  },
  {
    id: '04',
    slug: 'edward-crutchley',
    name: "Edward Crutchley",
    location: "London, United Kingdom",
    category: 'Special Collaboration',
    price: 9990,
    themeColor: '#7c3aed',
    description: "Edward Crutchley（エドワード・クラッチリー）は2015年に自身のブランドを設立。 クラフトへの深い関心とテキスタイルの可能性を軸に、色、素材、イメージ制作に直感的なアプローチを取り入れている。[cite: 10]",
    bgImage: '/images/hoodie-day/04-bg.jpg',
    cardVideo: '/videos/hoodie-day/04-card.mp4',
    productImage: '/images/hoodie-day/04-product.jpg',
    thumbImage: '/images/hoodie-day/04-thumb.png',
  },
  {
    id: '05',
    slug: 'ao-yes',
    name: "AO YES",
    location: "Shanghai, China",
    category: 'Special Collaboration',
    price: 8490,
    themeColor: '#2b2d42',
    description: "AO YES（アオイエス）は、中国文化とハイファッションを融合させ、中国の伝統的なモチーフに現代的なデザインを掛け合わせている。[cite: 10]",
    bgImage: '/images/hoodie-day/05-bg.jpg',
    cardVideo: '/videos/hoodie-day/05-card.mp4',
    productImage: '/images/hoodie-day/05-product.jpg',
    thumbImage: '/images/hoodie-day/05-thumb.png',
  },
];

// デスクトップ用スタッガーモーション関数
function getSmoothStaggerStyle(
  localP: number,
  startIn: number,
  endIn: number,
  startOut: number,
  endOut: number,
  distance = 32
) {
  if (localP < startIn) {
    return { opacity: 0, transform: `translateY(${distance}px)` };
  } else if (localP <= endIn) {
    const t = (localP - startIn) / (endIn - startIn);
    const ease = t * t * (3 - 2 * t);
    return { opacity: ease, transform: `translateY(${(1 - ease) * distance}px)` };
  } else if (localP < startOut) {
    return { opacity: 1, transform: 'translateY(0px)' };
  } else if (localP <= endOut) {
    const t = (localP - startOut) / (endOut - startOut);
    const ease = t * t * (3 - 2 * t);
    return { opacity: Math.max(0, 1 - ease), transform: `translateY(${ease * distance}px)` };
  } else {
    return { opacity: 0, transform: `translateY(${distance}px)` };
  }
}

// 01〜05 モバイル用フェーズ1 (映像カード) スタイル計算
function getMobileCardStyle(localP: number, isLast = false) {
  const inStart = 0.00;
  const inEnd = 0.10;
  const outStart = isLast ? 0.28 : 0.40;
  const outEnd = isLast ? 0.36 : 0.48;

  if (localP < inStart) {
    return { opacity: 0, transform: 'translateY(24px)' };
  } else if (localP <= inEnd) {
    const t = (localP - inStart) / (inEnd - inStart);
    const ease = t * t * (3 - 2 * t);
    return { opacity: ease, transform: `translateY(${(1 - ease) * 24}px)` };
  } else if (localP < outStart) {
    return { opacity: 1, transform: 'translateY(0px)' };
  } else if (localP <= outEnd) {
    const t = (localP - outStart) / (outEnd - outStart);
    const ease = t * t * (3 - 2 * t);
    return { opacity: Math.max(0, 1 - ease), transform: `translateY(-${ease * 24}px)` };
  } else {
    return { opacity: 0, transform: 'translateY(-24px)' };
  }
}

// 01〜05 モバイル用フェーズ2 (商品情報カラム) スタイル計算
function getMobileInfoStyle(localP: number, isLast = false) {
  const inStart = isLast ? 0.34 : 0.46;
  const inEnd = isLast ? 0.42 : 0.54;
  const outStart = isLast ? 0.99 : 0.84;
  const outEnd = isLast ? 1.05 : 0.94;

  if (localP < inStart) {
    return { opacity: 0, transform: 'translateY(24px)' };
  } else if (localP <= inEnd) {
    const t = (localP - inStart) / (inEnd - inStart);
    const ease = t * t * (3 - 2 * t);
    return { opacity: ease, transform: `translateY(${(1 - ease) * 24}px)` };
  } else if (localP < outStart) {
    return { opacity: 1, transform: 'translateY(0px)' };
  } else if (localP <= outEnd) {
    const t = (localP - outStart) / (outEnd - outStart);
    const ease = t * t * (3 - 2 * t);
    return { opacity: Math.max(0, 1 - ease), transform: `translateY(-${ease * 24}px)` };
  } else {
    return { opacity: 0, transform: 'translateY(-24px)' };
  }
}

// All Collections モバイル用 1商品ずつ切り替えるスタイル計算
function getMobileCollectionItemStyle(gp: number, itemIdx: number, total: number) {
  // 7.55から各商品0.34刻みで表示
  const start = 7.55 + itemIdx * 0.34;
  const inEnd = start + 0.08;
  const outStart = start + 0.26;
  const outEnd = start + 0.34;
  const isLast = itemIdx === total - 1;

  if (gp < start) {
    return { opacity: 0, transform: 'translateY(20px)', pointerEvents: 'none' as const, display: 'none' };
  } else if (gp <= inEnd) {
    const t = (gp - start) / (inEnd - start);
    const ease = t * t * (3 - 2 * t);
    return { opacity: ease, transform: `translateY(${(1 - ease) * 20}px)`, pointerEvents: 'auto' as const, display: 'flex' };
  } else if (isLast || gp < outStart) {
    return { opacity: 1, transform: 'translateY(0px)', pointerEvents: 'auto' as const, display: 'flex' };
  } else if (gp <= outEnd) {
    const t = (gp - outStart) / (outEnd - outStart);
    const ease = t * t * (3 - 2 * t);
    return { opacity: Math.max(0, 1 - ease), transform: `translateY(-${ease * 20}px)`, pointerEvents: 'none' as const, display: 'flex' };
  } else {
    return { opacity: 0, transform: 'translateY(-20px)', pointerEvents: 'none' as const, display: 'none' };
  }
}

export default function HoodieCampaignPage() {
  const [globalProgress, setGlobalProgress] = useState(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_GP = 9.4;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalScroll = rect.height - windowHeight;
            const currentScroll = -rect.top;
            
            const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScroll));
            const gp = rawProgress * TOTAL_GP;
            setGlobalProgress(gp);

            let active = 0;
            if (gp >= 0.85 && gp < 2.25) active = 1;
            else if (gp >= 2.25 && gp < 3.65) active = 2;
            else if (gp >= 3.65 && gp < 5.05) active = 3;
            else if (gp >= 5.05 && gp < 6.45) active = 4;
            else if (gp >= 6.45 && gp < 7.30) active = 5;
            else if (gp >= 7.30) active = 6;
            setActiveSectionIdx(active);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (secIdx: number) => {
    if (!containerRef.current) return;
    const windowHeight = window.innerHeight;
    const totalScroll = containerRef.current.offsetHeight - windowHeight;
    
    const targets = [0.05, 1.45, 2.85, 4.25, 5.65, 6.75, 7.60];
    const targetProgress = (targets[secIdx] || 0) / TOTAL_GP;
    const targetScroll = containerRef.current.offsetTop + targetProgress * totalScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const gp = globalProgress;

  // Hero セクション計算
  const heroLabelOpacity = Math.max(0, 1 - gp / 0.16);
  const heroLabelY = -(gp / 0.16) * 45;

  const heroLeadP = Math.max(0, Math.min(1, (gp - 0.06) / 0.2));
  const heroLeadOpacity = 1 - heroLeadP;
  const heroLeadY = -heroLeadP * 65;

  const heroTitleP = Math.max(0, Math.min(1, (gp - 0.12) / 0.24));
  const heroTitleOpacity = 1 - heroTitleP;
  const heroTitleY = -heroTitleP * 95;
  const heroTitleScale = 1 + heroTitleP * 0.08;
  const heroTitleBlur = heroTitleP * 10;

  let heroVideoScale = 1.0;
  let heroVideoOpacity = 1.0;
  let heroVideoBlur = 0;

  if (gp > 0.22) {
    const zoomP = Math.min(1, (gp - 0.22) / 0.45);
    heroVideoScale = 1.0 + Math.pow(zoomP, 2) * 2.8;
    heroVideoBlur = zoomP * 14;
    if (gp > 0.42) {
      const fadeP = Math.min(1, (gp - 0.42) / 0.3);
      heroVideoOpacity = Math.max(0, 1 - fadeP);
    }
  }

  // 01背景計算
  let bg01Transform = 'scale(0.65)';
  let bg01Opacity = 0;
  let bg01Blur = 0;

  if (gp < 0.40) {
    bg01Opacity = 0;
  } else if (gp <= 0.85) {
    const p = (gp - 0.40) / 0.45;
    bg01Opacity = Math.min(1, p * 1.5);
    bg01Transform = `scale(${0.65 + p * 0.35})`;
  } else if (gp <= 1.85) {
    bg01Opacity = 1;
    bg01Transform = 'scale(1)';
  } else if (gp <= 2.25) {
    const p = (gp - 1.85) / 0.40;
    const z = -p * 550;
    const rotate = p * 12;
    const scale = 1 - p * 0.35;
    bg01Transform = `perspective(1200px) translateZ(${z}px) rotateX(${rotate}deg) scale(${scale})`;
    bg01Opacity = Math.max(0, 1 - p * 1.25);
    bg01Blur = p * 6;
  } else {
    bg01Opacity = 0;
  }

  // 02背景計算
  let bg02Transform = 'perspective(1200px) translateZ(260px) translateY(-12%) scale(1.15) rotateX(-8deg)';
  let bg02Opacity = 0;
  let bg02Blur = 0;

  if (gp < 1.88) {
    bg02Opacity = 0;
  } else if (gp <= 2.28) {
    const p = (gp - 1.88) / 0.40;
    const z = (1 - p) * 260;
    const y = -(1 - p) * 12;
    const scale = 1 + (1 - p) * 0.15;
    const rotate = -(1 - p) * 8;
    bg02Transform = `perspective(1200px) translateZ(${z}px) translateY(${y}%) scale(${scale}) rotateX(${rotate}deg)`;
    bg02Opacity = Math.min(1, p * 1.4);
  } else if (gp <= 3.25) {
    bg02Opacity = 1;
    bg02Transform = 'scale(1)';
  } else if (gp <= 3.65) {
    const p = (gp - 3.25) / 0.40;
    bg02Transform = `perspective(1200px) translateZ(${-p * 550}px) rotateX(${p * 12}deg) scale(${1 - p * 0.35})`;
    bg02Opacity = Math.max(0, 1 - p * 1.25);
    bg02Blur = p * 6;
  } else {
    bg02Opacity = 0;
  }

  // 03〜04 背景写真計算
  const getSubsequentBgStyle = (idx: number) => {
    const base = idx * 1.4 + 0.48;
    const inStart = base;
    const inEnd = base + 0.40;
    const outStart = base + 0.97;
    const outEnd = base + 1.37;

    if (gp < inStart) {
      return { opacity: 0, transform: 'scale(1)' };
    } else if (gp <= inEnd) {
      const p = (gp - inStart) / 0.40;
      const z = (1 - p) * 260;
      const y = -(1 - p) * 12;
      const scale = 1 + (1 - p) * 0.15;
      const rotate = -(1 - p) * 8;
      return {
        opacity: Math.min(1, p * 1.4),
        transform: `perspective(1200px) translateZ(${z}px) translateY(${y}%) scale(${scale}) rotateX(${rotate}deg)`,
      };
    } else if (gp <= outStart) {
      return { opacity: 1, transform: 'scale(1)' };
    } else if (gp <= outEnd) {
      const p = (gp - outStart) / 0.40;
      return {
        opacity: Math.max(0, 1 - p * 1.25),
        transform: `perspective(1200px) translateZ(${-p * 550}px) rotateX(${p * 12}deg) scale(${1 - p * 0.35})`,
        filter: `blur(${p * 6}px)`,
      };
    }
    return { opacity: 0, transform: 'scale(1)' };
  };

  // 05 背景覆いかぶさり ＆ All Collectionsへのパース回転トランジション
  const bg05InStart = 6.08;
  const bg05InEnd = 6.48;

  const rotateTransitionStart = 7.15;
  const rotateTransitionEnd = 7.55;

  let row05Style: React.CSSProperties = { transform: 'scale(1)', opacity: 1 };
  let allCollectionStyle: React.CSSProperties = { 
    transform: 'perspective(1000px) translateX(110vw) rotateY(34deg)', 
    opacity: 0, 
    pointerEvents: 'none' 
  };

  if (gp < bg05InStart) {
    row05Style = { opacity: 0, transform: 'scale(1)' };
  } else if (gp <= bg05InEnd) {
    const p = (gp - bg05InStart) / 0.40;
    const z = (1 - p) * 260;
    const y = -(1 - p) * 12;
    const scale = 1 + (1 - p) * 0.15;
    const rotateX = -(1 - p) * 8;
    row05Style = {
      opacity: Math.min(1, p * 1.4),
      transform: `perspective(1200px) translateZ(${z}px) translateY(${y}%) scale(${scale}) rotateX(${rotateX}deg)`,
    };
  } else if (gp < rotateTransitionStart) {
    row05Style = { transform: 'none', opacity: 1 };
    allCollectionStyle = { 
      transform: 'perspective(1000px) translateX(110vw) rotateY(34deg)', 
      opacity: 0, 
      pointerEvents: 'none' 
    };
  } else if (gp <= rotateTransitionEnd) {
    const t = (gp - rotateTransitionStart) / (rotateTransitionEnd - rotateTransitionStart);
    const ease = t * t * (3 - 2 * t);

    row05Style = {
      transform: `perspective(1000px) translateX(-${ease * 105}vw) rotateY(-${ease * 34}deg) translateZ(-${ease * 120}px)`,
      transformOrigin: 'center center',
      opacity: Math.max(0, 1 - ease * 1.25),
      pointerEvents: 'none',
    };

    allCollectionStyle = {
      transform: `perspective(1000px) translateX(${(1 - ease) * 105}vw) rotateY(${(1 - ease) * 34}deg) translateZ(-${(1 - ease) * 120}px)`,
      transformOrigin: 'center center',
      opacity: Math.min(1, ease * 1.5),
      pointerEvents: ease > 0.5 ? 'auto' : 'none',
    };
  } else {
    row05Style = { transform: 'translateX(-105vw) rotateY(-34deg)', opacity: 0, pointerEvents: 'none' };
    allCollectionStyle = { transform: 'none', opacity: 1, pointerEvents: 'auto' };
  }

  // モバイル All Collections で現在表示中のアイテムIndex (0〜4)
  const currentCollectionIdx = Math.min(4, Math.max(0, Math.floor((gp - 7.55) / 0.34)));

  return (
    <div className="bg-[#0b0c10] text-white selection:bg-white selection:text-black font-sans relative">
      
      <Header isHome={true} />

      {/* 右側ナビゲーション */}
      <aside className="hidden lg:flex fixed right-24 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-16 select-none mix-blend-difference">
        <span className="text-[10px] tracking-widest font-mono text-white/50 -rotate-90 mb-12">
          CANVAS
        </span>
        <button
          onClick={() => scrollToSection(0)}
          className={`group flex items-center gap-8 cursor-pointer transition-all ${
            activeSectionIdx === 0 ? 'scale-125' : 'opacity-40 hover:opacity-100'
          }`}
        >
          <span className="text-[11px] font-mono tracking-tighter text-white">00</span>
          <span className={`w-8 h-[2px] transition-all ${activeSectionIdx === 0 ? 'bg-white w-20' : 'bg-white/40'}`} />
        </button>

        {hoodieList.map((item, idx) => {
          const sectionIdx = idx + 1;
          const isActive = activeSectionIdx === sectionIdx;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(sectionIdx)}
              className={`group flex items-center gap-8 cursor-pointer transition-all ${
                isActive ? 'scale-125' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <span className="text-[11px] font-mono tracking-tighter text-white">{item.id}</span>
              <span className={`w-8 h-[2px] transition-all ${isActive ? 'bg-white w-20' : 'bg-white/40'}`} />
            </button>
          );
        })}
      </aside>

      {/* =========================================================
         メインスクロールコンテナ
         ========================================================= */}
      <div ref={containerRef} className="relative w-full" style={{ height: '1900vh' }}>
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          
          {/* Hero 動画背景 */}
          <div 
            className="absolute inset-0 z-[10] origin-center will-change-transform pointer-events-none"
            style={{
              transform: `scale(${heroVideoScale})`,
              opacity: heroVideoOpacity,
              filter: `blur(${heroVideoBlur}px)`,
              display: gp > 0.85 ? 'none' : 'block',
            }}
          >
            <video
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover filter brightness-100 contrast-100"
            >
              <source src="/videos/hoodie-day/hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
          </div>

          {/* 01 背景写真 */}
          <div 
            className="absolute inset-0 z-[11] overflow-hidden will-change-transform origin-center pointer-events-none transition-transform duration-75 ease-out"
            style={{
              transform: bg01Transform,
              opacity: bg01Opacity,
              filter: `blur(${bg01Blur}px)`,
            }}
          >
            <img
              src={hoodieList[0].bgImage}
              alt={hoodieList[0].name}
              className="w-full h-full object-cover filter brightness-[0.85] contrast-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </div>

          {/* 02 背景写真 */}
          <div 
            className="absolute inset-0 z-[12] overflow-hidden will-change-transform origin-center pointer-events-none transition-transform duration-75 ease-out shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
            style={{
              transform: bg02Transform,
              opacity: bg02Opacity,
              filter: `blur(${bg02Blur}px)`,
            }}
          >
            <img
              src={hoodieList[1].bgImage}
              alt={hoodieList[1].name}
              className="w-full h-full object-cover filter brightness-[0.85] contrast-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </div>

          {/* 03〜04 背景写真 */}
          {hoodieList.slice(2, 4).map((item, idx) => {
            const actualIdx = idx + 2;
            const style = getSubsequentBgStyle(actualIdx);

            return (
              <div 
                key={item.id}
                className="absolute inset-0 overflow-hidden will-change-transform origin-center pointer-events-none transition-transform duration-75 ease-out shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
                style={{
                  zIndex: 11 + actualIdx,
                  ...style,
                }}
              >
                <img
                  src={item.bgImage}
                  alt={item.name}
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
              </div>
            );
          })}

          {/* =========================================================
             SECTION 05: コンテンツと背景が一体化したRow
             ========================================================= */}
          <div 
            className="absolute inset-0 z-[15] overflow-hidden will-change-transform"
            style={{
              display: gp < 6.00 ? 'none' : 'block',
              ...row05Style,
            }}
          >
            {/* 05 背景写真 */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={hoodieList[4].bgImage}
                alt={hoodieList[4].name}
                className="w-full h-full object-cover filter brightness-[0.85] contrast-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
            </div>

            {/* 05 コンテンツ */}
            {(() => {
              const item = hoodieList[4];
              const secBase = 4 * 1.4 + 0.86;
              const localP = gp - secBase;

              const labelStyle = getSmoothStaggerStyle(localP, 0.00, 0.18, 0.72, 0.88, 25);
              const titleStyle = getSmoothStaggerStyle(localP, 0.04, 0.22, 0.69, 0.85, 30);
              const leadStyle  = getSmoothStaggerStyle(localP, 0.08, 0.26, 0.66, 0.82, 35);
              const thumbStyle = getSmoothStaggerStyle(localP, 0.12, 0.30, 0.63, 0.79, 40);
              const btnStyle   = getSmoothStaggerStyle(localP, 0.16, 0.34, 0.60, 0.76, 45);
              const cardStyle  = getSmoothStaggerStyle(localP, 0.06, 0.28, 0.65, 0.83, 30);

              const mCardStyle = getMobileCardStyle(localP, true);
              const mInfoStyle = getMobileInfoStyle(localP, true);

              return (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  
                  {/* デスクトップ表示 (md以上) */}
                  <div className="hidden md:flex max-w-[1440px] w-full mx-auto px-20 md:px-32 lg:px-48 flex-col md:flex-row items-center justify-between gap-16 lg:gap-32">
                    <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                      <div className="flex items-center gap-10 mb-10 will-change-transform" style={labelStyle}>
                        <span className="text-12 font-mono tracking-widest text-white bg-black/50 backdrop-blur-md px-8 py-2 rounded border border-white/20">
                          CANVAS #{item.id}
                        </span>
                        <span className="text-12 tracking-wider text-gray-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {item.category}
                        </span>
                      </div>

                      <div className="mb-12 will-change-transform" style={titleStyle}>
                        <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black leading-[1.08] tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                          {item.name}
                        </h2>
                        <p className="text-[15px] sm:text-[18px] lg:text-[20px] font-medium tracking-normal text-white/90 mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                          {item.location}
                        </p>
                      </div>

                      <div className="will-change-transform" style={leadStyle}>
                        <p className="text-[16px] text-white/95 leading-relaxed max-w-[480px] mb-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-20 mb-22 will-change-transform" style={thumbStyle}>
                        <div className="relative w-[140px] h-[210px] md:w-[200px] md:h-[300px] flex-shrink-0 flex items-center justify-center">
                          <img
                            src={item.thumbImage}
                            alt={item.name}
                            className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                            onError={(e) => {
                              e.currentTarget.src = item.productImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="flex items-baseline gap-6">
                            <span className="text-[26px] md:text-[32px] font-bold font-mono text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                              ¥{item.price.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-gray-200 font-medium drop-shadow">税込</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center will-change-transform" style={btnStyle}>
                        <Link
                          href={`/products/hoodie-day/${item.id}`}
                          className="group inline-flex items-center gap-10 bg-white text-black h-[42px] px-22 rounded-full font-bold text-12 md:text-13 hover:bg-gray-200 transition-all cursor-pointer shadow-xl active:scale-95"
                        >
                          <span>このCanvasの物語へ</span>
                          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center will-change-transform" style={cardStyle}>
                      <Link 
                        href={`/products/hoodie-day/${item.id}`} 
                        className="group relative block w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-[8px] overflow-hidden shadow-2xl border border-white/30 transition-all duration-500 hover:scale-[1.02] hover:border-white/60 bg-black/40"
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        >
                          <source src={item.cardVideo} type="video/mp4" />
                        </video>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                        <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between text-white">
                          <div>
                            <p className="text-[11px] font-mono tracking-widest text-white/80">VIEW STORY</p>
                            <p className="text-[14px] font-bold tracking-tight">EXPLORE DETAIL</p>
                          </div>
                          <div className="w-[36px] h-[36px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* モバイル表示 (md未満) */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* フェーズ1: コンテンツ映像 */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center px-20 will-change-transform"
                      style={{
                        ...mCardStyle,
                        display: localP < -0.05 || localP > 0.38 ? 'none' : 'flex',
                        pointerEvents: localP >= 0.06 && localP <= 0.30 ? 'auto' : 'none',
                      }}
                    >
                      <div className="w-full max-w-[360px] flex flex-col items-center">
                        <div className="flex items-center gap-8 mb-12">
                          <span className="text-[11px] font-mono tracking-widest text-white bg-black/60 backdrop-blur-md px-8 py-2 rounded border border-white/20">
                            CANVAS #{item.id}
                          </span>
                          <span className="text-[12px] tracking-wider text-gray-200 font-medium drop-shadow">
                            {item.category}
                          </span>
                        </div>

                        <Link 
                          href={`/products/hoodie-day/${item.id}`} 
                          className="group relative block w-full aspect-square rounded-[8px] overflow-hidden shadow-2xl border border-white/30 bg-black/40"
                        >
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            <source src={item.cardVideo} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                          <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between text-white">
                            <div>
                              <p className="text-[11px] font-mono tracking-widest text-white/80">STORY MOVIE</p>
                              <p className="text-[15px] font-bold tracking-tight">{item.name}</p>
                            </div>
                            <div className="w-[36px] h-[36px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                              <ChevronRight size={18} />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* フェーズ2: 商品情報 */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center px-20 will-change-transform"
                      style={{
                        ...mInfoStyle,
                        display: localP < 0.32 ? 'none' : 'flex',
                        pointerEvents: localP >= 0.38 && localP <= 0.68 ? 'auto' : 'none',
                      }}
                    >
                      <div className="w-full max-w-[360px] flex flex-col items-center text-center">
                        <div className="flex items-center justify-center gap-8 mb-6">
                          <span className="text-[11px] font-mono tracking-widest text-white bg-black/60 backdrop-blur-md px-8 py-2 rounded border border-white/20">
                            CANVAS #{item.id}
                          </span>
                          <span className="text-[12px] tracking-wider text-gray-200 font-medium drop-shadow">
                            {item.category}
                          </span>
                        </div>

                        <div className="mb-8">
                          <h2 className="text-[26px] font-black leading-tight tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                            {item.name}
                          </h2>
                          <p className="text-[13px] font-medium text-white/90 mt-1 drop-shadow">
                            {item.location}
                          </p>
                        </div>

                        <p className="text-[14px] text-white/95 leading-relaxed mb-14 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-3">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-center gap-16 mb-16">
                          <div className="relative w-[110px] h-[155px] flex-shrink-0 flex items-center justify-center">
                            <img
                              src={item.thumbImage}
                              alt={item.name}
                              className="w-full h-full object-contain filter drop-shadow-[0_10px_24px_rgba(0,0,0,0.7)]"
                              onError={(e) => {
                                e.currentTarget.src = item.productImage;
                              }}
                            />
                          </div>
                          <div className="flex flex-col text-left justify-center">
                            <span className="text-[10px] text-gray-300 font-mono tracking-widest">PRICE</span>
                            <div className="flex items-baseline gap-4 mt-1">
                              <span className="text-[26px] font-bold font-mono text-white drop-shadow">
                                ¥{item.price.toLocaleString()}
                              </span>
                              <span className="text-[11px] text-gray-200 font-medium drop-shadow">税込</span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/products/hoodie-day/${item.id}`}
                          className="group inline-flex items-center justify-center gap-8 bg-white text-black h-[44px] w-full max-w-[280px] rounded-full font-bold text-[14px] hover:bg-gray-200 transition-all cursor-pointer shadow-2xl active:scale-95"
                        >
                          <span>このCanvasの物語へ</span>
                          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })()}
          </div>

          {/* =========================================================
             SECTION 6: ALL COLLECTIONS
             (PC: 横5カラム / モバイル: 1商品ずつ切り替え + 9:16背景画像)
             ========================================================= */}
          <div 
            className="absolute inset-0 z-[20] overflow-hidden will-change-transform flex flex-col justify-center"
            style={{
              display: gp < 6.80 ? 'none' : 'flex',
              ...allCollectionStyle,
            }}
          >
            {/* 1. 背景写真 (PC用 ＆ モバイル用9:16を切り替え) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* PC用背景 */}
              <img
                src="/images/hoodie-day/collection-bg.jpg"
                alt="All Collection Background"
                className="hidden md:block w-full h-full object-cover filter brightness-100 contrast-100"
              />
              {/* モバイル用背景 (9:16) */}
              <img
                src="/images/hoodie-day/collection-bg-mobile.jpg"
                alt="All Collection Background Mobile"
                className="block md:hidden w-full h-full object-cover filter brightness-100 contrast-100"
                onError={(e) => {
                  // モバイル画像未配置時はPC用画像にフォールバック
                  e.currentTarget.src = '/images/hoodie-day/collection-bg.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
            </div>

            {/* 2. デスクトップ表示 (md以上): 既存の5カラム並び */}
            <div className="hidden md:flex relative z-10 w-full max-w-[1760px] mx-auto px-16 sm:px-24 md:px-32 flex-col justify-center">
              <div className="text-center mb-24 md:mb-36">
                <span className="text-[11px] md:text-[12px] font-mono tracking-[0.35em] uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  ALL COLLECTIONS
                </span>
                <h2 className="text-[30px] sm:text-[42px] lg:text-[50px] font-black uppercase mt-6 text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  5つのキャンバスから、あなたの1着を。
                </h2>
              </div>

              <div className="grid grid-cols-5 gap-20 lg:gap-28 w-full items-start">
                {hoodieList.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={`/products/hoodie-day/${item.id}`}
                      className="group flex flex-col transition-all cursor-pointer"
                    >
                      <div className="relative w-full aspect-[3/4] overflow-hidden mb-12 bg-black/30 flex items-center justify-center rounded-[2px] shadow-2xl">
                        <img
                          src={item.productImage}
                          alt={item.name}
                          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <span className="absolute top-10 left-10 text-[11px] font-mono tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          #{item.id}
                        </span>
                      </div>

                      <div className="text-left px-2">
                        <h3 className="text-14 md:text-15 font-bold text-white group-hover:underline line-clamp-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {item.name}
                        </h3>
                        <p className="text-11 md:text-12 text-gray-100 mt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                          {item.location}
                        </p>
                        <p className="text-13 md:text-14 font-mono font-bold text-white mt-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                          ¥{item.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. モバイル表示 (md未満): 1商品ずつ順次フェードイン・フェードアウト */}
            <div className="md:hidden relative z-10 w-full h-full flex flex-col items-center justify-between py-28 px-20">
              
              {/* モバイル上部タイトル ＆ 進行インジケーター */}
              <div className="text-center pt-8">
                <div className="inline-flex items-center gap-6 bg-black/60 backdrop-blur-md px-10 py-3 rounded-full border border-white/20 mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-white uppercase">
                    ALL COLLECTIONS
                  </span>
                  <span className="text-[10px] font-mono text-white/50">|</span>
                  <span className="text-[10px] font-mono text-white font-bold">
                    {currentCollectionIdx + 1} / 5
                  </span>
                </div>
                <h2 className="text-[20px] font-black uppercase text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  あなたの1着を見つける
                </h2>
              </div>

              {/* 1商品ずつ切り替わるフルサイズカード領域 */}
              <div className="relative w-full max-w-[320px] h-[440px] flex items-center justify-center my-auto">
                {hoodieList.map((item, idx) => {
                  const itemStyle = getMobileCollectionItemStyle(gp, idx, hoodieList.length);

                  return (
                    <div
                      key={item.id}
                      className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
                      style={itemStyle}
                    >
                      <Link
                        href={`/products/hoodie-day/${item.id}`}
                        className="group w-full flex flex-col items-center cursor-pointer select-none"
                      >
                        {/* 商品画像 (3/4比率) */}
                        <div className="relative w-[210px] aspect-[3/4] overflow-hidden mb-12 bg-black/40 rounded-[6px] shadow-2xl border border-white/20 flex items-center justify-center">
                          <img
                            src={item.productImage}
                            alt={item.name}
                            className="w-full h-full object-cover block"
                          />
                          <span className="absolute top-10 left-10 text-[11px] font-mono tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/60 px-6 py-2 rounded">
                            #{item.id}
                          </span>
                        </div>

                        {/* テキスト情報 */}
                        <div className="text-center mb-12">
                          <h3 className="text-[18px] font-black text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                            {item.name}
                          </h3>
                          <p className="text-[12px] text-gray-200 mt-2 drop-shadow">
                            {item.location}
                          </p>
                          <p className="text-[18px] font-mono font-bold text-white mt-4 drop-shadow">
                            ¥{item.price.toLocaleString()} <span className="text-[11px] font-normal text-gray-300">税込</span>
                          </p>
                        </div>

                        {/* CTAボタン */}
                        <div className="inline-flex items-center gap-6 bg-white text-black h-[38px] px-20 rounded-full font-bold text-[12px] shadow-xl active:scale-95 transition-transform">
                          <span>詳細を見る</span>
                          <ArrowUpRight size={14} />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* モバイル下部ドットインジケーター */}
              <div className="flex items-center gap-8 pb-8">
                {hoodieList.map((_, i) => (
                  <span
                    key={i}
                    className={`h-[4px] rounded-full transition-all duration-300 ${
                      currentCollectionIdx === i ? 'w-20 bg-white' : 'w-6 bg-white/30'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* Hero コンテンツ */}
          <div 
            className="relative z-[25] max-w-[1400px] mx-auto px-20 md:px-48 text-center flex flex-col items-center pointer-events-auto"
            style={{
              display: gp > 0.6 ? 'none' : 'flex',
            }}
          >
            <div
              className="will-change-transform"
              style={{
                transform: `translateY(${heroLabelY}px)`,
                opacity: heroLabelOpacity,
              }}
            >
              <span className="inline-block text-[11px] md:text-[13px] font-mono tracking-[0.3em] uppercase mb-16 text-white/90 border-b border-white/30 pb-4 drop-shadow">
                GAP SIGNATURE CAMPAIGN 2026
              </span>
            </div>

            <div
              className="will-change-transform"
              style={{
                transform: `translateY(${heroTitleY}px) scale(${heroTitleScale})`,
                opacity: heroTitleOpacity,
                filter: `blur(${heroTitleBlur}px)`,
              }}
            >
              <h1 className="text-[44px] sm:text-[68px] md:text-[96px] lg:text-[120px] font-black tracking-tight leading-[0.95] uppercase font-sans drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
                OUR HOODIE.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
                  YOUR CANVAS.
                </span>
              </h1>
            </div>

            <div
              className="will-change-transform flex flex-col items-center"
              style={{
                transform: `translateY(${heroLeadY}px)`,
                opacity: heroLeadOpacity,
              }}
            >
              <p className="mt-24 md:mt-32 max-w-[620px] text-[16px] text-gray-100 leading-relaxed font-normal drop-shadow-md">
                何色にも染まれる。どんな自分も描ける。<br className="hidden sm:inline" />
                1着のフーディーから始まる、5つの新しいパーソナリティと自由なストーリー。
              </p>

              <button
                onClick={() => scrollToSection(1)}
                className="mt-36 inline-flex flex-col items-center gap-8 text-[11px] font-mono tracking-widest text-white/80 hover:text-white transition-colors cursor-pointer group"
              >
                <span>SCROLL TO DISCOVER</span>
                <div className="w-[32px] h-[32px] rounded-full border border-white/40 flex items-center justify-center group-hover:border-white group-hover:translate-y-2 transition-all bg-black/20 backdrop-blur-sm">
                  <ArrowDown size={14} />
                </div>
              </button>
            </div>
          </div>

          {/* 音声切替 */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-32 left-24 z-30 flex items-center gap-8 px-14 py-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] tracking-wider transition-all cursor-pointer shadow-lg"
            style={{
              opacity: heroLabelOpacity,
              pointerEvents: gp > 0.3 ? 'none' : 'auto',
            }}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="font-mono">{isMuted ? 'SOUND ON' : 'MUTED'}</span>
          </button>

          {/* 01〜04 の各コンテンツ */}
          {hoodieList.slice(0, 4).map((item, idx) => {
            const secBase = idx * 1.4 + 0.86;
            const localP = gp - secBase;
            const isVisible = localP >= -0.02 && localP <= 1.05;

            const labelStyle = getSmoothStaggerStyle(localP, 0.00, 0.18, 0.82, 0.98, 25);
            const titleStyle = getSmoothStaggerStyle(localP, 0.04, 0.22, 0.79, 0.95, 30);
            const leadStyle  = getSmoothStaggerStyle(localP, 0.08, 0.26, 0.76, 0.92, 35);
            const thumbStyle = getSmoothStaggerStyle(localP, 0.12, 0.30, 0.73, 0.89, 40);
            const btnStyle   = getSmoothStaggerStyle(localP, 0.16, 0.34, 0.70, 0.86, 45);
            const cardStyle  = getSmoothStaggerStyle(localP, 0.06, 0.28, 0.75, 0.93, 30);

            const mCardStyle = getMobileCardStyle(localP, false);
            const mInfoStyle = getMobileInfoStyle(localP, false);

            if (!isVisible) return null;

            const isEven = idx % 2 === 1;

            return (
              <div 
                key={item.id}
                className="absolute inset-0 z-[25] flex items-center justify-center pointer-events-none"
              >
                {/* デスクトップ表示 (md以上) */}
                <div 
                  className="hidden md:flex relative z-10 max-w-[1440px] w-full mx-auto px-20 md:px-32 lg:px-48 flex-col md:flex-row items-center justify-between gap-16 lg:gap-32"
                  style={{
                    pointerEvents: localP >= 0.25 && localP <= 0.75 ? 'auto' : 'none',
                  }}
                >
                  <div 
                    className={`w-full md:w-1/2 flex flex-col justify-center text-left ${
                      isEven ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8'
                    }`}
                  >
                    <div className="flex items-center gap-10 mb-10 will-change-transform" style={labelStyle}>
                      <span className="text-12 font-mono tracking-widest text-white bg-black/50 backdrop-blur-md px-8 py-2 rounded border border-white/20">
                        CANVAS #{item.id}
                      </span>
                      <span className="text-12 tracking-wider text-gray-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {item.category}
                      </span>
                    </div>

                    <div className="mb-12 will-change-transform" style={titleStyle}>
                      <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black leading-[1.08] tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        {item.name}
                      </h2>
                      <p className="text-[15px] sm:text-[18px] lg:text-[20px] font-medium tracking-normal text-white/90 mt-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {item.location}
                      </p>
                    </div>

                    <div className="will-change-transform" style={leadStyle}>
                      <p className="text-[16px] text-white/95 leading-relaxed max-w-[480px] mb-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-20 mb-22 will-change-transform" style={thumbStyle}>
                      <div className="relative w-[140px] h-[210px] md:w-[200px] md:h-[300px] flex-shrink-0 flex items-center justify-center">
                        <img
                          src={item.thumbImage}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                          onError={(e) => {
                            e.currentTarget.src = item.productImage;
                          }}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-baseline gap-6">
                          <span className="text-[26px] md:text-[32px] font-bold font-mono text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            ¥{item.price.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-gray-200 font-medium drop-shadow">税込</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center will-change-transform" style={btnStyle}>
                      <Link
                        href={`/products/hoodie-day/${item.id}`}
                        className="group inline-flex items-center gap-10 bg-white text-black h-[42px] px-22 rounded-full font-bold text-12 md:text-13 hover:bg-gray-200 transition-all cursor-pointer shadow-xl active:scale-95"
                      >
                        <span>このCanvasの物語へ</span>
                        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </div>
                  </div>

                  <div 
                    className={`w-full md:w-1/2 flex items-center justify-center will-change-transform ${
                      isEven ? 'md:order-1' : 'md:order-2'
                    }`}
                    style={cardStyle}
                  >
                    <Link 
                      href={`/products/hoodie-day/${item.id}`} 
                      className="group relative block w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-[8px] overflow-hidden shadow-2xl border border-white/30 transition-all duration-500 hover:scale-[1.02] hover:border-white/60 bg-black/40"
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      >
                        <source src={item.cardVideo} type="video/mp4" />
                      </video>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                      <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between text-white">
                        <div>
                          <p className="text-[11px] font-mono tracking-widest text-white/80">VIEW STORY</p>
                          <p className="text-[14px] font-bold tracking-tight">EXPLORE DETAIL</p>
                        </div>
                        <div className="w-[36px] h-[36px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* モバイル表示 (md未満) */}
                <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center px-20 will-change-transform"
                    style={{
                      ...mCardStyle,
                      display: localP < -0.05 || localP > 0.50 ? 'none' : 'flex',
                      pointerEvents: localP >= 0.08 && localP <= 0.40 ? 'auto' : 'none',
                    }}
                  >
                    <div className="w-full max-w-[360px] flex flex-col items-center">
                      <div className="flex items-center gap-8 mb-12">
                        <span className="text-[11px] font-mono tracking-widest text-white bg-black/60 backdrop-blur-md px-8 py-2 rounded border border-white/20">
                          CANVAS #{item.id}
                        </span>
                        <span className="text-[12px] tracking-wider text-gray-200 font-medium drop-shadow">
                          {item.category}
                        </span>
                      </div>

                      <Link 
                        href={`/products/hoodie-day/${item.id}`} 
                        className="group relative block w-full aspect-square rounded-[8px] overflow-hidden shadow-2xl border border-white/30 bg-black/40"
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source src={item.cardVideo} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-16 left-16 right-16 flex items-center justify-between text-white">
                          <div>
                            <p className="text-[11px] font-mono tracking-widest text-white/80">STORY MOVIE</p>
                            <p className="text-[15px] font-bold tracking-tight">{item.name}</p>
                          </div>
                          <div className="w-[36px] h-[36px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center px-20 will-change-transform"
                    style={{
                      ...mInfoStyle,
                      display: localP < 0.42 || localP > 1.00 ? 'none' : 'flex',
                      pointerEvents: localP >= 0.50 && localP <= 0.88 ? 'auto' : 'none',
                    }}
                  >
                    <div className="w-full max-w-[360px] flex flex-col items-center text-center">
                      <div className="flex items-center justify-center gap-8 mb-6">
                        <span className="text-[11px] font-mono tracking-widest text-white bg-black/60 backdrop-blur-md px-8 py-2 rounded border border-white/20">
                          CANVAS #{item.id}
                        </span>
                        <span className="text-[12px] tracking-wider text-gray-200 font-medium drop-shadow">
                          {item.category}
                        </span>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-[26px] font-black leading-tight tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                          {item.name}
                        </h2>
                        <p className="text-[13px] font-medium text-white/90 mt-1 drop-shadow">
                          {item.location}
                        </p>
                      </div>

                      <p className="text-[14px] text-white/95 leading-relaxed mb-14 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-3">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-center gap-16 mb-16">
                        <div className="relative w-[110px] h-[155px] flex-shrink-0 flex items-center justify-center">
                          <img
                            src={item.thumbImage}
                            alt={item.name}
                            className="w-full h-full object-contain filter drop-shadow-[0_10px_24px_rgba(0,0,0,0.7)]"
                            onError={(e) => {
                              e.currentTarget.src = item.productImage;
                            }}
                          />
                        </div>
                        <div className="flex flex-col text-left justify-center">
                          <span className="text-[10px] text-gray-300 font-mono tracking-widest">PRICE</span>
                          <div className="flex items-baseline gap-4 mt-1">
                            <span className="text-[26px] font-bold font-mono text-white drop-shadow">
                              ¥{item.price.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-gray-200 font-medium drop-shadow">税込</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/products/hoodie-day/${item.id}`}
                        className="group inline-flex items-center justify-center gap-8 bg-white text-black h-[44px] w-full max-w-[280px] rounded-full font-bold text-[14px] hover:bg-gray-200 transition-all cursor-pointer shadow-2xl active:scale-95"
                      >
                        <span>このCanvasの物語へ</span>
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}

          {/* セクション下部進捗バー */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 z-30">
            <div 
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${Math.min(100, (gp / TOTAL_GP) * 100)}%` }}
            />
          </div>

        </div>
      </div>

      {/* =========================================================
         SECTION 7: Footer
         ========================================================= */}
      <Footer />

    </div>
  );
}