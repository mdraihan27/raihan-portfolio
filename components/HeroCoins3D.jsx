"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const COIN_TYPES = [
  { id: "skills", name: "Skills", type: "skills" },
  { id: "projects", name: "Projects", type: "projects" },
  { id: "education", name: "Education", type: "education" },
  { id: "achievements", name: "Achievements", type: "achievements" },
  { id: "contact", name: "Contact", type: "contact" },
  // Duplicate set to maintain continuous presence along the visible arc
  { id: "skills-2", targetId: "skills", name: "Skills", type: "skills" },
  { id: "projects-2", targetId: "projects", name: "Projects", type: "projects" },
  { id: "education-2", targetId: "education", name: "Education", type: "education" },
  { id: "achievements-2", targetId: "achievements", name: "Achievements", type: "achievements" },
  { id: "contact-2", targetId: "contact", name: "Contact", type: "contact" },
];

function drawIcon(ctx, type) {
  ctx.save();
  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 22;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (type === "skills") {
    // Minimalist Code Chevron Brackets < / >
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
    // Clean Minimalist Bento Layout (4 rounded tiles)
    const size = 95;
    const r = 18;
    const gap = 12;

    // Top-left
    ctx.beginPath();
    ctx.roundRect(-gap / 2 - size, -gap / 2 - size, size, size, r);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.roundRect(gap / 2, -gap / 2 - size, size, size, r);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.roundRect(-gap / 2 - size, gap / 2, size, size, r);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.roundRect(gap / 2, gap / 2, size, size, r);
    ctx.stroke();
  } else if (type === "education") {
    // Sleek Minimalist Graduation Mortarboard
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.lineTo(145, -30);
    ctx.lineTo(0, 30);
    ctx.lineTo(-145, -30);
    ctx.closePath();
    ctx.stroke();

    // Skullcap curve
    ctx.beginPath();
    ctx.moveTo(-85, -2);
    ctx.quadraticCurveTo(0, 85, 85, -2);
    ctx.stroke();

    // Tassel drop
    ctx.beginPath();
    ctx.moveTo(145, -30);
    ctx.lineTo(150, 48);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 60, 11, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "achievements") {
    // Minimalist Modern Trophy Cup
    ctx.beginPath();
    ctx.moveTo(-80, -85);
    ctx.lineTo(80, -85);
    ctx.quadraticCurveTo(75, 20, 0, 42);
    ctx.quadraticCurveTo(-75, 20, -80, -85);
    ctx.stroke();

    // Clean side handles
    ctx.beginPath();
    ctx.moveTo(-75, -68);
    ctx.bezierCurveTo(-130, -58, -120, -5, -60, -5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(75, -68);
    ctx.bezierCurveTo(130, -58, 120, -5, 60, -5);
    ctx.stroke();

    // Minimal Stem & Pedestal
    ctx.beginPath();
    ctx.moveTo(0, 42);
    ctx.lineTo(0, 82);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-52, 82);
    ctx.lineTo(52, 82);
    ctx.stroke();
  } else if (type === "contact") {
    // Minimalist Modern Mail Envelope
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

function createCoinTexture({ type }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Velvety smooth coral radial gradient with soft luminous center
  const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 512);
  grad.addColorStop(0, "#ff7b72");
  grad.addColorStop(0.5, "#FA5F55");
  grad.addColorStop(0.85, "#eb463a");
  grad.addColorStop(1, "#d63b30");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  // Single minimalist outer frosted hairline ring
  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(512, 512, 482, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle interior guide hairline
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(512, 512, 454, 0, Math.PI * 2);
  ctx.stroke();

  // 4 Minimalist compass accent notches (12, 3, 6, 9 o'clock)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 3.5;
  const notchR = 454;
  const notchLen = 12;
  [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(512 + (notchR - notchLen) * Math.cos(a), 512 + (notchR - notchLen) * Math.sin(a));
    ctx.lineTo(512 + (notchR + notchLen) * Math.cos(a), 512 + (notchR + notchLen) * Math.sin(a));
    ctx.stroke();
  });

  // Centered Vector Icon (reversed vertically 180deg so icons render right-side up)
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

function createCoinBackTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Matching velvety coral gradient
  const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 512);
  grad.addColorStop(0, "#ff7b72");
  grad.addColorStop(0.5, "#FA5F55");
  grad.addColorStop(0.85, "#eb463a");
  grad.addColorStop(1, "#d63b30");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();

  // Minimalist outer hairline ring
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

  // Clean Minimalist Monogram
  ctx.save();
  ctx.translate(512, 512);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 160px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("RH", 0, -20);

  ctx.font = "600 26px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
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

  // Anodized matte coral brushed gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 64);
  bgGrad.addColorStop(0, "#ff958c");
  bgGrad.addColorStop(0.5, "#FA5F55");
  bgGrad.addColorStop(1, "#c9352a");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 64);

  // Micro-fine vertical satin brush lines
  for (let x = 0; x < 512; x += 3) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fillRect(x, 0, 1, 64);
    ctx.fillStyle = "rgba(120, 20, 14, 0.15)";
    ctx.fillRect(x + 1.5, 0, 1, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(16, 1);
  return texture;
}

export default function HeroCoins3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [labels, setLabels] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const orbitAngleRef = useRef(Math.PI * 1.05); // start nicely visible along arc
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

  const handleNavClick = (targetId) => {
    if (hasDraggedRef.current) return;
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

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    // Orthographic Camera: Ensures coins are 100% mathematically perfect circles everywhere
    // regardless of screen position (zero wide-angle edge squeeze or distortion!)
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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Balanced Studio Lighting: luminous & smooth without harsh cutoff shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffdcd6, 1.5);
    hemiLight.position.set(0, 600, 200);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7f5, 2.2);
    keyLight.position.set(350, 600, 800);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffeae7, 1.1);
    fillLight.position.set(-400, -200, 600);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xff9e94, 2.4, 1400);
    rimLight.position.set(200, 300, 500);
    scene.add(rimLight);

    // Refined Balanced Coin Geometry (~220px diameter on desktop) with smooth 96 radial segments
    const isMobile = width < 640;
    const coinRadius = isMobile ? 75 : 110;
    const coinThickness = isMobile ? 22 : 30;
    const coinGeometry = new THREE.CylinderGeometry(
      coinRadius,
      coinRadius,
      coinThickness,
      96
    );
    // Rotate geometry so local +Z is the coin face normal
    coinGeometry.rotateX(Math.PI / 2);

    // Override UVs on front and back circular caps so they map directly:
    // U = screen X (0=left, 1=right), V = screen Y (0=bottom, 1=top)
    const pos = coinGeometry.attributes.position;
    const uv = coinGeometry.attributes.uv;
    const idx = coinGeometry.index;

    // Top cap (front face, material index 1) - flipped vertically 180deg so icons render right-side up
    const g1 = coinGeometry.groups[1];
    for (let i = g1.start; i < g1.start + g1.count; i++) {
      const v = idx.getX(i);
      const x = pos.getX(v);
      const y = pos.getY(v);
      uv.setXY(v, (x / coinRadius + 1) / 2, (-y / coinRadius + 1) / 2);
    }

    // Bottom cap (back face, material index 2)
    const g2 = coinGeometry.groups[2];
    for (let i = g2.start; i < g2.start + g2.count; i++) {
      const v = idx.getX(i);
      const x = pos.getX(v);
      const y = pos.getY(v);
      uv.setXY(v, (-x / coinRadius + 1) / 2, (-y / coinRadius + 1) / 2);
    }
    uv.needsUpdate = true;

    const rimTexture = createReededRimTexture();
    const sideMaterial = new THREE.MeshStandardMaterial({
      map: rimTexture,
      metalness: 0.35,
      roughness: 0.38,
    });

    const backTexture = createCoinBackTexture();
    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.16,
      roughness: 0.35,
    });

    // Create Coin Meshes
    const coinMeshes = COIN_TYPES.map((item) => {
      const frontTexture = createCoinTexture(item);
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        metalness: 0.16,
        roughness: 0.35,
      });

      // Cylinder material slots: [0: side rim, 1: top cap (front), 2: bottom cap (back)]
      const materials = [sideMaterial, frontMaterial, backMaterial];
      const mesh = new THREE.Mesh(coinGeometry, materials);

      scene.add(mesh);
      return { mesh, item };
    });

    // Handle Resize with Orthographic Camera bounds
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
    };

    window.addEventListener("resize", handleResize);

    // Raycaster for 3D coin hovering & clicking
    const raycaster = new THREE.Raycaster();
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

      // Enable canvas pointer events over the coins section so dragging works,
      // but let events pass through on the left side so text, bio and buttons are clickable
      const isOverCoins =
        width >= 768
          ? x >= width * 0.42 && y <= height
          : y <= height;

      canvas.style.pointerEvents = isOverCoins ? "auto" : "none";
    };

    window.addEventListener("pointermove", onPointerMove);

    // Wheel listener: when over the coins section, scroll should scroll through the coins
    const handleWheel = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isOverCoins =
        isAnyHovered ||
        (width >= 768
          ? x >= width * 0.42 && y >= 0 && y <= height
          : y >= 0 && y <= height * 0.75);

      if (isOverCoins) {
        // Prevent default window scrolling when hovering over the coins section
        e.preventDefault();
        // Reversed direction: scrolling down advances coins along the opposite arc direction
        const rawDelta = e.deltaY + (e.deltaX || 0);
        // Clamp each wheel tick delta with slightly faster rate
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

      // Center top-right of screen for orbit arc
      const centerTopRightX = width / 2;
      const centerTopRightY = height / 2;

      // Sweep arc radius
      const orbitRadius = Math.min(width * 0.38, 570);
      const total = coinMeshes.length;

      // Check raycast intersection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(coinMeshes.map((c) => c.mesh));
      let currentHoveredMesh = null;
      let meshHoveredId = null;
      if (intersects.length > 0) {
        currentHoveredMesh = intersects[0].object;
        const found = coinMeshes.find((c) => c.mesh === currentHoveredMesh);
        if (found) {
          meshHoveredId = found.item.id;
        }
      }

      isAnyHovered = Boolean(currentHoveredMesh || hoveredRef.current);

      // Orbit continuous drift: pause if any coin is hovered, being dragged, or recently scrolled
      const isRecentlyScrolled = performance.now() - lastScrollTimeRef.current < 2500;
      if (!isDraggingRef.current && !isAnyHovered && !isRecentlyScrolled) {
        // Graceful slow orbit cycle ~42 seconds
        const orbitSpeed = (2 * Math.PI) / 42000;
        targetOrbitAngleRef.current += orbitSpeed * dt;
      }

      // Silky, smooth interpolation towards target orbit angle:
      // Responsive during drag (0.22) so it follows hand immediately,
      // and smooth & responsive (0.075) when coasting/released or scrolling
      const lerpSpeed = isDraggingRef.current ? 0.22 : 0.075;
      orbitAngleRef.current += (targetOrbitAngleRef.current - orbitAngleRef.current) * lerpSpeed;

      const updatedLabels = [];

      coinMeshes.forEach((coinObj, idx) => {
        const { mesh, item } = coinObj;
        const angle = orbitAngleRef.current + (idx / total) * 2 * Math.PI;

        // Position along the circular arc in Three.js world space
        const posX = centerTopRightX + orbitRadius * Math.cos(angle);
        const posY = centerTopRightY + orbitRadius * Math.sin(angle);

        // Exact screen coordinates for coin center
        const coinScreenX = width / 2 + posX;
        const coinScreenY = height / 2 - posY;

        const isHovered =
          currentHoveredMesh === mesh ||
          hoveredRef.current === item.id ||
          meshHoveredId === item.id;

        let targetRotX = 0;
        let targetRotY = 0;
        let targetScale = 1.0;
        let targetPosZ = 0;

        if (isHovered) {
          // Dynamic pronounced 3D tilt tracking the mouse cursor on hover
          const dx = Math.max(-1.2, Math.min(1.2, (clientMouse.x - coinScreenX) / coinRadius));
          const dy = Math.max(-1.2, Math.min(1.2, (clientMouse.y - coinScreenY) / coinRadius));

          targetRotX = dy * 0.52;
          targetRotY = -dx * 0.52;
          targetScale = 1.12;
          targetPosZ = 60;
        } else {
          // Idle state: pronounced back and forth 3D tilt on their own
          const swayFactor = isAnyHovered ? 0.25 : 1.0;
          targetRotX = Math.sin(now * 0.0022 + idx * 1.1) * 0.38 * swayFactor;
          targetRotY = Math.cos(now * 0.0017 + idx * 1.1) * 0.32 * swayFactor;
          targetScale = 1.0;
          targetPosZ = Math.sin(now * 0.002 + idx * 1.1) * 24;
        }

        // Responsive easing for rotation so the increased back-and-forth tilt is vivid and smooth
        mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.20;
        mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.20;
        mesh.rotation.z = 0;

        const currentScale = mesh.scale.x + (targetScale - mesh.scale.x) * 0.12;
        mesh.scale.set(currentScale, currentScale, currentScale);

        const currentZ = mesh.position.z + (targetPosZ - mesh.position.z) * 0.15;
        mesh.position.set(posX, posY, currentZ);

        // Position HTML label directly below the bottom edge of the coin
        const currentRadius = coinRadius * currentScale;
        const labelScreenX = coinScreenX;
        const labelScreenY = coinScreenY + currentRadius + 22;

        const isVisibleOnScreen =
          labelScreenX >= -120 &&
          labelScreenX <= width + 120 &&
          labelScreenY >= -120 &&
          labelScreenY <= height + 120;

        if (isVisibleOnScreen) {
          updatedLabels.push({
            id: item.id,
            targetId: item.targetId || item.id,
            name: item.name,
            x: labelScreenX,
            y: labelScreenY,
            isHovered,
          });
        }
      });

      // Update cursor style
      if (currentHoveredMesh) {
        canvas.style.cursor = "pointer";
      } else if (isDraggingRef.current) {
        canvas.style.cursor = "grabbing";
      } else {
        canvas.style.cursor = "grab";
      }

      setLabels(updatedLabels);
      renderer.render(scene, camera);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("wheel", handleWheel);
      renderer.dispose();
      coinGeometry.dispose();
      sideMaterial.dispose();
      backMaterial.dispose();
    };
  }, []);

  // Pointer drag to spin the wheel with 1:1 circular angular tracking
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragVelocityRef.current = 0;

    const width = containerRef.current?.clientWidth || window.innerWidth;
    const wheelCenterX = width;
    const wheelCenterY = 0;

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

    if (Math.hypot(dx, dy) > 4) {
      hasDraggedRef.current = true;
    }

    const width = containerRef.current?.clientWidth || window.innerWidth;
    const wheelCenterX = width;
    const wheelCenterY = 0;

    const now = performance.now();
    const dt = Math.max(now - lastPointerTimeRef.current, 8);
    const currentAngle = Math.atan2(e.clientY - wheelCenterY, e.clientX - wheelCenterX);

    let dAngle = currentAngle - lastPointerAngleRef.current;
    // Unwrap angular difference
    while (dAngle > Math.PI) dAngle -= 2 * Math.PI;
    while (dAngle < -Math.PI) dAngle += 2 * Math.PI;

    // Invert dAngle: dragging down/right advances wheel down/right
    const delta = -dAngle;

    targetOrbitAngleRef.current += delta;
    lastScrollTimeRef.current = now;

    // Track smoothed angular velocity (rad/ms) for inertial release
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

    // Apply smooth inertial momentum from drag release
    const now = performance.now();
    const timeSinceLastMove = now - lastPointerTimeRef.current;
    if (hasDraggedRef.current && timeSinceLastMove < 80) {
      // Clamp momentum to reasonable range so it glides smoothly without spinning wildly
      const momentum = Math.max(-0.8, Math.min(0.8, dragVelocityRef.current * 180));
      targetOrbitAngleRef.current += momentum;
      lastScrollTimeRef.current = now;
    }

    // If clicked directly on coin without dragging, navigate
    if (!hasDraggedRef.current && hoveredRef.current) {
      const match = COIN_TYPES.find((c) => c.id === hoveredRef.current);
      if (match) {
        handleNavClick(match.targetId || match.id);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 w-screen h-[100vh] max-h-[1080px] pointer-events-none z-20 overflow-hidden select-none"
      aria-label="3D Navigation Coins"
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="absolute inset-0 w-full h-full block pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Floating Labels Below 3D Coins (No background pill, theme orange text) */}
      {labels.map((lbl) => (
        <div
          key={lbl.id}
          onClick={() => handleNavClick(lbl.targetId)}
          onMouseEnter={() => setHoveredId(lbl.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="absolute -translate-x-1/2 cursor-pointer z-30 transition-transform duration-200 pointer-events-auto"
          style={{
            left: `${lbl.x}px`,
            top: `${lbl.y}px`,
            transform: lbl.isHovered
              ? "translate(-50%, 0) scale(1.15)"
              : "translate(-50%, 0) scale(1)",
          }}
        >
          <span
            className={`block font-extrabold tracking-wider uppercase text-sm sm:text-base select-none transition-all duration-200 ${
              lbl.isHovered
                ? "text-[#ff786e] drop-shadow-[0_2px_10px_rgba(250,95,85,0.5)]"
                : "text-coral drop-shadow-[0_1px_4px_rgba(250,95,85,0.25)]"
            }`}
          >
            {lbl.name}
          </span>
        </div>
      ))}
    </div>
  );
}

