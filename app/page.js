"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Antigravity from "../components/Antigravity";
import { Nav } from "./components/nav";
import Skills from "./components/skills";
import Contact from "./components/contact";
import Achievements from "./components/achievements";
import Education from "./components/education";
import Project from "./components/project";
import Me from "./components/me";

import Silk from "@/components/Silk";
import {
  User2,
  FolderKanban,
  Mail,
  GraduationCap,
  Award,
  Layers,
  Cpu,
  CodeXml,
  PanelsTopLeft
} from "lucide-react";

export default function Home() {
  const meRef = useRef(null);
  const projectsRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const skillsRef = useRef(null);

  const project3Ref = useRef(null);

  const achievementsRef = useRef(null);

  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const [activeNavKey, setActiveNavKey] = useState("me");

  return (
    <div className=" bg-zinc-900 dark:bg-black">
      <div className="w-full h-screen relative">
        <Silk
          speed={5}
          scale={1}
          color="#7b7481"
          noiseIntensity={3}
          rotation={0}
        />

        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
          <div className="w-[1440px] h-7/8 backdrop-blur-[35px]  border-[#ff4500] rounded-2xl flex flex-col">
          <div className="w-full h-[30px] border-b-zinc-700 border-b">
            <div className="h-full w-[250px] border-e border-e-zinc-700"></div>
          </div>
          <div className="flex h-full">
            <Nav
            className=""
              activeKey={activeNavKey}
              onChangeActive={setActiveNavKey}
              navItems={[
                {
                  itemName: "Me",
                  targetRef: meRef,
                  offSet: 0,
                  key: "me",
                  icon: User2,
                },
                {
                  itemName: "Skills",
                  targetRef: skillsRef,
                  offSet: 0,
                  key: "skills",
                  icon: CodeXml,
                },
                {
                  itemName: "Projects",
                  targetRef: projectsRef,
                  offSet: 0,
                  key: "projects",
                  icon: PanelsTopLeft,
                },
                {
                  itemName: "Neuraletter",
                  targetRef: project1Ref,
                  type: "project",
                  offSet: 0,
                  key: "project1",
                  // icon: Layers,
                },
                {
                  itemName: "Ballotguard",
                  targetRef: project2Ref,
                  type: "project",
                  offSet: 0,
                  key: "project2",
                  // icon: Cpu,
                },
                {
                  itemName: "Everything Image",
                  targetRef: project3Ref,
                  type: "project",
                  offSet: 0,
                  key: "project3",
                  // icon: Layers,
                },
                {
                  itemName: "Achievements",
                  targetRef: achievementsRef,
                  offSet: 0,
                  key: "achievements",
                  icon: Award,
                },
                {
                  itemName: "Education",
                  targetRef: educationRef,
                  offSet: 0,
                  key: "education",
                  icon: GraduationCap,
                },
                {
                  itemName: "Contact",
                  targetRef: contactRef,
                  offSet: 0,
                  key: "contact",
                  icon: Mail,
                },
              ]}
            />

            <main className="flex flex-col p-8 w-[1180px]">
              <Me ref={meRef} />
              <div ref={skillsRef}></div>
              <div ref={projectsRef}></div>
              <div ref={project1Ref}></div>
              <div ref={project2Ref}></div>
              <div ref={project3Ref}></div>
              <div ref={achievementsRef}></div>
              <div ref={educationRef}></div>
              <div ref={contactRef}></div>
            </main>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
