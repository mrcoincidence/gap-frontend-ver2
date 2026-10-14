// app/products/jacket/01/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Heart, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Ruler, 
  Share2, 
  Minus, 
  Plus, 
  User as UserIcon,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';

// =================================================================
// 1. 商品基本データ (jk-01)
// =================================================================
const productData = {
  id: 'jk-01',
  name: 'Gap × Malbon テクスチャー ポプリン アノラックジャケット',
  category: 'メンズ ジャケット',
  price: 22900,
  itemNumber: '1181383',
  description: [
    'アメリカンスポーツウェアをモダンにアップデート。大胆なスイングも、力強いサーブも。自分らしいスタイルで楽しむ人へ。',
    'クリンクル (しわ) 加工を施した独特な表情と質感のある優しく心地良い肌触りのコットンポプリン生地で作られたアノラックジャケット、オーバーサイズ。',
    'モックネック。',
    '長袖。',
    'スナップボタンと隠しファスナー。',
    'スラントポケット。',
    '裾ゴム、ドローストリング付き。',
    '胸にGap × Malbonロゴ刺しゅう。',
    'フロントとバックに熱や蒸れを排出するベンチレーション。',
    'メッシュ裏地。'
  ],
  fitAndSize: {
    overview: [
      'オーバーサイズ、ルーズフィット',
      'タイト過ぎずルーズ過ぎないクラシックな程よいフィット感がお好みの方にはワンサイズダウンをおすすめします。',
      '腰にかかるくらいの丈',
      '身長175cmのモデル: Gapサイズ「S」を着用、身長185.5cmのモデル: Gapサイズ「M」を着用'
    ],
    measurements: [
      { size: 'XS', width: '58.5cm', sleeve: '85.0cm', length: '64.0cm' },
      { size: 'S', width: '61.0cm', sleeve: '87.5cm', length: '66.0cm' },
      { size: 'M', width: '63.5cm', sleeve: '90.0cm', length: '68.0cm' },
      { size: 'L', width: '67.5cm', sleeve: '92.5cm', length: '70.0cm' },
      { size: 'XL', width: '72.5cm', sleeve: '94.5cm', length: '72.5cm' }
    ]
  },
  materialsCare: [
    'コットン 63%、ナイロン 32%、ポリウレタン 5%',
    '洗濯機洗いの際は、冷水で洗ってください。',
    '温度調節機能がついている乾燥機のみ低温乾燥可。'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    {
      id: 'vintage-navy',
      name: 'ヴィンテージネイビー',
      images: [
        '/images/products/jacket/01/jk-01-navy-0.jpg',
        '/images/products/jacket/01/jk-01-navy-1.jpg',
        '/images/products/jacket/01/jk-01-navy-2.jpg',
        '/images/products/jacket/01/jk-01-navy-3.jpg',
        '/images/products/jacket/01/jk-01-navy-4.jpg',
        '/images/products/jacket/01/jk-01-navy-5.jpg'
      ]
    },
    {
      id: 'light-peony',
      name: 'ライトピオニー',
      images: [
        '/images/products/jacket/01/jk-01-pink-0.jpg',
        '/images/products/jacket/01/jk-01-pink-1.jpg',
        '/images/products/jacket/01/jk-01-pink-2.jpg',
        '/images/products/jacket/01/jk-01-pink-3.jpg',
        '/images/products/jacket/01/jk-01-pink-4.jpg'
      ]
    }
  ]
};

// 他のおすすめ商品データ
const recommendationProducts = [
  {
    id: 'rec-01',
    name: 'ヴィンテージソフト GAP NYタイムズスクエア パーカー',
    category: 'メンズ パーカー',
    price: '¥9,990',
    img: '/images/recommendations/recom-01.jpg',
    fallback: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-02',
    name: 'ヘビーウェイト オーバーサイズジップパーカー',
    category: 'メンズ パーカー',
    price: '¥11,900',
    img: '/images/recommendations/recom-02.jpg',
    fallback: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-03',
    name: 'スーパーバギーデニム',
    category: 'メンズ デニム',
    price: '¥9,990',
    img: '/images/recommendations/recom-05.jpg',
    fallback: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-04',
    name: 'バーシティスタイル GAPロゴTシャツ',
    category: 'メンズ Tシャツ',
    price: '¥7,990',
    img: '/images/recommendations/recom-06.jpg',
    fallback: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
  }
];

export default function ProductDetailPage() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // ビデオコントロール
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // デスクトップ用パララックススクロールオフセット
  const lookbookContainerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = window.requestAnimationFrame(() => {
        if (lookbookContainerRef.current) {
          const rect = lookbookContainerRef.current.getBoundingClientRect();
          setOffsetY(-rect.top);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const recomScrollRef = useRef<HTMLDivElement>(null);
  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const availableSizes = ['S', 'M', 'L', 'XL'];

  const [openAccordion, setOpenAccordion] = useState<{ [key: string]: boolean }>({
    overview: true,
    sizeFit: false,
    material: false,
    reviews: false,
    shipping: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentColor = productData.colors[selectedColorIndex];
  const currentImages = currentColor.images;

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white text-gap-dark font-sans flex flex-col justify-between overflow-x-clip">
      <Header />

      <main className="max-w-[1600px] mx-auto px-[24px] lg:px-24 py-16 md:py-24 w-full">
        
        {/* =========================================================
           1. 商品詳細エリア (上部)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* 7/12幅：サムネイル ＆ メイン画像エリア */}
          <div className="lg:col-span-7 lg:sticky lg:top-[100px] lg:h-[calc(100vh-120px)] flex flex-col justify-start">
            <div className="flex flex-col lg:flex-row gap-8 items-start h-full w-full">
              
              {/* サムネイル画像エリア (PC時: 幅80px固定) */}
              <div className="hidden lg:flex flex-col gap-8 w-[80px] flex-shrink-0 max-h-full overflow-y-auto no-scrollbar">
                {currentImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-[80px] aspect-[4/5] bg-white border-2 rounded-sm overflow-hidden flex-shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-black' : 'border-transparent hover:border-gap-border-dark'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${currentColor.name} サムネイル ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&auto=format&fit=crop&q=60';
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* メイン画像エリア */}
              <div className="flex-1 relative h-[65vh] lg:h-full -mx-[24px] lg:mx-0 w-screen max-w-none lg:w-full bg-white rounded-none lg:rounded-sm overflow-hidden flex items-start justify-center group">
                <img
                  src={currentImages[selectedImageIndex]}
                  alt={productData.name}
                  className="w-full h-full object-contain object-top"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                
                <button
                  onClick={handlePrevImage}
                  aria-label="前の画像"
                  className="absolute left-16 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  aria-label="次の画像"
                  className="absolute right-16 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/60 text-white text-11 px-12 py-4 rounded-full tracking-wider">
                  {selectedImageIndex + 1} / {currentImages.length}
                </div>
              </div>

            </div>

            {/* モバイル用サムネイル */}
            <div className="flex lg:hidden gap-8 overflow-x-auto pt-12 pb-4 no-scrollbar">
              {currentImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-[68px] aspect-[4/5] flex-shrink-0 bg-white border-2 rounded-sm overflow-hidden ${
                    selectedImageIndex === idx ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&auto=format&fit=crop&q=60';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 5/12幅：商品情報エリア */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <p className="text-13 text-[#999999] mb-4 font-normal tracking-wide">
                {productData.category}
              </p>
              <h1 className="text-[20px] md:text-[24px] font-bold text-gap-dark leading-snug">
                {productData.name}
              </h1>
            </div>

            <div className="text-[16px] font-bold text-gap-dark">
              ¥{productData.price.toLocaleString()} <span className="text-12 font-normal text-gap-muted">(税込)</span>
            </div>

            <hr className="border-gap-border my-2" />

            {/* カラーバリエーション */}
            <div>
              <div className="flex justify-between items-center text-13 mb-8">
                <span className="font-bold">カラー：{currentColor.name}</span>
              </div>
              <div className="flex gap-10">
                {productData.colors.map((color, idx) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setSelectedImageIndex(0);
                    }}
                    className={`relative w-[64px] aspect-[4/5] border-2 rounded-sm overflow-hidden bg-white transition-all ${
                      selectedColorIndex === idx ? 'border-black' : 'border-transparent hover:border-gap-border-dark'
                    }`}
                    title={color.name}
                  >
                    <img
                      src={color.images[0]}
                      alt={color.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&auto=format&fit=crop&q=60';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* サイズ選択 */}
            <div>
              <div className="flex justify-between items-center mb-10 text-13">
                <span className="font-bold">サイズを選択</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-4 text-gap-muted hover:text-black transition-colors underline"
                >
                  <Ruler size={14} />
                  <span>サイズ確認する</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-8">
                {productData.sizes.map((sz) => {
                  const isAvailable = availableSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedSize(sz)}
                      className={`relative py-6 px-12 border text-13 font-bold rounded-sm transition-all overflow-hidden flex items-center justify-center ${
                        !isAvailable
                          ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed select-none'
                          : selectedSize === sz 
                          ? 'border-gap-navy bg-gap-navy text-white' 
                          : 'border-gap-border-dark bg-white text-gap-dark hover:border-black'
                      }`}
                    >
                      <span>{sz}</span>
                      {!isAvailable && (
                        <svg 
                          className="absolute inset-0 w-full h-full text-gray-300 pointer-events-none" 
                          preserveAspectRatio="none" 
                          viewBox="0 0 100 100"
                        >
                          <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
              {!selectedSize && (
                <p className="text-11 text-gap-muted mt-6">※ サイズを選択してください</p>
              )}
            </div>

            {/* ヴァーチャル試着 UI */}
            <div className="flex items-center justify-between py-6 my-1">
              <div className="flex items-center gap-10">
                <div className="hidden sm:flex items-center flex-shrink-0">
                  <div className="w-[36px] h-[36px] rounded-full border-2 border-gap-navy overflow-hidden bg-white flex items-center justify-center relative z-10">
                    <img 
                      src={currentImages[1] || currentImages[0]} 
                      alt="着用モデル"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&auto=format&fit=crop&q=60';
                      }}
                    />
                  </div>
                  <div className="w-[36px] h-[36px] rounded-full border border-dashed border-gap-navy flex items-center justify-center -ml-3 bg-white relative z-0 text-gap-navy">
                    <UserIcon size={18} strokeWidth={1.75} />
                  </div>
                </div>

                <span className="text-[14px] text-gray-800 font-normal">
                  似合うか不安ですか？
                </span>
              </div>

              <button 
                type="button"
                className="font-bold text-[13px] text-gap-dark hover:text-gap-navy flex items-center gap-4 hover:underline transition-colors whitespace-nowrap"
              >
                <Sparkles size={16} />
                <span>ヴァーチャル試着する</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* カート・数量・お気に入り ＆ 在庫リンク */}
            <div className="flex flex-col gap-10 mt-2">
              <div className="flex items-center gap-12">
                <div className="flex items-center justify-between bg-[#f4f4f4] rounded-full px-16 py-10 w-[140px] h-[52px] flex-shrink-0 select-none">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    aria-label="数量を減らす"
                    className="text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-[17px] font-normal text-black font-sans px-8">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="数量を増やす"
                    className="text-gray-600 hover:text-black transition-opacity"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button 
                  disabled={!selectedSize}
                  className="flex-1 bg-gap-navy text-white rounded-full h-[52px] font-bold text-[16px] hover:bg-[#001b3d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center tracking-wider"
                >
                  カートに入れる
                </button>
              </div>

              <div className="flex items-center justify-between text-[13px] px-4">
                <span className="text-gray-600">在庫あり</span>
                <button 
                  type="button"
                  className="font-bold text-gap-dark hover:text-gap-navy hover:underline flex items-center gap-4 transition-colors"
                >
                  <MapPin size={14} />
                  <span>店舗の在庫を確認する</span>
                </button>
              </div>

              <div className="flex items-center gap-12">
                <button
                  aria-label="共有する"
                  className="w-[48px] h-[48px] rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-black hover:text-black transition-colors flex-shrink-0"
                >
                  <Share2 size={18} />
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 h-[48px] rounded-full border flex items-center justify-center gap-8 text-[14px] font-normal transition-colors ${
                    isFavorite 
                      ? 'border-gap-red text-gap-red bg-red-50' 
                      : 'border-gray-300 hover:border-black text-gray-800'
                  }`}
                >
                  <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                  <span>お気に入りに追加する</span>
                </button>
              </div>
            </div>

            {/* アコーディオンエリア */}
            <div className="border-t border-gap-border mt-10 divide-y divide-gap-border">
              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('overview')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark"
                >
                  <span>商品概要</span>
                  {openAccordion.overview ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.overview && (
                  <div className="pt-12 text-13 text-gap-muted space-y-6 leading-relaxed">
                    {productData.description.map((line, idx) => (
                      <p key={idx}>• {line}</p>
                    ))}
                    <p className="pt-6 text-11 text-gray-400">商品番号: {productData.itemNumber}</p>
                  </div>
                )}
              </div>

              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('sizeFit')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark"
                >
                  <span>サイズ・フィット感</span>
                  {openAccordion.sizeFit ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.sizeFit && (
                  <div className="pt-12 text-13 text-gap-muted space-y-12">
                    <ul className="space-y-4">
                      {productData.fitAndSize.overview.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>

                    <div className="overflow-x-auto border border-gap-border">
                      <table className="w-full text-12 text-left">
                        <thead className="bg-gap-gray border-b border-gap-border font-bold text-gap-dark">
                          <tr>
                            <th className="p-8">サイズ</th>
                            <th className="p-8">身幅</th>
                            <th className="p-8">裄丈</th>
                            <th className="p-8">着丈</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gap-border">
                          {productData.fitAndSize.measurements.map((row) => (
                            <tr key={row.size}>
                              <td className="p-8 font-bold">{row.size}</td>
                              <td className="p-8">{row.width}</td>
                              <td className="p-8">{row.sleeve}</td>
                              <td className="p-8">{row.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('material')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark"
                >
                  <span>素材・お手入れ</span>
                  {openAccordion.material ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.material && (
                  <div className="pt-12 text-13 text-gap-muted space-y-4 leading-relaxed">
                    {productData.materialsCare.map((m, idx) => (
                      <p key={idx}>• {m}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('reviews')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark"
                >
                  <div className="flex items-center gap-8">
                    <span>レビュー (10)</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  {openAccordion.reviews ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.reviews && (
                  <div className="pt-12 text-13 text-gap-muted space-y-12">
                    <div className="bg-gap-gray p-16 rounded-sm">
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-gap-dark">軽やかで機能性抜群</span>
                        <span className="text-11">2026/09/24</span>
                      </div>
                      <p className="text-12">
                        クリンクルポプリンの独特なシワ感とMalbonの刺繍ロゴがプレミアム感を演出してくれます。通気性も良く、スポーツにもタウンユースにも最高です。
                      </p>
                    </div>
                    <button className="w-full border border-gap-border-dark py-10 font-bold text-12 text-gap-dark hover:bg-gap-gray">
                      レビューを書く
                    </button>
                  </div>
                )}
              </div>

              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('shipping')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark"
                >
                  <span>配送・交換・返品について</span>
                  {openAccordion.shipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.shipping && (
                  <div className="pt-12 text-13 text-gap-muted space-y-6 leading-relaxed">
                    <p>• <strong>送料無料</strong>：税込5,000円以上のお買い上げで送料無料でお届けします。</p>
                    <p>• <strong>スピード配送</strong>：ご注文から最短翌日〜3日以内でお届けします。</p>
                    <p>• <strong>返品・交換</strong>：商品到着後30日以内であればオンラインまたは全国のGap店舗にて返品可能です。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
           2. プロモーションビデオセクション (上部2カラム見出し ＆ リード文)
           ========================================================= */}
        <section className="mt-48 pt-32 border-t border-gap-border">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-end mb-24">
            <div className="md:col-span-6 text-left">
              <span className="text-[12px] font-bold tracking-[0.2em] text-gap-navy uppercase">
                Limited Collaboration
              </span>
              <h2 className="text-[28px] md:text-[38px] font-bold text-gap-dark tracking-tight mt-4 uppercase leading-none">
                GAP × Malbon Golf
              </h2>
            </div>
            <div className="md:col-span-6 text-left">
              <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                アメリカンスポーツウェアのクラシシズムと、現代のゴルフ・ストリートカルチャーが融合。コースから日常へとシームレスに繋がるコレクションムービーをご覧ください。
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[2560/1020] bg-black rounded-[4px] overflow-hidden group shadow-lg">
            <video 
              ref={videoRef}
              src="https://content.gapinc.com/d/my31rx0bqiy42q8m5d456nj358ugaqkc.mp4" 
              poster="https://content.gapinc.com/d/0302m2m5oxt1y368bi5qkpto0d78a4si.jpg" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-16 right-16 flex items-center gap-8 z-20">
              <button 
                onClick={toggleVideoPlay}
                aria-label={isPlaying ? "動画を一時停止" : "動画を再生"}
                className="w-[40px] h-[40px] rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-[1px]" />}
              </button>
              <button 
                onClick={toggleVideoMute}
                aria-label={isMuted ? "ミュート解除" : "ミュート"}
                className="w-[40px] h-[40px] rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
           3. ルックブックセクション (THE LOOKS)
           ========================================================= */}
        <section ref={lookbookContainerRef} className="mt-48 pt-24">
          
          <div className="mb-24">
            <span className="text-[12px] font-bold text-gray-500 tracking-widest uppercase">Editorial Lookbook</span>
            <h2 className="text-[26px] md:text-[34px] font-bold text-gap-dark tracking-tight mt-4">
              THE LOOKS
            </h2>
          </div>

          {/* -------------------------------------------------------
             モバイル表示 (md未満): 画面幅いっぱい・縦1カラム
             ------------------------------------------------------- */}
          <div className="block md:hidden space-y-16 -mx-[24px]">
            <img 
              src="/images/products/jacket/01/lookbook/look-01.jpg" 
              alt="Look 01" 
              className="w-full h-auto block" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&auto=format&fit=crop&q=80'; }}
            />
            <img 
              src="/images/products/jacket/01/lookbook/look-02.jpg" 
              alt="Look 02" 
              className="w-full h-auto block" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80'; }}
            />
            <img 
              src="/images/products/jacket/01/lookbook/look-03.jpg" 
              alt="Look 03" 
              className="w-full h-auto block" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'; }}
            />
            <img 
              src="/images/products/jacket/01/lookbook/look-04.jpg" 
              alt="Look 04" 
              className="w-full h-auto block" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80'; }}
            />
            <img 
              src="/images/products/jacket/01/lookbook/look-05.jpg" 
              alt="Look 05" 
              className="w-full h-auto block" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'; }}
            />
            <img 
              src="/images/products/jacket/01/lookbook/look-06.jpg" 
              alt="Look 06" 
              className="w-full h-auto block" 
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'; }}
            />
          </div>

          {/* -------------------------------------------------------
             デスクトップ表示 (md以上): Parallax・ボーダーなし・位置＆重なり調整
             ------------------------------------------------------- */}
          <div className="hidden md:block space-y-64">
            
            {/* look-01.jpg: 比率そのまま・Static */}
            <div className="w-full overflow-hidden rounded-[2px]">
              <img 
                src="/images/products/jacket/01/lookbook/look-01.jpg" 
                alt="Look 01"
                className="w-full h-auto block"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&auto=format&fit=crop&q=80'; }}
              />
            </div>

            {/* グループ1: 02 (1200x960) & 03 (720x960)
                02の上に03が右側50px被り、ボーダーなし、03が早く動く */}
            <div className="relative flex items-start justify-center min-h-[850px]">
              
              {/* look-02 (奥・ベース・幅約62%) */}
              <div 
                className="relative w-[62%] z-0 rounded-[2px] overflow-hidden shadow-md"
                style={{
                  transform: `translate3d(0, ${offsetY * 0.03}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/images/products/jacket/01/lookbook/look-02.jpg" 
                  alt="Look 02" 
                  className="w-full aspect-[1200/960] object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80'; }}
                />
              </div>

              {/* look-03 (手前・02の右側に約50px重なる・幅約38%・より早く動く) */}
              <div 
                className="relative w-[38%] -ml-[50px] mt-48 z-10 rounded-[2px] overflow-hidden shadow-2xl"
                style={{
                  transform: `translate3d(0, ${offsetY * 0.11}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/images/products/jacket/01/lookbook/look-03.jpg" 
                  alt="Look 03" 
                  className="w-full aspect-[720/960] object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'; }}
                />
              </div>

            </div>

            {/* グループ2: 04 (720x960), 05 (800x1200), 06 (799x1200)
                04を200px上へ引き上げ(top-[-200px])、04を右へ(left-[10%])、05を左へ(right-[10%])、06は04と同じ距離右へ(left-[16%])。
                06は幅を30%縮小(35%)。奥のレイヤーほど早く動く (04 > 05 > 06) */}
            <div className="relative min-h-[1450px]">
              
              {/* 04 (最背面・左側から右へ移動 left-[10%]・縦方向に200px引き上げ top-[-200px]・速度 大) */}
              <div 
                className="absolute left-[10%] top-[-200px] w-[46%] z-0 rounded-[2px] overflow-hidden shadow-md"
                style={{
                  transform: `translate3d(0, ${offsetY * 0.13}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/images/products/jacket/01/lookbook/look-04.jpg" 
                  alt="Look 04" 
                  className="w-full aspect-[720/960] object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80'; }}
                />
              </div>

              {/* 05 (中間・右側から左へ移動 right-[10%]・04と約50px重なる・速度 中) */}
              <div 
                className="absolute right-[10%] top-[260px] w-[52%] z-10 rounded-[2px] overflow-hidden shadow-xl"
                style={{
                  transform: `translate3d(0, ${offsetY * 0.07}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/images/products/jacket/01/lookbook/look-05.jpg" 
                  alt="Look 05" 
                  className="w-full aspect-[800/1200] object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80'; }}
                />
              </div>

              {/* 06 (最前面・04に合わせて右へ移動 left-[16%]・サイズ30%縮小 w-[35%]・速度 小) */}
              <div 
                className="absolute left-[16%] top-[680px] w-[35%] z-20 rounded-[2px] overflow-hidden shadow-2xl"
                style={{
                  transform: `translate3d(0, ${offsetY * 0.02}px, 0)`,
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/images/products/jacket/01/lookbook/look-06.jpg" 
                  alt="Look 06" 
                  className="w-full aspect-[799/1200] object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80'; }}
                />
              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
           4. コレクション全アイテム一覧 (CTAボタン ＆ リード文章)
           ========================================================= */}
        <section className="mt-[292px] pt-20">
          
          <div className="mb-24">
            <span className="text-[12px] font-bold text-gap-navy tracking-widest uppercase">The Full Lineup</span>
            <h2 className="text-[24px] md:text-[30px] font-bold text-gap-dark tracking-tight mt-4">
              COLLECTION ITEMS
            </h2>
          </div>

          {/* 2つの正方形画像 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            
            {/* item-01.jpg (正方形) */}
            <div className="relative aspect-square bg-[#f8f8f8] rounded-[2px] overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src="/images/products/jacket/01/collection/item-01.jpg" 
                alt="Collection Item 01"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/products/jacket/01/jk-01-navy-0.jpg';
                }}
              />
            </div>

            {/* item-02.jpg (正方形) */}
            <div className="relative aspect-square bg-[#f8f8f8] rounded-[2px] overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src="/images/products/jacket/01/collection/item-02.jpg" 
                alt="Collection Item 02"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1000&auto=format&fit=crop&q=80';
                }}
              />
            </div>

          </div>

          {/* CTAボタン (矢印アイコン付き) ＆ 右側リード文 */}
          <div className="mt-28 md:mt-36 flex flex-col md:flex-row md:items-center gap-16 md:gap-32">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-8 bg-gap-navy text-white text-[14px] md:text-[15px] font-bold px-32 py-14 rounded-full hover:bg-[#001b3d] transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
            >
              <span>Gap × Malbon全アイテムを見る</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-3" />
            </Link>

            <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed font-normal max-w-[620px]">
              コース上の機能性とストリートの洗練が融合。アウターからボトムス、アクセサリーまで、今シーズン限りの特別なコラボレーションアイテムをお見逃しなく。
            </p>
          </div>

        </section>

        {/* =========================================================
           5. 他のおすすめセクション (GAP 24px化)
           ========================================================= */}
        <section className="mt-48 pt-32 border-t border-gap-border">
          <div className="flex justify-between items-center mb-20">
            <h2 className="text-20 md:text-24 font-bold text-gap-dark">他のおすすめ</h2>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollContainer(recomScrollRef, 'left')}
                aria-label="前へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollContainer(recomScrollRef, 'right')}
                aria-label="次へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div 
            ref={recomScrollRef}
            className="flex gap-[24px] overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory -mr-[24px] pr-[24px] md:mr-0 md:pr-0"
          >
            {recommendationProducts.map((item) => (
              <div 
                key={item.id} 
                className="w-[58vw] sm:w-[240px] md:w-[calc((100%-72px)/4)] flex-shrink-0 snap-start flex flex-col"
              >
                <Link href="#" className="group flex flex-col">
                  <div className="aspect-[4/5] bg-white border border-gap-border rounded-[4px] overflow-hidden mb-12 flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = item.fallback;
                      }}
                    />
                  </div>
                  <p className="text-12 text-[#999999] font-normal">{item.category}</p>
                  <h3 className="text-14 font-bold text-gap-dark group-hover:text-gap-navy transition-colors line-clamp-1 mt-2">
                    {item.name}
                  </h3>
                  <p className="text-14 font-bold text-gap-dark mt-4">{item.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* サイズガイド モーダル */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-16">
          <div className="bg-white max-w-[640px] w-full p-24 rounded-sm shadow-2xl relative">
            <button 
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute right-16 top-16 text-gap-muted hover:text-black font-bold text-18 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-18 font-bold mb-16">サイズガイド (単位: cm)</h3>
            <div className="overflow-x-auto border border-gap-border">
              <table className="w-full text-13 text-left">
                <thead className="bg-gap-gray border-b border-gap-border font-bold">
                  <tr>
                    <th className="p-10">サイズ</th>
                    <th className="p-10">身幅</th>
                    <th className="p-10">裄丈</th>
                    <th className="p-10">着丈</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gap-border">
                  {productData.fitAndSize.measurements.map((row) => (
                    <tr key={row.size}>
                      <td className="p-10 font-bold">{row.size}</td>
                      <td className="p-10">{row.width}</td>
                      <td className="p-10">{row.sleeve}</td>
                      <td className="p-10">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-11 text-gap-muted mt-12">
              ※ 生地の特性上、1〜2cm程度の個体差が生じる場合があります。
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}