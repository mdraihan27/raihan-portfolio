"use client";

import { forwardRef, useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const fallbackImages = [
  {
    src: "/assets/images/raihan.png",
    alt: "Project preview",
  },
  {
    src: "/assets/images/raihan.png",
    alt: "Project detail view",
  },
  {
    src: "/assets/images/raihan.png",
    alt: "Project interaction",
  },
];

const Project = forwardRef(function Project(
  {
    title,
    subtitle,
    link,
    linkLabel = "View project",
    images = [],
    tags = [],
  },
  ref
) {
  const slides = images.length ? images : fallbackImages;
  const [currentIndex, setCurrentIndex] = useState(0);

  const { prevIndex, nextIndex } = useMemo(() => {
    const length = slides.length;
    if (!length) {
      return { prevIndex: 0, nextIndex: 0 };
    }
    return {
      prevIndex: (currentIndex - 1 + length) % length,
      nextIndex: (currentIndex + 1) % length,
    };
  }, [currentIndex, slides.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const hasSlides = slides && slides.length > 0;

  return (
    <section ref={ref} className="scroll-mt-24">
      <div className="bg-[#00000095] border border-white/5 rounded-3xl p-5 sm:p-6 md:p-8 w-full text-stone-100 shadow-[0_24px_80px_rgba(0,0,0,0.85)]">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="space-y-4 md:w-[34%]">
            {/* {title && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.16em] text-orange-300/80">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.9)]" />
                Featured Project
              </div>
            )} */}

            {title && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-sm md:text-[15px] leading-relaxed text-stone-300/90">
                {subtitle}
              </p>
            )}

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-300 hover:text-orange-200 mt-1 group"
              >
                <span className="relative inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-gradient-to-r from-orange-500/20 via-transparent to-transparent px-3 py-1.5 backdrop-blur-sm">
                  <span>{linkLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-orange-500/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </a>
            )}

            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-stone-200/90 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="md:w-[66%] w-full">
            {hasSlides && (
              <div className="relative w-full max-w-3xl mx-auto h-64 sm:h-72 md:h-80 lg:h-[22rem]">
                {/* Main slide */}
                <div className="absolute inset-y-3 left-1/2 -translate-x-1/2 w-[76%] sm:w-[70%] md:w-[68%] z-20">
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
                    <Image
                      src={slides[currentIndex].src}
                      alt={slides[currentIndex].alt || "Project screenshot"}
                      fill
                      priority
                      sizes="(min-width: 1024px) 600px, 80vw"
                      className="object-cover select-none"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 mix-blend-multiply" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-4 text-xs sm:text-[13px]">
                      <div className="flex items-center gap-2 text-white/85">
                        <span className="inline-flex h-6 px-2 items-center rounded-full bg-black/40 backdrop-blur text-[11px] border border-white/10">
                          {currentIndex + 1} / {slides.length}
                        </span>
                        {/* {title && (
                          <span className="hidden sm:inline truncate max-w-[10rem] md:max-w-[14rem] text-white/80">
                            {title}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous peek */}
                <button
                  type="button"
                  onClick={goPrev}
                  className="group absolute inset-y-6 left-0 w-[26%] sm:w-[24%] flex items-center justify-start pl-1 z-10"
                >
                  <div className="relative h-32 sm:h-40 md:h-44 w-full overflow-hidden rounded-2xl border border-white/5 bg-white/5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-0.5 transition-all duration-500 ease-out">
                    <Image
                      src={slides[prevIndex].src}
                      alt={slides[prevIndex].alt || "Previous screenshot"}
                      fill
                      sizes="(min-width: 1024px) 220px, 30vw"
                      className="object-cover scale-[1.02] select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur border border-white/15 text-white/85 shadow-[0_0_26px_rgba(0,0,0,0.8)]">
                        <ChevronLeft className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>

                {/* Next peek */}
                <button
                  type="button"
                  onClick={goNext}
                  className="group absolute inset-y-6 right-0 w-[26%] sm:w-[24%] flex items-center justify-end pr-1 z-10"
                >
                  <div className="relative h-32 sm:h-40 md:h-44 w-full overflow-hidden rounded-2xl border border-white/5 bg-white/5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-500 ease-out">
                    <Image
                      src={slides[nextIndex].src}
                      alt={slides[nextIndex].alt || "Next screenshot"}
                      fill
                      sizes="(min-width: 1024px) 220px, 30vw"
                      className="object-cover scale-[1.02] select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-y-0 left-2 flex items-center">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 backdrop-blur border border-white/15 text-white/85 shadow-[0_0_26px_rgba(0,0,0,0.8)]">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>

                {/* Soft glow under carousel */}
                <div className="pointer-events-none absolute -bottom-4 left-1/2 h-14 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/20 via-sky-400/15 to-violet-500/25 blur-3xl opacity-70" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Project;
