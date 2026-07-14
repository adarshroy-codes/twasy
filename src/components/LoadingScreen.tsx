import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth, high-precision loading progress
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Artistic speed curve: starts fast, slows down at the end to build anticipation, then launches
      const remaining = 100 - currentProgress;
      const increment = Math.max(0.18, Math.min(3.8, remaining * (Math.random() * 0.08 + 0.01)));
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800); // Elegant hold for visual transition
      } else {
        setProgress(currentProgress);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Subtle background starfield & grid of cosmic coordinates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Fine, sparse stars
    const starCount = 55;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.1 + 0.3,
      opacity: Math.random() * 0.45 + 0.1,
      speed: Math.random() * 0.04 + 0.015,
    }));

    let animId: number;
    const render = () => {
      ctx.fillStyle = "#030206"; // Deep, infinite dark canvas
      ctx.fillRect(0, 0, width, height);

      // 1. Draw ultra-faint coordinate gridlines (fine art architectural feel)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 0.5;
      const gridSize = 140;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render and slowly drift sparse stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden bg-[#030206] flex flex-col items-center justify-between py-16 px-8 select-none">
      {/* Background Deep Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* TOP SYSTEM METRICS - Minimalistic text line */}
      <div className="w-full max-w-6xl flex justify-between items-center z-10 font-mono text-[9px] text-gray-500 uppercase tracking-[0.4em] pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-neon/80" />
          <span>PORTFOLIO_SYSTEM_ONLINE</span>
        </div>
        <div>
          <span>SECTOR_0x7F2B</span>
        </div>
      </div>

      {/* CENTER INTERACTIVE HUD: Artistic, minimal, hyper-focused */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10 w-full max-w-md">
        
        {/* Artistic Compass / Celestial Gyroscope Graphic */}
        <div className="relative w-44 h-44 mb-10 flex items-center justify-center">
          
          {/* Subtle Outer Rotating Celestial Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/[0.04] flex items-center justify-center"
          >
            {/* Fine tick marks on the outer ring */}
            <div className="absolute top-0 w-0.5 h-2 bg-white/20" />
            <div className="absolute bottom-0 w-0.5 h-2 bg-white/20" />
            <div className="absolute left-0 w-2 h-0.5 bg-white/20" />
            <div className="absolute right-0 w-2 h-0.5 bg-white/20" />
          </motion.div>

          {/* Innermost fast, delicate ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-dashed border-cyber-neon/15 flex items-center justify-center"
          />

          {/* Smooth, pulsating glass-like core singularity */}
          <motion.div
            animate={{
              scale: [0.96, 1.04, 0.96],
              opacity: [0.6, 0.95, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyber-purple/40 to-cyber-neon/50 blur-[2px] shadow-[0_0_20px_rgba(0,242,254,0.35)] flex items-center justify-center"
          >
            {/* Tiny sharp white point inside the singularity */}
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          </motion.div>

          {/* Sharp diagonal hair-crosshairs representing space telescope calibration */}
          <div className="absolute inset-6 pointer-events-none">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[0.5px] bg-white/5" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[0.5px] bg-white/5" />
          </div>
        </div>

        {/* LOADING PROGRESS PERCENTAGE TEXT - Elegant spacing */}
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] tracking-[0.5em] text-gray-400 uppercase"
          >
            INITIALIZING CORE
          </motion.div>
          <div className="font-mono text-3xl font-light text-white tracking-[0.2em] flex items-center justify-center pl-[0.2em]">
            <span>{String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}</span>
            <span className="text-cyber-neon text-lg ml-1 font-normal">%</span>
          </div>
        </div>

        {/* LOADING PROGRESS BAR: Ultra-sleek, razor thin 1px bar */}
        <div className="w-48 mt-6">
          <div className="relative h-[1px] w-full bg-white/[0.08] overflow-hidden">
            {/* Glowing progress filling gradient bar */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyber-neon via-cyber-magenta to-white shadow-[0_0_8px_rgba(0,242,254,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM COORDINATE FEED - Sharp & static cosmic info */}
      <div className="w-full max-w-6xl flex justify-between items-center z-10 font-mono text-[9px] text-gray-500 uppercase tracking-[0.3em] pointer-events-none">
        <div>
          <span>REFRACTIVE_CORE: ACTIVE</span>
        </div>
        <div className="text-right">
          <span>COORDINATES // 45.109 - 99.852</span>
        </div>
      </div>
    </div>
  );
}
