import { forwardRef } from "react";

const Me = forwardRef(function Me(props, ref) {
  return (
    <div ref={ref} className=" ">
      <div className="bg-[#11111150] rounded-4xl p-6">
        <h1 className="text-stone-100 text-3xl  font-medium">
          Md. Raihan Hossen
        </h1>
        <p className="text-stone-100 text-md  font-medium mt-4">
          I am a software engineer and full-stack developer with strong
          problem-solving skills and who cares about delivering high-quality,
          well-crafted solutions. I specialize in building scalable,
          high-performance applications from front-end interfaces to back-end
          systems. With a sharp eye for detail and a commitment to clean,
          maintainable code
        </p>
        <a
          href="/assets/downloads/MD_RAIHAN_HOSSEN_RESUME.pdf"
          download
          className="inline-flex items-center mt-6 px-4 py-2 rounded-full bg-stone-100 text-stone-900 text-sm hover:text-stone-50 font-medium hover:bg-stone-800 transition-colors active:scale-95 active:translate-y-[1px]"
        >
          Download Resume
        </a>
      </div>
      
    </div>
  );
});

export default Me;
