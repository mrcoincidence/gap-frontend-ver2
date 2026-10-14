// app/products/hoodie/04/page.tsx
'use client';

import { useState, useRef } from 'react';
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
  ExternalLink,
  User as UserIcon,
  Sparkles,
  Camera,
  Search as SearchIcon,
  Eye
} from 'lucide-react';

// =================================================================
// 1. 商品データ定義 (hd-04)
// =================================================================
const productData = {
  id: 'hd-04',
  name: 'リラックスフィット GAPロゴ フレンチテリー ジップアップパーカー',
  category: 'メンズ パーカー',
  price: 8990,
  itemNumber: '907375',
  description: [
    'リサイクルポリエステルを23%使用しています。リサイクル素材を使用することで、バージン素材と比べて、資源使用と廃棄物の削減につながります。',
    '優しく心地良い肌触りのフレンチテリー。',
    'ドロップショルダー、長袖、袖口リブ。',
    'フードにドローストリング付き、フロントファスナー。',
    '胸元とバックにGAPロゴ入り。',
    'カンガルーポケット、裾リブ。'
  ],
  fitAndSize: {
    overview: [
      'ストレートシルエット、ゆとりのあるリラックスフィット',
      'お尻がすっぽり隠れる丈',
      'モデルの身長185.5cm、Gapサイズ「M」を着用'
    ],
    measurements: [
      { size: 'XS', width: '58.5cm', shoulder: '54.5cm', sleeve: '85.5cm', length: '66.0cm' },
      { size: 'S', width: '61.0cm', shoulder: '57.0cm', sleeve: '88.5cm', length: '68.0cm' },
      { size: 'M', width: '63.5cm', shoulder: '59.5cm', sleeve: '91.0cm', length: '70.0cm' },
      { size: 'L', width: '67.5cm', shoulder: '63.5cm', sleeve: '93.5cm', length: '72.5cm' },
      { size: 'XL', width: '72.5cm', shoulder: '68.5cm', sleeve: '95.5cm', length: '75.0cm' }
    ]
  },
  materialsCare: [
    'コットン 77%、ポリエステル 23%',
    '洗濯機洗い可。',
    '温度調節機能がついている乾燥機のみ低温乾燥可。'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [
    {
      id: 'gray',
      name: 'ライトヘザーグレー',
      images: [
        '/images/products/hoodie/04/hd-04-gray-0.jpg',
        '/images/products/hoodie/04/hd-04-gray-1.jpg',
        '/images/products/hoodie/04/hd-04-gray-2.jpg',
        '/images/products/hoodie/04/hd-04-gray-3.jpg'
      ]
    },
    {
      id: 'yellow',
      name: 'チノ',
      images: [
        '/images/products/hoodie/04/hd-04-yellow-0.jpg',
        '/images/products/hoodie/04/hd-04-yellow-1.jpg',
        '/images/products/hoodie/04/hd-04-yellow-2.jpg'
      ]
    },
    {
      id: 'navy',
      name: 'ネイビー',
      images: [
        '/images/products/hoodie/04/hd-04-navy-0.jpg',
        '/images/products/hoodie/04/hd-04-navy-1.jpg',
        '/images/products/hoodie/04/hd-04-navy-2.jpg'
      ]
    }
  ]
};

// コーディネート一覧データ (hoodie 04用ディレクトリ)
const coordinateItems = [
  {
    id: 1,
    user: '@tokyo_street_style',
    img: '/images/products/hoodie/04/coordinates/coord-01.jpg',
    caption: 'フレンチテリーの軽やかな着心地が抜群 🗽'
  },
  {
    id: 2,
    user: '@kenji_casual_daily',
    img: '/images/products/hoodie/04/coordinates/coord-02.jpg',
    caption: 'チノカラー×デニムで落ち着いたアメカジスタイル。'
  },
  {
    id: 3,
    user: '@gap_staff_snap_jp',
    img: '/images/products/hoodie/04/coordinates/coord-03.jpg',
    caption: 'バックのロゴデザインがバックスタイルを引き立てます！'
  },
  {
    id: 4,
    user: '@daiki_street_fashion',
    img: '/images/products/hoodie/04/coordinates/coord-04.jpg',
    caption: 'ゆったりリラックスフィットでストレスフリー。'
  },
  {
    id: 5,
    user: '@yuto_ootd_tokyo',
    img: '/images/products/hoodie/04/coordinates/coord-05.jpg',
    caption: 'ネイビー×キャップの定番ストリートコーデ。'
  }
];

// 完成スタイル（コラージュ）データ (hoodie 04用ディレクトリ)
const completeTheLookBundles = [
  {
    id: 'bundle-1',
    title: '90s ストリートカジュアル',
    items: [
      {
        name: 'リラックスフィット ジップパーカー (当商品)',
        price: '¥8,990',
        top: '50%',
        left: '50%',
        width: '46%',
        img: '/images/products/hoodie/04/looks/look-01-item-01.png'
      },
      {
        name: 'ウォッシュド GAPロゴ ベースボールキャップ',
        price: '¥3,490',
        top: '20%',
        left: '76%',
        width: '26%',
        img: '/images/products/hoodie/04/looks/look-01-item-02.png'
      },
      {
        name: 'クラシック キャンバス スニーカー',
        price: '¥6,990',
        top: '76%',
        left: '74%',
        width: '30%',
        img: '/images/products/hoodie/04/looks/look-01-item-03.png'
      },
      {
        name: '90s ルーズフィット ストレートデニム',
        price: '¥8,990',
        top: '76%',
        left: '24%',
        width: '32%',
        img: '/images/products/hoodie/04/looks/look-01-item-04.png'
      },
      {
        name: 'リブ アンクルソックス (3足組)',
        price: '¥1,990',
        top: '22%',
        left: '22%',
        width: '24%',
        img: '/images/products/hoodie/04/looks/look-01-item-05.png'
      }
    ]
  },
  {
    id: 'bundle-2',
    title: 'アーバン スポーツスタイル',
    items: [
      {
        name: 'リラックスフィット ジップパーカー (当商品)',
        price: '¥8,990',
        top: '52%',
        left: '50%',
        width: '46%',
        img: '/images/products/hoodie/04/looks/look-02-item-01.png'
      },
      {
        name: 'ユーティリティ クロスボディバッグ',
        price: '¥4,490',
        top: '18%',
        left: '50%',
        width: '28%',
        img: '/images/products/hoodie/04/looks/look-02-item-02.png'
      },
      {
        name: 'レトロ ランニングシューズ',
        price: '¥9,900',
        top: '74%',
        left: '74%',
        width: '32%',
        img: '/images/products/hoodie/04/looks/look-02-item-03.png'
      },
      {
        name: 'テックフリース ジョガーパンツ',
        price: '¥7,990',
        top: '74%',
        left: '24%',
        width: '30%',
        img: '/images/products/hoodie/04/looks/look-02-item-04.png'
      }
    ]
  },
  {
    id: 'bundle-3',
    title: 'アイコニック レイヤード',
    items: [
      {
        name: 'アイコニック デニムジャケット',
        price: '¥12,900',
        top: '22%',
        left: '24%',
        width: '34%',
        img: '/images/products/hoodie/04/looks/look-03-item-02.png'
      },
      {
        name: 'リラックスフィット ジップパーカー (当商品)',
        price: '¥8,990',
        top: '50%',
        left: '50%',
        width: '48%',
        img: '/images/products/hoodie/04/looks/look-03-item-01.png'
      },
      {
        name: 'リラックス バギーチノ',
        price: '¥7,990',
        top: '74%',
        left: '72%',
        width: '34%',
        img: '/images/products/hoodie/04/looks/look-03-item-03.png'
      }
    ]
  }
];

// 他のおすすめ商品データ（全PDP共通・全6アイテム）
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
    name: 'ヘビーウェイト フレンチテリー ジップパーカー',
    category: 'メンズ パーカー',
    price: '¥5,999',
    img: '/images/recommendations/recom-02.jpg',
    fallback: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-03',
    name: 'リラックス GAPロゴ ジップアップパーカー',
    category: 'メンズ パーカー',
    price: '¥8,990',
    img: '/images/recommendations/recom-03.jpg',
    fallback: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-04',
    name: 'CashSoft カシミヤタッチ GAPロゴセーター',
    category: 'メンズ セーター',
    price: '¥10,900',
    img: '/images/recommendations/recom-04.jpg',
    fallback: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-05',
    name: '90s ルーズフィット ストレートデニム',
    category: 'メンズ デニム',
    price: '¥8,990',
    img: '/images/recommendations/recom-05.jpg',
    fallback: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'rec-06',
    name: 'ヘビーウェイト クロップドTシャツ',
    category: 'メンズ Tシャツ',
    price: '¥5,990',
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

  const coordScrollRef = useRef<HTMLDivElement>(null);
  const bundleScrollRef = useRef<HTMLDivElement>(null);
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

  const availableSizes = ['L', 'XL'];

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
           1. 商品説明セクション
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
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=60';
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* メイン画像エリア: モバイル時は全幅表示 */}
              <div className="flex-1 relative h-[65vh] lg:h-full -mx-[24px] lg:mx-0 w-screen max-w-none lg:w-full bg-white rounded-none lg:rounded-sm overflow-hidden flex items-start justify-center group">
                <img
                  src={currentImages[selectedImageIndex]}
                  alt={productData.name}
                  className="w-full h-full object-contain object-top"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                
                {/* 矢印ナビゲーション */}
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
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&auto=format&fit=crop&q=60';
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
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=150&auto=format&fit=crop&q=60';
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

            {/* ヴァーチャル試着 UI (モバイル時はアイコン非表示 ＆ 左右両端配置) */}
            <div className="flex items-center justify-between py-6 my-1">
              <div className="flex items-center gap-10">
                <div className="hidden sm:flex items-center flex-shrink-0">
                  <div className="w-[36px] h-[36px] rounded-full border-2 border-gap-navy overflow-hidden bg-white flex items-center justify-center relative z-10">
                    <img 
                      src={currentImages[1] || currentImages[0]} 
                      alt="着用モデル"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&auto=format&fit=crop&q=60';
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
                            <th className="p-8">肩幅</th>
                            <th className="p-8">裄丈</th>
                            <th className="p-8">着丈</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gap-border">
                          {productData.fitAndSize.measurements.map((row) => (
                            <tr key={row.size}>
                              <td className="p-8 font-bold">{row.size}</td>
                              <td className="p-8">{row.width}</td>
                              <td className="p-8">{row.shoulder}</td>
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
                    <span>レビュー (12)</span>
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
                        <span className="font-bold text-gap-dark">最高の着心地</span>
                        <span className="text-11">2026/09/24</span>
                      </div>
                      <p className="text-12">
                        生地がとても柔らかく、リラックス感のあるシルエットが気に入っています。
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
           2. みんなのGAPコーディネートをチェック (GAP 24px化)
           ========================================================= */}
        <section className="mt-32 pt-20 border-t border-gap-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-20">
            <div className="w-full md:w-auto">
              <h2 className="text-20 md:text-24 font-bold text-gap-dark">
                みんなのGAPコーディネートをチェック
              </h2>
              <p className="text-13 text-gap-muted mt-4">
                Instagramで <span className="font-bold text-gap-dark">#GAPStyle</span> をつけて（写真をアップロード）投稿すれば、あなたの素敵なコーディネートも掲載されるチャンス
              </p>
              
              <button 
                type="button"
                className="mt-12 w-full md:w-auto inline-flex items-center justify-center gap-6 px-16 py-8 border border-gap-border-dark rounded-full text-12 font-bold text-gap-dark hover:bg-black hover:text-white transition-colors"
              >
                <Camera size={16} />
                <span>写真をアップロード</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-8 self-end md:self-auto">
              <button 
                onClick={() => scrollContainer(coordScrollRef, 'left')}
                aria-label="前へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollContainer(coordScrollRef, 'right')}
                aria-label="次へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div 
            ref={coordScrollRef}
            className="flex gap-[24px] overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory -mr-[24px] pr-[24px] md:mr-0 md:pr-0"
          >
            {coordinateItems.map((item) => (
              <div 
                key={item.id} 
                className="w-[72vw] sm:w-[320px] md:w-[calc((100%-48px)/3)] flex-shrink-0 snap-start flex flex-col"
              >
                <div className="relative aspect-square bg-gap-gray overflow-hidden rounded-[4px] group">
                  <img
                    src={item.img}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80';
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-14 text-white">
                    <div className="flex items-center gap-10">
                      <div className="w-[48px] h-[48px] rounded-full bg-black/75 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <SearchIcon size={20} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-[13px] font-bold leading-tight truncate">
                          {item.user}
                        </p>
                        <p className="text-[11px] text-gray-200 mt-1 line-clamp-1">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-[72vw] sm:w-[320px] md:w-[calc((100%-48px)/3)] flex-shrink-0 snap-start flex flex-col">
              <div className="aspect-square bg-[#f6f6f6] rounded-[4px] border border-dashed border-gray-300 flex flex-col items-center justify-center p-24 text-center">
                <p className="text-[14px] md:text-[15px] font-bold text-gap-dark leading-relaxed mb-16">
                  いち早く素敵なコーディネートを<br />シェアしよう
                </p>
                <button 
                  type="button"
                  aria-label="写真をシェアする"
                  className="w-[48px] h-[48px] rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                >
                  <Plus size={22} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
           3. あなただけのGAPスタイルを完成させよう (GAP 24px化)
           ========================================================= */}
        <section className="mt-32 pt-20 border-t border-gap-border">
          <div className="flex justify-between items-center mb-20">
            <h2 className="text-20 md:text-24 font-bold text-gap-dark">
              あなただけのGAPスタイルを完成させよう
            </h2>

            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollContainer(bundleScrollRef, 'left')}
                aria-label="前へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollContainer(bundleScrollRef, 'right')}
                aria-label="次へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div 
            ref={bundleScrollRef}
            className="flex gap-[24px] overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory -mr-[24px] pr-[24px] md:mr-0 md:pr-0"
          >
            {completeTheLookBundles.map((bundle) => (
              <div 
                key={bundle.id}
                className="w-[78vw] sm:w-[360px] md:w-[calc((100%-48px)/3)] flex-shrink-0 snap-start"
              >
                <div className="relative aspect-[3/4] bg-[#f1f1f1] rounded-[4px] overflow-hidden group/card select-none">
                  <div className="absolute inset-0">
                    {bundle.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group/pin transition-transform duration-300 hover:scale-105"
                        style={{
                          top: item.top,
                          left: item.left,
                          width: item.width
                        }}
                      >
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-full h-auto object-contain drop-shadow-md"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80';
                          }}
                        />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <button 
                            type="button"
                            aria-label={`${item.name}のピン`}
                            className="w-20 h-20 rounded-full border-2 border-gray-400 bg-white/70 shadow-sm flex items-center justify-center hover:scale-125 transition-transform"
                          />

                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 hidden group-hover/pin:flex flex-col bg-white p-10 shadow-xl border border-gap-border rounded-[4px] w-[180px] z-30 pointer-events-auto">
                            <p className="text-11 font-bold text-gap-dark line-clamp-1">{item.name}</p>
                            <p className="text-12 font-bold text-gap-navy mt-1">{item.price}</p>
                            <Link href="#" className="mt-4 text-10 font-bold underline text-black flex items-center gap-2">
                              <span>詳細を見る</span>
                              <ExternalLink size={10} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute left-14 bottom-14 z-20">
                    <button 
                      type="button"
                      className="bg-white/95 hover:bg-white text-black text-12 font-bold rounded-full px-12 py-6 shadow-sm border border-gray-200 flex items-center gap-6 transition-all"
                    >
                      <Eye size={16} />
                      <span className="hidden sm:inline">コーデ全体を見る</span>
                    </button>
                  </div>
                </div>

                <p className="text-13 font-bold text-gap-dark mt-8 line-clamp-1">
                  {bundle.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
           4. 他のおすすめセクション (GAP 24px化)
           ========================================================= */}
        <section className="mt-32 pt-20 border-t border-gap-border">
          <div className="flex justify-between items-center mb-20">
            <h2 className="text-20 md:text-24 font-bold text-gap-dark">他のおすすめ</h2>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollContainer(recomScrollRef, 'left')}
                aria-label="前へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollContainer(recomScrollRef, 'right')}
                aria-label="次へ" 
                className="w-[48px] h-[48px] border border-gap-border flex items-center justify-center rounded-full hover:bg-gap-gray transition-colors"
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
              className="absolute right-16 top-16 text-gap-muted hover:text-black font-bold text-18"
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
                    <th className="p-10">肩幅</th>
                    <th className="p-10">裄丈</th>
                    <th className="p-10">着丈</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gap-border">
                  {productData.fitAndSize.measurements.map((row) => (
                    <tr key={row.size}>
                      <td className="p-10 font-bold">{row.size}</td>
                      <td className="p-10">{row.width}</td>
                      <td className="p-10">{row.shoulder}</td>
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