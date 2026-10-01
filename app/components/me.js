"use client";
import Image from "next/image";
import { forwardRef } from "react";
import THEME from "@/lib/theme";

const Me = forwardRef(function Me(props, ref) {
  return (
    <section ref={ref} className="relative z-10 w-fit">
      {/* Profile Photo cutout + Name & Software Engineer below */}
      <div className="flex flex-col items-center text-center">
        {/* Photo Container with Accent Glow */}
        <div className="relative w-fit">
          {/* Ambient radiant accent glow behind the cutout */}
          <div
            aria-hidden="true"
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[75%] max-w-[480px] max-h-[480px] rounded-full pointer-events-none -z-10"
            style={{
              background: `radial-gradient(circle, ${THEME.rgba(0.45)} 0%, ${THEME.rgba(0.28)} 40%, ${THEME.rgba(0.12)} 65%, transparent 75%)`,
              filter: "blur(48px)",
            }}
          />

          {/* Transparent PNG photo with smooth fade towards bottom */}
          <div
            className="relative w-fit transition-transform duration-500 hover:scale-[1.02]"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 55%, rgba(0,0,0,1) 72%, rgba(0,0,0,0.6) 86%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 55%, rgba(0,0,0,1) 72%, rgba(0,0,0,0.7) 86%, transparent 100%)",
            }}
          >
            <Image
              src="/assets/images/raihan.png"
              alt="Md. Raihan Hossen"
              width={1792}
              height={2380}
              priority
              className="w-auto h-auto max-w-[280px] xs:max-w-[340px] sm:max-w-[500px] md:max-w-[620px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[660px] max-h-[50vh] sm:max-h-[68vh] lg:max-h-[70vh] object-contain pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Name & Software Engineer directly below the photo */}
        <div className="mt-3 sm:mt-5 w-full flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-stone-900 tracking-tight font-lobster text-center">
            Md. Raihan Hossen
          </h1>
          <p
            className="text-base sm:text-xl lg:text-2xl font-bold mt-1 sm:mt-2 text-center tracking-wide"
            style={{
              color: THEME.dark,
              textShadow: `0 1px 2px rgba(0, 0, 0, 0.15), 0 2px 12px ${THEME.rgba(0.4)}`,
            }}
          >
            Software Engineer
          </p>

          {/* Download CV Action Button (Transparent Background) */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center">
            <a
              href="/assets/downloads/MD_RAIHAN_HOSSEN_RESUME.pdf"
              download="MD_RAIHAN_HOSSEN_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 bg-transparent border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto select-none"
              style={{
                borderColor: THEME.rgba(0.55),
              }}
              title="Download Raihan's CV (PDF)"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                style={{ color: THEME.dark }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="tracking-wide">Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Me;
