import { forwardRef } from "react";
import Image from "next/image";

const Skills = forwardRef(function Skills(props, ref) {
  return (
    <div ref={ref} className="">
      <p className="text-stone-100 font-medium mb-3">My Skills</p>
      <div className="bg-[#00000095] rounded-4xl border border-white/5 p-5 sm:p-6 w-full text-stone-300">
        <div className="w-full">
          <p className="w-full text-center mb-3 text-sm sm:text-base">Frontend</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-5">
            <Skill
              skillName={"HTML"}
              imgSrc={"/assets/icons/skills/html.png"}
              alt="HTML"
            />
            <Skill
              skillName={"CSS"}
              imgSrc={"/assets/icons/skills/css.png"}
              alt="CSS"
            />
            <Skill
              skillName={"Tailwind"}
              imgSrc={"/assets/icons/skills/tailwind.png"}
              alt="Tailwind"
            />
            <Skill
              skillName={"JavaScript"}
              imgSrc={"/assets/icons/skills/js.png"}
              alt="JavaScript"
            />
            <Skill
              skillName={"TypeScript"}
              imgSrc={"/assets/icons/skills/ts.png"}
              alt="TypeScript"
            />
            <Skill
              skillName={"React"}
              imgSrc={"/assets/icons/skills/react.png"}
              alt="React"
            />
            <Skill
              skillName={"Next.js"}
              imgSrc={"/assets/icons/skills/nextjs.png"}
              alt="Next.js"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="w-full text-center mb-3 text-sm sm:text-base">Backend</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-5">
            <Skill
              skillName={"Python"}
              imgSrc={"/assets/icons/skills/python.png"}
              alt="Python"
            />
            <Skill
              skillName={"Java"}
              imgSrc={"/assets/icons/skills/java.png"}
              alt="Java"
            />
            <Skill
              skillName={"FastAPI"}
              imgSrc={"/assets/icons/skills/fastapi.png"}
              alt="FastAPI"
            />
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#ffffff10] rounded-2xl flex flex-col justify-between py-3 sm:py-4 items-center gap-2">
              <Image
                alt="SQLAlchemy"
                src={"/assets/icons/skills/sqlalchemy.png"}
                height={50}
                width={50}
                className="mt-2 sm:mt-3"
              />
              <p className="text-center text-[11px] sm:text-[13px] text-stone-100 font-bold">
                SQLAlchemy
              </p>
            </div>
            <Skill
              skillName={"Spring"}
              imgSrc={"/assets/icons/skills/spring.png"}
              alt="Spring"
            />
            <Skill
              skillName={"Spring Boot"}
              imgSrc={"/assets/icons/skills/springboot.png"}
              alt="Spring Boot"
            />
            <Skill
              skillName={"MongoDB"}
              imgSrc={"/assets/icons/skills/mongodb.png"}
              alt="MongoDB"
            />
            <Skill
              skillName={"PostgreSQL"}
              imgSrc={"/assets/icons/skills/postgresql.png"}
              alt="PostgreSQL"
            />
            <Skill
              skillName={"Firebase"}
              imgSrc={"/assets/icons/skills/firebase.png"}
              alt="Firebase"
            />
            <Skill
              skillName={"MySQL"}
              imgSrc={"/assets/icons/skills/mysql.png"}
              alt="MySQL"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="w-full text-center mb-3 text-sm sm:text-base">Others</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-5">
            <Skill
              skillName={"Docker"}
              imgSrc={"/assets/icons/skills/docker.png"}
              alt="Docker"
            />
            <Skill
              skillName={"Linux"}
              imgSrc={"/assets/icons/skills/linux.png"}
              alt="Linux"
            />
            <Skill
              skillName={"Git"}
              imgSrc={"/assets/icons/skills/git.png"}
              alt="Git"
            />
            <Skill
              skillName={"GitHub"}
              imgSrc={"/assets/icons/skills/github.png"}
              alt="GitHub"
            />
            <Skill
              skillName={"Digital Ocean"}
              imgSrc={"/assets/icons/skills/digitalocean.png"}
              alt="Digital Ocean"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
});

function Skill({ skillName, imgSrc, alt }) {
  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#ffffff10] rounded-2xl flex flex-col justify-between py-3 sm:py-4 items-center gap-2">
      <Image alt={alt} src={imgSrc} width={30} height={30} className="w-7 h-7 sm:w-[30px] sm:h-[30px]" />
      <p className="text-center text-[11px] sm:text-[13px] text-stone-100 font-bold">
        {skillName}
      </p>
    </div>
  );
}

export default Skills;
