import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { Cpu, CheckCircle2, ShieldCheck } from "lucide-react";
import GlitchText from "./GlitchText";
import TiltWrapper from "./TiltWrapper";

interface Skill {
  name: string;
  category: "Engine" | "Language" | "Tooling";
  percent: number;
  level: string;
  icon: React.ReactNode;
  color: string; // Tailwind color classes for glow
}

function SkillCard({ skill }: { skill: Skill; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth, high-fidelity tilt springs
  const rotateX = useSpring(0, { stiffness: 90, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 90, damping: 18 });

  // Soft scales and glowing shadows on hover
  const scale = useSpring(1.0, { stiffness: 100, damping: 15 });

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoords({ x, y });

    const width = rect.width;
    const height = rect.height;
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;
    
    // Smoothly set rotation values
    rotateX.set(normY * -12); // subtle up/down tilt
    rotateY.set(normX * 12);  // subtle left/right tilt
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1.0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="relative flex flex-col gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500 overflow-hidden group cursor-default"
    >
      {/* 1. Dynamic localized spotlight glow following mouse pointer */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(140px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />
      
      {/* 2. Soft background color-themed glow depending on the skill category */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none filter blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.12) 0%, transparent 70%)"
        }}
      />

      {/* Title Details (Popped 3D forward) */}
      <div className="flex justify-between items-center relative z-10" style={{ transform: "translateZ(15px)" }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300">
            {skill.icon}
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron text-sm font-bold text-white tracking-wider">
              {skill.name}
            </span>
            <span className="font-mono text-[9px] text-gray-500 uppercase">
              {skill.category}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-gray-400">
            {skill.level}
          </span>
          <span className="font-orbitron text-xs font-black text-white">
            {skill.percent}%
          </span>
        </div>
      </div>

      {/* Progress slider bar track (Popped 3D forward slightly less) */}
      <div className="w-full h-2 bg-cyber-black/80 rounded-full border border-white/5 overflow-hidden relative z-10" style={{ transform: "translateZ(8px)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
        >
          {/* Glowing end pin marker */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[1px]" />
          {/* Subtle overlay sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const skills: Skill[] = [
    {
      name: "Unreal Engine",
      category: "Engine",
      percent: 92,
      level: "Master",
      color: "from-zinc-300 via-white to-zinc-500",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* U Logo Shield */}
          <circle cx="12" cy="12" r="10" stroke="currentColor" />
          <path d="M 8,8 L 8,13 C 8,16 11,17 12,17 C 13,17 16,16 16,13 L 16,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 6,12 L 8,12 M 16,12 L 18,12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "Unity",
      category: "Engine",
      percent: 95,
      level: "Expert",
      color: "from-zinc-400 via-white to-neutral-500",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Isometric coordinate axis box */}
          <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" />
          <path d="M12 12L20 7M12 12L4 7M12 12V22" stroke="currentColor" />
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: "Godot Engine",
      category: "Engine",
      percent: 85,
      level: "Advanced",
      color: "from-slate-400 via-white to-slate-600",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Godot Mascot robot gear */}
          <circle cx="7.5" cy="11.5" r="2" fill="currentColor" />
          <circle cx="16.5" cy="11.5" r="2" fill="currentColor" />
          <path d="M 4,9 C 4,6 8,4 12,4 C 16,4 20,6 20,9 L 20,13 C 20,16 16,18 12,18 C 8,18 4,16 4,13 Z" stroke="currentColor" />
          <path d="M 12,14 C 10,14 9,15 9,16 M 12,14 C 14,14 15,15 15,16" stroke="currentColor" strokeLinecap="round" />
          <path d="M 6,4 L 4,2 M 18,4 L 20,2" stroke="currentColor" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Blender 3D",
      category: "Tooling",
      percent: 80,
      level: "Advanced",
      color: "from-neutral-300 via-zinc-200 to-neutral-500",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Blender orbital rings and hub */}
          <circle cx="12" cy="12" r="4" stroke="currentColor" />
          <path d="M 12,8 C 16,8 19,10 19,12 C 19,14 16,16 12,16" stroke="currentColor" />
          <path d="M 12,12 L 19,5 M 12,12 L 21,9 M 12,12 L 18,16" stroke="currentColor" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "C Programming",
      category: "Language",
      percent: 88,
      level: "Advanced",
      color: "from-zinc-400 via-white to-slate-400",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L4 5V11C4 16.5 12 22 12 22C12 22 20 16.5 20 11V5L12 2Z" stroke="currentColor" />
          <text x="9" y="14" fill="currentColor" fontFamily="monospace" fontSize="9" fontWeight="bold">C</text>
        </svg>
      ),
    },
    {
      name: "Java Language",
      category: "Language",
      percent: 82,
      level: "Advanced",
      color: "from-slate-300 via-zinc-100 to-zinc-500",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Coffee cup */}
          <path d="M 6,8 L 16,8 L 15,16 C 15,18 13,19 11,19 L 9,19 C 7,19 6,18 6,16 Z" stroke="currentColor" />
          <path d="M 16,10 C 18,10 19,11 19,12 C 19,13 18,14 16,14" stroke="currentColor" />
          <path d="M 9,5 C 9,3 10,3 10,2 M 13,5 C 13,3 14,3 14,2" stroke="currentColor" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Video Editing",
      category: "Tooling",
      percent: 86,
      level: "Expert",
      color: "from-neutral-400 via-white to-zinc-300",
      icon: (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="12" r="2" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative min-h-screen py-24 px-4 z-10 max-w-5xl mx-auto flex flex-col justify-center"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-cyber-neon" />
          <span className="font-mono text-xs text-cyber-neon uppercase tracking-widest">
            ENGINE_SKILLSETS_03
          </span>
        </div>
        <h2 className="heading-cyber text-3xl sm:text-4xl text-white font-black tracking-wider">
          <GlitchText>CORE</GlitchText> <span className="bg-gradient-to-r from-cyber-neon to-cyber-magenta bg-clip-text text-transparent"><GlitchText delay={150}>COMPETENCIES</GlitchText></span>
        </h2>
      </motion.div>

      {/* Glass Container */}
      <TiltWrapper className="w-full" maxTilt={3}>
        <motion.div
          variants={itemVariants}
          className="w-full rounded-3xl glass-panel p-8 sm:p-12 relative overflow-hidden h-full"
        >
          {/* Subtle decorative grid in bento container background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
            {/* Left Column: Summary and architectural labels */}
            <div className="md:col-span-4 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-cyber-magenta uppercase tracking-widest flex items-center gap-1">
                  <Cpu className="w-4 h-4" /> TECH_STACK_MATRIX
                </span>
                <h3 className="font-orbitron font-extrabold text-2xl text-white tracking-wide">
                  Engine & Language Core
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A professional developer portfolio is measured by real systems orchestration capability. My pipeline proficiency spans multi-threaded execution, spatial partitioning, C & Java memory models, and graphics buffers.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-[rgba(255,255,255,0.08)] pt-6">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-zinc-300" /> C & Java Memory & GC optimization
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-zinc-300" /> HLSL & GLSL Shader Authoring
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-zinc-300" /> Lock-free Job Queues
                </div>
              </div>
            </div>

            {/* Right Column: Interactive progress bar skills list */}
            <div className="md:col-span-8 flex flex-col gap-4.5">
              {skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          {/* Outer glowing frame accents */}
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-cyber-magenta to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-cyber-neon to-transparent" />
        </motion.div>
      </TiltWrapper>
    </motion.section>
  );
}
