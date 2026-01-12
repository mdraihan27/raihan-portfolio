"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Antigravity from "../components/Antigravity";
import { Nav } from "./components/nav";
import Silk from "@/components/Silk";

export default function Home() {
  const meRef = useRef(null);
  const featureRef = useRef(null);
  const pricingRef = useRef(null);
  return (
    <div className=" bg-zinc-900 dark:bg-black">
      <div className="w-full h-screen relative">
        {/* <Antigravity
          magnetRadius={29}
          ringRadius={13}
          waveSpeed={1.9}
          waveAmplitude={3.3}
          particleSize={0.9}
          count={300}
          color="#ff4500"
          autoAnimate={false}
          particleVariance={0.9}
          pulseSpeed={4.5}
        /> */}

        <Silk
          speed={5}
          scale={1}
          color="#7b7481"
          noiseIntensity={3}
          rotation={0}
        />

        <div className="absolute top-1/17 left-2/13 w-9/13 h-15/17 backdrop-blur-[35px] pointer-events-none  border-[#ff4500] rounded-2xl flex">
          <Nav
            navItems={[
              { itemName: "Me", targetRef: meRef, offSet: 0, key: "me" },
            ]}
          />

          <main>
            <div ref={meRef}></div>
          </main>
        </div>
      </div>
    </div>
  );
}
