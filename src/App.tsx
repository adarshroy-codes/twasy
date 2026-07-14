import { useState, useEffect } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import { AnimatePresence, motion } from "motion/react";
import { Terminal, Shield, Sparkles } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  // Track the active scroll section using high-precision IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "contact"];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Triggers section shift when it crosses the center 35% band of viewport
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-magenta selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 1. Custom Interactive Canvas Background */}
            <Background />

            {/* 3. Floating Refractive Glass Navbar */}
            <Navbar activeSection={activeSection} />

            {/* 4. Full-Screen Page Structure */}
            <main className="relative w-full overflow-hidden">
              {/* HERO SECTION */}
              <Hero />

              {/* ABOUT PROFILE SECTION */}
              <About />

              {/* PROJECTS SECTION */}
              <Projects />

              {/* CORE SKILLS SECTION */}
              <Skills />

              {/* SECURE CONTACT SECTION */}
              <Contact />
            </main>

            {/* 5. Clean, Award-Winning Cyberpunk Footer */}
            <footer className="relative z-10 border-t border-[rgba(138,63,252,0.15)] bg-[rgba(9,7,15,0.92)] py-12 px-4">
              {/* Top glossy border highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo brand & tagline */}
                <div className="flex flex-col items-center md:items-start gap-1.5">
                  <div className="flex items-center gap-2 font-orbitron font-black text-base tracking-wider text-white">
                    <span className="text-cyber-magenta">&lt;</span>
                    <span>TWASY</span>
                    <span className="text-cyber-neon">/&gt;</span>
                  </div>
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    SECURE_ORCHESTRATION_LAYER // PORT: 3000
                  </p>
                </div>

                {/* Center specifications / metrics */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 border border-[rgba(255,255,255,0.06)] px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-cyber-neon animate-pulse" />
                    <span>TLS_2.4_OK</span>
                  </div>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <div className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-cyber-magenta" />
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
                    Designed for Apple Glass & Cyberpunk HUDs
                  </p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
