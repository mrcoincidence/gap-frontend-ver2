// components/VirtualTryOnModal.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  Download, 
  Share2, 
  ShoppingBag, 
  Copy, 
  Sparkles, 
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export interface TryOnProductColor {
  id: string;
  name: string;
  images: string[];
}

export interface TryOnProduct {
  id: string;
  name: string;
  price: number;
  category?: string;
  colors: TryOnProductColor[];
}

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: TryOnProduct;
  initialColorIndex?: number;
  onProceedToPurchase?: () => void;
}

type Step = 
  | 'color'          // Step 1: カラー選択
  | 'source'         // Step 2: アップロード or カメラ選択 (デスクトップのみ)
  | 'camera'         // Step 3-A: カメラ撮影
  | 'camera-preview' // Step 3-A: 撮影確認
  | 'upload'         // Step 3-B: 写真アップロード
  | 'upload-preview' // Step 3-B: アップロード確認
  | 'generating'     // 4: 生成中
  | 'result';        // 5: 結果表示

export default function VirtualTryOnModal({
  isOpen,
  onClose,
  product,
  initialColorIndex = 0,
  onProceedToPurchase,
}: VirtualTryOnModalProps) {
  const [step, setStep] = useState<Step>('color');
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIndex);
  const [guideType, setGuideType] = useState<'upper' | 'full'>('upper');
  
  // 画面幅（モバイル判定）
  const [isMobile, setIsMobile] = useState(false);

  // 撮影・アップロード画像
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // カメラ用 Ref & State
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // 3秒カウントダウン State
  const [countdown, setCountdown] = useState<number | null>(null);

  // 生成中プログレス ＆ スライドショー
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // シェアメニュー
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // スタイリング写真 (3枚)
  const stylingSlides = [
    { src: '/images/virtual-try-on/loading/style-01.jpg', caption: 'Classic Casual Styling' },
    { src: '/images/virtual-try-on/loading/style-02.jpg', caption: 'Urban Street Mix' },
    { src: '/images/virtual-try-on/loading/style-03.jpg', caption: 'Relaxed Layered Look' },
  ];

  // リサイズ監視（モバイル判定）
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // モーダルオープン時の初期化
  useEffect(() => {
    if (isOpen) {
      setStep('color');
      setSelectedColorIdx(initialColorIndex);
      setCapturedImage(null);
      setUploadedImage(null);
      setCountdown(null);
      setProgress(0);
      setIsShareOpen(false);
      setIsCopied(false);
      document.body.style.overflow = 'hidden';
    } else {
      stopCamera();
      setCountdown(null);
      document.body.style.overflow = '';
    }
    return () => {
      stopCamera();
      document.body.style.overflow = '';
    };
  }, [isOpen, initialColorIndex]);

  // カメラ起動
  const startCamera = async () => {
    setCameraError(null);
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('カメラの起動に失敗しました。カメラのアクセス許可をご確認ください。');
    }
  };

  // カメラ停止
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // 撮影実行
  const executeCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);
        stopCamera();
        setStep('camera-preview');
      }
    }
  };

  // 3秒カウントダウン制御
  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      executeCapture();
      setCountdown(null);
    }
  }, [countdown]);

  const handleStartCountdown = () => {
    if (countdown === null) {
      setCountdown(3);
    }
  };

  // ファイルアップロード (デスクトップ用)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setStep('upload-preview');
      };
      reader.readAsDataURL(file);
    }
  };

  // 生成処理シミュレーション
  useEffect(() => {
    if (step === 'generating') {
      setProgress(0);
      setActiveSlide(0);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => setStep('result'), 400);
            return 100;
          }
          return prev + 2;
        });
      }, 65);

      const slideInterval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % stylingSlides.length);
      }, 1400);

      return () => {
        clearInterval(progressInterval);
        clearInterval(slideInterval);
      };
    }
  }, [step]);

  const handleCopyLink = () => {
    const dummyUrl = window.location.origin + '/images/virtual-try-on/result-demo.jpg';
    navigator.clipboard.writeText(dummyUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  // デスクトップ用ステップ番号 (1, 2, 3)
  const getCurrentStepNum = () => {
    if (step === 'color') return 1;
    if (step === 'source') return 2;
    if (['camera', 'camera-preview', 'upload', 'upload-preview'].includes(step)) return 3;
    return null;
  };
  const currentStepNum = getCurrentStepNum();

  // モバイル用ステップテキスト
  const getMobileStepText = () => {
    if (step === 'color') return 'Step 1 of 3';
    if (['camera', 'camera-preview'].includes(step)) return 'Step 2 of 3';
    if (step === 'generating' || step === 'result') return 'Step 3 of 3';
    return 'Step 2 of 3';
  };

  const handleStepClick = (targetStep: number) => {
    if (currentStepNum === null || targetStep >= currentStepNum) return;
    stopCamera();
    setCountdown(null);
    if (targetStep === 1) {
      setStep('color');
    } else if (targetStep === 2) {
      setStep('source');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-[48px] bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* モーダル本体: モバイル時は全画面(100%)、デスクトップ時は横幅700px固定・上下左右48pxマージン */}
      <div className="relative w-full h-full md:max-w-[700px] bg-white rounded-none md:rounded-[4px] shadow-2xl flex flex-col justify-between overflow-y-auto md:overflow-hidden p-16 md:p-[48px] select-none">
        
        {/* =========================================================
           1. ヘッダーバー: 戻る、Step表示、閉じる (垂直中央一直線)
           ========================================================= */}
        <div className="w-full h-[40px] flex items-center justify-between flex-shrink-0">
          
          {/* 左端: 戻るボタン */}
          <div className="w-[40px] flex items-center justify-start">
            {step !== 'color' && step !== 'generating' && step !== 'result' && (
              <button
                onClick={() => {
                  if (step === 'camera' || step === 'upload') {
                    stopCamera();
                    setCountdown(null);
                    // モバイル時は直接カラー選択へ戻す
                    if (isMobile) {
                      setStep('color');
                    } else {
                      setStep('source');
                    }
                  } else if (step === 'camera-preview') {
                    setStep('camera');
                    startCamera();
                  } else if (step === 'upload-preview') {
                    setStep('upload');
                  } else if (step === 'source') {
                    setStep('color');
                  }
                }}
                className="p-6 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                aria-label="戻る"
              >
                <ArrowLeft size={18} />
              </button>
            )}
          </div>

          {/* 中央: Step表記 */}
          <div className="flex items-center justify-center">
            {/* デスクトップ用ラベル表記 (Step 1 ＞ Step 2 ＞ Step 3) */}
            {currentStepNum !== null && (
              <div className="hidden md:flex items-center gap-8 select-none">
                <button
                  type="button"
                  onClick={() => handleStepClick(1)}
                  disabled={currentStepNum <= 1}
                  className={`px-16 py-4 rounded-full text-[12px] font-bold tracking-wider transition-all ${
                    currentStepNum === 1
                      ? 'bg-gap-navy text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  Step 1
                </button>

                <span className="text-gray-300 text-[11px] font-bold">＞</span>

                <button
                  type="button"
                  onClick={() => handleStepClick(2)}
                  disabled={currentStepNum <= 2}
                  className={`px-16 py-4 rounded-full text-[12px] font-bold tracking-wider transition-all ${
                    currentStepNum === 2
                      ? 'bg-gap-navy text-white shadow-sm'
                      : currentStepNum > 2
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-default'
                  }`}
                >
                  Step 2
                </button>

                <span className="text-gray-300 text-[11px] font-bold">＞</span>

                <span
                  className={`px-16 py-4 rounded-full text-[12px] font-bold tracking-wider transition-all ${
                    currentStepNum === 3
                      ? 'bg-gap-navy text-white shadow-sm'
                      : 'bg-gray-100 text-gray-400 cursor-default'
                  }`}
                >
                  Step 3
                </span>
              </div>
            )}

            {/* モバイル用Step表記 (Step X of 3) */}
            {step !== 'generating' && step !== 'result' && (
              <div className="flex md:hidden items-center justify-center">
                <span className="text-[13px] font-bold text-gap-dark tracking-wide">
                  {getMobileStepText()}
                </span>
              </div>
            )}
          </div>

          {/* 右端: 閉じるボタン */}
          <div className="w-[40px] flex items-center justify-end">
            <button
              onClick={onClose}
              className="p-6 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="閉じる"
            >
              <X size={20} />
            </button>
          </div>

        </div>

        {/* =========================================================
           2. コンテンツ領域
           ========================================================= */}
        <div className="flex-1 flex flex-col justify-center items-center w-full min-h-0 my-auto py-8 md:py-0">

          {/* -------------------------------------------------------
             STEP 1: カラー選択
             ------------------------------------------------------- */}
          {step === 'color' && (
            <div className="w-full">
              
              {/* デスクトップ表示 (2カラム) */}
              <div className="hidden md:flex items-start justify-center gap-24 w-full h-[360px]">
                {/* メイン商品画像 */}
                <div className="w-[240px] h-[360px] bg-[#f8f8f8] rounded-[2px] overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  <img
                    src={currentColor.images[0]}
                    alt={currentColor.name}
                    className="w-full h-full object-contain p-8"
                  />
                </div>

                {/* 右: タイトル ＆ カラー選択 ＆ CTA */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[360px] text-left">
                  <div>
                    <div className="h-[28px] flex items-center">
                      <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                        試着するカラーを選択
                      </h3>
                    </div>
                    
                    <p className="text-[13px] text-gray-700 mt-6 font-medium leading-snug break-all">
                      {product.name}
                    </p>

                    <p className="text-[14px] font-bold text-gap-dark mt-4">
                      ¥{product.price.toLocaleString()} <span className="text-[11px] font-normal text-gap-muted">(税込)</span>
                    </p>

                    <div className="mt-14">
                      <p className="text-[12px] font-bold text-gap-dark mb-8">
                        カラー: <span className="text-gray-600 font-normal">{currentColor.name}</span>
                      </p>
                      <div className="flex items-center gap-8">
                        {product.colors.map((c, idx) => (
                          <button
                            key={c.id}
                            onClick={() => setSelectedColorIdx(idx)}
                            className={`relative w-[48px] aspect-[4/5] rounded-[2px] overflow-hidden border-2 transition-all cursor-pointer ${
                              selectedColorIdx === idx
                                ? 'border-gap-navy scale-105 shadow-sm'
                                : 'border-transparent hover:border-gray-300 opacity-60 hover:opacity-100'
                            }`}
                            title={c.name}
                          >
                            <img src={c.images[0]} alt={c.name} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setStep('source')}
                      className="w-[260px] h-[46px] bg-gap-navy text-white rounded-full font-bold text-[13px] hover:bg-[#001b3d] transition-colors flex items-center justify-center gap-6 shadow-sm cursor-pointer"
                    >
                      <span>写真の選択へ進む</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* モバイル表示 (縦並び・商品名と価格は非表示・ボタンは「撮影する」) */}
              <div className="flex md:hidden flex-col items-center justify-between w-full h-full max-w-[320px] mx-auto text-center">
                <div className="mb-8">
                  <h3 className="text-[17px] font-bold text-gap-dark">
                    試着するカラーを選択
                  </h3>
                </div>

                {/* メイン画像が上 */}
                <div className="w-[200px] h-[300px] bg-[#f8f8f8] rounded-[2px] overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mb-12">
                  <img
                    src={currentColor.images[0]}
                    alt={currentColor.name}
                    className="w-full h-full object-contain p-6"
                  />
                </div>

                {/* 直下にカラーバリエーションのサムネ画像 */}
                <div className="flex items-center justify-center gap-8 mb-16">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`relative w-[46px] aspect-[4/5] rounded-[2px] overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedColorIdx === idx
                          ? 'border-gap-navy scale-105 shadow-sm'
                          : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={c.images[0]} alt={c.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* ボタン: 直接撮影画面へ遷移 */}
                <button
                  onClick={() => {
                    setStep('camera');
                    startCamera();
                  }}
                  className="w-full h-[46px] bg-gap-navy text-white rounded-full font-bold text-[14px] hover:bg-[#001b3d] transition-colors flex items-center justify-center gap-6 shadow-sm cursor-pointer"
                >
                  <span>撮影する</span>
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------
             STEP 2: 写真準備方法の選択 (デスクトップのみ)
             ------------------------------------------------------- */}
          {step === 'source' && (
            <div className="flex flex-col items-center justify-between w-full h-[360px] text-center">
              <div>
                <div className="h-[28px] flex items-center justify-center">
                  <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                    写真の準備方法を選択
                  </h3>
                </div>
                <p className="text-[12px] text-gap-muted mt-6">
                  正面を向いた自然な姿勢の写真を使うと、美しくフィットします
                </p>
              </div>

              <div className="grid grid-cols-2 gap-16 w-full max-w-[560px] mb-12">
                <button
                  onClick={() => {
                    setStep('camera');
                    startCamera();
                  }}
                  className="h-[185px] rounded-[4px] border border-gray-200 hover:border-gap-navy hover:bg-blue-50/20 transition-all flex flex-col items-center justify-center p-16 group cursor-pointer"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-gray-100 group-hover:bg-gap-navy group-hover:text-white flex items-center justify-center transition-colors mb-10 text-gap-dark">
                    <Camera size={26} />
                  </div>
                  <h4 className="text-[14px] font-bold text-gap-dark">カメラで撮影する</h4>
                  <p className="text-[11px] text-gap-muted mt-3">
                    ガイドに合わせて撮影
                  </p>
                </button>

                <button
                  onClick={() => setStep('upload')}
                  className="h-[185px] rounded-[4px] border border-gray-200 hover:border-gap-navy hover:bg-blue-50/20 transition-all flex flex-col items-center justify-center p-16 group cursor-pointer"
                >
                  <div className="w-[52px] h-[52px] rounded-full bg-gray-100 group-hover:bg-gap-navy group-hover:text-white flex items-center justify-center transition-colors mb-10 text-gap-dark">
                    <Upload size={26} />
                  </div>
                  <h4 className="text-[14px] font-bold text-gap-dark">写真をアップロード</h4>
                  <p className="text-[11px] text-gap-muted mt-3">
                    保存済みの写真を選択
                  </p>
                </button>
              </div>

              <div className="h-[20px]" />
            </div>
          )}

          {/* -------------------------------------------------------
             STEP 3-A: カメラ撮影 (モバイルは映像の下にガイド切替と撮影ボタン)
             ------------------------------------------------------- */}
          {step === 'camera' && (
            <div className="w-full">
              
              {/* デスクトップ表示 (2カラム) */}
              <div className="hidden md:flex items-start justify-center gap-24 w-full h-[360px]">
                <div className="relative w-[240px] h-[360px] bg-black rounded-[4px] overflow-hidden flex items-center justify-center shadow-inner flex-shrink-0">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {guideType === 'upper' ? (
                      <svg viewBox="0 0 180 270" className="w-[78%] h-[85%] text-white/70">
                        <ellipse cx="90" cy="55" rx="28" ry="36" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M35 150 C55 115, 75 112, 90 112 C105 112, 125 115, 145 150 L135 270 L45 270 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 180 270" className="w-[62%] h-[92%] text-white/70">
                        <ellipse cx="90" cy="36" rx="16" ry="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M58 85 C70 70, 80 68, 90 68 C100 68, 110 70, 122 85 L114 165 L66 165 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M72 165 L70 265 M108 165 L110 265" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    )}
                  </div>

                  {countdown !== null && countdown > 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30 animate-in zoom-in-75 duration-200">
                      <span className="text-[72px] font-black text-white drop-shadow-2xl animate-pulse">
                        {countdown}
                      </span>
                    </div>
                  )}

                  {cameraError && (
                    <div className="absolute inset-0 bg-black/90 p-12 text-white text-center flex flex-col items-center justify-center z-40">
                      <p className="text-[12px] text-red-300 mb-8">{cameraError}</p>
                      <button
                        onClick={() => setStep('upload')}
                        className="px-12 py-6 bg-white text-black text-[11px] font-bold rounded-full cursor-pointer"
                      >
                        アップロードへ切り替え
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-[360px] text-left">
                  <div>
                    <div className="h-[28px] flex items-center">
                      <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                        ガイドに合わせて撮影
                      </h3>
                    </div>
                    <p className="text-[12px] text-gap-muted mt-6">
                      シャッターを押すと3秒後に自動撮影されます
                    </p>

                    <div className="w-[260px] h-[44px] mt-24 bg-gray-100 p-2 rounded-full flex items-center select-none">
                      <button
                        onClick={() => setGuideType('upper')}
                        className={`flex-1 h-full rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                          guideType === 'upper' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        上半身ガイド
                      </button>
                      <button
                        onClick={() => setGuideType('full')}
                        className={`flex-1 h-full rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                          guideType === 'full' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        全身ガイド
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={handleStartCountdown}
                      disabled={countdown !== null || !!cameraError}
                      className="w-[260px] h-[46px] bg-gap-navy text-white rounded-full font-bold text-[13px] hover:bg-[#001b3d] transition-all flex items-center justify-center gap-8 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <Camera size={18} />
                      <span>{countdown !== null ? `撮影中... (${countdown})` : '撮影する (3秒タイマー)'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* モバイル表示 (縦並び: カメラ映像が上、下にガイド切替と撮影ボタン) */}
              <div className="flex md:hidden flex-col items-center justify-between w-full max-w-[320px] mx-auto text-center">
                <div className="mb-8">
                  <h3 className="text-[17px] font-bold text-gap-dark">
                    ガイドに合わせて撮影
                  </h3>
                </div>

                {/* カメラ映像 */}
                <div className="relative w-[200px] h-[300px] bg-black rounded-[4px] overflow-hidden flex items-center justify-center shadow-md flex-shrink-0 mb-12">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {guideType === 'upper' ? (
                      <svg viewBox="0 0 180 270" className="w-[78%] h-[85%] text-white/70">
                        <ellipse cx="90" cy="55" rx="28" ry="36" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M35 150 C55 115, 75 112, 90 112 C105 112, 125 115, 145 150 L135 270 L45 270 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 180 270" className="w-[62%] h-[92%] text-white/70">
                        <ellipse cx="90" cy="36" rx="16" ry="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M58 85 C70 70, 80 68, 90 68 C100 68, 110 70, 122 85 L114 165 L66 165 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M72 165 L70 265 M108 165 L110 265" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    )}
                  </div>

                  {countdown !== null && countdown > 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30 animate-in zoom-in-75 duration-200">
                      <span className="text-[64px] font-black text-white drop-shadow-2xl animate-pulse">
                        {countdown}
                      </span>
                    </div>
                  )}
                </div>

                {/* メイン画像エリアの直下にガイド切り替えボタン */}
                <div className="w-[260px] h-[40px] bg-gray-100 p-2 rounded-full flex items-center select-none mb-12">
                  <button
                    onClick={() => setGuideType('upper')}
                    className={`flex-1 h-full rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                      guideType === 'upper' ? 'bg-black text-white shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    上半身ガイド
                  </button>
                  <button
                    onClick={() => setGuideType('full')}
                    className={`flex-1 h-full rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                      guideType === 'full' ? 'bg-black text-white shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    全身ガイド
                  </button>
                </div>

                {/* 撮影ボタン */}
                <button
                  onClick={handleStartCountdown}
                  disabled={countdown !== null || !!cameraError}
                  className="w-[260px] h-[46px] bg-gap-navy text-white rounded-full font-bold text-[13px] hover:bg-[#001b3d] transition-all flex items-center justify-center gap-8 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Camera size={18} />
                  <span>{countdown !== null ? `撮影中... (${countdown})` : '撮影する (3秒タイマー)'}</span>
                </button>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------
             STEP 3-A PREVIEW: 撮影確認
             ------------------------------------------------------- */}
          {step === 'camera-preview' && capturedImage && (
            <div className="w-full">
              
              {/* デスクトップ表示 */}
              <div className="hidden md:flex items-start justify-center gap-24 w-full h-[360px]">
                <div className="w-[240px] h-[360px] bg-black rounded-[4px] overflow-hidden shadow-md flex-shrink-0">
                  <img src={capturedImage} alt="撮影プレビュー" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-[360px] text-left">
                  <div>
                    <div className="h-[28px] flex items-center">
                      <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                        この写真で試着しますか？
                      </h3>
                    </div>
                    <p className="text-[12px] text-gap-muted mt-6">
                      顔や姿勢がはっきり写っていることを確認してください
                    </p>
                  </div>

                  <div className="flex items-center gap-10 w-[260px]">
                    <button
                      onClick={() => {
                        setStep('camera');
                        startCamera();
                      }}
                      className="flex-1 h-[46px] border border-gray-300 rounded-full font-bold text-[12px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>再撮影</span>
                    </button>
                    <button
                      onClick={() => setStep('generating')}
                      className="flex-1 h-[46px] bg-gap-navy text-white rounded-full font-bold text-[12px] hover:bg-[#001b3d] flex items-center justify-center gap-4 shadow-sm transition-colors cursor-pointer"
                    >
                      <Check size={16} />
                      <span>OK (試着開始)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* モバイル表示 */}
              <div className="flex md:hidden flex-col items-center justify-between w-full max-w-[320px] mx-auto text-center">
                <h3 className="text-[17px] font-bold text-gap-dark mb-10">
                  この写真で試着しますか？
                </h3>

                <div className="w-[200px] h-[300px] bg-black rounded-[4px] overflow-hidden shadow-md mb-16">
                  <img src={capturedImage} alt="撮影プレビュー" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center gap-10 w-[260px]">
                  <button
                    onClick={() => {
                      setStep('camera');
                      startCamera();
                    }}
                    className="flex-1 h-[44px] border border-gray-300 rounded-full font-bold text-[12px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>再撮影</span>
                  </button>
                  <button
                    onClick={() => setStep('generating')}
                    className="flex-1 h-[44px] bg-gap-navy text-white rounded-full font-bold text-[12px] hover:bg-[#001b3d] flex items-center justify-center gap-4 shadow-sm transition-colors cursor-pointer"
                  >
                    <Check size={16} />
                    <span>OK</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------
             STEP 3-B: 写真アップロード (デスクトップ用)
             ------------------------------------------------------- */}
          {step === 'upload' && (
            <div className="flex flex-col items-center justify-between w-full h-[360px] text-center">
              <div>
                <div className="h-[28px] flex items-center justify-center">
                  <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                    写真をアップロード
                  </h3>
                </div>
                <p className="text-[12px] text-gap-muted mt-6">
                  正面を向いて立っている写真を選ぶと綺麗にフィットします
                </p>
              </div>

              <label className="w-full max-w-[480px] border-2 border-dashed border-gray-300 hover:border-gap-navy hover:bg-gray-50/60 rounded-[4px] py-36 px-16 flex flex-col items-center justify-center cursor-pointer transition-colors group mb-12">
                <Upload size={32} className="text-gray-400 group-hover:text-gap-navy mb-10 transition-colors" />
                <span className="text-[14px] font-bold text-gap-dark">
                  クリックして写真を選択
                </span>
                <span className="text-[11px] text-gray-400 mt-4">
                  JPG / PNG / WEBP 形式 (最大 10MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="h-[20px]" />
            </div>
          )}

          {/* -------------------------------------------------------
             STEP 3-B PREVIEW: アップロード確認 (デスクトップ用)
             ------------------------------------------------------- */}
          {step === 'upload-preview' && uploadedImage && (
            <div className="flex items-start justify-center gap-24 w-full h-[360px]">
              <div className="w-[240px] h-[360px] bg-black rounded-[4px] overflow-hidden shadow-md flex-shrink-0">
                <img src={uploadedImage} alt="アップロードプレビュー" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between h-[360px] text-left">
                <div>
                  <div className="h-[28px] flex items-center">
                    <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                      この写真で試着しますか？
                    </h3>
                  </div>
                  <p className="text-[12px] text-gap-muted mt-6">
                    選択した画像をご確認ください
                  </p>
                </div>

                <div className="flex items-center gap-10 w-[260px]">
                  <button
                    onClick={() => setStep('upload')}
                    className="flex-1 h-[46px] border border-gray-300 rounded-full font-bold text-[12px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>再選択</span>
                  </button>
                  <button
                    onClick={() => setStep('generating')}
                    className="flex-1 h-[46px] bg-gap-navy text-white rounded-full font-bold text-[12px] hover:bg-[#001b3d] flex items-center justify-center gap-4 shadow-sm transition-colors cursor-pointer"
                  >
                    <Check size={16} />
                    <span>OK (試着開始)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------
             STEP 4: 画像生成中
             ------------------------------------------------------- */}
          {step === 'generating' && (
            <div className="w-full">
              
              {/* デスクトップ表示 */}
              <div className="hidden md:flex items-start justify-center gap-24 w-full h-[360px]">
                <div className="relative w-[240px] h-[360px] rounded-[4px] overflow-hidden shadow-md bg-gray-100 flex-shrink-0">
                  {stylingSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.caption}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-10 text-white text-[11px] font-bold">
                        {slide.caption}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-start h-[360px] text-left">
                  <div className="h-[28px] flex items-center gap-6">
                    <Sparkles size={18} className="text-gap-navy animate-spin flex-shrink-0" />
                    <h3 className="text-[16px] font-bold text-gap-dark leading-none break-all">
                      AIが体型に合わせてフィッティング中...
                    </h3>
                  </div>
                  
                  <p className="text-[12px] text-gray-500 mt-6 leading-relaxed">
                    GAPのスタイリングコレクションを参考に仕立てています
                  </p>

                  <div className="w-[260px] mt-24">
                    <div className="w-full h-[6px] bg-gray-200 rounded-full overflow-hidden mb-8">
                      <div
                        className="h-full bg-gap-navy transition-all duration-150 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-mono font-bold text-gray-600">
                      {progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* モバイル表示 */}
              <div className="flex md:hidden flex-col items-center justify-between w-full max-w-[320px] mx-auto text-center">
                <div className="flex items-center gap-6 mb-8">
                  <Sparkles size={16} className="text-gap-navy animate-spin flex-shrink-0" />
                  <h3 className="text-[15px] font-bold text-gap-dark">
                    AIフィッティング中...
                  </h3>
                </div>

                <div className="relative w-[200px] h-[300px] rounded-[4px] overflow-hidden shadow-md bg-gray-100 flex-shrink-0 mb-14">
                  {stylingSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.caption}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="w-[240px]">
                  <div className="w-full h-[5px] bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-gap-navy transition-all duration-150 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-gray-500">
                    {progress}%
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* -------------------------------------------------------
             STEP 5: 生成完了画面
             ------------------------------------------------------- */}
          {step === 'result' && (
            <div className="w-full">
              
              {/* デスクトップ表示 */}
              <div className="hidden md:flex items-start justify-center gap-24 w-full h-[360px] text-left">
                <div className="relative w-[240px] h-[360px] rounded-[3px] overflow-hidden shadow-xl border border-gray-200 bg-gray-50 flex-shrink-0">
                  <img
                    src="/images/virtual-try-on/result-demo.jpg"
                    alt="試着結果"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-[360px]">
                  <div>
                    <div className="h-[28px] flex items-center">
                      <h3 className="text-[18px] font-bold text-gap-dark leading-none">
                        試着プレビュー結果
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-4 text-green-700 bg-green-50 px-8 py-2 rounded-full text-[11px] font-bold mt-6 mb-4 w-fit">
                      <CheckCircle2 size={13} />
                      <span>フィッティング完了</span>
                    </div>

                    <p className="text-[13px] text-gray-700 font-medium leading-snug break-all">
                      {product.name}
                    </p>
                    <p className="text-[12px] text-gray-500 mt-2">
                      カラー: {currentColor.name} / ¥{product.price.toLocaleString()} (税込)
                    </p>
                  </div>

                  <div className="w-[260px]">
                    <button
                      onClick={() => {
                        onClose();
                        onProceedToPurchase?.();
                      }}
                      className="w-full h-[46px] bg-gap-navy text-white rounded-full font-bold text-[14px] hover:bg-[#001b3d] transition-colors flex items-center justify-center gap-6 shadow-sm cursor-pointer mb-8"
                    >
                      <ShoppingBag size={17} />
                      <span>この商品を購入する</span>
                    </button>

                    <div className="grid grid-cols-3 gap-6">
                      <button
                        onClick={() => setStep('color')}
                        className="h-[36px] border border-gray-300 rounded-full font-bold text-[11px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        <span>再試着</span>
                      </button>

                      <a
                        href="/images/virtual-try-on/result-demo.jpg"
                        download="gap-virtual-tryon.jpg"
                        className="h-[36px] border border-gray-300 rounded-full font-bold text-[11px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                      >
                        <Download size={12} />
                        <span>保存</span>
                      </a>

                      <div className="relative">
                        <button
                          onClick={() => setIsShareOpen(!isShareOpen)}
                          className="w-full h-[36px] border border-gray-300 rounded-full font-bold text-[11px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                        >
                          <Share2 size={12} />
                          <span>シェア</span>
                        </button>

                        {isShareOpen && (
                          <div className="absolute bottom-full right-0 mb-6 w-[200px] bg-white rounded-[4px] shadow-2xl border border-gray-200 p-8 z-40 text-left animate-in fade-in zoom-in-95 duration-100">
                            <div className="flex flex-col gap-4 text-[11px]">
                              <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`GAPのヴァーチャル試着で${product.name}を試着しました！ #GAPStyle`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-4 rounded hover:bg-gray-100 font-medium"
                              >
                                X (Twitter)
                              </a>
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-4 rounded hover:bg-gray-100 font-medium"
                              >
                                Facebook
                              </a>
                              <button
                                onClick={() => {
                                  alert('Instagramアプリでシェアするか、ダウンロードした画像を投稿してください。');
                                  setIsShareOpen(false);
                                }}
                                className="w-full text-left px-6 py-4 rounded hover:bg-gray-100 font-medium cursor-pointer"
                              >
                                Instagram
                              </button>
                              <hr className="my-1 border-gray-100" />
                              <button
                                onClick={handleCopyLink}
                                className="px-6 py-4 rounded hover:bg-gray-100 font-medium text-gap-navy cursor-pointer flex items-center justify-between"
                              >
                                <span>画像URLコピー</span>
                                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* モバイル表示 */}
              <div className="flex md:hidden flex-col items-center justify-between w-full max-w-[320px] mx-auto text-center">
                <div className="mb-6">
                  <h3 className="text-[17px] font-bold text-gap-dark">
                    試着プレビュー結果
                  </h3>
                  <div className="inline-flex items-center gap-4 text-green-700 bg-green-50 px-8 py-2 rounded-full text-[10px] font-bold mt-2">
                    <CheckCircle2 size={12} />
                    <span>フィッティング完了</span>
                  </div>
                </div>

                <div className="relative w-[200px] h-[300px] rounded-[3px] overflow-hidden shadow-xl border border-gray-200 bg-gray-50 flex-shrink-0 mb-14">
                  <img
                    src="/images/virtual-try-on/result-demo.jpg"
                    alt="試着結果"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <div className="w-[260px]">
                  <button
                    onClick={() => {
                      onClose();
                      onProceedToPurchase?.();
                    }}
                    className="w-full h-[46px] bg-gap-navy text-white rounded-full font-bold text-[14px] hover:bg-[#001b3d] transition-colors flex items-center justify-center gap-6 shadow-sm cursor-pointer mb-8"
                  >
                    <ShoppingBag size={17} />
                    <span>この商品を購入する</span>
                  </button>

                  <div className="grid grid-cols-3 gap-6">
                    <button
                      onClick={() => setStep('color')}
                      className="h-[36px] border border-gray-300 rounded-full font-bold text-[11px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      <span>再試着</span>
                    </button>

                    <a
                      href="/images/virtual-try-on/result-demo.jpg"
                      download="gap-virtual-tryon.jpg"
                      className="h-[36px] border border-gray-300 rounded-full font-bold text-[11px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      <span>保存</span>
                    </a>

                    <div className="relative">
                      <button
                        onClick={() => setIsShareOpen(!isShareOpen)}
                        className="w-full h-[36px] border border-gray-300 rounded-full font-bold text-[11px] text-gray-700 hover:border-black flex items-center justify-center gap-4 transition-colors cursor-pointer"
                      >
                        <Share2 size={12} />
                        <span>シェア</span>
                      </button>

                      {isShareOpen && (
                        <div className="absolute bottom-full right-0 mb-6 w-[200px] bg-white rounded-[4px] shadow-2xl border border-gray-200 p-8 z-40 text-left animate-in fade-in zoom-in-95 duration-100">
                          <div className="flex flex-col gap-4 text-[11px]">
                            <a
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`GAPのヴァーチャル試着で${product.name}を試着しました！ #GAPStyle`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-4 rounded hover:bg-gray-100 font-medium"
                            >
                              X (Twitter)
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-4 rounded hover:bg-gray-100 font-medium"
                            >
                              Facebook
                            </a>
                            <button
                              onClick={() => {
                                alert('Instagramアプリでシェアするか、ダウンロードした画像を投稿してください。');
                                setIsShareOpen(false);
                              }}
                              className="w-full text-left px-6 py-4 rounded hover:bg-gray-100 font-medium cursor-pointer"
                            >
                              Instagram
                            </button>
                            <hr className="my-1 border-gray-100" />
                            <button
                              onClick={handleCopyLink}
                              className="px-6 py-4 rounded hover:bg-gray-100 font-medium text-gap-navy cursor-pointer flex items-center justify-between"
                            >
                              <span>画像URLコピー</span>
                              {isCopied ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}