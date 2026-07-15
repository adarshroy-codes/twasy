import { useState } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { AnimatePresence, motion } from "motion/react";
import { Terminal, Shield, Sparkles } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sectionOrder = ["home", "about", "projects", "skills", "contact"];

  const handleNavigate = (targetSection: string) => {
    const fromIdx = sectionOrder.indexOf(activeSection);
    const toIdx = sectionOrder.indexOf(targetSection);
    if (toIdx !== -1) {
      let dir = toIdx > fromIdx ? 1 : -1;
      
      // Explicit overrides to slide Left for About and Right for Projects (Portfolio)
      if (targetSection === "about") {
        dir = -1; // slides entering from the left (towards right)
      } else if (targetSection === "projects") {
        dir = 1;  // slides entering from the right (towards left)
      }
      
      setDirection(dir);
      setActiveSection(targetSection);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
      opacity: 0,
      scale: 0.98,
      skewX: 0,
      filter: "blur(6px) contrast(1.2)",
    }),
    center: {
      x: 0,
      opacity: [0, 0.85, 0.45, 0.95, 0.75, 1],
      scale: [0.98, 1.01, 0.99, 1.004, 0.998, 1],
      skewX: [0, -2.5, 2, -1, 0.5, 0],
      filter: [
        "blur(5px) contrast(1.2)",
        "blur(1px) contrast(1.4)",
        "blur(3px) contrast(1.1)",
        "blur(0.5px) contrast(1.3)",
        "blur(2.1px) contrast(1.1)",
        "blur(0px) contrast(1)"
      ],
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : dir > 0 ? "-100%" : 0,
      opacity: 0,
      scale: 0.98,
      skewX: 0,
      filter: "blur(6px) contrast(1.2)",
    }),
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Hero onNavigate={handleNavigate} />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "contact":
        return <Contact />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-cyber-black text-gray-200 selection:bg-white selection:text-black">
      <CustomCursor />
      <div className="scanlines-overlay" />
      <div className="scanline-beam" />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            {/* 1. Custom Interactive Canvas Background */}
            <Background />

            {/* 2. Floating Refractive Glass Navbar */}
            <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

            {/* 3. Full-Screen Page Structure with Sliding Deck */}
            <main className="relative w-full h-full overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeSection}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 65, damping: 18, mass: 0.8 },
                    opacity: { duration: 0.5, times: [0, 0.15, 0.35, 0.55, 0.8, 1], ease: "easeInOut" },
                    scale: { duration: 0.55, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" },
                    skewX: { duration: 0.45, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" },
                    filter: { duration: 0.55, times: [0, 0.15, 0.35, 0.55, 0.8, 1], ease: "easeInOut" }
                  }}
                  className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin pt-20"
                >
                  <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
                    <div>
                      {renderSection()}
                    </div>

                    {/* Cyberpunk Footer (rendered inside the scroll container of sub-pages) */}
                    {activeSection !== "home" && (
                      <footer className="relative z-10 border-t border-[rgba(255,255,255,0.06)] bg-black/85 py-10 px-4 mt-16 backdrop-blur-md">
                        {/* Top glossy border highlight */}
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                          {/* Logo brand & tagline */}
                          <div className="flex flex-col items-center md:items-start gap-1.5">
                            <div className="flex items-center gap-2 font-orbitron font-black text-base tracking-wider text-white">
                              <span className="text-white/40">&lt;</span>
                              <span>TWASY</span>
                              <span className="text-white/40">/&gt;</span>
                            </div>
                            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                              SECURE_ORCHESTRATION_LAYER // PORT: 3000
                            </p>
                          </div>

                          {/* Center specifications / metrics */}
                          <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 border border-[rgba(255,255,255,0.06)] px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3 text-white/50 animate-pulse" />
                              <span>TLS_2.4_OK</span>
                            </div>
                            <div className="w-[1px] h-3 bg-white/10" />
                            <div className="flex items-center gap-1">
                              <Terminal className="w-3 h-3 text-white/50" />
                              <span>FRAME_RATE: 120_STABLE</span>
                            </div>
                            <div className="w-[1px] h-3 bg-white/10" />
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>CRAFTED_SPM</span>
                            </div>
                          </div>

                          {/* Copyright notice */}
                          <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right text-gray-500 font-sans text-xs">
                            <p>© {new Date().getFullYear()} TWASY. All Rights Reserved.</p>
                            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wide">
                              Designed for Professionals & Tech Heads
                            </p>
                          </div>
                        </div>
                      </footer>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
