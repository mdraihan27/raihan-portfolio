import { forwardRef } from "react";
import Image from "next/image";

const Education = forwardRef(function Education(props, ref) {
  return (
    <div ref={ref} className="">
      <p className="text-stone-100 font-medium mb-3">Education</p>

      <div className="bg-[#11111100] rounded-4xl   w-full text-stone-300">
        <div className="space-y-4">
          <div className="flex items-center gap-3 sm:gap-4 bg-[#ffffff10] rounded-2xl p-3 sm:p-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00000040] rounded-2xl flex items-center justify-center">
              <Image
                src="/assets/icons/achievements/just_logo.png"
                alt="JUST logo"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="text-stone-100 font-semibold text-xs sm:text-sm">
                B. Sc. in Computer Science and Engineering
              </p>
              <p className="text-stone-300 text-[11px] sm:text-xs mt-1">
                Jashore University of Science and Technology &middot; Since 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Education;
