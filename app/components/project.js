"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
  { title, subtitle, link,link2, link2Label = "GitHub", linkLabel = "View project", images = [], tags = [] },
  ref,
) {
  const slides = images.length ? images : fallbackImages;
  const [currentIndex, setCurrentIndex] = useState(0);

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
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-300 hover:text-orange-200 mt-1 group me-3"
              >
                <span className="relative inline-flex items-center gap-2 rounded-md border border-orange-500/50  px-3 py-1.5 backdrop-blur-sm">
                  <span>{linkLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-orange-500/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </a>
            )}

            {link2 && (
              <a
                href={link2}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-300 hover:text-stone-200 mt-1 group"
              >
                <span className="relative inline-flex items-center gap-2 rounded-md border border-stone-300  px-3 py-1.5 backdrop-blur-sm">
                  <span>{link2Label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-stone-500/50 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                </span>
              </a>
            )}

            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-stone-200/90 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-[650px] lg:w-[750px]">
            {hasSlides && (
              <div
                id="indicators-carousel"
                className="relative w-full"
                data-carousel="static"
              >
                {/* Carousel wrapper with fixed height */}
            <div className="relative h-48 md:h-72 lg:h-96 border-2 border-white/10 overflow-hidden rounded-2xl flex items-center justify-center bg-black/40">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`${
                        index === currentIndex ? "block" : "hidden"
                      } duration-700 ease-in-out w-full h-full`}
                      data-carousel-item={
                        index === currentIndex ? "active" : undefined
                      }
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={slide.src}
                          alt={slide.alt || "Project image"}
                          fill
                        className="object-contain"
                        loading="eager"
                        quality={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 650px, 750px"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`w-2 h-2 rounded-full border border-white/60 transition-colors ${
                        index === currentIndex
                          ? "bg-white"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-current={index === currentIndex ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => setCurrentIndex(index)}
                      data-carousel-slide-to={index}
                    />
                  ))}
                </div>

                {/* Slider controls */}
                <button
                  type="button"
                  className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4  group focus:outline-none "
                  data-carousel-prev
                >
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 bg-[#ffffff10]  cursor-pointer rounded-full group-hover:bg-white/10 "
                    onClick={goPrev}
                  >
                    <svg
                      className="w-5 h-5 text-white rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 19-7-7 7-7"
                      />
                    </svg>
                    <span className="sr-only">Previous</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  
                  data-carousel-next
                >
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 bg-[#ffffff10]  cursor-pointer rounded-full group-hover:bg-white/10 "
                    onClick={goNext}
                  >
                    <svg
                      className="w-5 h-5 text-white rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                    <span className="sr-only">Next</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Project;
