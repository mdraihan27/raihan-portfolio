import { forwardRef } from "react";

const Skills = forwardRef(function Skills(props, ref) {
  return (
    <div ref={ref} className=" ">
      <div className="bg-[#11111150] rounded-4xl p-6"></div>
    </div>
  );
});

export default Skills;
