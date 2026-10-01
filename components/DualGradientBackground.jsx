"use client";
import { useEffect, useState, useRef } from "react";

import THEME from "@/lib/theme";

export default function DualGradientBackground({ children, className = "" }) {
  // Baseline square size: 48px
  const [gridSize, setGridSize] = useState(48);
  const [lineWidth, setLineWidth] = useState(1);
  const baseDprRef = useRef(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Determine baseline DPR (devicePixelRatio at 100% zoom)
    let storedBase = null;
    try {
      storedBase = sessionStorage.getItem("app_base_dpr");
    } catch {
      // ignore storage restrictions
    }

    const currentDpr = window.devicePixelRatio || 1;

    if (!storedBase) {
      // Estimate if current browser is already zoomed: outerWidth / innerWidth ~ zoom
      let estimatedZoom = 1;
      if (window.outerWidth && window.innerWidth && window.innerWidth > 0) {
        const ratio = window.outerWidth / window.innerWidth;
        // Typical zoom steps: 0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0, etc.
        if (Math.abs(ratio - 1) > 0.08) {
          estimatedZoom = ratio;
        }
      }

      const calculatedBase = currentDpr / estimatedZoom;
      baseDprRef.current = calculatedBase > 0 ? calculatedBase : currentDpr;
      try {
        sessionStorage.setItem("app_base_dpr", baseDprRef.current.toString());
      } catch {}
    } else {
      baseDprRef.current = parseFloat(storedBase) || currentDpr;
    }

    const updateGrid = () => {
      const nowDpr = window.devicePixelRatio || 1;
      const vpScale = window.visualViewport?.scale || 1;
      const zoomFactor = (nowDpr / baseDprRef.current) * vpScale;
      const safeZoom = zoomFactor > 0 ? zoomFactor : 1;

      // Inversely scale CSS pixel size so the square maintains an exact constant physical screen size on zoom
      const computedSize = Math.round((48 / safeZoom) * 100) / 100;
      const computedLine = Math.max(0.5, Math.round((1 / safeZoom) * 100) / 100);

      setGridSize(computedSize);
      setLineWidth(computedLine);
    };

    updateGrid();

    window.addEventListener("resize", updateGrid, { passive: true });
    window.visualViewport?.addEventListener("resize", updateGrid, { passive: true });
    window.visualViewport?.addEventListener("scroll", updateGrid, { passive: true });

    // MatchMedia listener for immediate notification on devicePixelRatio changes (Ctrl +/-)
    let cleanupMq = () => {};
    const listenToDprChange = () => {
      if (typeof window.matchMedia !== "undefined") {
        try {
          const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
          const handler = () => {
            updateGrid();
            listenToDprChange();
          };
          mq.addEventListener("change", handler, { once: true });
          cleanupMq = () => mq.removeEventListener("change", handler);
        } catch {}
      }
    };
    listenToDprChange();

    return () => {
      window.removeEventListener("resize", updateGrid);
      window.visualViewport?.removeEventListener("resize", updateGrid);
      window.visualViewport?.removeEventListener("scroll", updateGrid);
      cleanupMq();
    };
  }, []);

  return (
    <div className={`min-h-screen w-full bg-white relative ${className}`}>
      {/* Dual Gradient Overlay (Bottom) Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${THEME.rgba(0.25)} ${lineWidth}px, transparent ${lineWidth}px),
            linear-gradient(to bottom, ${THEME.rgba(0.25)} ${lineWidth}px, transparent ${lineWidth}px),
            radial-gradient(circle 500px at 20% 100%, ${THEME.rgba(0.3)}, transparent),
            radial-gradient(circle 500px at 100% 80%, ${THEME.rgba(0.3)}, transparent)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, 100% 100%, 100% 100%`,
        }}
      />
      {/* Content / Components */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}
