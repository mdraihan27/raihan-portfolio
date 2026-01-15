import Image from "next/image";
import { forwardRef } from "react";

const Me = forwardRef(function Me(props, ref) {
  return (
    <div ref={ref} className="">
      <p className="text-stone-100 font-medium mb-3">Me</p>

      <div className="bg-[#11111150] border border-white/5 rounded-4xl p-5 sm:p-6 flex flex-col gap-6 md:gap-10 lg:flex-row lg:justify-between lg:gap-20">
        <div className="order-2 lg:order-1">
          <h1 className="text-stone-100 text-2xl sm:text-3xl font-medium">
            Md. Raihan Hossen
          </h1>
          <p className="text-stone-100 text-sm sm:text-base font-medium mt-4  leading-relaxed">
            I am a software engineer and full-stack developer with strong
            problem-solving skills and who cares about delivering high-quality,
            well-crafted solutions. I specialize in building scalable,
            high-performance applications from front-end interfaces to back-end
            systems. With a sharp eye for detail and a commitment to clean,
            maintainable code.
          </p>
          <a
            href="/assets/downloads/MD_RAIHAN_HOSSEN_RESUME.pdf"
            download
            className="inline-flex items-center mt-6 px-4 py-2 rounded-full bg-stone-100 text-stone-900 text-sm hover:text-stone-50 font-medium hover:bg-stone-800 transition-colors active:scale-95 active:translate-y-[1px]"
          >
            Download Resume
          </a>
        </div>

        <Image
          className="order-1 lg:order-2 rounded-[15px] object-cover mx-auto lg:mx-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
          src={"/assets/images/raihan.png"}
          width={200}
          height={200}
          alt="Md. Raihan Hossen"
        />
      </div>
    </div>
  );
});

export default Me;
