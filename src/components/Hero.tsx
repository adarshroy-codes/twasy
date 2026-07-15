import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
  cursorPosition?: "left" | "right";
}

function ScrambleText({ text, isHovered, className, cursorPosition = "right" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
    }

    if (isHovered) {
      const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?[]\\,./;-=";
      activeIntervalRef.current = setInterval(() => {
        const scrambled = Array.from({ length: text.length }, () => 
          pool[Math.floor(Math.random() * pool.length)]
        ).join("");
        setDisplayText(scrambled);
      }, 60);
    } else {
      setDisplayText(text);
    }

    return () => {
      if (activeIntervalRef.current) {
        clearInterval(activeIntervalRef.current);
      }
    };
  }, [isHovered, text]);

  // Terminal-like blinking block cursor loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {isHovered && cursorPosition === "left" && (
        <span
          className={`inline-block mr-1 w-1.5 h-3 bg-white/80 align-middle transition-opacity duration-100 ${
            isCursorVisible ? "opacity-100" : "opacity-10"
          }`}
        />
      )}
      {displayText}
      {isHovered && cursorPosition === "right" && (
        <span
          className={`inline-block ml-1 w-1.5 h-3 bg-white/80 align-middle transition-opacity duration-100 ${
            isCursorVisible ? "opacity-100" : "opacity-10"
          }`}
        />
      )}
    </span>
  );
}

export default function Hero({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [hoveredSide, setHoveredSide] = useState<"about" | "projects" | "center" | null>(null);

  const handleNavigate = (id: string) => {
    onNavigate(id);
  };

  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 400, y: 400 });
  const [isMouseIn, setIsMouseIn] = useState(false);
  const animateRef = useRef<number | null>(null);

  const currentPos = useRef({ x: 400, y: 400 });
  const targetPos = useRef({ x: 400, y: 400 });

  useEffect(() => {
    const updatePhysics = () => {
      const lerpFactor = 0.08; 
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && !isMouseIn) {
        currentPos.current = { ...targetPos.current };
        setMousePos({ ...targetPos.current });
        animateRef.current = null;
        return;
      }

      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;
      
      setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
      animateRef.current = requestAnimationFrame(updatePhysics);
    };

    animateRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current);
        animateRef.current = null;
      }
    };
  }, [isMouseIn]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 800;
    targetPos.current = { x, y };
    setIsMouseIn(true);
  };

  const handleMouseEnter = () => {
    setIsMouseIn(true);
  };

  const handleMouseLeave = () => {
    setIsMouseIn(false);
    targetPos.current = { x: 400, y: 400 };
  };

  // Generate the overlapping spiral triangles
  const numTriangles = 80;
  const size = 195;
  const rOffset = 158;

  const staticTriangles = useRef(
    Array.from({ length: numTriangles }, (_, i) => {
      const theta = (i * 2 * Math.PI) / numTriangles;
      const cx = 400 + Math.cos(theta) * rOffset;
      const cy = 400 + Math.sin(theta) * rOffset;
      const phi = theta * 3.38;
      
      const vertices = Array.from({ length: 3 }, (_, j) => {
        const vertexAngle = phi + (j * 2 * Math.PI) / 3;
        const vxOffset = size * Math.cos(vertexAngle);
        const vyOffset = size * Math.sin(vertexAngle);
        return { vxOffset, vyOffset };
      });

      return {
        id: i,
        cx,
        cy,
        vertices,
        opacity: 0.15 + (i % 3) * 0.05,
      };
    })
  );

  // Concentric radar-like coordinate dot rings inside the central void
  const dotRings = [100, 120, 140];
  const staticDots = useRef(
    (() => {
      const dots: { x: number; y: number; key: string }[] = [];
      dotRings.forEach((r, ringIdx) => {
        const numDots = ringIdx === 0 ? 12 : ringIdx === 1 ? 24 : 36;
        for (let i = 0; i < numDots; i++) {
          const angle = (i * 2 * Math.PI) / numDots;
          const x = 400 + Math.cos(angle) * r;
          const y = 400 + Math.sin(angle) * r;
          dots.push({ x, y, key: `dot-${r}-${i}` });
        }
      });
      return dots;
    })()
  );

  // Distort vertices on-the-fly for fluid liquid-crystal movement
  const distortedTriangles = staticTriangles.current.map((t) => {
    const pointsStr = t.vertices
      .map((v) => {
        const origX = t.cx + v.vxOffset;
        const origY = t.cy + v.vyOffset;
        
        const dx = origX - mousePos.x;
        const dy = origY - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let rx = origX;
        let ry = origY;
        
        if (dist < 280 && dist > 0) {
          const force = (1 - dist / 280) * 45;
          // Repulsion
          rx += (dx / dist) * force;
          ry += (dy / dist) * force;
          
          // Swirl twist
          const twistAngle = (1 - dist / 280) * 0.25; // elegant radian twist
          const cosT = Math.cos(twistAngle);
          const sinT = Math.sin(twistAngle);
          
          const rxRel = rx - mousePos.x;
          const ryRel = ry - mousePos.y;
          
          rx = mousePos.x + (rxRel * cosT - ryRel * sinT);
          ry = mousePos.y + (rxRel * sinT + ryRel * cosT);
        }
        
        return `${rx.toFixed(2)},${ry.toFixed(2)}`;
      })
      .join(" ");

    return {
      id: t.id,
      points: pointsStr,
      opacity: t.opacity,
    };
  });

  const centerDist = Math.sqrt(
    Math.pow(mousePos.x - 400, 2) + Math.pow(mousePos.y - 400, 2)
  );

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black px-4 pt-16 z-10 select-none"
    >
      {/* 1. Self-contained CSS Styles for ultra-high-performance GPU-accelerated subtle animations */}
      <style>{`
        @keyframes slow-mandala-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slow-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes sound-bar-pulse {
          0%, 100% { height: 2px; }
          50% { height: 10px; }
        }
        .animate-mandala {
          transform-origin: 400px 400px;
          animation: slow-mandala-rotate 90s linear infinite;
        }
        .animate-orbit-container {
          transform-origin: 400px 400px;
          animation: slow-orbit 35s linear infinite;
        }
        .animate-center-breathe {
          animation: subtle-breathe 12s ease-in-out infinite;
        }
        .bg-grid-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* 2. Delicate Outer Dot Grid Background */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none opacity-80" />

      {/* 3. Main Central Geometry Container */}
      <div className="relative w-full max-w-[85vw] max-h-[85vh] sm:max-w-[70vh] sm:max-h-[70vh] aspect-square flex items-center justify-center animate-center-breathe">
        
        {/* Full Interactive SVG Canvas */}
        <svg
          ref={svgRef}
          viewBox="0 0 800 800"
          className="w-full h-full text-white animate-interactive-circle"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "crosshair" }}
        >
          {/* Subtle Outer Radius Guides */}
          <circle cx="400" cy="400" r="380" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="320" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.75" fill="none" />
          
          {/* concentric radar dot coordinate lines inside central void with physics distortion */}
          {staticDots.current.map((dot) => {
            const dx = dot.x - mousePos.x;
            const dy = dot.y - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            let rx = dot.x;
            let ry = dot.y;
            
            if (dist < 180 && dist > 0) {
              const force = (1 - dist / 180) * 25;
              rx += (dx / dist) * force;
              ry += (dy / dist) * force;
            }
            
            return (
              <circle key={dot.key} cx={rx} cy={ry} r="0.75" fill="white" opacity="0.18" />
            );
          })}

          {/* Central Void Inner Guide Ring */}
          <circle cx="400" cy="400" r="105" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" fill="none" />

          {/* Dynamic interactive ripple rings */}
          <circle
            cx="400"
            cy="400"
            r={105 + Math.min(centerDist * 0.15, 80)}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.75"
            fill="none"
            strokeDasharray="5 15"
            style={{ transition: "r 0.1s ease-out" }}
          />
          <circle
            cx="400"
            cy="400"
            r={Math.max(300 - centerDist * 0.25, 120)}
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="20 40"
            style={{ transition: "r 0.1s ease-out" }}
          />

          {/* Real-time cursor guide halo */}
          {isMouseIn && (
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="30"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="0.5"
              fill="rgba(255, 255, 255, 0.02)"
              strokeDasharray="2 4"
              pointerEvents="none"
            />
          )}

          {/* Main Spirograph Mandala Spiral */}
          <g className="animate-mandala">
            {distortedTriangles.map((t) => (
              <polygon
                key={t.id}
                points={t.points}
                fill="none"
                stroke="white"
                strokeWidth="0.65"
                opacity={hoveredSide === "center" ? t.opacity * 1.5 : t.opacity}
                style={{ transition: "opacity 0.6s ease" }}
              />
            ))}
          </g>

          {/* Orbiting Celestial Planet Dot */}
          <g className="animate-orbit-container">
            {/* Sits right on the outer layer perimeter track */}
            <circle cx="700" cy="400" r="4.5" fill="white" className="shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </g>

          {/* Central High-Contrast Geometric Vertical Typography Logo ("TWASY") */}
          <g 
            className="cursor-pointer"
            onMouseEnter={() => setHoveredSide("center")}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => handleNavigate("about")}
          >
            {/* Interactive Centered Hover Circle */}
            <circle cx="400" cy="400" r="90" fill="transparent" />

            {/* Custom SVG Lettering paths centered at (400, 400) */}
            <g 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
              opacity={hoveredSide === "center" ? 1 : 0.8}
              style={{ transition: "opacity 0.3s ease" }}
            >
              {/* LETTER 1: T */}
              <path d="M 388 293 h 24" />
              <path d="M 400 293 v 30" />

              {/* LETTER 2: W */}
              <path d="M 388 339 l 6 30 l 6 -14 l 6 14 l 6 -30" />

              {/* LETTER 3: A */}
              <path d="M 388 415 l 12 -30 l 12 30" />
              <path d="M 393 403 h 14" />

              {/* LETTER 4: S */}
              <path d="M 412 431 h -24 v 15 h 24 v 15 h -24" />

              {/* LETTER 5: Y */}
              <path d="M 388 477 l 12 15 l 12 -15" />
              <path d="M 400 492 v 15" />
            </g>
          </g>
        </svg>
      </div>

      {/* 4. Left HUD Margin Controller: "About" */}
      <div 
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 z-20 group"
        onMouseEnter={() => setHoveredSide("about")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="relative flex items-center">
          <svg 
            width="60" 
            height="24" 
            viewBox="0 0 60 24" 
            fill="none" 
            className={`transition-all duration-300 ${
              hoveredSide === "about" ? "text-white translate-x-1" : "text-white/20"
            }`}
          >
            <path d="M 5 5 L 15 5 L 10 12 L 15 19 L 5 19" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            <path d="M 15 12 H 55" stroke="currentColor" strokeWidth="1" />
          </svg>
          <button
            onClick={() => handleNavigate("about")}
            className={`absolute left-20 font-mono text-[10px] tracking-[0.4em] transition-all duration-300 focus:outline-none whitespace-nowrap ${
              hoveredSide === "about" ? "text-white translate-x-1" : "text-white/40"
            }`}
          >
            <ScrambleText text="ABOUT" isHovered={hoveredSide === "about"} />
          </button>
        </div>
      </div>

      {/* 5. Right HUD Margin Controller: "Portfolio" */}
      <div 
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex items-center justify-end gap-3 z-20 group"
        onMouseEnter={() => setHoveredSide("projects")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="relative flex items-center justify-end">
          <button
            onClick={() => handleNavigate("projects")}
            className={`absolute right-20 font-mono text-[10px] tracking-[0.4em] transition-all duration-300 focus:outline-none whitespace-nowrap ${
              hoveredSide === "projects" ? "text-white -translate-x-1" : "text-white/40"
            }`}
          >
            <ScrambleText text="PORTFOLIO" isHovered={hoveredSide === "projects"} cursorPosition="left" />
          </button>
          <svg 
            width="60" 
            height="24" 
            viewBox="0 0 60 24" 
            fill="none" 
            className={`transition-all duration-300 ${
              hoveredSide === "projects" ? "text-white -translate-x-1" : "text-white/20"
            }`}
          >
            <path d="M 55 5 L 45 5 L 50 12 L 45 19 L 55 19" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            <path d="M 45 12 H 5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* 6. Centered Audio Player/Ticker HUD Footer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3.5 z-20 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-white/40 uppercase whitespace-nowrap flex items-center gap-2">
          <span>&gt; Adarsh Roy</span>
          {/* Real Animated Equalizer Wavebars */}
          <span className="flex items-end gap-[2px] h-2.5 w-4 pb-[1px]">
            <span className="w-[1.2px] bg-white/45 rounded-full" style={{ animation: "sound-bar-pulse 1.2s ease-in-out infinite" }} />
            <span className="w-[1.2px] bg-white/45 rounded-full" style={{ animation: "sound-bar-pulse 0.8s ease-in-out infinite 0.25s" }} />
            <span className="w-[1.2px] bg-white/45 rounded-full" style={{ animation: "sound-bar-pulse 1.5s ease-in-out infinite 0.5s" }} />
          </span>
        </span>
      </div>

      {/* 7. Subtle Floating Scroll Guide Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-20 cursor-pointer flex flex-col items-center gap-1.5 group sm:hidden"
        onClick={() => handleNavigate("about")}
      >
        <ArrowDown className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
      </motion.div>
    </section>
  );
}
