import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Code2, Gamepad2, ArrowRight, Film } from "lucide-react";
import BlackHole from "./BlackHole";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    { text: "GAME DEV", icon: <Gamepad2 className="w-3.5 h-3.5 text-cyber-neon" /> },
    { text: "VIDEO EDITOR", icon: <Film className="w-3.5 h-3.5 text-cyber-magenta" /> },
    { text: "CODER", icon: <Code2 className="w-3.5 h-3.5 text-amber-400" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Glass crystal particles around the text
  const particles = [
    { x: -160, y: -40, size: 6, delay: 0, duration: 4 },
    { x: 180, y: -60, size: 8, delay: 1, duration: 5 },
    { x: -120, y: 50, size: 4, delay: 2, duration: 3 },
    { x: 140, y: 70, size: 5, delay: 1.5, duration: 4.5 },
    { x: -50, y: -90, size: 5, delay: 0.5, duration: 5.5 },
    { x: 80, y: -100, size: 7, delay: 2.5, duration: 4 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16 z-10"
    >
      {/* SVG Specular Glass Filter definition with enhanced frosted-glass refraction */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="glass-specular" x="-30%" y="-30%" width="160%" height="160%">
            {/* Generate sharp emboss bevels using alpha gradient */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="6"
              specularConstant="2.2"
              specularExponent="28"
              lightingColor="#ffffff"
              result="specular1"
            >
              <feDistantLight azimuth="220" elevation="60" />
            </feSpecularLighting>
            <feComposite in="specular1" in2="SourceAlpha" operator="in" result="spec1Out" />
            
            {/* Second lighting angle for high-saturation magenta/purple glass dispersion */}
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant="1.8"
              specularExponent="45"
              lightingColor="#E04BFF"
              result="specular2"
            >
              <feDistantLight azimuth="50" elevation="40" />
            </feSpecularLighting>
            <feComposite in="specular2" in2="SourceAlpha" operator="in" result="spec2Out" />

            {/* Combine the specular highlights with the original text graphic */}
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="spec1Out" />
              <feMergeNode in="spec2Out" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* High-Intensity Bright Background Auras (Neon Bloom Aura) */}
      <div className="absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full bg-gradient-to-tr from-cyber-neon/45 via-cyber-magenta/35 to-amber-500/10 filter blur-[95px] opacity-75 pointer-events-none mix-blend-screen z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[40%] left-[45%] -translate-x-[50%] -translate-y-[50%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-cyan-500/20 filter blur-[110px] opacity-60 pointer-events-none mix-blend-screen z-0" />

      {/* Floating Glass Particles */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm bg-white/35 border border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.45)]"
            style={{
              width: p.size,
              height: p.size,
              transform: `translate(${p.x}px, ${p.y}px)`,
            }}
            animate={{
              y: [p.y - 15, p.y + 15, p.y - 15],
              x: [p.x - 10, p.x + 10, p.x - 10],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="text-center z-10 max-w-4xl flex flex-col items-center">
        {/* Category Label with pristine ultra-frosted design */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2.5 mb-5 px-5 py-1.5 rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(18,10,36,0.68)] text-[10px] font-mono font-medium tracking-[0.25em] text-white uppercase shadow-[0_0_25px_rgba(138,63,252,0.35)] backdrop-blur-xl min-w-[240px] justify-center h-[34px] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex items-center gap-2.5"
            >
              {roles[roleIndex].icon}
              <span className="translate-y-[0.5px] whitespace-nowrap">{roles[roleIndex].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* 
          Main Liquid Glass Title: "Adarsh"
          Crafted with a multi-layered compound layout:
          - Shadow glow (Neon Bloom)
          - Base refractive gradient
          - Edge highlight outline
          - Shimmer sweep reflection
        */}
        <div 
          className="relative select-none mb-6 cursor-pointer flex items-center justify-center min-h-[220px] sm:min-h-[300px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Stunning highly-realistic Gravitational Lensing Black Hole behind name */}
          <BlackHole isHovered={isHovered} />

          {/* Artistic Flowing Glass Ribbons/Paths (Inspired by Image 1) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 800 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ribbon-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 242, 254, 0.12)" />
                <stop offset="35%" stopColor="rgba(138, 63, 252, 0.35)" />
                <stop offset="70%" stopColor="rgba(224, 75, 255, 0.35)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
              </linearGradient>
              <linearGradient id="ribbon-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(224, 75, 255, 0.08)" />
                <stop offset="50%" stopColor="rgba(138, 63, 252, 0.3)" />
                <stop offset="100%" stopColor="rgba(0, 242, 254, 0.25)" />
              </linearGradient>
            </defs>
            {/* Ribbon 1 - Dynamic wavy motion */}
            <motion.path
              d="M -50 150 C 200 50, 250 250, 450 150 C 650 50, 600 250, 850 150"
              fill="none"
              stroke="url(#ribbon-grad-1)"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                d: [
                  "M -50 150 C 200 50, 250 250, 450 150 C 650 50, 600 250, 850 150",
                  "M -50 130 C 180 80, 270 220, 450 170 C 630 120, 620 220, 850 130",
                  "M -50 150 C 200 50, 250 250, 450 150 C 650 50, 600 250, 850 150"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                filter: "drop-shadow(0 0 12px rgba(138, 63, 252, 0.4))",
                opacity: isHovered ? 0.9 : 0.65
              }}
            />
            {/* Highlight Edge line of Ribbon 1 for glassy refraction */}
            <motion.path
              d="M -50 150 C 200 50, 250 250, 450 150 C 650 50, 600 250, 850 150"
              fill="none"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                d: [
                  "M -50 150 C 200 50, 250 250, 450 150 C 650 50, 600 250, 850 150",
                  "M -50 130 C 180 80, 270 220, 450 170 C 630 120, 620 220, 850 130",
                  "M -50 150 C 200 50, 250 250, 450 150 C 650 50, 600 250, 850 150"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                opacity: isHovered ? 0.8 : 0.4,
                mixBlendMode: "overlay"
              }}
            />

            {/* Ribbon 2 - Intersecting wave */}
            <motion.path
              d="M -50 100 C 150 220, 300 80, 450 200 C 600 320, 650 120, 850 100"
              fill="none"
              stroke="url(#ribbon-grad-2)"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                d: [
                  "M -50 100 C 150 220, 300 80, 450 200 C 600 320, 650 120, 850 100",
                  "M -50 120 C 170 180, 280 120, 450 180 C 620 240, 630 160, 850 120",
                  "M -50 100 C 150 220, 300 80, 450 200 C 600 320, 650 120, 850 100"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{
                filter: "drop-shadow(0 0 10px rgba(0, 242, 254, 0.35))",
                opacity: isHovered ? 0.85 : 0.55
              }}
            />
            {/* Highlight Edge line of Ribbon 2 */}
            <motion.path
              d="M -50 100 C 150 220, 300 80, 450 200 C 600 320, 650 120, 850 100"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{
                d: [
                  "M -50 100 C 150 220, 300 80, 450 200 C 600 320, 650 120, 850 100",
                  "M -50 120 C 170 180, 280 120, 450 180 C 620 240, 630 160, 850 120",
                  "M -50 100 C 150 220, 300 80, 450 200 C 600 320, 650 120, 850 100"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{
                opacity: isHovered ? 0.7 : 0.35,
                mixBlendMode: "overlay"
              }}
            />
          </svg>

          {/* 1. Neon Bloom / Back Under-glow (Sleek Ambient Aura) */}
          <motion.h1
            animate={{
              scale: isHovered ? 1.12 : 1,
              opacity: isHovered ? 0.95 : 0.7,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute inset-0 font-glass-script text-[20vw] sm:text-[15rem] leading-[1.1] text-cyber-neon filter blur-[42px] pointer-events-none flex items-center justify-center select-none"
            style={{ textTransform: "none" }}
          >
            twasy
          </motion.h1>

          <motion.h1
            animate={{
              scale: isHovered ? 1.12 : 1,
              opacity: isHovered ? 0.9 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.03 }}
            className="absolute inset-0 font-glass-script text-[20vw] sm:text-[15rem] leading-[1.1] text-cyber-magenta filter blur-[26px] pointer-events-none flex items-center justify-center select-none"
            style={{ textTransform: "none" }}
          >
            twasy
          </motion.h1>

          {/* 2. Base Refractive Layer - Highly Sleek & Transparent Glass (Inspired by Image 1) */}
          <motion.h1
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="font-glass-script text-[20vw] sm:text-[15rem] leading-[1.1] select-none relative z-10 flex items-center justify-center"
            style={{
              color: isHovered ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.12)",
              filter: "url(#glass-specular)",
              WebkitTextStroke: isHovered ? "2px rgba(255, 255, 255, 0.85)" : "1.2px rgba(255, 255, 255, 0.45)",
              textTransform: "none",
              transition: "color 0.3s ease, WebkitTextStroke 0.3s ease",
            }}
          >
            twasy
          </motion.h1>

          {/* 3. Edge-stroked & Specular Cover - Pristine Outer Glass Bezel */}
          <motion.h1
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute inset-0 font-glass-script text-[20vw] sm:text-[15rem] leading-[1.1] pointer-events-none z-20 flex items-center justify-center select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: isHovered ? "3.2px rgba(255, 255, 255, 0.95)" : "2.2px rgba(255, 255, 255, 0.55)",
              textTransform: "none",
              textShadow: isHovered 
                ? "0 0 25px rgba(255, 255, 255, 0.55), 0 0 50px rgba(138, 63, 252, 0.4)" 
                : "0 0 10px rgba(255, 255, 255, 0.2)",
              transition: "WebkitTextStroke 0.3s ease, text-shadow 0.3s ease",
            }}
          >
            twasy
          </motion.h1>

          {/* 4. Clipped Sphere - Highly Refractive Glowing Interior (Inside the Black Hole) */}
          <motion.h1
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute inset-0 font-glass-script text-[20vw] sm:text-[15rem] leading-[1.1] select-none z-30 flex items-center justify-center clipped-sphere pointer-events-none"
            style={{
              color: isHovered ? "rgba(0, 242, 254, 0.5)" : "rgba(0, 242, 254, 0.25)",
              filter: "url(#glass-specular)",
              WebkitTextStroke: isHovered ? "2px #00f2fe" : "1.2px #00f2fe",
              textTransform: "none",
              transition: "color 0.3s ease, WebkitTextStroke 0.3s ease",
            }}
          >
            twasy
          </motion.h1>

          {/* 5. Clipped Sphere - High-Voltage Outer Edge Glow & Aura (Touching/Intersecting the Circle boundary) */}
          <motion.h1
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute inset-0 font-glass-script text-[20vw] sm:text-[15rem] leading-[1.1] pointer-events-none z-30 flex items-center justify-center select-none clipped-sphere"
            style={{
              color: "transparent",
              WebkitTextStroke: isHovered ? "3.2px #e04bff" : "2.2px #e04bff",
              textTransform: "none",
              textShadow: isHovered 
                ? "0 0 25px rgba(224, 75, 255, 0.95), 0 0 50px rgba(0, 242, 254, 0.9)" 
                : "0 0 12px rgba(224, 75, 255, 0.6), 0 0 25px rgba(0, 242, 254, 0.55)",
              transition: "WebkitTextStroke 0.3s ease, text-shadow 0.3s ease",
            }}
          >
            twasy
          </motion.h1>

          {/* 6. Elegant Glass Sparkle Glow (Fires when hovered!) */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.15 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 -bottom-4 h-0.5 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[2px] pointer-events-none"
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg text-gray-300 max-w-lg mb-10 tracking-wide flex items-center justify-center gap-2.5"
        >
          <Code2 className="w-4 h-4 text-cyber-magenta shrink-0" />
          <span>
            coding the mechanics and capturing the{" "}
            <span className="text-white font-semibold">
              narratives.
            </span>
          </span>
        </motion.p>

        {/* Call to Actions (Interactive Glass Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          {/* Primary View Projects Button - Thicker luxury glass finish */}
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative w-full sm:w-auto px-9 py-4.5 rounded-xl font-orbitron font-extrabold text-[10px] tracking-[0.25em] uppercase text-white overflow-hidden transition-all duration-300 border border-[rgba(255,255,255,0.32)] bg-[rgba(22,12,42,0.65)] shadow-[0_15px_35px_rgba(138,63,252,0.25)] hover:shadow-[0_20px_45px_rgba(224,75,255,0.45)] hover:border-[rgba(224,75,255,0.85)] active:scale-95 backdrop-blur-xl"
          >
            {/* Shimmer backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-neon/30 via-cyber-magenta/30 to-cyber-neon/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            
            {/* Gloss Reflection Sweeper */}
            <div className="absolute inset-y-0 w-10 bg-white/25 skew-x-12 -left-16 group-hover:left-[110%] transition-all duration-700 ease-out" />

            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* Secondary Get In Touch Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="group relative w-full sm:w-auto px-9 py-4.5 rounded-xl font-orbitron font-extrabold text-[10px] tracking-[0.25em] uppercase text-gray-300 overflow-hidden transition-all duration-300 border border-[rgba(255,255,255,0.18)] bg-white/5 hover:text-white hover:border-[rgba(138,63,252,0.55)] hover:bg-[rgba(138,63,252,0.12)] hover:shadow-[0_15px_35px_rgba(138,63,252,0.3)] backdrop-blur-xl active:scale-95"
          >
            {/* Diagonal Sweeper */}
            <div className="absolute inset-y-0 w-10 bg-white/15 skew-x-12 -left-16 group-hover:left-[110%] transition-all duration-700 ease-out" />
            
            <span className="relative z-10">Get In Touch</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 cursor-pointer flex flex-col items-center gap-1 group"
        onClick={() => scrollToSection("about")}
      >
        <span className="font-orbitron text-[10px] tracking-[0.3em] text-gray-500 group-hover:text-cyber-magenta transition-colors">
          SCROLL_DOWN
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-cyber-neon group-hover:text-cyber-magenta transition-colors shadow-glow-purple" />
        </motion.div>
      </motion.div>
    </section>
  );
}
