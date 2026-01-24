"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { Nav } from "./components/nav";
import Skills from "./components/skills";
import Contact from "./components/contact";
import Achievements from "./components/achievements";
import Education from "./components/education";
import Project from "./components/project";
import Me from "./components/me";
import Beams from "@/components/Beams";

import {
  User2,
  FolderKanban,
  Mail,
  GraduationCap,
  Award,
  Layers,
  Cpu,
  CodeXml,
  PanelsTopLeft,
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

  const mainRef = useRef(null);

  const [activeNavKey, setActiveNavKey] = useState("me");

  useEffect(() => {
    const container = mainRef.current || window;

    const sections = [
      { key: "me", ref: meRef, offset: 20 },
      { key: "skills", ref: skillsRef, offset: 15 },
      { key: "projects", ref: projectsRef, offset: 15 },
      { key: "project3", ref: project1Ref, offset: 15 },
      { key: "project2", ref: project2Ref, offset: 15 },
      { key: "project1", ref: project3Ref, offset: 15 },
      { key: "achievements", ref: achievementsRef, offset: 15 },
      { key: "education", ref: educationRef, offset: 15 },
      { key: "contact", ref: contactRef, offset: 15 },
    ];

    const handleScroll = () => {
      const containerRect =
        container === window
          ? { top: 0, height: window.innerHeight }
          : container.getBoundingClientRect();

      let closestKey = null;
      let smallestDistance = Infinity;

      sections.forEach((section) => {
        const el = section.ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const distance = Math.abs(
          rect.top - containerRect.top - (section.offset ?? 0)
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestKey = section.key;
        }
      });

      if (closestKey) {
        setActiveNavKey((prev) => (prev === closestKey ? prev : closestKey));
      }
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-zinc-900 dark:bg-black">
      <div className="w-full h-screen relative">

        <Beams />

        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
          <div className="w-full max-w-[1440px] lg:h-7/8 md:h-7/8 h-full backdrop-blur-[35px] bg-[#00000020] border-[#ff4500] lg:rounded-2xl md:rounded-2xl flex flex-col">
            {/* Header stays at top */}
            <div className="hidden lg:block w-full h-[30px] border-b-zinc-700 border-b">
              <div className="hidden lg:block h-full w-[250px] border-e border-e-zinc-700"></div>
            </div>
            {/* Content area: nav + main, main scrolls */}
            <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
              <Nav
                className=""
                activeKey={activeNavKey}
                onChangeActive={setActiveNavKey}
                scrollContainerRef={mainRef}
                navItems={[
                  {
                    itemName: "Me",
                    targetRef: meRef,
                    offSet: 20,
                    key: "me",
                    icon: User2,
                  },
                  {
                    itemName: "Skills",
                    targetRef: skillsRef,
                    offSet: 15,
                    key: "skills",
                    icon: CodeXml,
                  },
                  {
                    itemName: "Projects",
                    targetRef: projectsRef,
                    offSet: 15,
                    key: "projects",
                    icon: PanelsTopLeft,
                  },

                  {
                    itemName: "Everything Image",
                    targetRef: project1Ref,
                    type: "project",
                    offSet: 15,
                    key: "project3",
                    // icon: Layers,
                  },
                  {
                    itemName: "Ballotguard",
                    targetRef: project2Ref,
                    type: "project",
                    offSet: 15,
                    key: "project2",
                    // icon: Cpu,
                  },
                  {
                    itemName: "Neuraletter",
                    targetRef: project3Ref,
                    type: "project",
                    offSet: 15,
                    key: "project1",
                    // icon: Layers,
                  },
                  {
                    itemName: "Achievements",
                    targetRef: achievementsRef,
                    offSet: 15,
                    key: "achievements",
                    icon: Award,
                  },
                  {
                    itemName: "Education",
                    targetRef: educationRef,
                    offSet: 15,
                    key: "education",
                    icon: GraduationCap,
                  },
                  {
                    itemName: "Contact",
                    targetRef: contactRef,
                    offSet: 15,
                    key: "contact",
                    icon: Mail,
                  },
                ]}
              />

              <main
                ref={mainRef}
                className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10 w-full lg:w-[1180px]  flex-1 overflow-y-scroll no-scrollbar custom-scrollbar"
              >
                <Me ref={meRef} />
                <Skills ref={skillsRef} />
                <div ref={projectsRef}>
                  <p className="text-stone-100 font-medium mb-3">Projects</p>

                  <div className="flex flex-col gap-8">
                    <Project
                      ref={project1Ref}
                      title="Everything Image"
                      subtitle="The ultimate tool for quick image fixes. Easily convert, compress, crop, resize, edit, remove backgrounds, add watermark, add text over, blur and enhance image resolution. All in one place."
                      link="https://everything-image.tech/"
                      link2="https://github.com/mdraihan27/everything-image"
                      tags={["Next.js", "Tailwind CSS"]}
                      images={[
                        {
                          src: "/assets/images/projects/everything-image/everything-image-1.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/everything-image/everything-image-2.png",
                          alt: "Add Text Page",
                        },
                        {
                          src: "/assets/images/projects/everything-image/everything-image-3.png",
                          alt: "Convert Page",
                        },
                        {
                          src: "/assets/images/projects/everything-image/everything-image-4.png",
                          alt: "Pro Editor Page",
                        },
                        {
                          src: "/assets/images/projects/everything-image/everything-image-5.png",
                          alt: "Add Watermark Page",
                        },
                        {
                          src: "/assets/images/projects/everything-image/everything-image-6.png",
                          alt: "Crop & Resize Page",
                        },
                        {
                          src: "/assets/images/projects/everything-image/everything-image-7.png",
                          alt: "About Page",
                        },
                        
                      ]}
                    />
                    <Project
                      ref={project2Ref}
                      title="Ballotguard"
                      subtitle="The perfect online voting system. Enforces single person single vote principle by sending a private voting link to each voters email. Can perform open elections too which operates based on a public link."
                      link="https://ballotguard.vercel.app/"
                      link2="https://github.com/orgs/ballotguard/repositories"
                      tags={[
                        "Next.js",
                        "Springboot",
                        "Tailwind",
                        "MongoDB",
                        "Spring Security",
                      ]}
                      images={[
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-2.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-3.png",
                          alt: "Signup Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-4.png",
                          alt: "Dashboard Page",
                        },

                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-5.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-6.png",
                          alt: "Landing Page",
                        },

                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-7.png",
                          alt: "Landing Page",
                        },

                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-8.png",
                          alt: "Landing Page",
                        },

                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-9.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-10.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-11.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-12.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-13.png",
                          alt: "Landing Page",
                        },
                        {
                          src: "/assets/images/projects/ballotguard/ballotguard-14.png",
                          alt: "Landing Page",
                        },
                      ]}
                    />
                    <Project
                      ref={project3Ref}
                      title="Neuraletter (ongoing)"
                      subtitle="An AI-native newsletter workspace
                that lets you compose, iterate, and ship issues with a
                cinematic, distraction-free editor. Crafted to feel like a
                design tool, but moves at the speed of code."
                      link="https://neuraletter.vercel.app/"
                      link2="https://github.com/orgs/densware/repositories"
                      tags={[
                        "Next.js",
                        "Fast API",
                        "Mistral AI",
                        "PostgreSQL",
                        "Digital Ocean",
                        "Nginx",
                      ]}
                      images={[
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-1.png",
                          alt: "Neuraletter 1",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-2.png",
                          alt: "Neuraletter 2",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-3.png",
                          alt: "Neuraletter 3",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-4.png",
                          alt: "Neuraletter 4",
                        },
                      ]}
                    />
                  </div>
                </div>

                <Achievements ref={achievementsRef} />
                <Education ref={educationRef} />
                <div ref={contactRef} className="mb-16 lg:mb-[605px]">
                  <p className="text-stone-100 font-medium mb-3">Contact</p>

                  <Contact />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
