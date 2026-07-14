import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";

interface GlassOrbProps {
  size?: number;
  className?: string;
  parallaxFactor?: number;
  hoverScale?: number;
  delay?: number;
}

export default function GlassOrb({
  size = 300,
  className = "",
  parallaxFactor = 0.15,
  hoverScale = 1.15,
  delay = 0,
}: GlassOrbProps) {
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  // High performance scrolling using Motion Values
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, (latest) => -latest * parallaxFactor);

  // Motion values for smooth mouse tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transX = useMotionValue(0);
  const transY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 15 });
  const springTransX = useSpring(transX, { stiffness: 50, damping: 18 });
  const springTransY = useSpring(transY, { stiffness: 50, damping: 18 });

  // Handle local mouse move (runs only on the active hovered element, avoiding layout thrashing)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    
    // Check if mouse is near or on the orb (within 1.5x size of boundary)
    const orbCenterX = rect.left + rect.width / 2;
    const orbCenterY = rect.top + rect.height / 2;
    const dx = e.clientX - orbCenterX;
    const dy = e.clientY - orbCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const activeRadius = size * 1.5;

    // High fidelity tilt calculations
    const strength = 1 - Math.min(distance / activeRadius, 1); // 1 at center, 0 at outer boundary
    const maxTilt = 22; // Degrees
    const maxShift = 18; // Pixels

    rotateX.set((dy / activeRadius) * -maxTilt * strength);
    rotateY.set((dx / activeRadius) * maxTilt * strength);

    transX.set((dx / activeRadius) * maxShift * strength);
    transY.set((dy / activeRadius) * maxShift * strength);
  };

  return (
    <motion.div
      ref={orbRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isHovered ? hoverScale : 1.0 }}
      transition={{
        opacity: { duration: 1.2, delay },
        scale: { type: "spring", stiffness: 80, damping: 15 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
        transX.set(0);
        transY.set(0);
      }}
      style={{
        width: size,
        height: size,
        rotateX: springRotateX,
        rotateY: springRotateY,
        x: springTransX,
        y: springTransY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        translateY: translateY, // Parallax vertical scrolling
      }}
      className={`absolute select-none z-10 filter hover:brightness-110 transition-all duration-300 pointer-events-auto ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ambient Outer Halo Glow */}
          <radialGradient id={`chroma-glow-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(138, 63, 252, 0.55)" />
            <stop offset="50%" stopColor="rgba(0, 242, 254, 0.3)" />
            <stop offset="75%" stopColor="rgba(224, 75, 255, 0.18)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          {/* Accent Orange/Red Bottom Rim */}
          <linearGradient id={`orange-rim-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 60, 40, 1)" />
            <stop offset="45%" stopColor="rgba(224, 75, 255, 0.45)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </linearGradient>

          {/* Majestic Crescent Chromatic Arc Gradient */}
          <radialGradient id={`cyan-rim-grad-${size}`} cx="38%" cy="78%" r="62%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
            <stop offset="20%" stopColor="rgba(0, 242, 254, 0.95)" />
            <stop offset="45%" stopColor="rgba(138, 63, 252, 0.75)" />
            <stop offset="75%" stopColor="rgba(224, 75, 255, 0.25)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          {/* Diagonal Refractive Filament Gradient */}
          <linearGradient id={`inner-filament-${size}`} x1="10%" y1="75%" x2="90%" y2="25%">
            <stop offset="0%" stopColor="rgba(224, 75, 255, 0)" />
            <stop offset="30%" stopColor="rgba(224, 75, 255, 0.9)" />
            <stop offset="55%" stopColor="rgba(202, 142, 255, 0.75)" />
            <stop offset="85%" stopColor="rgba(0, 242, 254, 0.4)" />
            <stop offset="100%" stopColor="rgba(138, 63, 252, 0)" />
          </linearGradient>

          {/* Volumetric Dark Core Density Mask */}
          <radialGradient id={`dark-core-${size}`} cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="rgba(2, 1, 5, 0.15)" />
            <stop offset="70%" stopColor="rgba(6, 4, 12, 0.12)" />
            <stop offset="88%" stopColor="rgba(138, 63, 252, 0.45)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>

          {/* Subtle noise/grain to mimic realistic physical medium */}
          <filter id={`noise-${size}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* 1. Base soft out-of-focus halo glow */}
        <circle cx="250" cy="250" r="235" fill={`url(#chroma-glow-${size})`} filter="blur(26px)" />

        {/* 2. Physical Glass Sphere Container Group */}
        <g>
          {/* Base Dense Glass Core - highly transparent */}
          <circle cx="250" cy="250" r="172" fill="rgba(8, 6, 12, 0.12)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

          {/* Red/Orange Chromatic bleeding layer */}
          <circle cx="250" cy="250" r="171" stroke={`url(#orange-rim-${size})`} strokeWidth="11" fill="none" filter="blur(4px)" opacity="0.65" />

          {/* 3D Glass volumetric shadows */}
          <circle cx="250" cy="250" r="168" fill={`url(#dark-core-${size})`} />

          {/* The gorgeous inner glowing diagonal light filament */}
          <motion.rect
            x="145"
            y="215"
            width="170"
            height="46"
            rx="23"
            transform="rotate(-28 250 250)"
            fill={`url(#inner-filament-${size})`}
            filter="blur(5px)"
            animate={{
              x: isHovered ? [145, 150, 142, 145] : 145,
              y: isHovered ? [215, 210, 218, 215] : 215,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Inner filament specular highlight */}
          <motion.rect
            x="165"
            y="226"
            width="130"
            height="18"
            rx="9"
            transform="rotate(-28 250 250)"
            fill="rgba(255, 255, 255, 0.45)"
            filter="blur(1.5px)"
            animate={{
              opacity: isHovered ? [0.45, 0.65, 0.35, 0.45] : 0.45,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* The main glowing neon white-cyan crescent (This defines the glass edge refraction!) */}
          <path
            d="M 112 312 C 128 396, 358 396, 404 294 C 424 252, 412 176, 362 132"
            stroke={`url(#cyan-rim-grad-${size})`}
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            filter="blur(5px)"
          />
          {/* Sharp high-contrast core light highlight on the rim */}
          <path
            d="M 128 302 C 142 376, 344 376, 388 288"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            filter="blur(1px)"
            opacity="0.9"
          />

          {/* Bottom Orange fire highlight rim */}
          <path
            d="M 276 414 C 342 404, 396 348, 404 282"
            stroke="rgba(255, 70, 40, 0.95)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            filter="blur(4.5px)"
          />
          <path
            d="M 286 409 C 336 400, 382 352, 390 294"
            stroke="#ff9845"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            filter="blur(1px)"
            opacity="0.85"
          />

          {/* Top subtle soft blue-green ambient rim reflection */}
          <path
            d="M 120 190 C 140 120, 240 85, 330 110"
            stroke="rgba(0, 242, 254, 0.4)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            filter="blur(6px)"
          />

          {/* Secondary dark vignette layer for total occlusion inside - transparent */}
          <circle cx="250" cy="250" r="132" fill="rgba(2, 1, 4, 0.05)" filter="blur(9px)" />

          {/* Specular glare dot on the very top of the sphere - much brighter and adding a secondary reflection */}
          <circle cx="210" cy="140" r="12" fill="rgba(255, 255, 255, 0.8)" filter="blur(1px)" />
          <circle cx="205" cy="135" r="5" fill="#ffffff" />
          {/* Crescent-like glassy highlight reflection on the right bottom rim */}
          <path d="M 320 320 A 100 100 0 0 1 325 240" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="4" strokeLinecap="round" fill="none" filter="blur(1px)" />
        </g>

        {/* 4. Film grain texture overlay */}
        <rect cx="0" cy="0" width="500" height="500" filter={`url(#noise-${size})`} className="opacity-70 pointer-events-none mix-blend-overlay" />
      </svg>
    </motion.div>
  );
}
