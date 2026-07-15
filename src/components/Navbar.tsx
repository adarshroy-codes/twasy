import React from "react";
import { Terminal } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  // Scrolled styling is active when not on the home section
  const scrolled = activeSection !== "home";

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetSection = href.replace("#", "");
    onNavigate(targetSection);
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl transition-all duration-300 ${
        scrolled
          ? "top-2 py-2"
          : "py-4"
      }`}
    >
      <div
        className="w-full rounded-2xl border border-white/10 bg-black/75 px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.9)] backdrop-blur-3xl transition-all duration-300"
        style={{
          boxShadow: scrolled
            ? "0 10px 40px 0 rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)"
            : "0 8px 32px 0 rgba(0, 0, 0, 0.9)",
        }}
      >
        <div className="grid grid-cols-3 items-center w-full">
          {/* Left Column: System Status Accent */}
          <div className="flex items-center justify-start">
            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase hidden sm:inline-block">
              SYS_ACTIVE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse sm:hidden" />
          </div>

          {/* Center Column: Logo & Name */}
          <div className="flex justify-center">
            <motion.a
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="flex items-center gap-1 sm:gap-2 font-orbitron font-extrabold text-sm sm:text-lg tracking-wider text-white group cursor-pointer select-none"
            >
              <span className="text-white/40 transition-all duration-300 group-hover:text-white/90 group-hover:scale-110">
                &lt;
              </span>
              <span className="animate-slow-shimmer transition-all duration-300">
                TWASY
              </span>
              <span className="text-white/40 transition-all duration-300 group-hover:text-white/90 group-hover:scale-110">
                /&gt;
              </span>
            </motion.a>
          </div>

          {/* Right Column: Interactive Console Trigger */}
          <div className="flex justify-end items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg border border-white/20 bg-white/5 text-[10px] sm:text-xs font-orbitron font-bold tracking-wider uppercase text-white hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center gap-1.5"
            >
              <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              LAUNCH_INIT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

