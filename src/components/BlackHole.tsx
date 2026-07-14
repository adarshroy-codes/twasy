import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface BlackHoleProps {
  isHovered: boolean;
}

export default function BlackHole({ isHovered }: BlackHoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D parallax tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth springs for high-end organic movement
  const springX = useSpring(rotateX, { stiffness: 75, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 75, damping: 20 });

  // Flare scale based on mouse hover
  const flareScale = useSpring(isHovered ? 1.15 : 1.0, { stiffness: 80, damping: 15 });
  const brightness = useSpring(isHovered ? 1.3 : 0.95, { stiffness: 80, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate normalized mouse positions around center (-0.5 to 0.5)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      // Map to gentle rotation angles
      rotateX.set(mouseY * -24); // Tilt up/down
      rotateY.set(mouseX * 24);  // Tilt left/right
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        window.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [rotateX, rotateY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible"
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="relative w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] flex items-center justify-center"
      >
        {/* ----------------------------------------------------------------- */}
        {/* 1. CHROMATIC ABERRATION OUTER HALO GLOW                           */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          style={{ scale: flareScale }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.18)_0%,rgba(138,63,252,0.1)_35%,rgba(224,75,255,0.06)_55%,transparent_75%)] filter blur-[30px] mix-blend-screen pointer-events-none"
        />

        {/* ----------------------------------------------------------------- */}
        {/* 2. REAR ACCRETION DISK (Behind Event Horizon)                      */}
        {/* ----------------------------------------------------------------- */}
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* ACCRETION DISK SPECTRUM GRADIENT (Chromatic aberration theme) */}
              <linearGradient id="accretion-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(0, 242, 254, 0)" />
                <stop offset="20%" stopColor="rgba(0, 242, 254, 0.45)" />  {/* Cyan */}
                <stop offset="42%" stopColor="rgba(138, 63, 252, 0.85)" /> {/* Deep Violet */}
                <stop offset="48%" stopColor="rgba(224, 75, 255, 0.95)" /> {/* Cyber Pink */}
                <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />    {/* Hot Core */}
                <stop offset="52%" stopColor="rgba(255, 190, 41, 0.95)" />  {/* Golden Glow */}
                <stop offset="58%" stopColor="rgba(224, 75, 255, 0.85)" /> {/* Cyber Pink */}
                <stop offset="80%" stopColor="rgba(138, 63, 252, 0.45)" /> {/* Deep Violet */}
                <stop offset="100%" stopColor="rgba(0, 242, 254, 0)" />
              </linearGradient>

              {/* REAR GRAVITATIONAL LENSING CURVE GRADIENT */}
              <radialGradient id="lensing-top-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="25%" stopColor="rgba(255, 180, 40, 0.85)" />
                <stop offset="55%" stopColor="rgba(224, 75, 255, 0.55)" />
                <stop offset="85%" stopColor="rgba(138, 63, 252, 0.15)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>

            {/* A. Background Flat Swirling Accretion Disk - Tilted slightly */}
            <motion.ellipse
              cx="250"
              cy="250"
              rx="230"
              ry="32"
              transform="rotate(-14, 250, 250)"
              stroke="url(#accretion-grad)"
              strokeWidth="48"
              filter="blur(14px)"
              animate={{
                ry: isHovered ? [30, 36, 30] : [32, 34, 32],
                rotate: [-14, -12, -14],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                opacity: 0.85,
              }}
            />

            {/* B. Secondary thin sharp ring for realistic dust lane detail */}
            <motion.ellipse
              cx="250"
              cy="250"
              rx="220"
              ry="24"
              transform="rotate(-14, 250, 250)"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1.5"
              filter="blur(1px)"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                opacity: 0.65,
              }}
            />

            {/* C. Rear Einstein Lensing Halo (Tops and bottoms curve behind Event Horizon) */}
            {/* Upper gravitational ring arc bent upward */}
            <motion.path
              d="M 60 230 C 130 110, 370 110, 440 230"
              stroke="url(#lensing-top-grad)"
              strokeWidth="38"
              strokeLinecap="round"
              filter="blur(10px)"
              animate={{
                d: isHovered 
                  ? [
                      "M 60 230 C 130 110, 370 110, 440 230",
                      "M 55 225 C 120 95, 380 95, 445 225",
                      "M 60 230 C 130 110, 370 110, 440 230"
                    ]
                  : [
                      "M 60 230 C 130 110, 370 110, 440 230"
                    ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                opacity: 0.9,
              }}
            />

            {/* Lower gravitational ring arc bent downward (Slightly fainter) */}
            <motion.path
              d="M 80 270 C 140 370, 360 370, 420 270"
              stroke="url(#lensing-top-grad)"
              strokeWidth="28"
              strokeLinecap="round"
              filter="blur(12px)"
              animate={{
                d: isHovered
                  ? [
                      "M 80 270 C 140 370, 360 370, 420 270",
                      "M 75 275 C 135 385, 365 385, 425 275",
                      "M 80 270 C 140 370, 360 370, 420 270"
                    ]
                  : [
                      "M 80 270 C 140 370, 360 370, 420 270"
                    ]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                opacity: 0.75,
              }}
            />
          </svg>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 3. EVENT HORIZON (Central Void - Singular Black Sphere)            */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          style={{
            transform: "translateZ(30px)", // Pop central sphere forward slightly
          }}
          className="absolute w-[116px] sm:w-[156px] h-[116px] sm:h-[156px] rounded-full bg-[#000000] z-10 shadow-[0_0_40px_rgba(0,0,0,1),inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center border border-black"
        >
          {/* Inner ring of the accretion disk silhouette inside gravity well */}
          <div className="absolute inset-1 rounded-full bg-black shadow-[inset_0_0_15px_rgba(255,255,255,0.08)]" />
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* 4. FOREGROUND ACCRETION DISK (Loops in front of Event Horizon)   */}
        {/* ----------------------------------------------------------------- */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
          style={{ transform: "translateZ(45px)" }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* The front lensed band wrapping horizontally in front of the black hole */}
            <motion.path
              d="M 50 244 C 110 272, 390 272, 450 244"
              stroke="url(#accretion-grad)"
              strokeWidth="42"
              strokeLinecap="round"
              filter="blur(8px)"
              animate={{
                d: isHovered
                  ? [
                      "M 50 244 C 110 272, 390 272, 450 244",
                      "M 45 242 C 100 278, 400 278, 455 242",
                      "M 50 244 C 110 272, 390 272, 450 244"
                    ]
                  : [
                      "M 50 244 C 110 272, 390 272, 450 244"
                    ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                opacity: 0.95,
              }}
            />

            {/* Front sharp hot core line */}
            <motion.path
              d="M 68 244 C 120 268, 380 268, 432 244"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="blur(1.5px)"
              style={{
                opacity: 0.9,
              }}
            />

            {/* Beautiful star particles inside the accretion disk for a photorealistic look */}
            {Array.from({ length: 18 }).map((_, idx) => {
              const rx = 120 + idx * 16;
              const angle = (idx * Math.PI) / 8;
              const px = 250 + rx * Math.cos(angle);
              const py = 250 + rx * 0.12 * Math.sin(angle) + 12;
              return (
                <circle
                  key={idx}
                  cx={px}
                  cy={py}
                  r={Math.random() * 1.5 + 0.6}
                  fill="#ffffff"
                  className="animate-pulse"
                  style={{
                    opacity: Math.random() * 0.7 + 0.3,
                    animationDelay: `${idx * 0.25}s`,
                    animationDuration: `${1.5 + Math.random() * 2}s`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 5. EXTRA GLOWS & REFRACTIONS ON HOVER                             */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.35 : 0.0,
            scale: isHovered ? 1.25 : 0.9,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,180,40,0.22)_0%,rgba(224,75,255,0.08)_45%,transparent_75%)] filter blur-[15px] mix-blend-screen pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
