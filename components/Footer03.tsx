// components/Footer03.tsx
'use client';

import Link from 'next/link';

export default function Footer03() {
  return (
    <footer className="w-full font-sans overflow-hidden">
      
      {/* =========================================================
         メインコンテンツエリア (エリア1 & エリア2) - GAP NAVY 背景
         ========================================================= */}
      <div className="bg-gap-navy text-white pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-[1600px] mx-auto px-16 lg:px-24">
          
          {/* =========================================================
             1. エリア1 : 2カラム構成
             ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 pb-16">
            
            {/* 左カラム: Newsletter Signup */}
            <div className="md:pr-32 lg:pr-48 md:border-r md:border-white/20 flex flex-col justify-between pb-16 md:pb-0">
              <div>
                <h3 className="text-16 md:text-18 font-bold mb-6 text-white">
                  ニュースレター登録
                </h3>
                <p className="text-12 text-white/80 mb-12">
                  最新コレクションや会員限定オファー、イベント情報をいち早くお届けします。
                </p>
                
                <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-[420px]">
                  <div className="flex flex-col sm:flex-row gap-8 w-full">
                    <input 
                      type="email" 
                      placeholder="メールアドレスを入力" 
                      className="bg-white/10 border border-white/30 text-white placeholder-white/60 px-12 py-8 text-12 w-full flex-1 rounded-none focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                      required 
                    />
                    <button 
                      type="submit" 
                      className="bg-white !text-gap-navy text-12 font-bold px-20 py-8 hover:bg-gray-100 transition-colors whitespace-nowrap uppercase tracking-wider w-full sm:w-auto text-center cursor-pointer"
                    >
                      登録
                    </button>
                  </div>

                  <div className="mt-8 flex items-center gap-6">
                    <input 
                      type="checkbox" 
                      id="footer03-privacy-check" 
                      className="w-[18px] h-[18px] accent-white cursor-pointer flex-shrink-0"
                      required 
                    />
                    <label htmlFor="footer03-privacy-check" className="text-12 text-white/80 cursor-pointer select-none">
                      <a 
                        href="#" 
                        className="!text-white font-medium underline hover:opacity-80 transition-opacity"
                      >
                        プライバシーポリシー
                      </a>
                      に同意する
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/* 右カラム: Get the Gap App */}
            <div className="md:pl-32 lg:pl-48 flex flex-col justify-between pt-16 md:pt-0">
              <div>
                <h3 className="text-16 md:text-18 font-bold mb-6 text-white">
                  GAP 公式アプリ
                </h3>
                <p className="text-12 text-white/80 mb-12">
                  アプリ限定オファーや最新スタイリングをチェック。スムーズにお買い物が楽しめます。
                </p>
                <div className="flex items-center gap-16">
                  <img 
                    src="/images/footer/gap-app-qr-code.png" 
                    alt="GAP App QR Code" 
                    className="w-[88px] h-[88px] object-contain flex-shrink-0 bg-white p-2 rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-12 font-bold text-white leading-normal">
                    QRコードをスキャンしてアプリをダウンロード
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================
             2. エリア2 : 4カラム メニュー ＆ SNSアイコン
             ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 pt-16 border-t border-white/20">
            
            <div>
              <h4 className="text-15 font-bold mb-10 text-white">ご利用ガイド</h4>
              <ul className="space-y-8 text-13">
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">店舗検索</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">注文履歴</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">ギフトカード</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">商品アドバイス</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-15 font-bold mb-10 text-white">メンバーシップ</h4>
              <ul className="space-y-8 text-13">
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">メンバーシップについて</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">メンバーシップ特典</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">申請方法</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-15 font-bold mb-10 text-white">ヘルプ</h4>
              <ul className="space-y-8 text-13">
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">よくある質問</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">配送</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">返品</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">お支払い方法</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">コンビニ受け取り</Link></li>
                <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-15 font-bold mb-10 text-white">企業情報</h4>
                <ul className="space-y-8 text-13 mb-16">
                  <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">プレスリリース</Link></li>
                  <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">採用情報</Link></li>
                  <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">投資家向け情報（英語）</Link></li>
                  <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">サステナビリティ</Link></li>
                  <li><Link href="#" className="!text-white/80 hover:!text-white transition-colors">フィードバック</Link></li>
                </ul>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-16">
                  <a href="#" className="!text-white/80 hover:!text-white transition-colors" aria-label="TikTok">
                    <svg className="w-[28px] h-[28px] fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 00-1-.08A6.26 6.33 0 003 15.65a6.26 6.33 0 0010.7 4.47V12a8.16 8.16 0 004.89 1.62V10.2a4.85 4.85 0 01-1-.12v-3.39z"/>
                    </svg>
                  </a>
                  <a href="#" className="!text-white/80 hover:!text-white transition-colors" aria-label="Instagram">
                    <svg className="w-[28px] h-[28px] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="!text-white/80 hover:!text-white transition-colors" aria-label="YouTube">
                    <svg className="w-[28px] h-[28px] fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="#" className="!text-white/80 hover:!text-white transition-colors" aria-label="Spotify">
                    <svg className="w-[28px] h-[28px] fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.441-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.38-1.38 9.841-.719 13.56 1.56.36.239.54.84.181 1.261zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
         3. エリア3 : Copyright ＆ Legal Links - ブラック背景 (py-8)
         モバイル時: リンクを縦並び・左寄せで先に表示(order-1)、下にCopyrightを表示(order-2)
         PC時(md:): 横並び・両端配置
         ========================================================= */}
      <div className="w-full bg-black text-gray-400 py-8 px-16 lg:px-24">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-12 text-11 text-left">
          
          {/* テキストリンク群 (モバイル: 1列に1つずつ縦並び左寄せ、PC: 横並び) */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-12 lg:gap-20 order-1 md:order-2 w-full md:w-auto">
            <Link 
              href="#" 
              className="!text-gray-400 hover:!text-white transition-all hover:underline"
            >
              利用規約
            </Link>
            <Link 
              href="#" 
              className="!text-gray-400 hover:!text-white transition-all hover:underline"
            >
              プライバシーポリシー
            </Link>
            <Link 
              href="#" 
              className="!text-gray-400 hover:!text-white transition-all hover:underline"
            >
              特定商取引法・古物営業法に基づく表示案内
            </Link>
          </div>

          {/* Copyright (モバイル: リンクの下に配置、PC: 左側に配置) */}
          <p className="!text-gray-400 font-normal order-2 md:order-1">©2026 The Gap, Inc. All rights reserved.</p>

        </div>
      </div>

    </footer>
  );
}