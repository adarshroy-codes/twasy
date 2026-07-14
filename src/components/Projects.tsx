import React from "react";
import { motion } from "motion/react";
import { Gamepad, Play, ExternalLink, Cpu, GitBranch, Sparkles } from "lucide-react";

interface Project {
  id: string;
  title: string;
  engine: string;
  genre: string;
  description: string;
  techHighlights: string[];
  gradient: string;
  artSVG: React.ReactNode;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: "neon-synapse",
      title: "NEON SYNAPSE",
      engine: "Unreal Engine 5",
      genre: "Cyberpunk Action RPG",
      description: "A fast-paced neon RPG. Developed a custom state machine logic for physical sword combat, fluid sensory graphs for responsive crowd-AI, and optimized GPU spatial grids to handle over 100 on-screen cyborg combatants at stable 120 FPS.",
      techHighlights: ["AI Sensory Mapping", "Low-level State Buffer", "GPU Particle Solver"],
      gradient: "from-cyber-neon to-cyber-magenta",
      artSVG: (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#0c0714" />
          {/* Cyberpunk grid lines receding */}
          <path d="M 0,240 L 150,120 M 400,240 L 250,120 M 200,120 L 200,240" stroke="rgba(138, 63, 252, 0.2)" strokeWidth="1.5" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(138, 63, 252, 0.15)" strokeWidth="1" />
          <line x1="0" y1="160" x2="400" y2="160" stroke="rgba(138, 63, 252, 0.1)" strokeWidth="0.8" />
          
          {/* Glowing cyberpunk towers / server nodes */}
          <rect x="80" y="80" width="30" height="120" fill="rgba(20, 8, 31, 0.8)" stroke="rgba(224, 75, 255, 0.4)" strokeWidth="1.5" />
          <rect x="290" y="60" width="40" height="140" fill="rgba(20, 8, 31, 0.8)" stroke="rgba(138, 63, 252, 0.4)" strokeWidth="1.5" />
          
          {/* Core HUD rings */}
          <circle cx="200" cy="110" r="45" stroke="rgba(224, 75, 255, 0.3)" strokeWidth="1.5" strokeDasharray="10 15" className="animate-spin" style={{ transformOrigin: '200px 110px', animationDuration: '30s' }} />
          <circle cx="200" cy="110" r="30" stroke="rgba(138, 63, 252, 0.4)" strokeWidth="2" strokeDasharray="5 5" />
          
          {/* Neon wireframes crossing */}
          <path d="M 100,210 L 160,150 L 240,150 L 300,90" stroke="#E04BFF" strokeWidth="2" className="glow-magenta" />
          <path d="M 60,130 L 120,70 L 280,70" stroke="#8A3FFC" strokeWidth="1.5" className="glow-purple" />
          
          {/* Glowing node coordinates */}
          <circle cx="160" cy="150" r="4" fill="#ffffff" className="animate-pulse" />
          <circle cx="240" cy="150" r="4" fill="#E04BFF" />
          <circle cx="120" cy="70" r="3" fill="#8A3FFC" />

          {/* Abstract blade vectors representing combat */}
          <path d="M 185,130 L 215,90" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M 215,130 L 185,90" stroke="rgba(224, 75, 255, 0.7)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "void-walker",
      title: "VOID WALKER",
      engine: "Unity Engine (C# ECS)",
      genre: "Sci-Fi Space Sandbox Sim",
      description: "A cosmic space flight simulation. Crafted a multi-threaded Newtonian physics solver, a deterministic n-body gravity simulator, and a highly optimized chunked asteroid generation pipeline streaming thousands of fully destructible objects in real-time.",
      techHighlights: ["Custom C# Job System", "Deterministic Orbital Math", "Octree Volumetric Mesh"],
      gradient: "from-blue-600 to-cyber-neon",
      artSVG: (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#070712" />
          {/* Deep cosmos stars */}
          <circle cx="45" cy="50" r="1" fill="#fff" opacity="0.8" />
          <circle cx="120" cy="180" r="1" fill="#fff" opacity="0.6" />
          <circle cx="340" cy="70" r="1.5" fill="#E04BFF" opacity="0.7" className="animate-pulse" />
          <circle cx="280" cy="190" r="1" fill="#fff" opacity="0.5" />
          
          {/* Glowing singularity/black hole in center */}
          <circle cx="200" cy="120" r="55" fill="rgba(13, 6, 20, 0.9)" />
          <circle cx="200" cy="120" r="45" stroke="rgba(138, 63, 252, 0.4)" strokeWidth="4" />
          {/* Accretion disk rings in perspective */}
          <ellipse cx="200" cy="120" rx="90" ry="22" stroke="url(#acc-grad)" strokeWidth="3" className="glow-purple" transform="rotate(-15, 200, 120)" />
          <ellipse cx="200" cy="120" rx="110" ry="10" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeDasharray="10 10" transform="rotate(-15, 200, 120)" />
          
          {/* Vector geometric spaceship cruising */}
          <path d="M 120,80 L 145,85 L 125,95 L 115,92 Z" fill="rgba(255,255,255,0.05)" stroke="#fff" strokeWidth="1.2" />
          {/* Engine flame trail */}
          <path d="M 115,92 L 95,96 L 118,90" stroke="#8A3FFC" strokeWidth="1.5" />
          
          {/* Coordinate system HUD line */}
          <line x1="20" y1="20" x2="80" y2="20" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          <line x1="20" y1="20" x2="20" y2="60" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
          <text x="25" y="15" fill="rgba(255, 255, 255, 0.4)" fontFamily="monospace" fontSize="8">SYS_NAV: LOCK</text>

          <defs>
            <linearGradient id="acc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(224, 75, 255, 0)" />
              <stop offset="30%" stopColor="#8A3FFC" />
              <stop offset="70%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="rgba(138, 63, 252, 0)" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: "kinetic-shift",
      title: "KINETIC SHIFT",
      engine: "Godot 4 Engine (C++)",
      genre: "Anti-Gravity Sci-Fi Racer",
      description: "A blistering-speed racing game. Built custom rigid-body raycast hover physics, bespoke aerodynamic lift computations, and tailored HLSL vertex displacement shaders producing speed motion-warps and sonic boom screen distortions dynamically.",
      techHighlights: ["Raycast Hover Solver", "Custom HLSL Shaders", "Bespoke Aerodynamics"],
      gradient: "from-cyber-magenta to-amber-500",
      artSVG: (
        <svg className="w-full h-full" viewBox="0 0 400 240" fill="none">
          <rect width="400" height="240" fill="#0d040e" />
          
          {/* Receding tunnel/track boundaries (extreme dynamic lines) */}
          <path d="M 0,220 L 170,120 L 230,120 L 400,220" fill="rgba(138, 63, 252, 0.05)" stroke="rgba(224, 75, 255, 0.2)" strokeWidth="1.5" />
          <path d="M 50,240 L 180,120 L 220,120 L 350,240" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          
          {/* Speedy motion vertical streaks */}
          <line x1="100" y1="0" x2="80" y2="240" stroke="rgba(224, 75, 255, 0.1)" strokeWidth="2" strokeDasharray="30 40" />
          <line x1="300" y1="0" x2="320" y2="240" stroke="rgba(138, 63, 252, 0.1)" strokeWidth="2" strokeDasharray="50 30" />
          
          {/* Laser-guided neon track fences */}
          <path d="M 0,180 L 175,122" stroke="#E04BFF" strokeWidth="2" className="glow-magenta" />
          <path d="M 400,180 L 225,122" stroke="#8A3FFC" strokeWidth="2" className="glow-purple" />
          
          {/* Anti-grav racing craft zooming away */}
          <path d="M 185,160 L 200,145 L 215,160 L 200,157 Z" fill="rgba(20, 8, 31, 0.9)" stroke="#fff" strokeWidth="1.5" />
          
          {/* Giant propulsion blast circles */}
          <ellipse cx="200" cy="165" rx="18" ry="5" stroke="#E04BFF" strokeWidth="1.5" opacity="0.8" className="animate-pulse" />
          <ellipse cx="200" cy="170" rx="30" ry="8" stroke="#8A3FFC" strokeWidth="1" opacity="0.5" />
          
          {/* High speed telemetry reading */}
          <text x="310" y="35" fill="#E04BFF" fontFamily="monospace" fontSize="9" fontWeight="bold" className="glow-magenta">843 KM/H</text>
          <text x="310" y="47" fill="rgba(255, 255, 255, 0.4)" fontFamily="monospace" fontSize="7">OVERDRIVE: ON</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-cyber-magenta" />
          <span className="font-mono text-xs text-cyber-magenta uppercase tracking-widest">
            SIMULATED_ENGINES_02
          </span>
        </div>
        <h2 className="heading-cyber text-3xl sm:text-4xl text-white font-black tracking-wider">
          FEATURED <span className="bg-gradient-to-r from-cyber-magenta to-cyber-neon bg-clip-text text-transparent">PROJECTS</span>
        </h2>
      </div>

      {/* Grid of 3 Premium Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="group relative rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cyber-magenta/40 hover:shadow-[0_15px_45px_rgba(138,63,252,0.15)] transition-all duration-500 hover:-translate-y-2 h-[560px]"
          >
            {/* The Game Artwork SVG Container */}
            <div className="relative h-48 overflow-hidden border-b border-white/10">
              {/* Image artwork */}
              <div className="w-full h-full transition-transform duration-700 group-hover:scale-110 ease-out">
                {project.artSVG}
              </div>

              {/* Engine Badge Overlay */}
              <div className="absolute top-4 left-4 font-mono text-[10px] uppercase font-bold tracking-widest text-white px-2.5 py-1 bg-cyber-black/70 rounded border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                <Cpu className="w-3.5 h-3.5 text-cyber-magenta" />
                {project.engine}
              </div>

              {/* Genre Overlay on bottom */}
              <div className="absolute bottom-3 left-4 font-orbitron text-[9px] uppercase tracking-[0.15em] font-medium text-cyber-neon px-2 py-0.5 bg-[rgba(13,6,20,0.85)] rounded-full border border-cyber-neon/30 backdrop-blur-sm">
                {project.genre}
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Title and stats */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-orbitron font-extrabold text-lg sm:text-xl text-white tracking-wider group-hover:text-cyber-magenta transition-colors">
                    {project.title}
                  </h3>
                  <Sparkles className="w-4 h-4 text-cyber-neon group-hover:animate-bounce" />
                </div>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 min-h-[90px]">
                  {project.description}
                </p>
              </div>

              {/* Tech Highlights / Badges */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techHighlights.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] font-semibold text-gray-300 px-2 py-1 rounded bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Action items inside card */}
                <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <button className="flex-1 px-4 py-2.5 rounded-lg bg-cyber-neon/10 hover:bg-cyber-neon border border-cyber-neon/30 hover:border-cyber-neon text-[11px] font-orbitron font-bold tracking-widest uppercase text-white flex items-center justify-center gap-2 transition-all duration-300 active:scale-95">
                    <Gamepad className="w-3.5 h-3.5" />
                    PLAY_BUILD
                  </button>
                  <button className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all duration-300 active:scale-95" title="View Source">
                    <GitBranch className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Top glass reflection highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
