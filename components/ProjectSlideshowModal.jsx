"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";

export default function ProjectSlideshowModal({ project, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const rawImages =
    project?.images && project.images.length > 0
      ? project.images
      : [{ src: project?.preview || "/assets/images/raihan.png", alt: project?.title || "Project" }];

  const total = rawImages.length;

  // Infinite carousel slides: if total > 1, add last image to start and first image to end
  const slides =
    total > 1
      ? [rawImages[total - 1], ...rawImages, rawImages[0]]
      : rawImages;

  // When total > 1, index 1 corresponds to rawImages[0]
  const [index, setIndex] = useState(total > 1 ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isSlidingRef = useRef(false);

  // Preload ALL project images immediately on modal mount so there is ZERO load delay on slide button click
  useEffect(() => {
    if (!rawImages || rawImages.length === 0) return;
    rawImages.forEach((img) => {
      const preload = new window.Image();
      preload.src = img.src;
    });
  }, [project?.id]);

  // Reset index when project changes
  useEffect(() => {
    setIndex(total > 1 ? 1 : 0);
    setIsTransitioning(false);
    isSlidingRef.current = false;
  }, [project?.id, total]);

  // Re-enable transition after instant snap
  useEffect(() => {
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    if (total <= 1 || isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1 || isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  }, [total]);

  const handleTransitionEnd = () => {
    isSlidingRef.current = false;
    if (total > 1) {
      if (index === total + 1) {
        // Reached cloned first slide at the end, snap back to slide 1 seamlessly
        setIsTransitioning(false);
        setIndex(1);
      } else if (index === 0) {
        // Reached cloned last slide at the start, snap back to slide total seamlessly
        setIsTransitioning(false);
        setIndex(total);
      }
    }
  };

  // Keyboard navigation: Left/Right arrows and Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, onClose]);

  if (!project || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-2xl transition-all duration-300 select-none animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Slideshow`}
    >
      <div
        className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-stone-950/95 rounded-2xl sm:rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.9)] overflow-hidden pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-stone-900/60 backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                {project.title}
              </h3>
              {project.domain && (
                <p className="text-xs text-stone-400 font-mono truncate hidden sm:block">
                  https://{project.domain}
                </p>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 pointer-events-auto">
            {/* View Project Button */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => e.stopPropagation()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-coral text-white hover:brightness-110 transition-colors shadow-xs cursor-pointer pointer-events-auto"
              >
                <span>{project.linkLabel || "View Project"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* GitHub Repo Button */}
            {project.link2 && (
              <a
                href={project.link2}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={(e) => e.stopPropagation()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer pointer-events-auto"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{project.link2Label || "GitHub"}</span>
              </a>
            )}

            {/* Close Button (Cross Button) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              className="p-1.5 sm:p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
              aria-label="Close Slideshow"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Display: Smooth Sliding Track (Right to Left / Left to Right) */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] md:min-h-[480px] max-h-[66vh] bg-black/60 overflow-hidden pointer-events-auto">
          {/* Continuous Sliding Flex Track */}
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex h-full w-full will-change-transform"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: isTransitioning
                ? "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
            }}
          >
            {slides.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="min-w-full w-full h-full flex items-center justify-center shrink-0 p-2 sm:p-4 select-none"
              >
                <img
                  src={img.src}
                  alt={img.alt || `${project.title} slide ${idx + 1}`}
                  loading="eager"
                  decoding="async"
                  className="max-h-[64vh] max-w-full object-contain rounded shadow-2xl pointer-events-none select-none"
                />
              </div>
            ))}
          </div>

          {/* Previous Slide Button (Left Arrow) */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-coral text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95 z-30 pointer-events-auto"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Next Slide Button (Right Arrow) */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-coral text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95 z-30 pointer-events-auto"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>

        {/* Bottom Details (Clean, no borders, no thumbnail ribbon) */}
        <div className="p-4 sm:p-5 bg-stone-900/80 backdrop-blur-md flex flex-col gap-3 pointer-events-auto">
          {/* Subtitle / Description */}
          {project.subtitle && (
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-4xl">
              {project.subtitle}
            </p>
          )}

          {/* Technology Badges & Mobile Links */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pointer-events-auto">
            {/* Tech Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-white/5 text-stone-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile Action Buttons (Visible only on small screens) */}
            <div className="flex sm:hidden items-center gap-2 w-full pt-1 pointer-events-auto">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-coral text-white cursor-pointer pointer-events-auto"
                >
                  <span>{project.linkLabel || "View Project"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.link2 && (
                <a
                  href={project.link2}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-stone-800 text-stone-200 cursor-pointer pointer-events-auto"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{project.link2Label || "GitHub"}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
