"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { PROJECTS_DATA } from "@/lib/projectsData";
import ProjectSlideshowModal from "@/components/ProjectSlideshowModal";
import THEME from "@/lib/theme";

const COIN_TYPES = [
  { id: "skills", targetId: "skills", name: "Skills", type: "skills" },
  { id: "projects", targetId: "projects", name: "Projects", type: "projects" },
  { id: "education", targetId: "education", name: "Education", type: "education" },
  { id: "achievements", targetId: "achievements", name: "Achievements", type: "achievements" },
  { id: "contact", targetId: "contact", name: "Contact", type: "contact" },
  // Repeated set: when unique items finish, put them again (180deg opposite)
  { id: "skills-2", targetId: "skills", name: "Skills", type: "skills" },
  { id: "projects-2", targetId: "projects", name: "Projects", type: "projects" },
  { id: "education-2", targetId: "education", name: "Education", type: "education" },
  { id: "achievements-2", targetId: "achievements", name: "Achievements", type: "achievements" },
  { id: "contact-2", targetId: "contact", name: "Contact", type: "contact" },
];

// 8 3D project window cards along the orbit (4 unique projects cycled twice for continuous looping)
const PROJECT_ITEMS = [
  { ...PROJECTS_DATA[0], orbitId: "proj-barakah-1", indexInOrbit: 0, totalInOrbit: 8 },
  { ...PROJECTS_DATA[1], orbitId: "proj-maildoor-1", indexInOrbit: 1, totalInOrbit: 8 },
  { ...PROJECTS_DATA[2], orbitId: "proj-everything-image-1", indexInOrbit: 2, totalInOrbit: 8 },
  { ...PROJECTS_DATA[3], orbitId: "proj-ballotguard-1", indexInOrbit: 3, totalInOrbit: 8 },
  { ...PROJECTS_DATA[0], orbitId: "proj-barakah-2", indexInOrbit: 4, totalInOrbit: 8 },
  { ...PROJECTS_DATA[1], orbitId: "proj-maildoor-2", indexInOrbit: 5, totalInOrbit: 8 },
  { ...PROJECTS_DATA[2], orbitId: "proj-everything-image-2", indexInOrbit: 6, totalInOrbit: 8 },
  { ...PROJECTS_DATA[3], orbitId: "proj-ballotguard-2", indexInOrbit: 7, totalInOrbit: 8 },
];

// 21 Skills arranged across 3 concentric circular orbital rows.
// Each unique skill appears exactly once (7 skills per row, totalInRow: 7).
// Middle track (Row 1) is staggered by +0.5 pitch so it sits in the middle between Row 0 and Row 2.
const SKILL_ITEMS = [
  // ROW 0: Outer Track (7 unique frontend skills)
  { id: "html", name: "HTML", icon: "/assets/icons/skills/html.png", row: 0, indexInRow: 0, totalInRow: 7 },
  { id: "css", name: "CSS", icon: "/assets/icons/skills/css.png", row: 0, indexInRow: 1, totalInRow: 7 },
  { id: "tailwind", name: "Tailwind", icon: "/assets/icons/skills/tailwind.png", row: 0, indexInRow: 2, totalInRow: 7 },
  { id: "js", name: "JavaScript", icon: "/assets/icons/skills/js.png", row: 0, indexInRow: 3, totalInRow: 7 },
  { id: "ts", name: "TypeScript", icon: "/assets/icons/skills/ts.png", row: 0, indexInRow: 4, totalInRow: 7 },
  { id: "react", name: "React", icon: "/assets/icons/skills/react.png", row: 0, indexInRow: 5, totalInRow: 7 },
  { id: "nextjs", name: "Next.js", icon: "/assets/icons/skills/nextjs.png", row: 0, indexInRow: 6, totalInRow: 7 },

  // ROW 1: Middle Track (7 unique backend skills, +0.5 pitch offset)
  { id: "python", name: "Python", icon: "/assets/icons/skills/python.png", row: 1, indexInRow: 0, totalInRow: 7 },
  { id: "java", name: "Java", icon: "/assets/icons/skills/java.png", row: 1, indexInRow: 1, totalInRow: 7 },
  { id: "fastapi", name: "FastAPI", icon: "/assets/icons/skills/fastapi.png", row: 1, indexInRow: 2, totalInRow: 7 },
  { id: "sqlalchemy", name: "SQLAlchemy", icon: "/assets/icons/skills/sqlalchemy.png", row: 1, indexInRow: 3, totalInRow: 7 },
  { id: "spring", name: "Spring", icon: "/assets/icons/skills/spring.png", row: 1, indexInRow: 4, totalInRow: 7 },
  { id: "springboot", name: "Spring Boot", icon: "/assets/icons/skills/springboot.png", row: 1, indexInRow: 5, totalInRow: 7 },
  { id: "postgresql", name: "PostgreSQL", icon: "/assets/icons/skills/postgresql.png", row: 1, indexInRow: 6, totalInRow: 7 },

  // ROW 2: Inner Track (7 unique database, cloud & tool skills)
  { id: "mongodb", name: "MongoDB", icon: "/assets/icons/skills/mongodb.png", row: 2, indexInRow: 0, totalInRow: 7 },
  { id: "mysql", name: "MySQL", icon: "/assets/icons/skills/mysql.png", row: 2, indexInRow: 1, totalInRow: 7 },
  { id: "firebase", name: "Firebase", icon: "/assets/icons/skills/firebase.png", row: 2, indexInRow: 2, totalInRow: 7 },
  { id: "docker", name: "Docker", icon: "/assets/icons/skills/docker.png", row: 2, indexInRow: 3, totalInRow: 7 },
  { id: "linux", name: "Linux", icon: "/assets/icons/skills/linux.png", row: 2, indexInRow: 4, totalInRow: 7 },
  { id: "git", name: "Git", icon: "/assets/icons/skills/git.png", row: 2, indexInRow: 5, totalInRow: 7 },
  { id: "github", name: "GitHub", icon: "/assets/icons/skills/github.png", row: 2, indexInRow: 6, totalInRow: 7 },
];

// Achievements arranged in a single circular orbital track around the center cross.
// Unique items are placed once in sequence, and when they finish, repeated again (6 x 2 = 12 coins).
const ACHIEVEMENT_ITEMS = [
  // First sequence: 6 unique achievements
  {
    id: "acm-contest",
    name: "1st Runner-Up (JUST ACM)",
    caption: "1st Runner-Up (JUST ACM)",
    icon: "/assets/icons/achievements/just_logo.png",
    row: 0,
    indexInRow: 0,
    totalInRow: 12,
  },
  {
    id: "robotics-quiz",
    name: "Champion: Robotics Quiz",
    caption: "Robotics Quiz Champion",
    icon: "/assets/icons/achievements/just_robo_society.png",
    row: 0,
    indexInRow: 1,
    totalInRow: 12,
  },
  {
    id: "codeforces-max",
    name: "Codeforces (1168 Max)",
    caption: "Codeforces (1168 Max)",
    icon: "/assets/icons/achievements/codeforces.png",
    url: "https://codeforces.com/profile/mdraihanhossen",
    row: 0,
    indexInRow: 2,
    totalInRow: 12,
  },
  {
    id: "cf-solved",
    name: "365+ Solved Problems",
    caption: "365+ Solved (Codeforces)",
    icon: "/assets/icons/achievements/codeforces.png",
    url: "https://codeforces.com/profile/mdraihanhossen",
    row: 0,
    indexInRow: 3,
    totalInRow: 12,
  },
  {
    id: "robo-soc",
    name: "JUST Robo Society",
    caption: "JUST Robo Society",
    icon: "/assets/icons/achievements/just_robo_society.png",
    row: 0,
    indexInRow: 4,
    totalInRow: 12,
  },
  {
    id: "codechef-pro",
    name: "CodeChef Competitor",
    caption: "CodeChef Profile",
    icon: "/assets/icons/achievements/codechef.png",
    url: "https://www.codechef.com",
    row: 0,
    indexInRow: 5,
    totalInRow: 12,
  },

  // Repeated sequence: when unique items finish, put them again (180deg opposite)
  {
    id: "acm-contest-dup",
    name: "1st Runner-Up (JUST ACM)",
    caption: "1st Runner-Up (JUST ACM)",
    icon: "/assets/icons/achievements/just_logo.png",
    row: 0,
    indexInRow: 6,
    totalInRow: 12,
  },
  {
    id: "robotics-quiz-dup",
    name: "Champion: Robotics Quiz",
    caption: "Robotics Quiz Champion",
    icon: "/assets/icons/achievements/just_robo_society.png",
    row: 0,
    indexInRow: 7,
    totalInRow: 12,
  },
  {
    id: "codeforces-max-dup",
    name: "Codeforces (1168 Max)",
    caption: "Codeforces (1168 Max)",
    icon: "/assets/icons/achievements/codeforces.png",
    url: "https://codeforces.com/profile/mdraihanhossen",
    row: 0,
    indexInRow: 8,
    totalInRow: 12,
  },
  {
    id: "cf-solved-dup",
    name: "365+ Solved Problems",
    caption: "365+ Solved (Codeforces)",
    icon: "/assets/icons/achievements/codeforces.png",
    url: "https://codeforces.com/profile/mdraihanhossen",
    row: 0,
    indexInRow: 9,
    totalInRow: 12,
  },
  {
    id: "robo-soc-dup",
    name: "JUST Robo Society",
    caption: "JUST Robo Society",
    icon: "/assets/icons/achievements/just_robo_society.png",
    row: 0,
    indexInRow: 10,
    totalInRow: 12,
  },
  {
    id: "codechef-pro-dup",
    name: "CodeChef Competitor",
    caption: "CodeChef Profile",
    icon: "/assets/icons/achievements/codechef.png",
    url: "https://www.codechef.com",
    row: 0,
    indexInRow: 11,
    totalInRow: 12,
  },
];

const GITHUB_ICON_SVG =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>'
  );

const LINKEDIN_ICON_SVG =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
  );

// 3 unique contact methods (Email, LinkedIn, GitHub) - stationary and always visible, no rotation
const CONTACT_ITEMS = [
  {
    id: "contact-email",
    name: "Email",
    caption: "mdraihanhossen.cse@gmail.com",
    url: "mailto:mdraihanhossen.cse@gmail.com",
    iconType: "email",
    index: 0,
  },
  {
    id: "contact-linkedin",
    name: "LinkedIn",
    caption: "mdraihanhossen",
    url: "https://linkedin.com/in/mdraihanhossen",
    iconType: "linkedin",
    icon: LINKEDIN_ICON_SVG,
    index: 1,
  },
  {
    id: "contact-github",
    name: "GitHub",
    caption: "mdraihan27",
    url: "https://github.com/mdraihan27",
    iconType: "github",
    icon: GITHUB_ICON_SVG,
    index: 2,
  },
];

function drawIcon(ctx, type) {
  ctx.save();
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 22;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (type === "skills") {
    ctx.beginPath();
    ctx.moveTo(-55, -80);
    ctx.lineTo(-135, 0);
    ctx.lineTo(-55, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(55, -80);
    ctx.lineTo(135, 0);
    ctx.lineTo(55, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(22, -105);
    ctx.lineTo(-22, 105);
    ctx.stroke();
  } else if (type === "projects") {
    const w = 210;
    const h = 210;
    const r = 38;
    const x0 = -w / 2;
    const y0 = -h / 2;
    const yDivider = y0 + h * 0.34;
    const xDivider = x0 + w * 0.35;

    ctx.beginPath();
    ctx.roundRect(x0, y0, w, h, r);
    ctx.stroke();

    ctx.save();
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.moveTo(x0, yDivider);
    ctx.lineTo(x0 + w, yDivider);
    ctx.moveTo(xDivider, yDivider);
    ctx.lineTo(xDivider, y0 + h);
    ctx.stroke();
    ctx.restore();
  } else if (type === "education") {
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.lineTo(145, -30);
    ctx.lineTo(0, 30);
    ctx.lineTo(-145, -30);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-85, -2);
    ctx.quadraticCurveTo(0, 85, 85, -2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(145, -30);
    ctx.lineTo(150, 48);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 60, 11, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "achievements") {
    ctx.beginPath();
    ctx.moveTo(-80, -85);
    ctx.lineTo(80, -85);
    ctx.quadraticCurveTo(75, 20, 0, 42);
    ctx.quadraticCurveTo(-75, 20, -80, -85);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-75, -68);
    ctx.bezierCurveTo(-130, -58, -120, -5, -60, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(75, -68);
    ctx.bezierCurveTo(130, -58, 120, -5, 60, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 42);
    ctx.lineTo(0, 82);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-52, 82);
    ctx.lineTo(52, 82);
    ctx.stroke();
  } else if (type === "contact") {
    ctx.beginPath();
    ctx.roundRect(-135, -92, 270, 184, 24);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-135, -82);
    ctx.lineTo(0, 24);
    ctx.lineTo(135, -82);
    ctx.stroke();
  }

  ctx.restore();
}

function applyCoinRadialGradient(ctx) {
  const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 512);
  grad.addColorStop(0, THEME.hover);
  grad.addColorStop(0.45, THEME.primary);
  grad.addColorStop(0.82, THEME.dark);
  grad.addColorStop(1, THEME.deepDark);
  return grad;
}

function createCoinTexture({ type }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = applyCoinRadialGradient(ctx);
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 512, 454, 0, Math.PI * 2);
  ctx.stroke();

  const notchR = 454;
  const notchLen = 12;
  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(512 + (notchR - notchLen) * Math.cos(a), 512 + (notchR - notchLen) * Math.sin(a));
    ctx.lineTo(512 + (notchR + notchLen) * Math.cos(a), 512 + (notchR + notchLen) * Math.sin(a));
    ctx.stroke();
  });

  ctx.save();
  ctx.translate(512, 512);
  ctx.scale(1, -1);
  drawIcon(ctx, type);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// Secondary skill coin texture with exact same styling, finish and resolution as main coins
function createSkillCoinTexture(skill) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = applyCoinRadialGradient(ctx);
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 512, 454, 0, Math.PI * 2);
  ctx.stroke();

  const notchR = 454;
  const notchLen = 12;
  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(512 + (notchR - notchLen) * Math.cos(a), 512 + (notchR - notchLen) * Math.sin(a));
    ctx.lineTo(512 + (notchR + notchLen) * Math.cos(a), 512 + (notchR + notchLen) * Math.sin(a));
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (typeof window !== "undefined") {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = skill.icon;
    img.onload = () => {
      ctx.save();
      ctx.translate(512, 512);
      ctx.scale(1, -1);

      // Frosted badge backing
      ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.fill();

      // Large crisp icon
      const iconSize = 340;
      ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      ctx.restore();

      texture.needsUpdate = true;
    };
  }

  return texture;
}

// Secondary achievement coin texture with exact same styling, finish and resolution as skill coins
function createAchievementCoinTexture(achievement) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = applyCoinRadialGradient(ctx);
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 512, 454, 0, Math.PI * 2);
  ctx.stroke();

  const notchR = 454;
  const notchLen = 12;
  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(512 + (notchR - notchLen) * Math.cos(a), 512 + (notchR - notchLen) * Math.sin(a));
    ctx.lineTo(512 + (notchR + notchLen) * Math.cos(a), 512 + (notchR + notchLen) * Math.sin(a));
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (typeof window !== "undefined" && achievement.icon) {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = achievement.icon;
    img.onload = () => {
      ctx.save();
      ctx.translate(512, 512);
      ctx.scale(1, -1);

      // Frosted badge backing
      ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.fill();

      // Large crisp icon
      const iconSize = 340;
      ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      ctx.restore();

      texture.needsUpdate = true;
    };
  }

  return texture;
}

// Secondary contact coin texture with exact same styling, finish and resolution as skills and achievements
function createContactCoinTexture(contact) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = applyCoinRadialGradient(ctx);
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 512, 454, 0, Math.PI * 2);
  ctx.stroke();

  const notchR = 454;
  const notchLen = 12;
  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(512 + (notchR - notchLen) * Math.cos(a), 512 + (notchR - notchLen) * Math.sin(a));
    ctx.lineTo(512 + (notchR + notchLen) * Math.cos(a), 512 + (notchR + notchLen) * Math.sin(a));
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (typeof window !== "undefined") {
    if (contact.iconType === "email") {
      ctx.save();
      ctx.translate(512, 512);
      ctx.scale(1, -1);

      // Frosted badge backing
      ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.fill();

      // Large crisp vector envelope icon
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 24;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.roundRect(-140, -95, 280, 190, 24);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-140, 82);
      ctx.lineTo(0, -22);
      ctx.lineTo(140, 82);
      ctx.stroke();

      ctx.restore();
      texture.needsUpdate = true;
    } else if (contact.icon) {
      const renderBadgeAndIcon = (imgObj) => {
        ctx.save();
        ctx.translate(512, 512);
        ctx.scale(1, -1);

        // Frosted badge backing
        ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
        ctx.beginPath();
        ctx.arc(0, 0, 260, 0, Math.PI * 2);
        ctx.fill();

        // Large crisp icon
        const iconSize = 340;
        ctx.drawImage(imgObj, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
        ctx.restore();

        texture.needsUpdate = true;
      };

      const img = new window.Image();
      if (!contact.icon.startsWith("data:")) {
        img.crossOrigin = "anonymous";
      }
      img.onload = () => renderBadgeAndIcon(img);
      img.src = contact.icon;
      if (img.complete) {
        renderBadgeAndIcon(img);
      }
    }
  }

  return texture;
}

// 3D Front texture for the Education Coin: university logo covers the whole circular surface
function createEducationCoinTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Clean white base fill inside circle
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  if (typeof window !== "undefined") {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/assets/icons/achievements/just_logo.png";
    img.onload = () => {
      ctx.save();
      ctx.translate(512, 512);
      ctx.scale(1, -1);

      // Clean white circular backdrop
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 512, 0, Math.PI * 2);
      ctx.fill();

      // Punchy contrast and rich saturation for the university logo
      if (ctx.filter !== undefined) {
        ctx.filter = "contrast(1.30) saturate(1.25) brightness(0.95)";
      }
      const s = 1004;
      ctx.drawImage(img, -s / 2, -s / 2, s, s);
      if (ctx.filter !== undefined) {
        ctx.filter = "none";
      }

      // Crisp contrast border ring to cleanly frame the coin edge
      ctx.strokeStyle = "rgba(235, 70, 58, 0.9)";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(0, 0, 505, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
      texture.needsUpdate = true;
    };
  }

  return texture;
}

// 3D Front texture for the big orange cross at center of wheel
function createCrossCoinTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 512);
  grad.addColorStop(0, THEME.hover);
  grad.addColorStop(0.45, THEME.primary);
  grad.addColorStop(0.82, THEME.dark);
  grad.addColorStop(1, THEME.deepDark);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(512, 512, 452, 0, Math.PI * 2);
  ctx.stroke();

  const notchR = 452;
  const notchLen = 14;
  [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(512 + (notchR - notchLen) * Math.cos(a), 512 + (notchR - notchLen) * Math.sin(a));
    ctx.lineTo(512 + (notchR + notchLen) * Math.cos(a), 512 + (notchR + notchLen) * Math.sin(a));
    ctx.stroke();
  });

  ctx.save();
  ctx.translate(512, 512);
  ctx.scale(1, -1);

  // Soft glowing center ring
  ctx.fillStyle = THEME.isGold ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.18)";
  ctx.beginPath();
  ctx.arc(0, 0, 240, 0, Math.PI * 2);
  ctx.fill();

  // Large Bold Embossed Cross
  ctx.lineCap = "round";
  const crossExtent = 180;

  // Cross shadow
  ctx.strokeStyle = "rgba(0, 0, 0, 0.36)";
  ctx.lineWidth = 60;
  ctx.beginPath();
  ctx.moveTo(-crossExtent, -crossExtent - 14);
  ctx.lineTo(crossExtent, crossExtent - 14);
  ctx.moveTo(crossExtent, -crossExtent - 14);
  ctx.lineTo(-crossExtent, crossExtent - 14);
  ctx.stroke();

  // Cross white highlight
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 52;
  ctx.beginPath();
  ctx.moveTo(-crossExtent, -crossExtent);
  ctx.lineTo(crossExtent, crossExtent);
  ctx.moveTo(crossExtent, -crossExtent);
  ctx.lineTo(-crossExtent, crossExtent);
  ctx.stroke();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

function createCoinBackTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = applyCoinRadialGradient(ctx);
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 512, 454, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(512, 512);
  ctx.fillStyle = "#111111";
  ctx.font = "700 160px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("RH", 0, -20);

  ctx.font = "500 26px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#111111";
  ctx.fillText("SOFTWARE ENGINEER", 0, 92);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

function createReededRimTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const bgGrad = ctx.createLinearGradient(0, 0, 0, 64);
  bgGrad.addColorStop(0, THEME.highlight);
  bgGrad.addColorStop(0.25, THEME.hover);
  bgGrad.addColorStop(0.5, THEME.primary);
  bgGrad.addColorStop(0.75, THEME.hover);
  bgGrad.addColorStop(1, THEME.dark);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 64);

  const ridgeWidth = 16;
  for (let x = 0; x < 512; x += ridgeWidth) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fillRect(x, 0, 3, 64);

    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(x + 3, 0, 2, 64);

    const plateauGrad = ctx.createLinearGradient(0, 0, 0, 64);
    plateauGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    plateauGrad.addColorStop(0.25, "rgba(255, 255, 255, 0.55)");
    plateauGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.35)");
    plateauGrad.addColorStop(0.75, "rgba(255, 255, 255, 0.55)");
    plateauGrad.addColorStop(1, "rgba(255, 255, 255, 0.85)");
    ctx.fillStyle = plateauGrad;
    ctx.fillRect(x + 5, 0, 7, 64);

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(x + 9, 0, 2, 64);

    ctx.fillStyle = "rgba(0, 0, 0, 0.14)";
    ctx.fillRect(x + 12, 0, 4, 64);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillRect(0, 0, 512, 3);
  ctx.fillRect(0, 61, 512, 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

function createReededRimNormalMap() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const imgData = ctx.createImageData(512, 64);
  const data = imgData.data;

  const ridgeWidth = 16;
  for (let x = 0; x < 512; x++) {
    const rx = (x % ridgeWidth) / ridgeWidth;

    let nx = 0;
    let ny = 0;
    let nz = 1;

    if (rx >= 0.08 && rx < 0.46) {
      nx = -0.78;
      nz = 0.62;
    } else if (rx >= 0.54 && rx < 0.92) {
      nx = 0.78;
      nz = 0.62;
    } else {
      nx = 0;
      nz = 1;
    }

    const r = Math.round(((nx + 1) / 2) * 255);
    const g = Math.round(((ny + 1) / 2) * 255);
    const b = Math.round(((nz + 1) / 2) * 255);

    for (let y = 0; y < 64; y++) {
      const idx = (y * 512 + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

function createReededRimBumpMap() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 512, 64);

  const ridgeWidth = 16;
  for (let x = 0; x < 512; x += ridgeWidth) {
    const toothGrad = ctx.createLinearGradient(x, 0, x + ridgeWidth, 0);
    toothGrad.addColorStop(0, "#000000");
    toothGrad.addColorStop(0.2, "#333333");
    toothGrad.addColorStop(0.42, "#ffffff");
    toothGrad.addColorStop(0.58, "#ffffff");
    toothGrad.addColorStop(0.8, "#333333");
    toothGrad.addColorStop(1, "#000000");

    ctx.fillStyle = toothGrad;
    ctx.fillRect(x, 0, ridgeWidth, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

// 3D Front texture for project cards (pure screenshot with smooth rounded corners, zero borders)
function createProjectCardTexture(project) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  const cornerRadius = 36;

  // Base background
  ctx.fillStyle = "#121217";
  ctx.beginPath();
  ctx.roundRect(0, 0, 1024, 640, cornerRadius);
  ctx.fill();

  // Initial title text while image loads
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "bold 38px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(project.name, 512, 320);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Draw full screenshot clipped to rounded corners with NO border
  if (typeof window !== "undefined" && project.preview) {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = project.preview;
    img.onload = () => {
      ctx.clearRect(0, 0, 1024, 640);

      ctx.save();
      // Clip directly to rounded rectangle
      ctx.beginPath();
      ctx.roundRect(0, 0, 1024, 640, cornerRadius);
      ctx.clip();

      // Cover-fit screenshot across entire card
      const imgAspect = img.width / img.height;
      const targetAspect = 1024 / 640;
      let drawW, drawH, drawX, drawY;

      if (imgAspect > targetAspect) {
        drawH = 640;
        drawW = 640 * imgAspect;
        drawX = (1024 - drawW) / 2;
        drawY = 0;
      } else {
        drawW = 1024;
        drawH = 1024 / imgAspect;
        drawX = 0;
        drawY = (640 - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      texture.needsUpdate = true;
    };
  }

  return texture;
}

export default function HeroCoins3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [skillLabels, setSkillLabels] = useState([]);
  const [achievementLabels, setAchievementLabels] = useState([]);
  const [projectLabels, setProjectLabels] = useState([]);
  const [contactLabels, setContactLabels] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [hoveredAchievementId, setHoveredAchievementId] = useState(null);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [hoveredContactId, setHoveredContactId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSecondaryMode, setActiveSecondaryMode] = useState(null); // null | "skills" | "achievements" | "projects" | "education" | "contact"
  const [educationLabel, setEducationLabel] = useState(null);
  const [hoveredEducation, setHoveredEducation] = useState(false);
  const hoveredEducationRef = useRef(false);
  hoveredEducationRef.current = hoveredEducation;
  const [crossPos, setCrossPos] = useState({ x: -999, y: -999 });

  const orbitAngleRef = useRef(Math.PI * 1.05);
  const targetOrbitAngleRef = useRef(Math.PI * 1.05);
  const lastScrollTimeRef = useRef(0);
  const lastPointerAngleRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, angle: 0 });
  const hasDraggedRef = useRef(false);
  const hoveredRef = useRef(null);
  hoveredRef.current = hoveredId;
  const hoveredSkillRef = useRef(null);
  hoveredSkillRef.current = hoveredSkillId;
  const hoveredAchievementRef = useRef(null);
  hoveredAchievementRef.current = hoveredAchievementId;
  const hoveredProjectRef = useRef(null);
  hoveredProjectRef.current = hoveredProjectId;
  const hoveredContactRef = useRef(null);
  hoveredContactRef.current = hoveredContactId;
  const activeSecondaryModeRef = useRef(null);
  activeSecondaryModeRef.current = activeSecondaryMode;
  const skillsProgressRef = useRef(0);
  const achievementsProgressRef = useRef(0);
  const projectsProgressRef = useRef(0);
  const educationProgressRef = useRef(0);
  const contactProgressRef = useRef(0);
  const sceneContextRef = useRef(null);

  const handleNavClick = (targetId) => {
    if (hasDraggedRef.current) return;
    if (targetId === "skills" || targetId === "skills-2" || targetId?.includes("skills")) {
      setActiveSecondaryMode("skills");
      return;
    }
    if (targetId === "achievements" || targetId === "achievements-2" || targetId?.includes("achievements")) {
      setActiveSecondaryMode("achievements");
      return;
    }
    if (targetId === "projects" || targetId === "projects-2" || targetId?.includes("projects")) {
      setActiveSecondaryMode("projects");
      return;
    }
    if (targetId === "education" || targetId === "education-2" || targetId?.includes("education")) {
      setActiveSecondaryMode("education");
      return;
    }
    if (targetId === "contact" || targetId === "contact-2" || targetId?.includes("contact")) {
      setActiveSecondaryMode("contact");
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      3000
    );
    camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0);

    const raycaster = new THREE.Raycaster();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Balanced Studio Lighting for Realistic Coins
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(
      0xffffff,
      THEME.isGold ? 0xffdf70 : new THREE.Color(THEME.light),
      1.35
    );
    hemiLight.position.set(0, 600, 200);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaeb, 1.6);
    keyLight.position.set(350, 600, 800);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff5dd, 0.95);
    fillLight.position.set(-400, -200, 600);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(new THREE.Color(THEME.primary), 1.2, 1400);
    rimLight.position.set(200, 300, 500);
    scene.add(rimLight);

    // Primary Coin Geometry (Original Hero Size ~220px desktop diameter, sleek 96px on mobile)
    const isMobile = width < 640;
    const primaryCoinRadius = isMobile ? 48 : 110;
    const primaryCoinThickness = isMobile ? 14 : 30;
    const primaryCoinGeometry = new THREE.CylinderGeometry(
      primaryCoinRadius,
      primaryCoinRadius,
      primaryCoinThickness,
      isMobile ? 64 : 96
    );
    primaryCoinGeometry.rotateX(Math.PI / 2);

    const posP = primaryCoinGeometry.attributes.position;
    const uvP = primaryCoinGeometry.attributes.uv;
    const idxP = primaryCoinGeometry.index;

    const g1P = primaryCoinGeometry.groups[1];
    for (let i = g1P.start; i < g1P.start + g1P.count; i++) {
      const v = idxP.getX(i);
      const x = posP.getX(v);
      const y = posP.getY(v);
      uvP.setXY(v, (x / primaryCoinRadius + 1) / 2, (-y / primaryCoinRadius + 1) / 2);
    }

    const g2P = primaryCoinGeometry.groups[2];
    for (let i = g2P.start; i < g2P.start + g2P.count; i++) {
      const v = idxP.getX(i);
      const x = posP.getX(v);
      const y = posP.getY(v);
      uvP.setXY(v, (-x / primaryCoinRadius + 1) / 2, (-y / primaryCoinRadius + 1) / 2);
    }
    uvP.needsUpdate = true;

    // Secondary Skill & Achievement Coin Geometry (152px desktop diameter, 72px mobile)
    const secondaryCoinRadius = isMobile ? 36 : 76;
    const secondaryCoinThickness = isMobile ? 11 : 21;
    const secondaryCoinGeometry = new THREE.CylinderGeometry(
      secondaryCoinRadius,
      secondaryCoinRadius,
      secondaryCoinThickness,
      isMobile ? 56 : 80
    );
    secondaryCoinGeometry.rotateX(Math.PI / 2);

    const posS = secondaryCoinGeometry.attributes.position;
    const uvS = secondaryCoinGeometry.attributes.uv;
    const idxS = secondaryCoinGeometry.index;

    const g1S = secondaryCoinGeometry.groups[1];
    for (let i = g1S.start; i < g1S.start + g1S.count; i++) {
      const v = idxS.getX(i);
      const x = posS.getX(v);
      const y = posS.getY(v);
      uvS.setXY(v, (x / secondaryCoinRadius + 1) / 2, (-y / secondaryCoinRadius + 1) / 2);
    }

    const g2S = secondaryCoinGeometry.groups[2];
    for (let i = g2S.start; i < g2S.start + g2S.count; i++) {
      const v = idxS.getX(i);
      const x = posS.getX(v);
      const y = posS.getY(v);
      uvS.setXY(v, (-x / secondaryCoinRadius + 1) / 2, (-y / secondaryCoinRadius + 1) / 2);
    }
    uvS.needsUpdate = true;

    // Rim & Back Materials
    const rimTexture = createReededRimTexture();
    const rimNormalMap = createReededRimNormalMap();
    const rimBumpMap = createReededRimBumpMap();

    // Metallic parameters tuned for rich gold bullion luster without dark dullness or blinding specular spots
    const coinMetalness = THEME.isGold ? 0.20 : 0.16;
    const coinRoughness = THEME.isGold ? 0.40 : 0.35;

    const sideMaterial = new THREE.MeshStandardMaterial({
      map: rimTexture,
      normalMap: rimNormalMap,
      normalScale: new THREE.Vector2(2.4, 1.0),
      bumpMap: rimBumpMap,
      bumpScale: 1.6,
      metalness: THEME.isGold ? 0.30 : 0.32,
      roughness: THEME.isGold ? 0.34 : 0.32,
    });

    const backTexture = createCoinBackTexture();
    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: coinMetalness,
      roughness: coinRoughness,
    });

    // Create Main Coin Meshes (Primary Hero Size)
    const coinMeshes = COIN_TYPES.map((item) => {
      const frontTexture = createCoinTexture(item);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: coinMetalness,
        roughness: coinRoughness,
      });

      const materials = [sideMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(primaryCoinGeometry, materials);
      scene.add(mesh);
      return { mesh, item, frontTexture };
    });

    // Create Secondary Skill Coin Meshes (Secondary Compact Size across 3 concentric rows)
    const smallCoinMeshes = SKILL_ITEMS.map((item) => {
      const frontTexture = createSkillCoinTexture(item);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: coinMetalness,
        roughness: coinRoughness,
      });

      const materials = [sideMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(secondaryCoinGeometry, materials);
      mesh.scale.set(0, 0, 0);
      scene.add(mesh);
      return { mesh, item, frontTexture };
    });

    // Create Secondary Achievement Coin Meshes (Secondary Compact Size across 3 concentric rows)
    const achievementCoinMeshes = ACHIEVEMENT_ITEMS.map((item) => {
      const frontTexture = createAchievementCoinTexture(item);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: coinMetalness,
        roughness: coinRoughness,
      });

      const materials = [sideMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(secondaryCoinGeometry, materials);
      mesh.scale.set(0, 0, 0);
      scene.add(mesh);
      return { mesh, item, frontTexture };
    });

    // Flat Project Card Geometry (responsive panel on mobile and desktop)
    const cardWidth = isMobile ? 240 : 420;
    const cardHeight = isMobile ? 150 : 262;
    const projectCardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

    // Create Flat Project Card Meshes with transparent material for opacity transitions
    const projectCardMeshes = PROJECT_ITEMS.map((item) => {
      const frontTexture = createProjectCardTexture(item);
      const material = new THREE.MeshBasicMaterial({
        map: frontTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(projectCardGeometry, material);
      mesh.scale.set(0, 0, 0);
      scene.add(mesh);
      return { mesh, item, frontTexture };
    });

    // Create Big Center Cross Coin Mesh (Primary Hero Size at Center of Wheel)
    const crossTexture = createCrossCoinTexture();
    const crossFrontMaterial = new THREE.MeshStandardMaterial({
      map: crossTexture,
      metalness: coinMetalness,
      roughness: coinRoughness,
    });
    const centerCrossMesh = new THREE.Mesh(primaryCoinGeometry, [
      sideMaterial,
      crossFrontMaterial,
      backMaterial,
    ]);
    centerCrossMesh.scale.set(0, 0, 0);
    scene.add(centerCrossMesh);

    // Create Education Coin Mesh (Stationary 3D Coin with JUST logo taking the whole surface)
    const educationFrontTexture = createEducationCoinTexture();
    const educationFrontMaterial = new THREE.MeshStandardMaterial({
      map: educationFrontTexture,
      metalness: 0.02,
      roughness: 0.78, // High roughness prevents specular blowout under bright scene lighting
    });
    const educationCoinMesh = new THREE.Mesh(secondaryCoinGeometry, [
      sideMaterial,
      educationFrontMaterial,
      backMaterial,
    ]);
    educationCoinMesh.scale.set(0, 0, 0);
    scene.add(educationCoinMesh);

    // Create Secondary Contact Coin Meshes (Secondary Compact Size along orbit)
    const contactCoinMeshes = CONTACT_ITEMS.map((item) => {
      const frontTexture = createContactCoinTexture(item);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: coinMetalness,
        roughness: coinRoughness,
      });

      const materials = [sideMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(secondaryCoinGeometry, materials);
      mesh.scale.set(0, 0, 0);
      scene.add(mesh);
      return { mesh, item, frontTexture };
    });

    sceneContextRef.current = {
      camera,
      raycaster,
      coinMeshes,
      smallCoinMeshes,
      achievementCoinMeshes,
      projectCardMeshes,
      educationCoinMesh,
      contactCoinMeshes,
      centerCrossMesh,
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      // Wheel Center: placed a little below the top right corner so top right of wheel is off-screen
      const isMob = width < 640;
      const cwx = width >= 768 ? width * 0.42 : width * 0.35;
      const cwy = isMob ? height * 0.30 : height * 0.34;
      setCrossPos({ x: width / 2 + cwx, y: height / 2 - cwy });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const mouse = new THREE.Vector2(-999, -999);
    const clientMouse = { x: -999, y: -999 };

    let isAnyHovered = false;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
      clientMouse.x = e.clientX;
      clientMouse.y = e.clientY;

      const isOverCoins =
        Boolean(activeSecondaryModeRef.current) ||
        isAnyHovered ||
        (width >= 768 ? x >= width * 0.35 && y <= height : (y <= height * 0.70 || x >= width * 0.35));

      canvas.style.pointerEvents = isOverCoins ? "auto" : "none";
    };

    window.addEventListener("pointermove", onPointerMove);

    // Wheel Scroll (rotates wheel in both main and secondary modes)
    const handleWheel = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isOverCoins =
        Boolean(activeSecondaryModeRef.current) ||
        isAnyHovered ||
        (width >= 768 ? x >= width * 0.35 && y >= 0 && y <= height : y >= 0 && y <= height * 0.85);

      if (isOverCoins) {
        e.preventDefault();
        const rawDelta = e.deltaY + (e.deltaX || 0);
        const clampedDelta = Math.max(-120, Math.min(120, rawDelta));
        const scrollDelta = clampedDelta * 0.00115;
        targetOrbitAngleRef.current -= scrollDelta;
        lastScrollTimeRef.current = performance.now();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Animation Loop
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      // Smooth progress interpolation (0.0 = main wheel mode, 1.0 = secondary mode)
      const targetSkills = activeSecondaryModeRef.current === "skills" ? 1.0 : 0.0;
      const targetAchievements = activeSecondaryModeRef.current === "achievements" ? 1.0 : 0.0;
      const targetProjects = activeSecondaryModeRef.current === "projects" ? 1.0 : 0.0;
      const targetEducation = activeSecondaryModeRef.current === "education" ? 1.0 : 0.0;
      const targetContact = activeSecondaryModeRef.current === "contact" ? 1.0 : 0.0;

      skillsProgressRef.current += (targetSkills - skillsProgressRef.current) * 0.075;
      achievementsProgressRef.current += (targetAchievements - achievementsProgressRef.current) * 0.075;
      projectsProgressRef.current += (targetProjects - projectsProgressRef.current) * 0.075;
      educationProgressRef.current += (targetEducation - educationProgressRef.current) * 0.075;
      contactProgressRef.current += (targetContact - contactProgressRef.current) * 0.075;

      const sp = skillsProgressRef.current;
      const ap = achievementsProgressRef.current;
      const pp = projectsProgressRef.current;
      const edup = educationProgressRef.current;
      const cp = contactProgressRef.current;
      const secP = Math.max(sp, ap, pp, edup, cp);
      const ep = secP < 0.5 ? 4 * secP * secP * secP : 1 - Math.pow(-2 * secP + 2, 3) / 2;
      const eduEp = edup < 0.5 ? 4 * edup * edup * edup : 1 - Math.pow(-2 * edup + 2, 3) / 2;

      // Wheel Center: placed a little below the top right corner so top right of wheel is off-screen
      const centerWheelX = width >= 768 ? width * 0.42 : width * 0.35;
      const centerWheelY = isMobile ? height * 0.30 : height * 0.34;

      // Orbit radii (scaled appropriately for desktop and mobile screens)
      const baseOrbitRadius = isMobile ? 220 : 530;
      const totalMain = coinMeshes.length;

      // Update Big Orange Cross position: placed at the exact center of the main wheel
      const crossScreenX = width / 2 + centerWheelX;
      const crossScreenY = height / 2 - centerWheelY;

      // Raycast against active set
      raycaster.setFromCamera(mouse, camera);
      let activeMeshes = coinMeshes.map((c) => c.mesh);
      if (activeSecondaryModeRef.current === "skills" && sp > 0.4) {
        activeMeshes = [...smallCoinMeshes.map((c) => c.mesh), centerCrossMesh];
      } else if (activeSecondaryModeRef.current === "achievements" && ap > 0.4) {
        activeMeshes = [...achievementCoinMeshes.map((c) => c.mesh), centerCrossMesh];
      } else if (activeSecondaryModeRef.current === "projects" && pp > 0.4) {
        activeMeshes = [...projectCardMeshes.map((c) => c.mesh), centerCrossMesh];
      } else if (activeSecondaryModeRef.current === "education" && edup > 0.4) {
        activeMeshes = [educationCoinMesh, centerCrossMesh];
      } else if (activeSecondaryModeRef.current === "contact" && cp > 0.4) {
        activeMeshes = [...contactCoinMeshes.map((c) => c.mesh), centerCrossMesh];
      } else if (ep > 0.4) {
        activeMeshes = [centerCrossMesh];
      }

      const intersects = raycaster.intersectObjects(activeMeshes);
      let currentHoveredMesh = null;
      let meshHoveredId = null;

      if (intersects.length > 0) {
        currentHoveredMesh = intersects[0].object;
        if (currentHoveredMesh === centerCrossMesh) {
          meshHoveredId = "center-cross";
        } else if (activeSecondaryModeRef.current === "skills") {
          const found = smallCoinMeshes.find((c) => c.mesh === currentHoveredMesh);
          if (found) meshHoveredId = found.item.id;
        } else if (activeSecondaryModeRef.current === "achievements") {
          const found = achievementCoinMeshes.find((c) => c.mesh === currentHoveredMesh);
          if (found) meshHoveredId = found.item.id;
        } else if (activeSecondaryModeRef.current === "projects") {
          const found = projectCardMeshes.find((c) => c.mesh === currentHoveredMesh);
          if (found) meshHoveredId = found.item.orbitId;
        } else if (activeSecondaryModeRef.current === "education") {
          if (currentHoveredMesh === educationCoinMesh) meshHoveredId = "education-coin";
        } else if (activeSecondaryModeRef.current === "contact") {
          const found = contactCoinMeshes.find((c) => c.mesh === currentHoveredMesh);
          if (found) meshHoveredId = found.item.id;
        } else {
          const found = coinMeshes.find((c) => c.mesh === currentHoveredMesh);
          if (found) meshHoveredId = found.item.id;
        }
      }

      isAnyHovered = Boolean(
        currentHoveredMesh ||
        (activeSecondaryModeRef.current === "skills"
          ? hoveredSkillRef.current
          : activeSecondaryModeRef.current === "achievements"
          ? hoveredAchievementRef.current
          : activeSecondaryModeRef.current === "projects"
          ? hoveredProjectRef.current
          : activeSecondaryModeRef.current === "education"
          ? hoveredEducationRef.current
          : activeSecondaryModeRef.current === "contact"
          ? hoveredContactRef.current
          : hoveredRef.current)
      );

      // Continuous orbital drift: circularly orbit continuously like the main coins do in the wheel!
      // When hovered, the orbit gracefully glides rather than stopping dead.
      if (!isDraggingRef.current) {
        const isRecentlyScrolled = performance.now() - lastScrollTimeRef.current < 1200;
        if (!isRecentlyScrolled) {
          const orbitSpeed = (2 * Math.PI) / 38000;
          const speedFactor = isAnyHovered ? 0.35 : 1.0;
          targetOrbitAngleRef.current += orbitSpeed * dt * speedFactor;
        }
      }

      const lerpSpeed = isDraggingRef.current ? 0.22 : 0.075;
      orbitAngleRef.current += (targetOrbitAngleRef.current - orbitAngleRef.current) * lerpSpeed;

      // Center cross is handled cleanly by the interactive HTML button; hide the duplicate 3D coin mesh
      centerCrossMesh.visible = false;
      centerCrossMesh.scale.set(0, 0, 0);

      // 1. UPDATE MAIN WHEEL COINS
      const updatedLabels = [];

      coinMeshes.forEach((coinObj, idx) => {
        const { mesh, item } = coinObj;
        const angle = orbitAngleRef.current + (idx / totalMain) * 2 * Math.PI;

        const posX = centerWheelX + baseOrbitRadius * Math.cos(angle);
        const posY = centerWheelY + baseOrbitRadius * Math.sin(angle);

        const coinScreenX = width / 2 + posX;
        const coinScreenY = height / 2 - posY;

        const isHovered =
          (currentHoveredMesh === mesh || hoveredRef.current === item.id || meshHoveredId === item.id) &&
          secP < 0.2;

        let targetRotX = 0;
        let targetRotY = 0;
        let targetScale = 1.0;
        let targetPosZ = 0;

        if (isHovered) {
          const dx = Math.max(-1.2, Math.min(1.2, (clientMouse.x - coinScreenX) / primaryCoinRadius));
          const dy = Math.max(-1.2, Math.min(1.2, (clientMouse.y - coinScreenY) / primaryCoinRadius));
          targetRotX = dy * 0.52;
          targetRotY = -dx * 0.52;
          targetScale = 1.12;
          targetPosZ = 60;
        } else {
          const swayFactor = isAnyHovered ? 0.25 : 1.0;
          targetRotX = Math.sin(now * 0.0022 + idx * 1.1) * 0.38 * swayFactor;
          targetRotY = Math.cos(now * 0.0017 + idx * 1.1) * 0.32 * swayFactor;
          targetScale = 1.0;
          targetPosZ = Math.sin(now * 0.002 + idx * 1.1) * 24;
        }

        mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.20;
        mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.20;
        mesh.rotation.z = 0;

        const currentScale = mesh.scale.x + (targetScale - mesh.scale.x) * 0.12;
        const currentZ = mesh.position.z + (targetPosZ - mesh.position.z) * 0.15;

        // Smooth convergence into the center of the wheel as ep -> 1
        const curX = THREE.MathUtils.lerp(posX, centerWheelX, ep);
        const curY = THREE.MathUtils.lerp(posY, centerWheelY, ep);
        const curZ = THREE.MathUtils.lerp(currentZ, 0, ep);

        // Shrink scale to 0 when converting into the center cross
        const scaleMult = Math.max(0, 1 - ep * 1.12);
        mesh.scale.set(currentScale * scaleMult, currentScale * scaleMult, currentScale * scaleMult);
        mesh.position.set(curX, curY, curZ);

        if (ep < 0.25) {
          const currentRadius = primaryCoinRadius * currentScale;
          const labelScreenX = width / 2 + curX;
          const labelScreenY = height / 2 - curY + currentRadius + 8;

          const isVisibleOnScreen =
            labelScreenX >= -100 &&
            labelScreenX <= width + 100 &&
            labelScreenY >= -50 &&
            labelScreenY <= height + 50;

          if (isVisibleOnScreen) {
            updatedLabels.push({
              id: item.id,
              targetId: item.targetId || item.id,
              name: item.name,
              x: labelScreenX,
              y: labelScreenY,
              isHovered,
              opacity: 1 - ep * 4,
            });
          }
        }
      });

      // 2. UPDATE 3 ROWS OF SECONDARY SKILL COINS (STAGGERED HONEYCOMB STRUCTURE)
      const updatedSkillLabels = [];
      const rowSpacing = isMobile ? 55 : 225;
      const outerOrbitRadius = baseOrbitRadius + rowSpacing;
      const middleOrbitRadius = baseOrbitRadius;
      const innerOrbitRadius = baseOrbitRadius - rowSpacing;

      if (sp < 0.005) {
        smallCoinMeshes.forEach((smallObj) => {
          smallObj.mesh.scale.set(0, 0, 0);
        });
      } else {
        smallCoinMeshes.forEach((smallObj, idx) => {
          const { mesh, item } = smallObj;

          const rowRadius =
            item.row === 0
              ? outerOrbitRadius
              : item.row === 1
              ? middleOrbitRadius
              : innerOrbitRadius;

          // Middle row (row 1) is offset by +0.5 pitch so coins nestle in the gap between row 0 and row 2
          const angularOffset = item.row === 1 ? 0.5 : 0;
          const angle =
            orbitAngleRef.current +
            ((item.indexInRow + angularOffset) / item.totalInRow) * 2 * Math.PI;

          const targetOrbitX = centerWheelX + rowRadius * Math.cos(angle);
          const targetOrbitY = centerWheelY + rowRadius * Math.sin(angle);

          // Staggered expansion out from center of wheel
          const staggerDelay = (item.row * 0.10) + (item.indexInRow * 0.012);
          const coinP = Math.max(0, Math.min(1, (sp - staggerDelay * 0.25) / (1 - staggerDelay * 0.25 || 1)));
          const coinEp = coinP < 0.5 ? 4 * coinP * coinP * coinP : 1 - Math.pow(-2 * coinP + 2, 3) / 2;

          const curX = THREE.MathUtils.lerp(centerWheelX, targetOrbitX, coinEp);
          const curY = THREE.MathUtils.lerp(centerWheelY, targetOrbitY, coinEp);

          const coinScreenX = width / 2 + curX;
          const coinScreenY = height / 2 - curY;

          const isHovered =
            (currentHoveredMesh === mesh || hoveredSkillRef.current === item.id || meshHoveredId === item.id) &&
            coinEp > 0.7;

          let targetRotX = 0;
          let targetRotY = 0;
          let targetScale = coinEp;
          let targetPosZ = 0;

          if (isHovered) {
            const dx = Math.max(-1.2, Math.min(1.2, (clientMouse.x - coinScreenX) / secondaryCoinRadius));
            const dy = Math.max(-1.2, Math.min(1.2, (clientMouse.y - coinScreenY) / secondaryCoinRadius));
            targetRotX = dy * 0.52;
            targetRotY = -dx * 0.52;
            targetScale = 1.12 * coinEp;
            targetPosZ = 60;
          } else {
            // Dynamic 3D tilt while circularly orbiting, matching main wheel coins
            targetRotX = Math.sin(now * 0.0022 + idx * 0.7) * 0.38 * coinEp;
            targetRotY = Math.cos(now * 0.0017 + idx * 0.7) * 0.32 * coinEp;
            targetScale = 1.0 * coinEp;
            targetPosZ = Math.sin(now * 0.002 + idx * 0.7) * 24 * coinEp;
          }

          mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.20;
          mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.20;
          mesh.rotation.z = 0;

          mesh.scale.set(targetScale, targetScale, targetScale);
          mesh.position.set(curX, curY, targetPosZ);

          // Floating label snug at the bottom center of the coin
          if (coinEp > 0.65) {
            const currentRadius = secondaryCoinRadius * targetScale;
            const labelY = coinScreenY + currentRadius + 10;
            const isVisible =
              coinScreenX >= -100 &&
              coinScreenX <= width + 100 &&
              coinScreenY >= -50 &&
              coinScreenY <= height + 50;

            if (isVisible) {
              updatedSkillLabels.push({
                id: item.id,
                name: item.name,
                x: coinScreenX,
                y: labelY,
                isHovered,
                opacity: (coinEp - 0.65) / 0.35,
              });
            }
          }
        });
      }

      // 3. UPDATE SINGLE ORBITAL ROW OF SECONDARY ACHIEVEMENT COINS
      const updatedAchievementLabels = [];
      const achievementOrbitRadius = baseOrbitRadius;

      if (ap < 0.005) {
        achievementCoinMeshes.forEach((achObj) => {
          achObj.mesh.scale.set(0, 0, 0);
        });
      } else {
        achievementCoinMeshes.forEach((achObj, idx) => {
          const { mesh, item } = achObj;

          const angle =
            orbitAngleRef.current +
            (item.indexInRow / item.totalInRow) * 2 * Math.PI;

          const targetOrbitX = centerWheelX + achievementOrbitRadius * Math.cos(angle);
          const targetOrbitY = centerWheelY + achievementOrbitRadius * Math.sin(angle);

          // Staggered expansion out from center of wheel
          const staggerDelay = item.indexInRow * 0.035;
          const coinP = Math.max(0, Math.min(1, (ap - staggerDelay * 0.25) / (1 - staggerDelay * 0.25 || 1)));
          const coinEp = coinP < 0.5 ? 4 * coinP * coinP * coinP : 1 - Math.pow(-2 * coinP + 2, 3) / 2;

          const curX = THREE.MathUtils.lerp(centerWheelX, targetOrbitX, coinEp);
          const curY = THREE.MathUtils.lerp(centerWheelY, targetOrbitY, coinEp);

          const coinScreenX = width / 2 + curX;
          const coinScreenY = height / 2 - curY;

          const isHovered =
            (currentHoveredMesh === mesh || hoveredAchievementRef.current === item.id || meshHoveredId === item.id) &&
            coinEp > 0.7;

          let targetRotX = 0;
          let targetRotY = 0;
          let targetScale = coinEp;
          let targetPosZ = 0;

          if (isHovered) {
            const dx = Math.max(-1.2, Math.min(1.2, (clientMouse.x - coinScreenX) / secondaryCoinRadius));
            const dy = Math.max(-1.2, Math.min(1.2, (clientMouse.y - coinScreenY) / secondaryCoinRadius));
            targetRotX = dy * 0.52;
            targetRotY = -dx * 0.52;
            targetScale = 1.12 * coinEp;
            targetPosZ = 60;
          } else {
            targetRotX = Math.sin(now * 0.0022 + idx * 0.7) * 0.38 * coinEp;
            targetRotY = Math.cos(now * 0.0017 + idx * 0.7) * 0.32 * coinEp;
            targetScale = 1.0 * coinEp;
            targetPosZ = Math.sin(now * 0.002 + idx * 0.7) * 24 * coinEp;
          }

          mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.20;
          mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.20;
          mesh.rotation.z = 0;

          mesh.scale.set(targetScale, targetScale, targetScale);
          mesh.position.set(curX, curY, targetPosZ);

          // Floating label snug at the bottom center of the coin (caption as label)
          if (coinEp > 0.65) {
            const currentRadius = secondaryCoinRadius * targetScale;
            const labelY = coinScreenY + currentRadius + 10;
            const isVisible =
              coinScreenX >= -100 &&
              coinScreenX <= width + 100 &&
              coinScreenY >= -50 &&
              coinScreenY <= height + 50;

            if (isVisible) {
              updatedAchievementLabels.push({
                id: item.id,
                name: item.caption || item.name,
                x: coinScreenX,
                y: labelY,
                isHovered,
                opacity: (coinEp - 0.65) / 0.35,
                url: item.url,
              });
            }
          }
        });
      }

      // 4. UPDATE FLAT PROJECT CARDS (SMOOTH "SMALL -> ENLARGE -> SMALL", FADING IN AS THEY APPEAR AND OUT AS THEY DISAPPEAR, NO HOVER INTERACTION)
      const updatedProjectLabels = [];
      const projectOrbitRadius = baseOrbitRadius + 28;

      if (pp < 0.005) {
        projectCardMeshes.forEach((pObj) => {
          pObj.mesh.visible = false;
          pObj.mesh.scale.set(0, 0, 0);
        });
      } else {
        projectCardMeshes.forEach((pObj) => {
          const { mesh, item } = pObj;

          const angle =
            orbitAngleRef.current +
            (item.indexInOrbit / item.totalInOrbit) * 2 * Math.PI;

          const targetOrbitX = centerWheelX + projectOrbitRadius * Math.cos(angle);
          const targetOrbitY = centerWheelY + projectOrbitRadius * Math.sin(angle);

          // Staggered expansion out from center of wheel
          const staggerDelay = item.indexInOrbit * 0.035;
          const cardP = Math.max(0, Math.min(1, (pp - staggerDelay * 0.25) / (1 - staggerDelay * 0.25 || 1)));
          const cardEp = cardP < 0.5 ? 4 * cardP * cardP * cardP : 1 - Math.pow(-2 * cardP + 2, 3) / 2;

          const curX = THREE.MathUtils.lerp(centerWheelX, targetOrbitX, cardEp);
          const curY = THREE.MathUtils.lerp(centerWheelY, targetOrbitY, cardEp);

          const cardScreenX = width / 2 + curX;
          const cardScreenY = height / 2 - curY;

          // Focal angle calculation: focal center is at Math.PI * 1.15 (~207 deg, bottom-left visible arc)
          const focusAngle = Math.PI * 1.15;
          let angleDiff = angle - focusAngle;
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

          // rawFocal: 1.0 at center sweet spot, drops to 0 at +/- 90 degrees
          const rawFocal = Math.cos(angleDiff);
          const focalFactor = Math.max(0, rawFocal);

          // Opacity transition: gains opacity as it appears, full opacity at focal sweet spot, loses opacity as it disappears
          const cardOpacity = Math.max(0, Math.min(1, Math.pow(focalFactor, 1.3) * 1.35)) * cardEp;

          // Scale trajectory: appears smaller (~0.68), enlarges to ~1.20 in the center, and ends smaller
          const curveScale = (0.68 + 0.52 * Math.pow(focalFactor, 1.8)) * cardEp;

          // Variable Z index: as cards appear in sequence, newly appeared cards have more Z than previous ones
          // streamProgress: 1.0 at appearance point (newest card), dropping to 0.0 at disappearance point
          const streamProgress = Math.max(0, Math.min(1, (Math.PI / 2 - angleDiff) / Math.PI));
          const cardZ = 15 + streamProgress * 65; // Ranges from 15 (oldest) up to 80 (newest)
          const zIndexVal = Math.round(cardZ);

          // Strictly flat (no 3D rotation, no hover tilt, no hover scale jump)
          mesh.rotation.set(0, 0, 0);
          mesh.position.set(curX, curY, cardZ);
          mesh.renderOrder = zIndexVal;
          mesh.scale.set(curveScale, curveScale, 1);

          if (cardOpacity <= 0.005) {
            mesh.visible = false;
          } else {
            mesh.visible = true;
            mesh.material.opacity = cardOpacity;
          }

          // Floating label to the right of the project card with matching opacity fade and variable z-index
          if (cardOpacity > 0.15) {
            const currentW = cardWidth * curveScale;
            const labelX = cardScreenX + currentW / 2 + 18;
            const labelY = cardScreenY;
            const isVisible =
              labelX >= -100 &&
              labelX <= width + 250 &&
              labelY >= -100 &&
              labelY <= height + 100;

            if (isVisible) {
              updatedProjectLabels.push({
                id: item.orbitId,
                name: item.name,
                project: item,
                x: labelX,
                y: labelY,
                z: zIndexVal,
                opacity: cardOpacity,
              });
            }
          }
        });
      }

      // 5. UPDATE STATIONARY EDUCATION COIN (STAYS IN PLACE, DOES NOT ORBIT THE CENTER)
      if (edup < 0.005) {
        educationCoinMesh.visible = false;
        educationCoinMesh.scale.set(0, 0, 0);
        setEducationLabel(null);
      } else {
        educationCoinMesh.visible = true;

        const eduScreenX = isMobile ? width * 0.50 : width / 2 + (centerWheelX - (width >= 1280 ? 380 : 320));
        const eduScreenY = isMobile ? height * 0.36 : height / 2 - (centerWheelY - (height >= 800 ? 230 : 180));

        const eduX = eduScreenX - width / 2;
        const eduY = height / 2 - eduScreenY;

        const isEduHovered =
          (currentHoveredMesh === educationCoinMesh || hoveredEducationRef.current || meshHoveredId === "education-coin") &&
          edup > 0.7;

        let targetRotX = 0;
        let targetRotY = 0;
        let targetScale = eduEp;
        let targetPosZ = 0;

        if (isEduHovered) {
          const dx = Math.max(-1.2, Math.min(1.2, (clientMouse.x - eduScreenX) / secondaryCoinRadius));
          const dy = Math.max(-1.2, Math.min(1.2, (clientMouse.y - eduScreenY) / secondaryCoinRadius));
          targetRotX = dy * 0.52;
          targetRotY = -dx * 0.52;
          targetScale = 1.10 * eduEp;
          targetPosZ = 55;
        } else {
          targetRotX = Math.sin(now * 0.0018) * 0.14 * eduEp;
          targetRotY = Math.cos(now * 0.0014) * 0.16 * eduEp;
          targetScale = 1.0 * eduEp;
          targetPosZ = Math.sin(now * 0.0016) * 16 * eduEp;
        }

        educationCoinMesh.rotation.x += (targetRotX - educationCoinMesh.rotation.x) * 0.20;
        educationCoinMesh.rotation.y += (targetRotY - educationCoinMesh.rotation.y) * 0.20;
        educationCoinMesh.rotation.z = 0;

        educationCoinMesh.scale.set(targetScale, targetScale, targetScale);
        educationCoinMesh.position.set(eduX, eduY, targetPosZ);

        if (eduEp > 0.6) {
          const currentRadius = secondaryCoinRadius * targetScale;
          const labelY = eduScreenY + currentRadius + 14;
          setEducationLabel({
            x: eduScreenX,
            y: labelY,
            isHovered: isEduHovered,
            opacity: (eduEp - 0.6) / 0.4,
          });
        } else {
          setEducationLabel(null);
        }
      }

      // 6. UPDATE 3 CONTACT COINS IN CIRCULAR MANNER (CIRCULAR ARC AROUND CENTER, NOT ROTATING)
      const updatedContactLabels = [];

      if (cp < 0.005) {
        contactCoinMeshes.forEach((cObj) => {
          cObj.mesh.visible = false;
          cObj.mesh.scale.set(0, 0, 0);
        });
      } else {
        const isMob = width < 640;
        // Circular orbit radius around the center cross
        const contactRadius = isMob ? 180 : width >= 1280 ? 510 : 470;
        // Static angles along the circular perimeter (NOT rotating)
        const midAngle = isMob ? Math.PI * 1.19 : Math.PI * 1.21;
        const angleStep = isMob ? 0.66 : width >= 1280 ? 0.60 : 0.62;

        contactCoinMeshes.forEach((cObj, idx) => {
          const { mesh, item } = cObj;
          mesh.visible = true;

          // Fixed static angle along the circular perimeter (circular manner, zero rotation)
          const angle = midAngle + (idx - 1) * angleStep;

          const targetOrbitX = centerWheelX + contactRadius * Math.cos(angle);
          const targetOrbitY = centerWheelY + contactRadius * Math.sin(angle);

          // Staggered expansion out from center cross
          const staggerDelay = idx * 0.08;
          const coinP = Math.max(0, Math.min(1, (cp - staggerDelay * 0.25) / (1 - staggerDelay * 0.25 || 1)));
          const coinEp = coinP < 0.5 ? 4 * coinP * coinP * coinP : 1 - Math.pow(-2 * coinP + 2, 3) / 2;

          const curX = THREE.MathUtils.lerp(centerWheelX, targetOrbitX, coinEp);
          const curY = THREE.MathUtils.lerp(centerWheelY, targetOrbitY, coinEp);

          const coinScreenX = width / 2 + curX;
          const coinScreenY = height / 2 - curY;

          const isHovered =
            (currentHoveredMesh === mesh || hoveredContactRef.current === item.id || meshHoveredId === item.id) &&
            coinEp > 0.7;

          let targetRotX = 0;
          let targetRotY = 0;
          let targetScale = coinEp;
          let targetPosZ = 0;

          if (isHovered) {
            const dx = Math.max(-1.2, Math.min(1.2, (clientMouse.x - coinScreenX) / secondaryCoinRadius));
            const dy = Math.max(-1.2, Math.min(1.2, (clientMouse.y - coinScreenY) / secondaryCoinRadius));
            targetRotX = dy * 0.52;
            targetRotY = -dx * 0.52;
            targetScale = 1.10 * coinEp;
            targetPosZ = 60;
          } else {
            // Gentle stationary float / sway (NO rotation / NO orbit)
            targetRotX = Math.sin(now * 0.0018 + idx * 1.5) * 0.12 * coinEp;
            targetRotY = Math.cos(now * 0.0014 + idx * 1.5) * 0.14 * coinEp;
            targetScale = 1.0 * coinEp;
            targetPosZ = Math.sin(now * 0.0016 + idx * 1.5) * 14 * coinEp;
          }

          mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.20;
          mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.20;
          mesh.rotation.z = 0;

          mesh.scale.set(targetScale, targetScale, targetScale);
          mesh.position.set(curX, curY, targetPosZ);

          // Floating label snug at the bottom center of the coin (always visible)
          if (coinEp > 0.65) {
            const currentRadius = secondaryCoinRadius * targetScale;
            const labelY = coinScreenY + currentRadius + 12;
            updatedContactLabels.push({
              id: item.id,
              name: item.name,
              caption: item.caption,
              x: coinScreenX,
              y: labelY,
              isHovered,
              opacity: (coinEp - 0.65) / 0.35,
              url: item.url,
            });
          }
        });
      }

      // Update cursor style
      if (currentHoveredMesh) {
        canvas.style.cursor = "pointer";
      } else if (isDraggingRef.current) {
        canvas.style.cursor = "grabbing";
      } else {
        canvas.style.cursor = "grab";
      }

      setLabels(updatedLabels);
      setSkillLabels(updatedSkillLabels);
      setAchievementLabels(updatedAchievementLabels);
      setProjectLabels(updatedProjectLabels);
      setContactLabels(updatedContactLabels);
      renderer.render(scene, camera);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handleOpenSkillsView = () => {
      setActiveSecondaryMode("skills");
    };
    const handleOpenAchievementsView = () => {
      setActiveSecondaryMode("achievements");
    };
    const handleOpenProjectsView = () => {
      setActiveSecondaryMode("projects");
    };
    const handleOpenEducationView = () => {
      setActiveSecondaryMode("education");
    };
    const handleOpenContactView = () => {
      setActiveSecondaryMode("contact");
    };
    window.addEventListener("open-skills-view", handleOpenSkillsView);
    window.addEventListener("open-achievements-view", handleOpenAchievementsView);
    window.addEventListener("open-projects-view", handleOpenProjectsView);
    window.addEventListener("open-education-view", handleOpenEducationView);
    window.addEventListener("open-contact-view", handleOpenContactView);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("open-skills-view", handleOpenSkillsView);
      window.removeEventListener("open-achievements-view", handleOpenAchievementsView);
      window.removeEventListener("open-projects-view", handleOpenProjectsView);
      window.removeEventListener("open-education-view", handleOpenEducationView);
      window.removeEventListener("open-contact-view", handleOpenContactView);
      renderer.dispose();
      primaryCoinGeometry.dispose();
      secondaryCoinGeometry.dispose();
      projectCardGeometry.dispose();
      sideMaterial.dispose();
      backMaterial.dispose();
      rimTexture.dispose();
      rimNormalMap.dispose();
      rimBumpMap.dispose();
      crossFrontMaterial.dispose();
      crossTexture.dispose();
      educationFrontTexture.dispose();
      educationFrontMaterial.dispose();
      coinMeshes.forEach((c) => c.frontTexture.dispose());
      smallCoinMeshes.forEach((c) => c.frontTexture.dispose());
      achievementCoinMeshes.forEach((c) => c.frontTexture.dispose());
      contactCoinMeshes.forEach((c) => c.frontTexture.dispose());
      projectCardMeshes.forEach((p) => {
        p.mesh.material.dispose();
        p.frontTexture.dispose();
      });
      sceneContextRef.current = null;
    };
  }, []);

  // Pointer Drag Handlers (smooth circular dragging around wheel center)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragVelocityRef.current = 0;

    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || 900;
    const isMob = width < 640;
    const centerWheelX = width >= 768 ? width * 0.42 : width * 0.35;
    const centerWheelY = isMob ? height * 0.30 : height * 0.34;
    const wheelCenterX = width / 2 + centerWheelX;
    const wheelCenterY = height / 2 - centerWheelY;

    const startAngle = Math.atan2(e.clientY - wheelCenterY, e.clientX - wheelCenterX);
    lastPointerAngleRef.current = startAngle;
    lastPointerTimeRef.current = performance.now();

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      angle: targetOrbitAngleRef.current,
    };

    if (canvasRef.current && e?.pointerId !== undefined) {
      try {
        canvasRef.current.setPointerCapture?.(e.pointerId);
      } catch {}
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    if (Math.hypot(dx, dy) > 9) {
      hasDraggedRef.current = true;
    }

    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || 900;
    const isMob = width < 640;
    const centerWheelX = width >= 768 ? width * 0.42 : width * 0.35;
    const centerWheelY = isMob ? height * 0.30 : height * 0.34;
    const wheelCenterX = width / 2 + centerWheelX;
    const wheelCenterY = height / 2 - centerWheelY;

    const now = performance.now();
    const dt = Math.max(now - lastPointerTimeRef.current, 8);
    const currentAngle = Math.atan2(e.clientY - wheelCenterY, e.clientX - wheelCenterX);

    let dAngle = currentAngle - lastPointerAngleRef.current;
    while (dAngle > Math.PI) dAngle -= 2 * Math.PI;
    while (dAngle < -Math.PI) dAngle += 2 * Math.PI;

    const delta = -dAngle;
    targetOrbitAngleRef.current += delta;
    lastScrollTimeRef.current = now;

    const instantVelocity = delta / dt;
    dragVelocityRef.current = dragVelocityRef.current * 0.6 + instantVelocity * 0.4;

    lastPointerAngleRef.current = currentAngle;
    lastPointerTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (canvasRef.current && e?.pointerId !== undefined) {
      try {
        canvasRef.current.releasePointerCapture?.(e.pointerId);
      } catch {}
    }

    const now = performance.now();
    const timeSinceLastMove = now - lastPointerTimeRef.current;
    if (hasDraggedRef.current && timeSinceLastMove < 80) {
      const momentum = Math.max(-0.8, Math.min(0.8, dragVelocityRef.current * 180));
      targetOrbitAngleRef.current += momentum;
      lastScrollTimeRef.current = now;
    }

    if (!hasDraggedRef.current && sceneContextRef.current) {
      const {
        camera,
        raycaster,
        coinMeshes,
        smallCoinMeshes,
        achievementCoinMeshes,
        projectCardMeshes,
        educationCoinMesh,
        contactCoinMeshes,
        centerCrossMesh,
      } = sceneContextRef.current;
      if (canvasRef.current && camera && raycaster) {
        const rect = canvasRef.current.getBoundingClientRect();
        const clickCoord = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(clickCoord, camera);

        if (activeSecondaryModeRef.current && centerCrossMesh) {
          const hitCross = raycaster.intersectObject(centerCrossMesh);
          if (hitCross.length > 0) {
            setActiveSecondaryMode(null);
            return;
          }
        }

        if (activeSecondaryModeRef.current === "education" && educationCoinMesh) {
          const hitEducation = raycaster.intersectObject(educationCoinMesh);
          if (hitEducation.length > 0) {
            const el = document.getElementById("education");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }

        if (activeSecondaryModeRef.current === "skills" && smallCoinMeshes) {
          const hitMeshes = raycaster.intersectObjects(smallCoinMeshes.map((c) => c.mesh));
          if (hitMeshes.length > 0) {
            const el = document.getElementById("skills");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }

        if (activeSecondaryModeRef.current === "achievements" && achievementCoinMeshes) {
          const hitMeshes = raycaster.intersectObjects(achievementCoinMeshes.map((c) => c.mesh));
          if (hitMeshes.length > 0) {
            const hit = achievementCoinMeshes.find((c) => c.mesh === hitMeshes[0].object);
            if (hit) {
              if (hit.item.url) {
                window.open(hit.item.url, "_blank");
              } else {
                const el = document.getElementById("achievements");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
              return;
            }
          }
        }

        if (activeSecondaryModeRef.current === "projects" && projectCardMeshes) {
          const hitMeshes = raycaster.intersectObjects(projectCardMeshes.map((c) => c.mesh));
          if (hitMeshes.length > 0) {
            const hit = projectCardMeshes.find((c) => c.mesh === hitMeshes[0].object);
            if (hit) {
              setSelectedProject(hit.item);
              return;
            }
          }
        }

        if (activeSecondaryModeRef.current === "contact" && contactCoinMeshes) {
          const hitMeshes = raycaster.intersectObjects(contactCoinMeshes.map((c) => c.mesh));
          if (hitMeshes.length > 0) {
            const hit = contactCoinMeshes.find((c) => c.mesh === hitMeshes[0].object);
            if (hit && hit.item.url) {
              if (hit.item.url.startsWith("mailto:")) {
                window.location.href = hit.item.url;
              } else {
                window.open(hit.item.url, "_blank");
              }
              return;
            }
          }
        }

        if (!activeSecondaryModeRef.current && coinMeshes) {
          const hitMeshes = raycaster.intersectObjects(coinMeshes.map((c) => c.mesh));
          if (hitMeshes.length > 0) {
            const hit = coinMeshes.find((c) => c.mesh === hitMeshes[0].object);
            if (hit) {
              handleNavClick(hit.item.targetId || hit.item.id);
              return;
            }
          }
        }
      }

      if (!activeSecondaryModeRef.current && hoveredRef.current) {
        const match = COIN_TYPES.find((c) => c.id === hoveredRef.current);
        if (match) {
          handleNavClick(match.targetId || match.id);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 w-screen h-[100dvh] max-h-[1080px] pointer-events-none z-20 overflow-hidden select-none"
      aria-label="3D Navigation Coins"
    >
      {/* Three.js WebGL Canvas with touch-none for flawless mobile rotation dragging */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 w-full h-full block pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Center Interactive Navigation Hub (Visible in Main Wheel mode) */}
      <div
        className="absolute z-40 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
        style={{
          left: `${crossPos.x}px`,
          top: `${crossPos.y}px`,
          transform: `translate(-50%, -50%) scale(${!activeSecondaryMode ? 1 : 0.3}) rotate(${!activeSecondaryMode ? 0 : 90}deg)`,
          opacity: !activeSecondaryMode ? 1 : 0,
          pointerEvents: !activeSecondaryMode ? "auto" : "none",
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            targetOrbitAngleRef.current += (Math.PI * 2) / COIN_TYPES.length;
            lastScrollTimeRef.current = performance.now();
          }}
          className="relative group flex flex-col items-center justify-center rounded-full text-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 w-32 h-32 sm:w-48 sm:h-48 md:w-52 md:h-52 backdrop-blur-xl border border-stone-200/70 shadow-xl overflow-hidden px-1.5 sm:px-2"
          style={{
            background: "radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.78) 60%, rgba(255, 248, 220, 0.50) 100%)",
            boxShadow: `0 10px 40px ${THEME.rgba(0.22)}, inset 0 0 24px rgba(255, 255, 255, 0.8)`,
          }}
          title="Scroll or drag the coins to browse, click one to expand"
        >
          {/* Subtle rotating golden dashed orbit ring */}
          <div
            className="absolute inset-2.5 sm:inset-3 rounded-full border border-dashed animate-[spin_24s_linear_infinite] pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
            style={{ borderColor: THEME.primary }}
          />

          {/* Animated Navigation Icon: Mouse + Drag Gesture */}
          <div className="relative mb-1 sm:mb-1.5 flex items-center justify-center gap-1.5">
            {/* Soft ambient golden glow */}
            <div
              className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity"
              style={{ backgroundColor: THEME.primary }}
            />
            {/* Mouse scroll icon */}
            <svg
              className="relative w-4 h-4 sm:w-5 sm:h-5 text-stone-800 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="3" width="12" height="18" rx="6" />
              <line x1="12" y1="7" x2="12" y2="10" className="animate-bounce" />
            </svg>
            {/* Rotation / drag arrow */}
            <svg
              className="relative w-4 h-4 sm:w-5 sm:h-5 text-stone-600 transition-transform duration-300 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>

          {/* Primary Action: Scroll & Drag the coins to browse */}
          <span className="block text-[11px] sm:text-xs font-bold text-stone-900 leading-snug px-3 max-w-[170px]">
            Scroll & Drag the coins to browse
          </span>

          {/* Subtle golden divider line */}
          <div
            className="w-10 sm:w-14 h-[1.5px] my-1 sm:my-1.5 rounded-full"
            style={{ backgroundColor: THEME.rgba(0.4) }}
          />

          {/* Secondary Action: Click one to expand */}
          <span
            className="block text-[10px] sm:text-[11px] font-bold tracking-wide leading-tight px-3 transition-colors"
            style={{ color: THEME.dark }}
          >
            Click one to expand
          </span>
        </div>
      </div>

      {/* Big Orange Cross (✕) at the Exact Center of the Main Wheel */}
      <div
        className="absolute z-40 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: `${crossPos.x}px`,
          top: `${crossPos.y}px`,
          transform: `translate(-50%, -50%) scale(${activeSecondaryMode ? 1 : 0.3}) rotate(${activeSecondaryMode ? 0 : -90}deg)`,
          opacity: activeSecondaryMode ? 1 : 0,
        }}
      >
        <button
          type="button"
          tabIndex={activeSecondaryMode ? 0 : -1}
          onPointerDown={(e) => {
            e.stopPropagation();
            setActiveSecondaryMode(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveSecondaryMode(null);
          }}
          className={`flex items-center justify-center rounded-full cursor-pointer group transition-transform duration-300 hover:scale-108 active:scale-95 w-24 h-24 sm:w-40 sm:h-40 md:w-44 md:h-44 ${
            activeSecondaryMode ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-label={
            activeSecondaryMode === "achievements"
              ? "Close Achievements and return to main wheel"
              : activeSecondaryMode === "projects"
              ? "Close Projects and return to main wheel"
              : activeSecondaryMode === "education"
              ? "Close Education and return to main wheel"
              : activeSecondaryMode === "contact"
              ? "Close Contact and return to main wheel"
              : "Close Skills and return to main wheel"
          }
          title="Return to Main Wheel"
        >
          {/* Outer glowing pulsing aura */}
          <div
            className="absolute inset-0 rounded-full backdrop-blur-xl border-[3px] ring-4 ring-offset-2 ring-offset-transparent transition-all duration-300"
            style={{
              backgroundColor: THEME.rgba(0.20),
              borderColor: THEME.primary,
              boxShadow: `0 0 60px ${THEME.rgba(0.8)}`,
              outlineColor: THEME.rgba(0.35),
            }}
          />

          {/* Bold geometric cross */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center text-white transition-colors"
            style={{
              filter: `drop-shadow(0 4px 16px ${THEME.rgba(0.95)})`,
            }}
          >
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </button>
      </div>

      {/* Main Wheel Floating Labels */}
      {labels.map((lbl) => (
        <div
          key={lbl.id}
          onClick={(e) => {
            e.stopPropagation();
            handleNavClick(lbl.targetId || lbl.id);
          }}
          onMouseEnter={() => setHoveredId(lbl.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="absolute cursor-pointer z-30 transition-transform duration-200 pointer-events-auto flex items-center justify-center text-center"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            opacity: lbl.opacity ?? 1,
            transform: lbl.isHovered
              ? "translate(-50%, 0) scale(1.12)"
              : "translate(-50%, 0) scale(1)",
          }}
        >
          <span
            className="block font-bold tracking-wider uppercase text-sm sm:text-base select-none whitespace-nowrap text-center transition-all duration-200"
            style={{
              color: "#111111",
              filter: lbl.isHovered
                ? `drop-shadow(0 2px 8px ${THEME.rgba(0.45)})`
                : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
            }}
          >
            {lbl.name}
          </span>
        </div>
      ))}

      {/* Secondary Skill Coin Floating Labels */}
      {skillLabels.map((lbl) => (
        <div
          key={lbl.id}
          onMouseEnter={() => setHoveredSkillId(lbl.id)}
          onMouseLeave={() => setHoveredSkillId(null)}
          className="absolute cursor-pointer z-30 transition-transform duration-200 pointer-events-auto flex items-center justify-center text-center"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            opacity: lbl.opacity ?? 1,
            transform: lbl.isHovered
              ? "translate(-50%, 0) scale(1.12)"
              : "translate(-50%, 0) scale(1)",
          }}
        >
          <span
            className="block font-bold tracking-wider uppercase text-xs sm:text-sm select-none whitespace-nowrap text-center transition-all duration-200"
            style={{
              color: "#111111",
              filter: lbl.isHovered
                ? `drop-shadow(0 2px 8px ${THEME.rgba(0.45)})`
                : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
            }}
          >
            {lbl.name}
          </span>
        </div>
      ))}

      {/* Secondary Achievement Coin Floating Labels */}
      {achievementLabels.map((lbl) => (
        <div
          key={lbl.id}
          onClick={(e) => {
            e.stopPropagation();
            if (lbl.url) {
              window.open(lbl.url, "_blank");
            } else {
              const el = document.getElementById("achievements");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          onMouseEnter={() => setHoveredAchievementId(lbl.id)}
          onMouseLeave={() => setHoveredAchievementId(null)}
          className="absolute cursor-pointer z-30 transition-transform duration-200 pointer-events-auto flex items-center justify-center text-center"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            opacity: lbl.opacity ?? 1,
            transform: lbl.isHovered
              ? "translate(-50%, 0) scale(1.12)"
              : "translate(-50%, 0) scale(1)",
          }}
        >
          <span
            className="block font-bold tracking-wider uppercase text-xs sm:text-sm select-none text-center transition-all duration-200 max-w-[140px] sm:max-w-[180px] leading-snug break-words"
            style={{
              color: "#111111",
              filter: lbl.isHovered
                ? `drop-shadow(0 2px 8px ${THEME.rgba(0.45)})`
                : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
            }}
          >
            {lbl.name}
          </span>
        </div>
      ))}

      {/* Project Card Floating Labels (Positioned on the right of project card, identical style to coin names, no hover effects, variable z-index) */}
      {projectLabels.map((lbl) => (
        <div
          key={lbl.id}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(lbl.project);
          }}
          className="absolute cursor-pointer pointer-events-auto flex items-center justify-start text-left select-none"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            zIndex: (lbl.z ?? 30) + 10,
            opacity: lbl.opacity ?? 1,
            transform: "translate(0, -50%)",
          }}
        >
          <span
            className="block font-bold tracking-wider uppercase text-sm sm:text-base select-none whitespace-nowrap text-left"
            style={{
              color: "#111111",
              filter: "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
            }}
          >
            {lbl.name}
          </span>
        </div>
      ))}

      {/* Education Stationary Coin Floating Label (University Name and Degree Name below Coin) */}
      {educationLabel && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            const el = document.getElementById("education");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onMouseEnter={() => setHoveredEducation(true)}
          onMouseLeave={() => setHoveredEducation(false)}
          className="absolute cursor-pointer z-30 transition-transform duration-200 pointer-events-auto flex flex-col items-center justify-center text-center max-w-[280px] sm:max-w-[340px]"
          style={{
            left: `${educationLabel.x}px`,
            top: `${educationLabel.y}px`,
            opacity: educationLabel.opacity ?? 1,
            transform: educationLabel.isHovered
              ? "translate(-50%, 0) scale(1.06)"
              : "translate(-50%, 0) scale(1)",
          }}
        >
          <span
            className="block font-bold tracking-wider uppercase text-xs sm:text-sm select-none text-center transition-all duration-200 leading-snug"
            style={{
              color: "#111111",
              filter: educationLabel.isHovered
                ? `drop-shadow(0 2px 8px ${THEME.rgba(0.45)})`
                : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
            }}
          >
            Jashore University of Science and Technology
          </span>
          <span className="block text-black font-medium text-[11px] sm:text-xs select-none text-center mt-1 leading-snug">
            B. Sc. in Computer Science and Engineering
          </span>
        </div>
      )}

      {/* Secondary Contact Coin Floating Labels */}
      {contactLabels.map((lbl) => (
        <div
          key={lbl.id}
          onClick={(e) => {
            e.stopPropagation();
            if (lbl.url) {
              if (lbl.url.startsWith("mailto:")) {
                window.location.href = lbl.url;
              } else {
                window.open(lbl.url, "_blank");
              }
            }
          }}
          onMouseEnter={() => setHoveredContactId(lbl.id)}
          onMouseLeave={() => setHoveredContactId(null)}
          className="absolute cursor-pointer z-30 transition-transform duration-200 pointer-events-auto flex flex-col items-center justify-center text-center max-w-[200px] sm:max-w-[240px]"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            opacity: lbl.opacity ?? 1,
            transform: lbl.isHovered
              ? "translate(-50%, 0) scale(1.10)"
              : "translate(-50%, 0) scale(1)",
          }}
        >
          <span
            className="block font-bold tracking-wider uppercase text-xs sm:text-sm select-none text-center transition-all duration-200"
            style={{
              color: "#111111",
              filter: lbl.isHovered
                ? `drop-shadow(0 2px 8px ${THEME.rgba(0.45)})`
                : "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))",
            }}
          >
            {lbl.name}
          </span>
          {lbl.caption && (
            <span className="block text-black font-medium text-[11px] sm:text-xs select-none text-center mt-0.5 leading-snug break-all">
              {lbl.caption}
            </span>
          )}
        </div>
      ))}

      {/* Interactive Project Slideshow Modal */}
      {selectedProject && (
        <ProjectSlideshowModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
