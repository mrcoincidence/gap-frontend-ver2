// app/products/hoodie-day/01/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VirtualTryOnModalHoodie from '@/components/VirtualTryOnModal-hoodie';
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
  Sparkles
} from 'lucide-react';

// =================================================================
// 1. 商品基本データ
// =================================================================
const productData = {
  id: 'hd-01',
  name: "Adult Heavyweight Logo Hoodie by Henry's Pizza",
  category: 'ユニセックス パーカー / コラボレーション',
  price: 8990,
  itemNumber: '1199912',
  colorName: 'ライトヘザーグレー',
  images: [
    '/images/products/hoodie-day/01/hd-01-0.jpg',
    '/images/products/hoodie-day/01/hd-01-1.jpg',
    '/images/products/hoodie-day/01/hd-01-2.jpg',
    '/images/products/hoodie-day/01/hd-01-3.jpg',
    '/images/products/hoodie-day/01/hd-01-4.jpg',
    '/images/products/hoodie-day/01/hd-01-5.jpg'
  ],
  description: [
    "日本人グラフィックアーティストVERDYが2023年に地元・大阪でオープンしたニューヨークスタイルのピザショップ「Henry's PIZZA」とGapの限定コラボレーションフーディー。",
    '肌触りが柔らかく、適度な保温性を備えたプレミアムな裏起毛コットン混フリース生地。',
    'ドローストリング付きフード。',
    '長袖、ドロップショルダー。',
    'カンガルーポケット。',
    'フロントおよびバックにアイコニックなHenry\'s Pizzaオリジナルグラフィックプリント。',
    '袖口と裾は型崩れしにくい伸縮性リブ仕様。',
    'ジェンダーレスで着用できるリラックスシルエット。'
  ],
  fitAndSize: {
    overview: [
      'リラックスフィット、ドロップショルダー',
      'タイト過ぎず適度なゆとりを持たせたストリートスタイル。',
      'クラシックなジャストフィットがお好みの方にはワンサイズダウンをおすすめします。',
      '腰にかかる丈感。',
      '男性モデル (身長180cm): Lサイズ着用 / 女性モデル (身長168cm): Sサイズ着用'
    ],
    measurements: [
      { size: 'XS', width: '56.0cm', sleeve: '83.0cm', length: '65.0cm' },
      { size: 'S', width: '59.0cm', sleeve: '85.5cm', length: '67.0cm' },
      { size: 'M', width: '62.0cm', sleeve: '88.0cm', length: '69.0cm' },
      { size: 'L', width: '66.0cm', sleeve: '91.0cm', length: '71.5cm' },
      { size: 'XL', width: '70.0cm', sleeve: '93.5cm', length: '74.0cm' }
    ]
  },
  materialsCare: [
    'コットン 77%、ポリエステル 23%',
    '洗濯機洗い可（冷水・弱水流推奨、同系色と一緒に洗濯）。',
    'プリント部分への直接のアイロンはお避けください。',
    '漂白剤の使用はお控えいただき、乾燥機は低温乾燥のみご使用いただけます。'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL']
};

// 他の4つのキャンバスデータ（02〜05）
const recommendationProducts = [
  {
    id: '02',
    name: 'Gap × Eduardo Sarabia グラフィック フーディー',
    category: 'ユニセックス パーカー',
    price: '¥7,990',
    img: '/images/hoodie-day/02-product.jpg',
    fallback: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: '03',
    name: 'Gap × Come Tees グラフィック アート フーディー',
    category: 'ユニセックス パーカー',
    price: '¥9,990',
    img: '/images/hoodie-day/03-product.jpg',
    fallback: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: '04',
    name: 'Gap × Edward Crutchley テキスタイル フーディー',
    category: 'ユニセックス パーカー',
    price: '¥9,990',
    img: '/images/hoodie-day/04-product.jpg',
    fallback: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: '05',
    name: 'Gap × AO YES クリーンフリース フーディー',
    category: 'ユニセックス パーカー',
    price: '¥8,490',
    img: '/images/hoodie-day/05-product.jpg',
    fallback: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&auto=format&fit=crop&q=80'
  }
];

export default function HenrysPizzaDetailPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // パララックス用スクロールオフセット
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

  const currentImages = productData.images;

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
              
              {/* サムネイル画像エリア (全6枚) */}
              <div className="hidden lg:flex flex-col gap-8 w-[80px] flex-shrink-0 max-h-full overflow-y-auto no-scrollbar">
                {currentImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-[80px] aspect-[4/5] bg-white border-2 rounded-sm overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-black' : 'border-transparent hover:border-gap-border-dark'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`商品画像サムネイル ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/hoodie-day/01-product.jpg';
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
                    e.currentTarget.src = '/images/hoodie-day/01-product.jpg';
                  }}
                />
                
                <button
                  onClick={handlePrevImage}
                  aria-label="前の画像"
                  className="absolute left-16 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition-all cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  aria-label="次の画像"
                  className="absolute right-16 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition-all cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/60 text-white text-11 px-12 py-4 rounded-full tracking-wider font-mono">
                  {selectedImageIndex + 1} / {currentImages.length}
                </div>
              </div>

            </div>

            {/* モバイル用サムネイル (全6枚) */}
            <div className="flex lg:hidden gap-8 overflow-x-auto pt-12 pb-4 no-scrollbar">
              {currentImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-[68px] aspect-[4/5] flex-shrink-0 bg-white border-2 rounded-sm overflow-hidden cursor-pointer ${
                    selectedImageIndex === idx ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hoodie-day/01-product.jpg';
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

            {/* カラー表示 */}
            <div className="text-13">
              <span className="font-bold">カラー：</span>
              <span className="text-gray-700">{productData.colorName}</span>
            </div>

            {/* サイズ選択 */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-10 text-13">
                <span className="font-bold">サイズを選択</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-4 text-gap-muted hover:text-black transition-colors underline cursor-pointer"
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
                          : 'border-gap-border-dark bg-white text-gap-dark hover:border-black cursor-pointer'
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

            {/* ヴァーチャル試着 UI (クリックでモーダルオープン) */}
            <div className="flex items-center justify-between py-6 my-1">
              <div className="flex items-center gap-10">
                <div className="hidden sm:flex items-center flex-shrink-0">
                  <div className="w-[36px] h-[36px] rounded-full border-2 border-gap-navy overflow-hidden bg-white flex items-center justify-center relative z-10">
                    <img 
                      src={currentImages[0]} 
                      alt="着用モデル"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = '/images/hoodie-day/01-thumb.png';
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
                onClick={() => setIsVirtualTryOnOpen(true)}
                className="font-bold text-[13px] text-gap-dark hover:text-gap-navy flex items-center gap-4 hover:underline transition-colors whitespace-nowrap cursor-pointer"
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
                    className="text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-opacity cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-[17px] font-normal text-black font-sans px-8">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="数量を増やす"
                    className="text-gray-600 hover:text-black transition-opacity cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button 
                  disabled={!selectedSize}
                  className="flex-1 bg-gap-navy text-white rounded-full h-[52px] font-bold text-[16px] hover:bg-[#001b3d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center tracking-wider cursor-pointer"
                >
                  カートに入れる
                </button>
              </div>

              <div className="flex items-center justify-between text-[13px] px-4">
                <span className="text-gray-600">在庫あり（10月20日発売予定）</span>
                <button 
                  type="button"
                  className="font-bold text-gap-dark hover:text-gap-navy hover:underline flex items-center gap-4 transition-colors cursor-pointer"
                >
                  <MapPin size={14} />
                  <span>取扱店舗を確認する</span>
                </button>
              </div>

              <div className="flex items-center gap-12">
                <button
                  aria-label="共有する"
                  className="w-[48px] h-[48px] rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-black hover:text-black transition-colors flex-shrink-0 cursor-pointer"
                >
                  <Share2 size={18} />
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 h-[48px] rounded-full border flex items-center justify-center gap-8 text-[14px] font-normal transition-colors cursor-pointer ${
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
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark cursor-pointer"
                >
                  <span>商品概要</span>
                  {openAccordion.overview ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.overview && (
                  <div className="pt-12 text-13 text-gap-muted space-y-6 leading-relaxed">
                    {productData.description.map((line, idx) => (
                      <p key={idx}>• {line}</p>
                    ))}
                    <p className="pt-6 text-11 text-gray-400 font-mono">商品番号: {productData.itemNumber}</p>
                  </div>
                )}
              </div>

              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('sizeFit')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark cursor-pointer"
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
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark cursor-pointer"
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
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark cursor-pointer"
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
                        <span className="font-bold text-gap-dark">グラフィックのクオリティが最高です</span>
                        <span className="text-11">2026/10/12</span>
                      </div>
                      <p className="text-12">
                        ヘンリーズピザらしい遊び心のあるグラフィックと、Gapの肉厚で柔らかいフリースの質感が見事にマッチしています。フードの立ち上がりも綺麗です。
                      </p>
                    </div>
                    <button className="w-full border border-gap-border-dark py-10 font-bold text-12 text-gap-dark hover:bg-gap-gray cursor-pointer">
                      レビューを書く
                    </button>
                  </div>
                )}
              </div>

              <div className="py-14">
                <button 
                  onClick={() => toggleAccordion('shipping')} 
                  className="w-full flex justify-between items-center text-[16px] font-bold text-gap-dark cursor-pointer"
                >
                  <span>展開店舗・配送について</span>
                  {openAccordion.shipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion.shipping && (
                  <div className="pt-12 text-13 text-gap-muted space-y-6 leading-relaxed">
                    <p>• <strong>発売予定日</strong>：2026年10月20日 発売予定</p>
                    <p>• <strong>展開店舗</strong>：公式オンラインストア、Gapストア 新宿フラッグス店、Gapストア 心斎橋店</p>
                    <p>• <strong>送料無料</strong>：税込5,000円以上のお買い上げで送料無料でお届けします。</p>
                    <p>• <strong>返品・交換</strong>：商品到着後30日以内であればオンラインまたは指定店舗にて返品可能です。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
           2. ビジュアルセクション (insight-01.jpg 表示)
           ========================================================= */}
        <section className="mt-48 pt-32 border-t border-gap-border">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-end mb-24">
            <div className="md:col-span-6 text-left">
              <span className="text-[12px] font-bold tracking-[0.2em] text-gap-navy uppercase">
                Canvas 01 Collaboration
              </span>
              <h2 className="text-[28px] md:text-[38px] font-bold text-gap-dark tracking-tight mt-4 uppercase leading-none">
                GAP × Henry&apos;s Pizza
              </h2>
            </div>
            <div className="md:col-span-6 text-left">
              <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                日本人グラフィックアーティストVERDYが手がける大阪のピッツェリア「Henry&apos;s PIZZA」とGapのシグネチャーフーディーが融合。ストリートとフードカルチャーが交錯するショートフィルムをご覧ください。
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[2560/1020] bg-black rounded-[4px] overflow-hidden shadow-lg">
            <img 
              src="/images/products/hoodie-day/01/insight/insight-01.jpg" 
              alt="GAP × Henry's Pizza" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/hoodie-day/01-bg.jpg';
              }}
            />
          </div>
        </section>

        {/* =========================================================
           3. パララックス ＆ Q&A セクション (計6要素の速度差パララックス)
           ========================================================= */}
        <section ref={lookbookContainerRef} className="mt-48 pt-24 space-y-48 md:space-y-72">

          {/* ブロック 1: insight-02 (750x422・左) ＆ Q&Aカード 01 (右) */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative min-h-[440px] md:min-h-[520px]">
            <div 
              className="w-full md:w-[60%] aspect-[750/422] rounded-[4px] overflow-hidden shadow-md z-0 will-change-transform bg-gray-100"
              style={{
                transform: `translate3d(0, ${offsetY * 0.03}px, 0)`
              }}
            >
              <img 
                src="/images/products/hoodie-day/01/insight/insight-02.jpg" 
                alt="Henry's Pizza Story 01" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&auto=format&fit=crop&q=80'; }}
              />
            </div>

            <div 
              className="w-[92%] md:w-[46%] -mt-32 md:mt-48 md:-ml-[80px] z-10 will-change-transform bg-white/95 backdrop-blur-md p-24 md:p-32 rounded-[6px] shadow-2xl border border-gray-100"
              style={{
                transform: `translate3d(0, ${offsetY * 0.12}px, 0)`
              }}
            >
              <span className="text-[11px] font-mono font-bold tracking-widest text-gap-navy uppercase mb-8 block">
                INSIGHT 01 / ORIGIN
              </span>
              <h3 className="text-[17px] md:text-[19px] font-bold text-gap-dark leading-snug mb-12">
                Q. Henry&apos;s PIZZAが生まれたきっかけと、大阪という場所への思いを教えてください。
              </h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                A. ニューヨークで体験した本場のピザカルチャーに衝撃を受け、地元・大阪でカルチャーとストリートが自然に交差する空間を作りたいと思ったのが原点です。1階でピザを楽しみ、上階のギャラリーや地下で新しいアートや音楽に出会える、誰もに開かれた場所を目指しています。
              </p>
            </div>
          </div>

          {/* ブロック 2: insight-03 (1920x1080・全幅) ＆ Q&Aカード 02 (GAP NAVY背景 ＆ 反転文字) */}
          <div className="relative min-h-[480px] md:min-h-[720px]">
            <div 
              className="w-full aspect-[1920/1080] rounded-[4px] overflow-hidden shadow-lg z-0 will-change-transform bg-gray-100"
              style={{
                transform: `translate3d(0, ${offsetY * 0.02}px, 0)`
              }}
            >
              <img 
                src="/images/products/hoodie-day/01/insight/insight-03.jpg" 
                alt="Henry's Pizza Story 02" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=80'; }}
              />
            </div>

            <div 
              className="w-[92%] md:w-[44%] -mt-32 md:mt-0 md:absolute md:left-[40px] md:-bottom-[60px] z-10 will-change-transform bg-gap-navy text-white p-24 md:p-32 rounded-[6px] shadow-2xl border border-white/10 mx-auto md:mx-0"
              style={{
                transform: `translate3d(0, ${offsetY * 0.10}px, 0)`
              }}
            >
              <span className="text-[11px] font-mono font-bold tracking-widest text-white/70 uppercase mb-8 block">
                INSIGHT 02 / DESIGN
              </span>
              <h3 className="text-[17px] md:text-[19px] font-bold text-white leading-snug mb-12">
                Q. 今回のGAPとのコラボレーションにおいて、グラフィックに込めたこだわりは？
              </h3>
              <p className="text-[14px] text-white/90 leading-relaxed font-normal">
                A. GAPが長年築いてきたヘリテージと、Henry&apos;s PIZZAが持つ遊び心のあるポップな世界観の調和です。アイコニックなオリジナルロゴをフーディーの肉厚なキャンバスに落とし込むことで、ヴィンテージのような親しみやすさとタフさを両立させました。
              </p>
            </div>
          </div>

          {/* ブロック 3: insight-04 (750x422・左) ＆ Q&Aカード 03 (位置を上方に調整) */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative min-h-[440px] md:min-h-[520px] pt-24 md:pt-48">
            <div 
              className="w-full md:w-[60%] aspect-[750/422] rounded-[4px] overflow-hidden shadow-md z-0 will-change-transform bg-gray-100"
              style={{
                transform: `translate3d(0, ${offsetY * 0.04}px, 0)`
              }}
            >
              <img 
                src="/images/products/hoodie-day/01/insight/insight-04.jpg" 
                alt="Henry's Pizza Story 03" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1200&auto=format&fit=crop&q=80'; }}
              />
            </div>

            <div 
              className="w-[92%] md:w-[46%] -mt-32 md:mt-4 md:-ml-[80px] z-10 will-change-transform bg-white/95 backdrop-blur-md p-24 md:p-32 rounded-[6px] shadow-2xl border border-gray-100"
              style={{
                transform: `translate3d(0, ${offsetY * 0.10}px, 0)`
              }}
            >
              <span className="text-[11px] font-mono font-bold tracking-widest text-gap-navy uppercase mb-8 block">
                INSIGHT 03 / LIFESTYLE
              </span>
              <h3 className="text-[17px] md:text-[19px] font-bold text-gap-dark leading-snug mb-12">
                Q. このフーディーを手にする人たちへ、どんなふうに着こなしてほしいですか？
              </h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                A. 特別な日だけでなく、毎日のスケートや友達とピザを食べに行く時など、日常の中で気負わずラフに着倒してほしいですね。着古して生地が馴染んでいくほどに、着る人それぞれのキャンバスとして完成していくと思っています。
              </p>
            </div>
          </div>

        </section>

        {/* =========================================================
           4. 他のおすすめセクション (Carouselボタン削除・4カラム均等配置)
           ========================================================= */}
        <section className="mt-72 md:mt-96 pt-32 border-t border-gap-border">
          <div className="flex justify-between items-center mb-20">
            <h2 className="text-20 md:text-24 font-bold text-gap-dark">他のキャンバスを見る</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] md:gap-[24px] w-full">
            {recommendationProducts.map((item) => (
              <div key={item.id} className="flex flex-col">
                <Link href={`/products/hoodie-day/${item.id}`} className="group flex flex-col">
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

      {/* フーディー専用 バーチャル試着モーダル (既存UI踏襲版) */}
      <VirtualTryOnModalHoodie
        isOpen={isVirtualTryOnOpen}
        onClose={() => setIsVirtualTryOnOpen(false)}
        product={{
          id: productData.id,
          name: productData.name,
          price: productData.price,
          category: productData.category,
          image: productData.images[0],
          colorName: productData.colorName,
        }}
        onProceedToPurchase={() => {
          // 購入・カート投入等の処理
        }}
      />

      <Footer />
    </div>
  );
}