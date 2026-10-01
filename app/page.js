"use client";
import { useRef } from "react";

import Me from "./components/me";
import DualGradientBackground from "@/components/DualGradientBackground";
import HeroCoins3D from "@/components/HeroCoins3D";
import THEME from "@/lib/theme";

export default function Home() {
  const meRef = useRef(null);
  const mainRef = useRef(null);

  return (
    <DualGradientBackground>
      {/* 3D Coins orbiting across top-right corner of the whole screen */}
      <HeroCoins3D />

      <div className="w-full min-h-[100dvh] relative px-4 sm:px-8 lg:px-14 xl:px-20 py-4 sm:py-8 lg:py-12 flex flex-col justify-end sm:justify-center pointer-events-none">
        <main
          ref={mainRef}
          className="w-full flex flex-col items-center sm:items-start pointer-events-auto pb-14 sm:pb-0"
        >
          <Me ref={meRef} />
        </main>
      </div>

      {/* Switch to Old 2D Version pill at center bottom of the screen */}
      <div className="fixed bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none w-[calc(100%-2rem)] max-w-md sm:w-auto flex justify-center">
        <a
          href="https://old.raihanhossen.work"
          className="group w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-white/85 dark:bg-stone-900/85 backdrop-blur-md border border-stone-200/80 dark:border-stone-800/80 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-95 text-stone-600 dark:text-stone-300 text-center"
        >
          <span className="text-xs sm:text-sm font-medium">
            3D too much for you?
          </span>
          <span
            className="text-xs sm:text-sm font-bold underline decoration-1 underline-offset-2 transition-colors flex items-center gap-1"
            style={{ color: THEME.dark }}
          >
            Switch to old version
            <svg
              className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </a>
      </div>
    </DualGradientBackground>
  );
}
