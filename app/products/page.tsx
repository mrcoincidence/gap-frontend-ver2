// app/products/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VirtualTryOnModal from '@/components/VirtualTryOnModal';
import { 
  SlidersHorizontal, 
  ChevronUp, 
  ChevronDown,
  X, 
  LayoutGrid, 
  Grid3X3, 
  Check, 
  ArrowUpDown, 
  Sparkles 
} from 'lucide-react';

// =================================================================
// 1. 商品基本データ (PLP表示はモデル -1.jpg、モーダル用は flatImage -0.jpg)
// =================================================================
interface ProductColor {
  id: string;
  name: string;
  thumbnail: string;
  mainImage: string;
  flatImage: string;
}

interface ProductItem {
  id: string;
  pdpPath: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
  colors: ProductColor[];
}

const products: ProductItem[] = [
  // -------------------------------------------------------------
  // 1. Hoodie (01 - 04)
  // -------------------------------------------------------------
  {
    id: 'hd-01',
    pdpPath: '/products/hoodie/01',
    name: 'ヴィンテージソフト GAP NYタイムズスクエア リラックスフィットパーカー',
    category: 'メンズ パーカー',
    price: 9990,
    badge: 'ベストセラー',
    colors: [
      { id: 'green', name: 'グリーン', thumbnail: '/images/products/hoodie/01/hd-01-green-1.jpg', mainImage: '/images/products/hoodie/01/hd-01-green-1.jpg', flatImage: '/images/products/hoodie/01/hd-01-green-0.jpg' },
      { id: 'red', name: 'レッド', thumbnail: '/images/products/hoodie/01/hd-01-red-1.jpg', mainImage: '/images/products/hoodie/01/hd-01-red-1.jpg', flatImage: '/images/products/hoodie/01/hd-01-red-0.jpg' },
      { id: 'yellow', name: 'イエロー', thumbnail: '/images/products/hoodie/01/hd-01-yellow-1.jpg', mainImage: '/images/products/hoodie/01/hd-01-yellow-1.jpg', flatImage: '/images/products/hoodie/01/hd-01-yellow-0.jpg' }
    ]
  },
  {
    id: 'hd-02',
    pdpPath: '/products/hoodie/02',
    name: 'ヘビーウェイト フレンチテリー オーバーサイズ GAPロゴ ジップアップパーカー',
    category: 'メンズ パーカー',
    price: 5999,
    badge: '新着',
    colors: [
      { id: 'gray', name: 'グレー', thumbnail: '/images/products/hoodie/02/hd-02-gray-1.jpg', mainImage: '/images/products/hoodie/02/hd-02-gray-1.jpg', flatImage: '/images/products/hoodie/02/hd-02-gray-0.jpg' },
      { id: 'white', name: 'ホワイト', thumbnail: '/images/products/hoodie/02/hd-02-white-1.jpg', mainImage: '/images/products/hoodie/02/hd-02-white-1.jpg', flatImage: '/images/products/hoodie/02/hd-02-white-0.jpg' }
    ]
  },
  {
    id: 'hd-03',
    pdpPath: '/products/hoodie/03',
    name: 'リラックス GAPロゴ ジップアップパーカー',
    category: 'メンズ パーカー',
    price: 8990,
    badge: '人気',
    colors: [
      { id: 'brown', name: 'ブラウン', thumbnail: '/images/products/hoodie/03/hd-03-brown-1.jpg', mainImage: '/images/products/hoodie/03/hd-03-brown-1.jpg', flatImage: '/images/products/hoodie/03/hd-03-brown-0.jpg' },
      { id: 'orange', name: 'オレンジ', thumbnail: '/images/products/hoodie/03/hd-03-orange-1.jpg', mainImage: '/images/products/hoodie/03/hd-03-orange-1.jpg', flatImage: '/images/products/hoodie/03/hd-03-orange-0.jpg' },
      { id: 'white', name: 'ホワイト', thumbnail: '/images/products/hoodie/03/hd-03-white-1.jpg', mainImage: '/images/products/hoodie/03/hd-03-white-1.jpg', flatImage: '/images/products/hoodie/03/hd-03-white-0.jpg' },
      { id: 'yellow', name: 'イエロー', thumbnail: '/images/products/hoodie/03/hd-03-yellow-1.jpg', mainImage: '/images/products/hoodie/03/hd-03-yellow-1.jpg', flatImage: '/images/products/hoodie/03/hd-03-yellow-0.jpg' }
    ]
  },
  {
    id: 'hd-04',
    pdpPath: '/products/hoodie/04',
    name: 'リラックスフィット GAPロゴ フレンチテリー ジップアップパーカー',
    category: 'メンズ パーカー',
    price: 8990,
    badge: 'サステナブル',
    colors: [
      { id: 'gray', name: 'ライトヘザーグレー', thumbnail: '/images/products/hoodie/04/hd-04-gray-1.jpg', mainImage: '/images/products/hoodie/04/hd-04-gray-1.jpg', flatImage: '/images/products/hoodie/04/hd-04-gray-0.jpg' },
      { id: 'yellow', name: 'チノ', thumbnail: '/images/products/hoodie/04/hd-04-yellow-1.jpg', mainImage: '/images/products/hoodie/04/hd-04-yellow-1.jpg', flatImage: '/images/products/hoodie/04/hd-04-yellow-0.jpg' },
      { id: 'navy', name: 'ネイビー', thumbnail: '/images/products/hoodie/04/hd-04-navy-1.jpg', mainImage: '/images/products/hoodie/04/hd-04-navy-1.jpg', flatImage: '/images/products/hoodie/04/hd-04-navy-0.jpg' }
    ]
  },

  // -------------------------------------------------------------
  // 2. Jacket (01 - 04)
  // -------------------------------------------------------------
  {
    id: 'jk-01',
    pdpPath: '/products/jacket/01',
    name: 'Gap × Malbon テクスチャー ポプリン アノラックジャケット',
    category: 'メンズ ジャケット',
    price: 22900,
    badge: '限定コラボ',
    colors: [
      { id: 'vintage-navy', name: 'ヴィンテージネイビー', thumbnail: '/images/products/jacket/01/jk-01-navy-1.jpg', mainImage: '/images/products/jacket/01/jk-01-navy-1.jpg', flatImage: '/images/products/jacket/01/jk-01-navy-0.jpg' },
      { id: 'light-peony', name: 'ライトピオニー', thumbnail: '/images/products/jacket/01/jk-01-pink-1.jpg', mainImage: '/images/products/jacket/01/jk-01-pink-1.jpg', flatImage: '/images/products/jacket/01/jk-01-pink-0.jpg' }
    ]
  },
  {
    id: 'jk-02',
    pdpPath: '/products/jacket/02',
    name: 'リラックスフィット GAPロゴ アノラックジャケット',
    category: 'メンズ ジャケット',
    price: 19900,
    colors: [
      { id: 'black', name: 'ブラック', thumbnail: '/images/products/jacket/02/jk-02-black-1.jpg', mainImage: '/images/products/jacket/02/jk-02-black-1.jpg', flatImage: '/images/products/jacket/02/jk-02-black-0.jpg' },
      { id: 'navy', name: 'クラシックネイビー', thumbnail: '/images/products/jacket/02/jk-02-navy-1.jpg', mainImage: '/images/products/jacket/02/jk-02-navy-1.jpg', flatImage: '/images/products/jacket/02/jk-02-navy-0.jpg' }
    ]
  },
  {
    id: 'jk-03',
    pdpPath: '/products/jacket/03',
    name: 'ヴィンテージソフト フレンチテリー GAPロゴ ダブルジップアップジャケット',
    category: 'メンズ ジャケット',
    price: 9990,
    colors: [
      { id: 'black', name: 'ブラック', thumbnail: '/images/products/jacket/03/jk-03-black-1.jpg', mainImage: '/images/products/jacket/03/jk-03-black-1.jpg', flatImage: '/images/products/jacket/03/jk-03-black-0.jpg' },
      { id: 'green', name: 'ツイードグリーン', thumbnail: '/images/products/jacket/03/jk-03-green-1.jpg', mainImage: '/images/products/jacket/03/jk-03-green-1.jpg', flatImage: '/images/products/jacket/03/jk-03-green-0.jpg' },
      { id: 'navy', name: 'ニュークラシックネイビー', thumbnail: '/images/products/jacket/03/jk-03-navy-1.jpg', mainImage: '/images/products/jacket/03/jk-03-navy-1.jpg', flatImage: '/images/products/jacket/03/jk-03-navy-0.jpg' }
    ]
  },
  {
    id: 'jk-04',
    pdpPath: '/products/jacket/04',
    name: 'デニム トラッカージャケット',
    category: 'メンズ ジャケット',
    price: 15900,
    colors: [
      { id: 'washed', name: 'ミディアムウォッシュ', thumbnail: '/images/products/jacket/04/jk-04-washed-1.jpg', mainImage: '/images/products/jacket/04/jk-04-washed-1.jpg', flatImage: '/images/products/jacket/04/jk-04-washed-0.jpg' }
    ]
  },

  // -------------------------------------------------------------
  // 3. T-shirt (01 - 04: 正確な3色画像パスに修正)
  // -------------------------------------------------------------
  {
    id: 'ts-01',
    pdpPath: '/products/t-shirt/01',
    name: 'バーシティスタイル GAPロゴTシャツ',
    category: 'メンズ Tシャツ',
    price: 7990,
    badge: '人気',
    colors: [
      { id: 'yellow', name: 'マスタード', thumbnail: '/images/products/t-shirt/01/ts-01-yellow-1.jpg', mainImage: '/images/products/t-shirt/01/ts-01-yellow-1.jpg', flatImage: '/images/products/t-shirt/01/ts-01-yellow-0.jpg' },
      { id: 'green', name: 'ディープハンター', thumbnail: '/images/products/t-shirt/01/ts-01-green-1.jpg', mainImage: '/images/products/t-shirt/01/ts-01-green-1.jpg', flatImage: '/images/products/t-shirt/01/ts-01-green-0.jpg' },
      { id: 'navy', name: 'ムーンレスナイト', thumbnail: '/images/products/t-shirt/01/ts-01-navy-1.jpg', mainImage: '/images/products/t-shirt/01/ts-01-navy-1.jpg', flatImage: '/images/products/t-shirt/01/ts-01-navy-0.jpg' }
    ]
  },
  {
    id: 'ts-02',
    pdpPath: '/products/t-shirt/02',
    name: 'GAPロゴTシャツ',
    category: 'メンズ Tシャツ',
    price: 6990,
    colors: [
      { id: 'black', name: 'ブラック', thumbnail: '/images/products/t-shirt/02/ts-02-black-1.jpg', mainImage: '/images/products/t-shirt/02/ts-02-black-1.jpg', flatImage: '/images/products/t-shirt/02/ts-02-black-0.jpg' },
      { id: 'gray', name: 'ヘザーグレー', thumbnail: '/images/products/t-shirt/02/ts-02-gray-1.jpg', mainImage: '/images/products/t-shirt/02/ts-02-gray-1.jpg', flatImage: '/images/products/t-shirt/02/ts-02-gray-0.jpg' },
      { id: 'navy', name: 'ニュークラシックネイビー', thumbnail: '/images/products/t-shirt/02/ts-02-navy-1.jpg', mainImage: '/images/products/t-shirt/02/ts-02-navy-1.jpg', flatImage: '/images/products/t-shirt/02/ts-02-navy-0.jpg' }
    ]
  },
  {
    id: 'ts-03',
    pdpPath: '/products/t-shirt/03',
    name: 'FIFA WORLD CUP™ リラックスフィット グラフィックTシャツ',
    category: 'メンズ Tシャツ',
    price: 1999,
    badge: '限定',
    colors: [
      { id: 'yellow', name: 'ブラジル', thumbnail: '/images/products/t-shirt/03/ts-03-yellow-1.jpg', mainImage: '/images/products/t-shirt/03/ts-03-yellow-1.jpg', flatImage: '/images/products/t-shirt/03/ts-03-yellow-0.jpg' },
      { id: 'blue', name: 'アルゼンチン', thumbnail: '/images/products/t-shirt/03/ts-03-blue-1.jpg', mainImage: '/images/products/t-shirt/03/ts-03-blue-1.jpg', flatImage: '/images/products/t-shirt/03/ts-03-blue-0.jpg' }
    ]
  },
  {
    id: 'ts-04',
    pdpPath: '/products/t-shirt/04',
    name: 'ヘビーウェイト クロップドTシャツ',
    category: 'メンズ Tシャツ',
    price: 5990,
    colors: [
      { id: 'navy', name: 'ネイビーストライプ', thumbnail: '/images/products/t-shirt/04/ts-04-navy-1.jpg', mainImage: '/images/products/t-shirt/04/ts-04-navy-1.jpg', flatImage: '/images/products/t-shirt/04/ts-04-navy-0.jpg' },
      { id: 'camo', name: 'カーキタン・リーフ', thumbnail: '/images/products/t-shirt/04/ts-04-camo-1.jpg', mainImage: '/images/products/t-shirt/04/ts-04-camo-1.jpg', flatImage: '/images/products/t-shirt/04/ts-04-camo-0.jpg' },
      { id: 'green', name: 'グリーンストライプ', thumbnail: '/images/products/t-shirt/04/ts-04-green-1.jpg', mainImage: '/images/products/t-shirt/04/ts-04-green-1.jpg', flatImage: '/images/products/t-shirt/04/ts-04-green-0.jpg' }
    ]
  },

  // -------------------------------------------------------------
  // 4. Jeans (01 - 04: 試着非対象)
  // -------------------------------------------------------------
  {
    id: 'jn-01',
    pdpPath: '/products/jeans/01',
    name: 'スーパーバギーデニム',
    category: 'メンズ ジーンズ',
    price: 9990,
    badge: '人気',
    colors: [
      { id: 'washed', name: 'ミディアムウォッシュ', thumbnail: '/images/products/jeans/01/jn-01-washed-1.jpg', mainImage: '/images/products/jeans/01/jn-01-washed-1.jpg', flatImage: '/images/products/jeans/01/jn-01-washed-0.jpg' }
    ]
  },
  {
    id: 'jn-02',
    pdpPath: '/products/jeans/02',
    name: "'90s ルーズフィットデニム",
    category: 'メンズ ジーンズ',
    price: 9990,
    colors: [
      { id: 'dark-washed', name: 'ダークウォッシュ', thumbnail: '/images/products/jeans/02/jn-02-washed-1.jpg', mainImage: '/images/products/jeans/02/jn-02-washed-1.jpg', flatImage: '/images/products/jeans/02/jn-02-washed-0.jpg' }
    ]
  },
  {
    id: 'jn-03',
    pdpPath: '/products/jeans/03',
    name: 'ヘビーウェイト リラックスフィット ストレートデニム',
    category: 'メンズ ジーンズ',
    price: 9990,
    colors: [
      { id: 'rinsed', name: 'リンス', thumbnail: '/images/products/jeans/03/jn-03-rinsed-1.jpg', mainImage: '/images/products/jeans/03/jn-03-rinsed-1.jpg', flatImage: '/images/products/jeans/03/jn-03-rinsed-0.jpg' }
    ]
  },
  {
    id: 'jn-04',
    pdpPath: '/products/jeans/04',
    name: 'GapFlex ウォッシュウェル ストレートデニム',
    category: 'メンズ ジーンズ',
    price: 8990,
    colors: [
      { id: 'washed', name: 'ミディアムウォッシュ', thumbnail: '/images/products/jeans/04/jn-04-washed-1.jpg', mainImage: '/images/products/jeans/04/jn-04-washed-1.jpg', flatImage: '/images/products/jeans/04/jn-04-washed-0.jpg' }
    ]
  }
];

const colorSwatches = [
  { name: 'ブラック', hex: '#000000', border: false },
  { name: 'ホワイト', hex: '#ffffff', border: true },
  { name: 'グレー', hex: '#9ca3af', border: false },
  { name: 'ネイビー', hex: '#1e3a8a', border: false },
  { name: 'ブルー', hex: '#3b82f6', border: false },
  { name: 'グリーン', hex: '#15803d', border: false },
  { name: 'オリーブ', hex: '#556b2f', border: false },
  { name: 'イエロー', hex: '#eab308', border: false },
  { name: 'オレンジ', hex: '#f97316', border: false },
  { name: 'レッド', hex: '#dc2626', border: false }
];

const sortOptions = [
  { value: 'featured', label: 'おすすめ順' },
  { value: 'popular', label: '人気順' },
  { value: 'newest', label: '新作順' },
  { value: 'price-low', label: '価格：安い順' },
  { value: 'price-high', label: '価格：高い順' },
  { value: 'rating', label: '評価順' }
];

export default function ProductListingPage() {
  const router = useRouter();

  const [desktopColumns, setDesktopColumns] = useState<3 | 4>(3);
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(2);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // ヴァーチャル試着モーダル用ステート
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [tryOnProduct, setTryOnProduct] = useState<ProductItem | null>(null);
  const [tryOnColorIdx, setTryOnColorIdx] = useState(0);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [filterAccordions, setFilterAccordions] = useState<{ [key: string]: boolean }>({
    lineup: true,
    size: true,
    color: true,
    material: false,
    price: false,
    fit: false,
    sale: false
  });

  const toggleAccordion = (key: string) => {
    setFilterAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label;

  // 試着モーダルを開く
  const handleOpenTryOn = (product: ProductItem, colorIdx: number) => {
    setTryOnProduct(product);
    setTryOnColorIdx(colorIdx);
    setIsTryOnOpen(true);
  };

  // 試着モーダル内で「この商品を購入する」を押した時 -> 該当商品のPDPへ遷移
  const handleProceedToPurchase = () => {
    if (tryOnProduct) {
      router.push(tryOnProduct.pdpPath);
    }
  };

  const SortDropdown = () => (
    <div ref={sortRef} className="relative inline-block">
      <button
        onClick={() => setIsSortOpen(!isSortOpen)}
        className={`flex items-center gap-6 text-[13px] font-bold transition-colors py-6 px-8 border rounded-sm cursor-pointer ${
          isSortOpen 
            ? 'border-gap-navy text-gap-navy bg-blue-50/20' 
            : 'border-transparent text-gap-dark hover:text-gap-navy'
        }`}
      >
        <ArrowUpDown size={15} />
        <span>
          {sortBy ? `並べ替え：${selectedSortLabel}` : '並べ替え'}
        </span>
      </button>

      {isSortOpen && (
        <div className="absolute right-0 top-full mt-6 w-[220px] bg-white rounded-md shadow-2xl border border-gray-200 py-4 z-40 animate-in fade-in zoom-in-95 duration-150 divide-y divide-gray-100">
          {sortOptions.map((option) => {
            const isSelected = sortBy === option.value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-16 py-12 text-[13px] transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected 
                    ? 'font-bold text-black bg-gray-50/60' 
                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={16} className="text-black stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gap-dark font-sans flex flex-col justify-between overflow-x-clip">
      <Header />

      <main className="max-w-[1600px] mx-auto px-[24px] lg:px-24 py-16 md:py-24 w-full">
        
        {/* =========================================================
           1. パンくずリスト
           ========================================================= */}
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex items-center gap-6 text-12 text-gap-muted">
            <li>
              <Link href="#" className="hover:text-gap-dark transition-colors">メンズ</Link>
            </li>
            <li>/</li>
            <li className="text-gap-dark font-medium">すべてのアイテム</li>
          </ol>
        </nav>

        {/* =========================================================
           2. ページ見出し ＆ コントロールバー
           ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-16 mb-20">
          
          <div>
            <h1 className="text-[20px] md:text-[24px] font-bold text-gap-dark tracking-tight leading-tight">
              メンズ コレクション ({products.length})
            </h1>
          </div>

          {/* デスクトップ表示 (md以上) */}
          <div className="hidden md:flex items-center justify-end gap-12 w-auto">
            
            <div className="flex items-center border border-gray-200 rounded-sm p-2 h-[44px] gap-2">
              <button
                onClick={() => setDesktopColumns(3)}
                aria-label="3カラム表示"
                className={`h-full px-8 rounded-sm transition-colors flex items-center justify-center cursor-pointer ${
                  desktopColumns === 3 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                }`}
                title="3カラム"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setDesktopColumns(4)}
                aria-label="4カラム表示"
                className={`h-full px-8 rounded-sm transition-colors flex items-center justify-center cursor-pointer ${
                  desktopColumns === 4 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                }`}
                title="4カラム"
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-6 text-[13px] font-bold text-gap-dark hover:text-gap-navy transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal size={16} />
              <span>商品を絞り込む</span>
            </button>

            <SortDropdown />

          </div>

          {/* モバイル表示 (md未満) */}
          <div className="flex flex-col gap-4 md:hidden w-full">
            
            <div className="flex justify-start items-center">
              <div className="flex items-center border border-gray-200 rounded-sm p-2 h-[40px] gap-2">
                <button
                  onClick={() => setMobileColumns(1)}
                  aria-label="1カラム表示"
                  className={`h-full px-10 rounded-sm transition-colors flex items-center justify-center cursor-pointer ${
                    mobileColumns === 1 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                  }`}
                  title="1カラム"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </button>
                <button
                  onClick={() => setMobileColumns(2)}
                  aria-label="2カラム表示"
                  className={`h-full px-10 rounded-sm transition-colors flex items-center justify-center cursor-pointer ${
                    mobileColumns === 2 ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                  }`}
                  title="2カラム"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="3" width="8" height="18" rx="1" />
                    <rect x="13" y="3" width="8" height="18" rx="1" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-6 text-[13px] font-bold text-gap-dark hover:text-gap-navy transition-colors cursor-pointer"
              >
                <SlidersHorizontal size={16} />
                <span>商品を絞り込む</span>
              </button>

              <SortDropdown />
            </div>

          </div>

        </div>

        {/* =========================================================
           3. 商品グリッド (全16アイテム: モデル画像一覧で表示)
           ========================================================= */}
        <div 
          className={`grid gap-x-[24px] gap-y-[28px] sm:gap-x-20 sm:gap-y-36 md:gap-x-[24px] md:gap-y-40 ${
            mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'
          } ${
            desktopColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
          }`}
        >
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOpenTryOn={handleOpenTryOn}
            />
          ))}
        </div>

      </main>

      {/* =========================================================
         4. フィルタードロワー
         ========================================================= */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-16 border-b border-gray-200 flex items-center justify-between">
          <span className="font-bold text-[15px] text-gap-dark">
            絞り込み <span className="font-normal text-gray-500">({products.length} 件)</span>
          </span>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="p-4 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-200 text-13">
          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('lineup')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>カテゴリー</span>
              {filterAccordions.lineup ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.lineup && (
              <div className="space-y-10 pt-2 pl-4 pb-4">
                {['パーカー (4)', 'ジャケット・アウター (4)', 'Tシャツ・カットソー (4)', 'ジーンズ・デニム (4)'].map((item) => (
                  <label key={item} className="flex items-center gap-10 cursor-pointer text-gray-700 hover:text-black">
                    <input type="checkbox" className="w-[18px] h-[18px] rounded border-gray-300 accent-gap-navy cursor-pointer" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('size')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>トップス / アウター サイズ</span>
              {filterAccordions.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.size && (
              <div className="grid grid-cols-5 gap-8 pt-2 pb-4">
                {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                  <button 
                    key={sz}
                    type="button"
                    className="py-8 border border-gray-300 rounded-[2px] text-center font-bold text-12 hover:border-gap-navy hover:bg-gap-navy hover:text-white transition-colors cursor-pointer"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('color')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>カラー</span>
              {filterAccordions.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.color && (
              <div className="grid grid-cols-5 gap-8 pt-2 pb-4">
                {colorSwatches.map((col) => (
                  <div key={col.name} className="flex flex-col items-center gap-4 cursor-pointer group">
                    <span 
                      style={{ backgroundColor: col.hex }}
                      className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                        col.border ? 'border border-gray-300' : ''
                      }`}
                    />
                    <span className="text-[10px] text-gray-600 line-clamp-1">{col.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('material')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>素材</span>
              {filterAccordions.material ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.material && (
              <div className="space-y-10 pt-2 pl-4 pb-4">
                {['100% コットン', 'デニム (13〜13.5oz)', 'ポプリン', 'フレンチテリー', 'GapFlex ストレッチ'].map((mat) => (
                  <label key={mat} className="flex items-center gap-10 cursor-pointer text-gray-700 hover:text-black">
                    <input type="checkbox" className="w-[18px] h-[18px] rounded border-gray-300 accent-gap-navy cursor-pointer" />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('price')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>価格</span>
              {filterAccordions.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.price && (
              <div className="space-y-10 pt-2 pl-4 pb-4">
                {['〜 ¥5,000', '¥5,000 〜 ¥8,000', '¥8,000 〜 ¥10,000', '¥10,000 〜 ¥15,000', '¥15,000 〜'].map((prc) => (
                  <label key={prc} className="flex items-center gap-10 cursor-pointer text-gray-700 hover:text-black">
                    <input type="checkbox" className="w-[18px] h-[18px] rounded border-gray-300 accent-gap-navy cursor-pointer" />
                    <span>{prc}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('fit')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>フィット感</span>
              {filterAccordions.fit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.fit && (
              <div className="space-y-10 pt-2 pl-4 pb-4">
                {['ストレート', 'リラックス', 'オーバーサイズ', 'スーパーバギー'].map((fit) => (
                  <label key={fit} className="flex items-center gap-10 cursor-pointer text-gray-700 hover:text-black">
                    <input type="checkbox" className="w-[18px] h-[18px] rounded border-gray-300 accent-gap-navy cursor-pointer" />
                    <span>{fit}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="px-16 py-8">
            <button 
              onClick={() => toggleAccordion('sale')}
              className="w-full flex items-center justify-between font-bold text-gap-dark mb-8 text-[14px] cursor-pointer"
            >
              <span>コレクション・限定</span>
              {filterAccordions.sale ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterAccordions.sale && (
              <div className="space-y-10 pt-2 pl-4 pb-4">
                <label className="flex items-center gap-10 cursor-pointer text-gray-700 hover:text-black">
                  <input type="checkbox" className="w-[18px] h-[18px] rounded border-gray-300 accent-gap-navy cursor-pointer" />
                  <span>コラボ・限定アイテムのみ表示</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="p-16 border-t border-gray-200 bg-white">
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-gap-navy text-white py-12 rounded-full font-bold text-[14px] hover:bg-[#001b3d] transition-colors shadow-sm cursor-pointer"
          >
            表示する ({products.length})
          </button>
        </div>
      </div>

      {/* =========================================================
         5. 共通 Virtual Try-On モーダル (モーダル側へは flatImage: -0.jpg を渡す)
         ========================================================= */}
      {tryOnProduct && (
        <VirtualTryOnModal
          isOpen={isTryOnOpen}
          onClose={() => setIsTryOnOpen(false)}
          product={{
            id: tryOnProduct.id,
            name: tryOnProduct.name,
            price: tryOnProduct.price,
            category: tryOnProduct.category,
            colors: tryOnProduct.colors.map((c) => ({
              id: c.id,
              name: c.name,
              images: [c.flatImage] // モーダルでは置き画プロダクト画像（0番）を使用
            }))
          }}
          initialColorIndex={tryOnColorIdx}
          onProceedToPurchase={handleProceedToPurchase}
        />
      )}

      <Footer />
    </div>
  );
}

// =================================================================
// 6. 商品カードコンポーネント (モデル画像 -1.jpg を一覧表示)
// =================================================================
interface ProductCardProps {
  product: ProductItem;
  onOpenTryOn: (product: ProductItem, colorIdx: number) => void;
}

function ProductCard({ product, onOpenTryOn }: ProductCardProps) {
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  const activeColor = product.colors[activeColorIdx] || product.colors[0];
  const isTryOnSupported = !product.id.startsWith('jn-');

  return (
    <div className="group flex flex-col relative">
      
      {/* メイン商品画像エリア (モデル着用画像: -1.jpg) */}
      <div className="relative aspect-[3/4] bg-[#f8f8f8] rounded-[2px] overflow-hidden mb-[12px] border border-gray-100">
        <Link href={product.pdpPath} className="block w-full h-full">
          <img
            src={activeColor.mainImage}
            alt={`${product.name} - ${activeColor.name}`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </Link>
      </div>

      {/* カラー展開サムネイルリスト (モデル着用画像: -1.jpg) */}
      <div className="flex items-center gap-6 mb-[12px] overflow-x-auto no-scrollbar py-1">
        {product.colors.map((color, cIdx) => (
          <button
            key={color.id}
            onMouseEnter={() => setActiveColorIdx(cIdx)}
            onClick={() => setActiveColorIdx(cIdx)}
            className={`w-[34px] aspect-[4/5] rounded-[2px] overflow-hidden border transition-all cursor-pointer ${
              activeColorIdx === cIdx ? 'border-black' : 'border-transparent hover:border-gray-400'
            }`}
            title={color.name}
          >
            <img
              src={color.thumbnail}
              alt={color.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&auto=format&fit=crop&q=60';
              }}
            />
          </button>
        ))}
      </div>

      {/* バッジ・商品テキスト情報 */}
      <div className="flex flex-col flex-1">
        {product.badge && (
          <span className="text-[12px] font-bold text-gap-red mb-[4px]">
            {product.badge}
          </span>
        )}

        <Link href={product.pdpPath} className="hover:underline">
          <h2 className="text-[14px] font-bold text-gap-dark line-clamp-1 leading-snug">
            {product.name}
          </h2>
        </Link>

        <p className="text-[12px] text-gap-muted mt-[4px]">
          {product.category}
        </p>

        {/* 価格 ＆ ヴァーチャル試着ボタン */}
        <div className="flex items-center justify-between flex-wrap gap-y-4 gap-x-6 mt-[12px]">
          <p className="text-[16px] font-bold text-gap-dark whitespace-nowrap">
            ¥{product.price.toLocaleString()} <span className="text-[11px] font-normal text-gap-muted">(税込)</span>
          </p>

          {isTryOnSupported && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenTryOn(product, activeColorIdx);
              }}
              className="inline-flex items-center gap-4 text-[11px] sm:text-[12px] font-bold text-gap-dark border border-gray-300 hover:border-gap-navy hover:bg-gap-navy hover:text-white px-8 py-4 rounded-full transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles size={13} className="hidden sm:inline-block" />
              <span>ヴァーチャル試着する</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}