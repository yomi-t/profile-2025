'use client';

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from " @/components/ui/card";
import { Button } from " @/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Laptop, Code, Instagram, MessageCircleMore, Github } from "lucide-react";
import Link from "next/link";
import { Noto_Sans } from "next/font/google";


const notoSans = Noto_Sans({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasScrolledRef = useRef(false);

  // クライアント側でのマウント完了確認
  useEffect(() => {
    setMounted(true);
  }, []);

  // スクロールでローディング解除
  useEffect(() => {
    let scrollLocked = false;
    let lockTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleUserScroll = (e: Event) => {
      if (!hasScrolledRef.current) {
        // 初回スクロール時：ローディング解除＆スクロールロック開始
        hasScrolledRef.current = true;
        setLoading(false);
        scrollLocked = true;
        lockTimeout = setTimeout(() => {
          scrollLocked = false;
        }, 2000);
        e.preventDefault();
        e.stopPropagation();
      } else if (scrollLocked) {
        // ロック期間中はスクロールイベントをキャンセル
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", handleUserScroll, { passive: false });
    window.addEventListener("touchstart", handleUserScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchstart", handleUserScroll);
      if (lockTimeout) clearTimeout(lockTimeout);
    };
  }, []);


  if (!mounted) {
    return <div style={{ minHeight: "100vh" }} />;
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* 飛び交う光の粒 */}
            <div className="absolute w-full h-full overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    backgroundColor: `hsla(${Math.random() * 360}, 100%, 80%, 0.8)`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{ y: [-50, -200], opacity: [0.8, 0] }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
            {/* 中央コンテンツ */}
            <div className="text-center z-10 overflow-visible">
              <motion.h1
                className={`text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-300 to-red-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] leading-relaxed ${notoSans.className}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                Taiga Ito
              </motion.h1>
              <motion.p
                className="mt-4 text-xl sm:text-2xl text-white animate-pulse leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                汰海、ただいま準備中...
              </motion.p>
              <motion.div
                className="mt-12 text-white text-sm sm:text-base animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                ↓ スクロールしてはじめよう ↓
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8 pb-16 flex flex-col items-center justify-center font-sans">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-blue-800 animate-bounce mt-20">
              <span className='text-purple-600'>伊藤汰海</span> です
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 w-full mx-auto">
              Web部門長です！よろしくね！<br/>
              最近初めてサウナに行きました。よかったです。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 text-center"  // カード風の背景や影は削除
          >
            <ul className="text-gray-700 text-base sm:text-lg space-y-1">
              <li>商学部 2-6-4 1210240270</li>
              <li>最寄り駅：志村三丁目駅</li>
              <li>誕生日：2005年10月12日</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {/* Cards */}
            <Card className="p-4 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition-transform">
              <CardContent className="flex flex-col items-center">
                <Code className="text-blue-500 w-10 h-10 mb-2 animate-ping" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">スキル</h2>
                <p className="text-center text-gray-600 text-sm sm:text-base">
                  iOSアプリ開発（Swift）/ Web開発（Next.js）/ Illustrator / Premiere Pro などいろんなデジタルのモノづくりが好きです!
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition-transform">
              <CardContent className="flex flex-col items-center">
                <Disc3 className="text-purple-500 w-10 h-10 mb-2 animate-spin" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">趣味</h2>
                <p className="text-center text-gray-600 text-sm sm:text-base">
                  ミスチルがめっちゃ好きです。ライブが待ち遠しい。スキー、スノボとか、体動かすのも好き。
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-white shadow-xl rounded-2xl transform hover:scale-105 transition-transform">
              <CardContent className="flex flex-col items-center">
                <Laptop className="text-pink-500 w-10 h-10 mb-2 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">バイト</h2>
                <p className="text-center text-gray-600 text-sm sm:text-base">
                  iOSアプリ開発 / Life is Tech! (プログラミング、DXメンター)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10"
          >
            <Button
              className="text-lg px-6 py-3 rounded-full shadow-md opacity-0 cursor-pointer"
              onClick={() => setShowExtra(!showExtra)}
            >
              {showExtra ? "閉じる" : "もっと見る"}
            </Button>
          </motion.div>

          {showExtra && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 bg-white p-6 rounded-xl shadow-lg max-w-2xl text-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-purple-700">これの作成の裏側</h3>
              <p className="text-gray-700 text-base sm:text-lg">
                実はほぼ全てのコーディングをAIにやってもらいました。<br />今の時代って素晴らしい。
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-col items-center text-center space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">SNSでつながりましょう！</h3>
            <div className="flex space-x-6">
              <Link href="https://www.instagram.com/taiga10_12" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-500 hover:text-pink-700 transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="hidden sm:inline text-sm sm:text-base">@taiga10_12</span>
              </Link>
              <Link href="https://github.com/yomi-t" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors">
                <Github className="w-6 h-6" />
                <span className="hidden sm:inline text-sm sm:text-base">@yomi-t</span>
              </Link>
              <Link href="https://line.me/ti/p/tiger59103" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                <MessageCircleMore className="w-6 h-6" />
                <span className="hidden sm:inline text-sm sm:text-base">LINEで友だち追加</span>
              </Link>
            </div>
          </motion.div>
        </main>
      )}
    </>
  );
}