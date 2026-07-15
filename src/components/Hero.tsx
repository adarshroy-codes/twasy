import { useState, useEffect, useRef } from "react";
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

  // Generate the overlapping spiral triangles
  const numTriangles = 80;
  const size = 195;
  const rOffset = 158;
  const triangles = Array.from({ length: numTriangles }, (_, i) => {
    const theta = (i * 2 * Math.PI) / numTriangles;
    // Offset centers of triangles to form a beautiful hollow torus
    const cx = 400 + Math.cos(theta) * rOffset;
    const cy = 400 + Math.sin(theta) * rOffset;
    
    // Rotate each triangle by its positional angle multiplied to create the spiraling spirograph twist
    const phi = theta * 3.38;

    // Calculate regular triangle coordinates relative to its center (cx, cy)
    // Vertices at 0, 120, 240 degrees
    const points = Array.from({ length: 3 }, (_, j) => {
      const vertexAngle = phi + (j * 2 * Math.PI) / 3;
      const vx = cx + size * Math.cos(vertexAngle);
      const vy = cy + size * Math.sin(vertexAngle);
      return `${vx.toFixed(2)},${vy.toFixed(2)}`;
    }).join(" ");

    return { id: i, points, opacity: 0.15 + (i % 3) * 0.05 };
  });

  // Concentric radar-like coordinate dot rings inside the central void
  const dotRings = [100, 120, 140];
  const centralDots: { x: number; y: number; key: string }[] = [];
  dotRings.forEach((r, ringIdx) => {
    const numDots = ringIdx === 0 ? 12 : ringIdx === 1 ? 24 : 36;
    for (let i = 0; i < numDots; i++) {
      const angle = (i * 2 * Math.PI) / numDots;
      const x = 400 + Math.cos(angle) * r;
      const y = 400 + Math.sin(angle) * r;
      centralDots.push({ x, y, key: `dot-${r}-${i}` });
    }
  });

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
          viewBox="0 0 800 800"
          className="w-full h-full text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Radius Guides */}
          <circle cx="400" cy="400" r="380" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="320" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.75" fill="none" />
          
          {/* concentric radar dot coordinate lines inside central void */}
          {centralDots.map((dot) => (
            <circle key={dot.key} cx={dot.x} cy={dot.y} r="0.75" fill="white" opacity="0.18" />
          ))}

          {/* Central Void Inner Guide Ring */}
          <circle cx="400" cy="400" r="105" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" fill="none" />

          {/* Main Spirograph Mandala Spiral */}
          <g className="animate-mandala">
            {triangles.map((t) => (
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
          <span>&gt; Peggy Gou - Han Jan</span>
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
