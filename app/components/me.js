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
              className="w-auto h-auto max-w-[380px] sm:max-w-[500px] md:max-w-[620px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[660px] max-h-[66vh] sm:max-h-[68vh] lg:max-h-[70vh] object-contain pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Name & Software Engineer directly below the photo */}
        <div className="mt-4 sm:mt-5 w-full flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-stone-900 tracking-tight font-lobster text-center">
            Md. Raihan Hossen
          </h1>
          <p
            className="text-lg sm:text-xl lg:text-2xl font-bold mt-1 sm:mt-2 text-center tracking-wide"
            style={{
              color: THEME.dark,
              textShadow: `0 1px 2px rgba(0, 0, 0, 0.15), 0 2px 12px ${THEME.rgba(0.4)}`,
            }}
          >
            Software Engineer
          </p>
        </div>
      </div>
    </section>
  );
});

export default Me;
