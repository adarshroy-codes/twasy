import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  // High-performance smooth animation loop (60 FPS feel, finishes in ~900ms)
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 950; // Fast loading duration (950ms)

    const animateProgress = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      // Smooth cubic-bezier-like easing curve for progression feel
      const t = currentProgress / 100;
      const easedProgress = 100 * (t * t * (3 - 2 * t)); 

      setProgress(Math.min(easedProgress, 100));

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 180); // Very fast, snappy, buttery hand-off to the main page
      }
    };

    const animFrameId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animFrameId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.02,
        filter: "blur(15px)",
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[1000] overflow-hidden bg-[#030108] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Background soft ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-magenta/5 blur-[120px] pointer-events-none" />

      {/* Main glassmorphic container */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm rounded-2xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden"
      >
        {/* Diagonal high-end glass glare effect (Liquid Glass sweep) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: ["-100%", "200%"], y: ["-100%", "200%"] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
            className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent rotate-12"
          />
        </div>

        {/* Top glossy edge accent line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center">
          {/* Glowing loader orb core with spinning orbits */}
          <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
            
            {/* Spinning clean gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/10"
            />

            {/* Glowing cyan/magenta active speed ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-cyber-neon/40 border-r-cyber-magenta/40"
            />

            {/* Pulsating refractive singularity glass ball */}
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyber-magenta/20 to-cyber-neon/30 p-[1px] flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.15)]"
            >
              <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white/90 animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Clean minimal indicator text */}
          <div className="space-y-1 text-center w-full">
            <div className="font-sans font-semibold text-[10px] tracking-[0.25em] text-gray-400 uppercase">
              Initializing Experience
            </div>
            
            {/* Smooth numeric ticker */}
            <div className="font-mono text-3xl font-light text-white tracking-[0.1em] flex items-center justify-center pl-[0.1em]">
              <span className="font-sans font-extralight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}
              </span>
              <span className="text-cyber-neon text-sm ml-0.5 font-normal">%</span>
            </div>
          </div>

          {/* Sleek razor-thin loading progress track */}
          <div className="w-full mt-7">
            <div className="relative h-[1.5px] w-full bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyber-neon via-cyber-magenta to-white transition-all duration-[16ms] ease-out shadow-[0_0_10px_rgba(0,242,254,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Dynamic boot logging text */}
          <div className="mt-5 flex items-center gap-1.5 text-gray-500 font-mono text-[8px] uppercase tracking-wider">
            <Terminal className="w-3 h-3 text-cyber-magenta/80" />
            <span>SYS_READY_0x7F // PORT:3000</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
