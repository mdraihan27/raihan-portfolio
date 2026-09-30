"use client";
import Image from "next/image";
import { forwardRef } from "react";

const Me = forwardRef(function Me(props, ref) {
  return (
    <section ref={ref} className="w-full relative scroll-mt-20 py-2 sm:py-4">
      {/* Decorative ambient backdrop glow */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Side: Profile Photo + Name & Software Engineer below */}
      <div className="shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-fit">
        {/* Photo container without border */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[340px] lg:h-[340px] xl:w-[370px] xl:h-[370px] rounded-3xl overflow-hidden shadow-2xl bg-stone-100 group">
          <Image
            src="/assets/images/raihan.png"
            alt="Md. Raihan Hossen"
            fill
            sizes="(max-width: 640px) 256px, (max-width: 1024px) 340px, 400px"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Name & Software Engineer directly below the photo */}
        <div className="mt-5 w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Md. Raihan Hossen
          </h1>
          <p className="text-coral text-base sm:text-lg font-semibold mt-1">
            Software Engineer
          </p>
        </div>
      </div>
    </section>
  );
});

export default Me;
