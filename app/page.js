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
  const project4Ref = useRef(null);
  const project5Ref = useRef(null);


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
      { key: "project5", ref: project5Ref, offset: 15 },
      { key: "project4", ref: project4Ref, offset: 15 },
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
                    itemName: "Barakah",
                    targetRef: project5Ref,
                    type: "project",
                    offSet: 15,
                    key: "project5",
                    // icon: Layers,
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
                    itemName: "MailDoor",
                    targetRef: project4Ref,
                    type: "project",
                    offSet: 15,
                    key: "project4",
                    // icon: Layers,
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
                      ref={project5Ref}
                      title="Barakah - Compare Groceries, Shop Smarter"
                      subtitle="A platform where consumers can compare grocery prices of offline shops in their area. It encourages fair pricing and helps users find the best deals, saving them money and promoting transparency in the grocery market."
                      link="https://barakah-platform.vercel.app/"
                      link2="https://github.com/mdraihan27/barakah"
                      link2Label="GitHub Repo"

                      tags={[
                        "React",
                        "FastAPI",
                        "mongoDB",
                        "Cloudinary",
                        "Tailwind CSS",

                      ]}
                      images={[
                        {
                          src: "/assets/images/projects/barakah/barakah-1.png",
                          alt: "Barakah 1",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-2.png",
                          alt: "Barakah 2",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-3.png",
                          alt: "Barakah 3",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-4.png",
                          alt: "Barakah 4",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-5.png",
                          alt: "Barakah 5",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-6.png",
                          alt: "Barakah 6",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-7.png",
                          alt: "Barakah 7",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-8.png",
                          alt: "Barakah 8",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-9.png",
                          alt: "Barakah 9",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-10.png",
                          alt: "Barakah 10",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-11.png",
                          alt: "Barakah 11",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-12.png",
                          alt: "Barakah 12",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-13.png",
                          alt: "Barakah 13",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-14.png",
                          alt: "Barakah 14",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-15.png",
                          alt: "Barakah 15",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-16.png",
                          alt: "Barakah 16",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-17.png",
                          alt: "Barakah 17",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-18.png",
                          alt: "Barakah 18",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-19.png",
                          alt: "Barakah 19",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-20.png",
                          alt: "Barakah 20",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-21.png",
                          alt: "Barakah 21",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-22.png",
                          alt: "Barakah 22",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-23.png",
                          alt: "Barakah 23",
                        },
                        {
                          src: "/assets/images/projects/barakah/barakah-24.png",
                          alt: "Barakah 24",
                        },


                      ]}
                    />


                    <Project
                      ref={project3Ref}
                      title="Neuraletter"
                      subtitle="An AI powered newsletter service
                that lets you create topics, chat with AI to generate a description for that topic and sends regular updates to your email on whats happening worldwide around those topics based on a frequency you set."
                      link="https://neuraletter.raihanhossen.site/"
                      link2="https://github.com/mdraihan27/neuraletter-frontend"
                      link2Label="Frontend Repo"
                      link3="https://github.com/mdraihan27/neuraletter-backend"
                      link3Label="Backend Repo"
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
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-5.png",
                          alt: "Neuraletter 5",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-6.png",
                          alt: "Neuraletter 6",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-7.png",
                          alt: "Neuraletter 7",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-8.png",
                          alt: "Neuraletter 8",
                        },
                        {
                          src: "/assets/images/projects/neuraletter/neuraletter-9.png",
                          alt: "Neuraletter 9",
                        },
                      ]}
                    />

                    <Project
                      ref={project4Ref}
                      title="MailDoor"
                      subtitle="A simple SMTP based mailing service, that lets you bypass digital oceans blockage of SMTP mail sending and lets you easily sent mails to your users by providing your app password."
                      link="https://maildoor.raihanhossen.site/"
                      link2="https://github.com/mdraihan27/maildoor"
                      link2Label="GitHub Repo"

                      tags={[
                        "Next.js",
                        "Express Js",
                        "Nodemailer",
                        "mongoDB",

                      ]}
                      images={[
                        {
                          src: "/assets/images/projects/maildoor/maildoor-1.png",
                          alt: "Maildoor 1",
                        },
                        {
                          src: "/assets/images/projects/maildoor/maildoor-2.png",
                          alt: "Maildoor 2",
                        },
                        {
                          src: "/assets/images/projects/maildoor/maildoor-3.png",
                          alt: "Maildoor 3",
                        },
                        {
                          src: "/assets/images/projects/maildoor/maildoor-4.png",
                          alt: "Maildoor 4",
                        },
                        {
                          src: "/assets/images/projects/maildoor/maildoor-5.png",
                          alt: "Maildoor 5",
                        },
                        {
                          src: "/assets/images/projects/maildoor/maildoor-6.png",
                          alt: "Maildoor 6",
                        },
                        {
                          src: "/assets/images/projects/maildoor/maildoor-7.png",
                          alt: "Maildoor 7",
                        },

                      ]}
                    />

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
