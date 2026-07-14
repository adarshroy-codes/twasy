import { useState } from "react";
import { motion } from "motion/react";
import { Award, Layers, ShieldCheck, Flame } from "lucide-react";

export default function About() {
  const [imageError, setImageError] = useState(false);
  const stats = [
    {
      id: "projects",
      title: "Projects",
      value: "24+",
      sub: "Worlds Created",
      color: "rgba(138, 63, 252, 0.4)",
      border: "border-cyber-neon/30",
      icon: <Layers className="w-5 h-5 text-cyber-neon" />,
    },
    {
      id: "experience",
      title: "Experience",
      value: "6+ Yrs",
      sub: "Gameplay Systems",
      color: "rgba(224, 75, 255, 0.4)",
      border: "border-cyber-magenta/30",
      icon: <Award className="w-5 h-5 text-cyber-magenta" />,
    },
    {
      id: "passion",
      title: "Passion",
      value: "100%",
      sub: "Engine Optimized",
      color: "rgba(255, 255, 255, 0.3)",
      border: "border-white/20",
      icon: <Flame className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section id="about" className="relative min-h-screen py-24 px-4 flex flex-col justify-center z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-cyber-neon" />
          <span className="font-mono text-xs text-cyber-neon uppercase tracking-widest">
            COGNITIVE_PROFILE_01
          </span>
        </div>
        <h2 className="heading-cyber text-3xl sm:text-4xl text-white font-black tracking-wider flex items-center gap-3">
          ABOUT <span className="bg-gradient-to-r from-cyber-neon to-cyber-magenta bg-clip-text text-transparent">ME</span>
        </h2>
      </div>

      {/* Main Glass Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Bio card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 glass-panel p-8 sm:p-10 flex flex-col gap-6 relative overflow-hidden group"
        >
          {/* Subtle light sheen on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />

          {/* Subheader readout */}
          <div className="flex items-center justify-between border-b border-[rgba(138,63,252,0.15)] pb-4">
            <span className="font-mono text-xs text-gray-500">ID: SYSTEM_ARCHITECT // ROOT</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          <h3 className="font-orbitron font-bold text-xl text-white tracking-wide">
            Gameplay Systems Engineer & Worldsmith
          </h3>

          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            I am Twasy, a senior gameplay developer specializing in low-level game engine mechanics, fluid controls, AI sensory graphs, and state synchronization. My approach fuses rigorous math with cinematic artistry to design games that feel highly tactile, polished, and responsive.
          </p>

          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Whether weaving complex animation state-machines in custom C++ setups, developing bespoke physics plugins in Unity, or programming spatial queries inside Unreal Engine, I optimize for the absolute limits of hardware throughput. Let's engineer the next generation of play.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-[rgba(138,63,252,0.15)]">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyber-magenta shrink-0 mt-0.5" />
              <div>
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Low Latency</h4>
                <p className="text-xs text-gray-400">Zero-allocation state systems</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyber-neon shrink-0 mt-0.5" />
              <div>
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Multi-Platform</h4>
                <p className="text-xs text-gray-400">Optimized PC, Console & Web</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: Liquid Glass Orb Profile Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center items-center py-6"
        >
          {/* Glass Orb container with physical layered shadows */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center">
            {/* Ambient Back Glow - Amplified for beautiful aura look */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyber-purple/50 via-cyber-neon/40 to-cyber-magenta/30 blur-[40px] opacity-80 animate-pulse-slow" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyber-neon/30 via-cyber-purple/20 to-white/10 blur-[20px] opacity-90" />

            {/* Glowing Ring Aura (Solid thin outer neon ring) */}
            <div className="absolute -inset-1.5 rounded-full border border-cyber-neon/40 shadow-[0_0_20px_rgba(0,242,254,0.35)] animate-pulse-slow pointer-events-none" />

            {/* Moving refraction helper circles */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-4 rounded-full border border-dashed border-cyber-neon/35 opacity-70 pointer-events-none"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1.05, 0.95, 1.05],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-6 rounded-full border border-dotted border-cyber-magenta/25 opacity-50 pointer-events-none"
            />

            {/* Liquid Glass Orb */}
            <div
              className="absolute inset-0 rounded-full border-2 border-white/40 bg-gradient-to-tr from-cyber-purple/40 via-white/5 to-white/20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85),_inset_0_4px_8px_rgba(255,255,255,0.55),_inset_0_-12px_40px_rgba(138,63,252,0.35),_0_0_30px_rgba(138,63,252,0.25)] overflow-hidden flex items-center justify-center group"
            >
              {/* Inner diagonal sweeping sheen */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 pointer-events-none" />

              {/* The "Profile Image" (Local image with high-fidelity vector illustration fallback) */}
              {!imageError ? (
                <img
                  src="https://collective-blue-zlmyd4uz.edgeone.dev/global__000054e2ea70026d_0000015f_2_000054e2ea70026d_0000000000000001__53b75be840766053_000002114a3018bc_000656907285899f.jpg"
                  alt="Owner Profile"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : (
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full p-2 drop-shadow-[0_0_15px_rgba(138,63,252,0.45)] group-hover:scale-105 transition-transform duration-700 ease-out"
                  fill="none"
                >
                  {/* Cyber HUD elements and grid */}
                  <circle cx="50" cy="50" r="45" stroke="rgba(138, 63, 252, 0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="40" stroke="rgba(224, 75, 255, 0.15)" strokeWidth="0.5" />
                  
                  {/* Ambient Backlight Glow */}
                  <circle cx="50" cy="45" r="28" fill="url(#avatar-glow)" opacity="0.35" />

                  {/* Cyber Track Lines */}
                  <path d="M 15,50 L 30,50 L 35,45 M 85,50 L 70,50 L 65,55" stroke="rgba(224, 75, 255, 0.25)" strokeWidth="0.75" strokeDasharray="3 3" />

                  {/* Shoulder/Jacket Body */}
                  <path
                    d="M 22,82 C 22,70 30,62 40,60 L 45,63 L 50,65 L 55,63 L 60,60 C 70,62 78,70 78,82"
                    fill="#121118"
                    stroke="url(#jacket-glow)"
                    strokeWidth="1.5"
                  />
                  
                  {/* Inner Shirt (Deep Purple/Magenta under jacket) */}
                  <path d="M 43,62 L 50,72 L 57,62 C 54,64 46,64 43,62 Z" fill="#4a154b" opacity="0.8" />
                  <path d="M 43,62 L 50,72 L 57,62" stroke="rgba(224, 75, 255, 0.4)" strokeWidth="0.75" />

                  {/* Zipper details */}
                  <line x1="50" y1="72" x2="50" y2="85" stroke="#444" strokeWidth="1" />
                  <path d="M 48,71 L 52,71 L 50,75 Z" fill="#999" />
                  {/* Circular zipper ring matching their jacket */}
                  <circle cx="50" cy="78" r="2.5" stroke="url(#ring-glow)" strokeWidth="1.2" fill="#121118" />

                  {/* Face & Head */}
                  {/* Neck */}
                  <rect x="44" y="50" width="12" height="15" rx="2" fill="#8d5b4c" />
                  <path d="M 44,57 C 47,61 53,61 56,57" fill="#724437" opacity="0.4" />
                  
                  {/* Head shape - South Asian warm tan skin tone */}
                  <path d="M 36,40 C 36,28 42,24 50,24 C 58,24 64,28 64,40 C 64,48 58,54 50,54 C 42,54 36,48 36,40 Z" fill="#a06a58" />
                  
                  {/* Ears */}
                  <circle cx="35.5" cy="39" r="3.5" fill="#8d5b4c" />
                  <circle cx="64.5" cy="39" r="3.5" fill="#8d5b4c" />

                  {/* Facial Features (Nose, Mouth, Eyes) */}
                  {/* Eyes */}
                  <ellipse cx="43" cy="37" rx="2" ry="1.2" fill="#fff" />
                  <circle cx="43" cy="37" r="1" fill="#1c110c" />
                  <ellipse cx="57" cy="37" rx="2" ry="1.2" fill="#fff" />
                  <circle cx="57" cy="37" r="1" fill="#1c110c" />
                  
                  {/* Eyebrows */}
                  <path d="M 40,33 C 42,32 45,33 46,34" stroke="#1c110c" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 60,33 C 58,32 55,33 54,34" stroke="#1c110c" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Glasses (Modern rectangular matching their frames) */}
                  <rect x="38" y="33" width="10" height="8" rx="1.5" stroke="#111115" strokeWidth="1.5" fill="rgba(138, 63, 252, 0.15)" />
                  <rect x="52" y="33" width="10" height="8" rx="1.5" stroke="#111115" strokeWidth="1.5" fill="rgba(138, 63, 252, 0.15)" />
                  <line x1="48" y1="36" x2="52" y2="36" stroke="#111115" strokeWidth="1.5" />
                  {/* Glass reflection sheen */}
                  <line x1="39" y1="39" x2="43" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
                  <line x1="53" y1="39" x2="57" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />

                  {/* Nose & Mouth */}
                  <path d="M 49,41 L 50,44 L 51,41" stroke="#724437" strokeWidth="1" strokeLinecap="round" />
                  {/* Soft subtle mustache matching their photo */}
                  <path d="M 46,47 C 48,46.5 52,46.5 54,47" stroke="#22110c" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                  {/* Mouth */}
                  <path d="M 46,49.5 C 48,51 52,51 54,49.5" stroke="#724437" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Black Curly/Wavy Hair */}
                  <path d="M 34,42 C 32,38 32,32 35,28 C 38,24 42,21 47,21 C 53,21 58,22 62,26 C 66,30 68,36 66,42 C 65,45 62,45 61,42 C 60,37 57,32 50,32 C 43,32 40,37 39,42 C 38,45 35,45 34,42 Z" fill="#14121a" />
                  
                  {/* Detailed curly strands/bumps overlapping the head */}
                  <circle cx="37" cy="27" r="4.5" fill="#14121a" />
                  <circle cx="42" cy="23" r="5" fill="#14121a" />
                  <circle cx="49" cy="21" r="5.5" fill="#14121a" />
                  <circle cx="56" cy="22" r="5" fill="#14121a" />
                  <circle cx="61" cy="26" r="4.5" fill="#14121a" />
                  <circle cx="64" cy="32" r="4" fill="#14121a" />
                  
                  {/* Forehead curls/fringe overlapping the forehead nicely */}
                  <path d="M 38,28 C 40,29 42,28 43,30 C 45,31 44,33 46,31 C 48,29 49,31 51,29 C 53,30 54,32 56,29 C 58,31 60,29 62,31" stroke="#14121a" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="41" cy="29" r="2.5" fill="#14121a" />
                  <circle cx="46" cy="30" r="2.5" fill="#14121a" />
                  <circle cx="52" cy="29" r="3" fill="#14121a" />
                  <circle cx="58" cy="30" r="2.5" fill="#14121a" />

                  {/* Linear Gradients definitions */}
                  <defs>
                    <radialGradient id="avatar-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8A3FFC" />
                      <stop offset="100%" stopColor="#E04BFF" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="jacket-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8A3FFC" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#121118" />
                      <stop offset="100%" stopColor="#E04BFF" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="ring-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E04BFF" />
                      <stop offset="100%" stopColor="#8A3FFC" />
                    </linearGradient>
                  </defs>
                </svg>
              )}

              {/* Futuristic overlay cyber gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/30 to-transparent mix-blend-color-dodge opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(5,1,20,0.5)_100%)] pointer-events-none" />

              {/* Top reflection highlight layer (gives physical crystal depth) */}
              <div className="absolute top-2 left-6 right-6 h-12 rounded-full bg-gradient-to-b from-white/25 to-transparent filter blur-[1px] pointer-events-none z-10" />
              <div className="absolute bottom-2 left-10 right-10 h-6 rounded-full bg-gradient-to-t from-cyber-neon/15 to-transparent filter blur-[2px] pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Three Glowing Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className={`glass-panel glass-panel-hover p-6 flex flex-col gap-3 relative overflow-hidden group border-b-2 border-b-transparent hover:border-b-cyber-magenta/40`}
          >
            {/* Colored spot light in card corner */}
            <div
              className="absolute -right-4 -top-4 w-12 h-12 rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: stat.color.replace("0.4", "1") }}
            />

            <div className="flex items-center justify-between">
              <span className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-widest">
                {stat.title}
              </span>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyber-neon/30 transition-colors">
                {stat.icon}
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <span className="font-orbitron font-extrabold text-3xl text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-gray-400 font-sans tracking-wide mt-1">
                {stat.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
