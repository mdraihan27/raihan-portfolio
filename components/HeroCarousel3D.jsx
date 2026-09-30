"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  CodeXml,
  PanelsTopLeft,
  GraduationCap,
  Award,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const HERO_ITEMS = [
  {
    id: "skills",
    title: "Skills",
    tagline: "Stack & Expertise",
    description: "Frontend, Backend, Databases, Cloud & Architecture",
    icon: CodeXml,
    badge: "Expertise",
  },
  {
    id: "projects",
    title: "Projects",
    tagline: "Featured Works",
    description: "Production web applications, platforms & tools",
    icon: PanelsTopLeft,
    badge: "Showcase",
  },
  {
    id: "education",
    title: "Education",
    tagline: "Academic Journey",
    description: "B.Sc. in Computer Science & Engineering, JUST",
    icon: GraduationCap,
    badge: "Degree",
  },
  {
    id: "achievements",
    title: "Achievements",
    tagline: "Honors & Contests",
    description: "Competitive programming awards & hackathons",
    icon: Award,
    badge: "Awards",
  },
  {
    id: "contact",
    title: "Contact",
    tagline: "Get in Touch",
    description: "Open for engineering roles, freelance & collaborations",
    icon: Mail,
    badge: "Connect",
  },
];

export default function HeroCarousel3D() {
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDraggingRef = useRef(false);
  const progressRef = useRef(0);
  const lastPointerX = useRef(null);
  const lastPointerY = useRef(null);
  const startPointer = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const isHoveredRef = useRef(false);

  isHoveredRef.current = isHovered;
  const totalCards = HERO_ITEMS.length;

  // Gentle forward drift (TasteSkill style animation loop)
  useEffect(() => {
    let animId = 0;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      if (!isDraggingRef.current && !isHoveredRef.current) {
        // Slow continuous forward rotation
        progressRef.current = (progressRef.current + 30e-6 * dt) % 1;
        setProgress(progressRef.current);
      }
      animId = window.requestAnimationFrame(loop);
    };

    animId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animId);
  }, []);

  // Update active index based on card currently closest to focal apex (l = 0.5, norm = 0.375)
  useEffect(() => {
    const focalNorm = 0.375;
    let closestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i < totalCards; i++) {
      const norm = ((i / totalCards + progress) % 1 + 1) % 1;
      const diff = Math.abs(norm - focalNorm);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIndex(closestIdx);
  }, [progress, totalCards]);

  const handlePointerDown = (e) => {
    lastPointerX.current = e.clientX;
    lastPointerY.current = e.clientY;
    startPointer.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || lastPointerX.current === null || lastPointerY.current === null) return;
    const dx = e.clientX - lastPointerX.current;
    const dy = e.clientY - lastPointerY.current;

    if (Math.hypot(e.clientX - startPointer.current.x, e.clientY - startPointer.current.y) > 6) {
      hasMovedRef.current = true;
    }

    // Drag sensitivity (vertical + partial horizontal drag)
    const t = dy + 0.35 * dx;
    progressRef.current = (progressRef.current + 8e-4 * t + 1) % 1;
    setProgress(progressRef.current);

    lastPointerX.current = e.clientX;
    lastPointerY.current = e.clientY;
  };

  const handlePointerUp = () => {
    lastPointerX.current = null;
    lastPointerY.current = null;
    isDraggingRef.current = false;
  };

  const handleCardClick = (id) => {
    if (hasMovedRef.current) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const jumpToCard = (targetIndex) => {
    // Bring targetIndex card to focal norm 0.375
    const focalNorm = 0.375;
    const newProgress = (focalNorm - targetIndex / totalCards + 1) % 1;
    progressRef.current = newProgress;
    setProgress(newProgress);
  };

  return (
    <div
      className="relative w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Stage without harsh overflow clipping */}
      <div
        className="relative w-full h-[440px] sm:h-[480px] lg:h-[500px] touch-pan-y"
        style={{ perspective: "2800px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="Portfolio interactive 3D hero carousel"
      >
        {/* Subtle background ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-80 h-80 rounded-full bg-coral/10 blur-[120px]" />
        </div>

        {/* 3D Preserve-3D Container */}
        <div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(2.5deg) rotateY(-3.5deg)",
          }}
        >
          {HERO_ITEMS.map((item, index) => {
            const norm = ((index / totalCards + progress) % 1 + 1) % 1;
            const isVisible = norm > 0 && norm < 0.75;
            const l = isVisible ? norm / 0.75 : 0;

            // Fade envelope
            const u = Math.min(
              Math.min(1, Math.max(0, l / 0.08)),
              Math.min(1, Math.max(0, (1 - l) / 0.1))
            );

            // Sine peak at l = 0.5
            const x = isVisible ? Math.sin(l * Math.PI) : 0;

            // Smooth continuous 3D path:
            // Arc moves from upper left depth, sweeps through focal center (0, 0), and exits lower right depth
            let posX, posY;
            if (l <= 0.5) {
              const t = l / 0.5; // 0 -> 1
              posX = -45 * Math.pow(1 - t, 1.2);
              posY = -140 * Math.pow(1 - t, 1.3);
            } else {
              const t = (l - 0.5) / 0.5; // 0 -> 1
              posX = 55 * Math.pow(t, 1.1);
              posY = 65 * Math.pow(t, 1.1);
            }

            const zIndex = Math.round(20 + 80 * x);
            const opacity = isVisible ? u * (0.3 + 0.7 * x) : 0;
            const translateZ = -750 + 900 * x;
            const rotX = 3.5 - 3.5 * x;
            const rotY = -6 + 10 * l;
            const scale = 0.65 + 0.45 * x;
            const isFocal = x > 0.82;

            const IconComponent = item.icon;

            return (
              <figure
                key={item.id}
                onClick={() => isFocal && handleCardClick(item.id)}
                className={`group absolute left-1/2 top-1/2 w-[260px] sm:w-[285px] h-[330px] sm:h-[350px] transition-shadow duration-300 ${
                  isFocal ? "cursor-pointer" : "pointer-events-none"
                }`}
                style={{
                  zIndex,
                  opacity,
                  transform: `translate3d(calc(-50% + ${posX}%), calc(-50% + ${posY}%), ${translateZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(0deg) scale(${scale})`,
                  pointerEvents: isFocal ? "auto" : "none",
                }}
              >
                {/* Card Container */}
                <div
                  className={`w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl bg-[#121215]/95 border transition-all duration-300 ${
                    isFocal
                      ? "border-coral/60 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(250,95,85,0.28)] hover:border-coral hover:shadow-[0_30px_70px_rgba(250,95,85,0.38)]"
                      : "border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                  }`}
                >
                  {/* Top Row: Badge + Arrow */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-stone-300">
                      <Sparkles className="w-3 h-3 text-coral" />
                      {item.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 group-hover:text-coral group-hover:border-coral/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center: Very Large Icon with Ambient Glow */}
                  <div className="my-auto flex flex-col items-center justify-center text-center">
                    <div className="relative mb-3 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl bg-coral/25 blur-xl scale-125" />
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center text-coral shadow-inner group-hover:scale-105 group-hover:border-coral/50 transition-all duration-300">
                        <IconComponent className="w-11 h-11 sm:w-12 sm:h-12 stroke-[1.7]" />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-coral mt-1 tracking-wide">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Bottom: Description & Prompt */}
                  <div className="text-center pt-2.5 border-t border-white/5">
                    <p className="text-[11px] sm:text-xs text-stone-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Navigation Indicators & Section Switcher Pill */}
      <div className="mt-2 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-stone-900/85 border border-white/10 backdrop-blur-md shadow-xl">
        {HERO_ITEMS.map((item, idx) => {
          const isActive = idx === activeIndex;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => jumpToCard(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? "bg-coral text-white shadow-md shadow-coral/30 scale-105"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
              title={`View ${item.title}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
