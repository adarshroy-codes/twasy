import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Radio, Volume2, VolumeX } from "lucide-react";
import { audioEngine } from "../lib/audioEngine";

export default function AudioController() {
  const [isSfxMuted, setIsSfxMuted] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isSpiking, setIsSpiking] = useState(false);

  // Global event interception for hover and clicks
  useEffect(() => {
    let lastHoveredElement: HTMLElement | null = null;

    const findInteractiveAncestor = (el: HTMLElement | null): HTMLElement | null => {
      if (!el) return null;
      const tag = el.tagName.toLowerCase();
      const isClickable = 
        tag === "button" || 
        tag === "a" || 
        tag === "input" || 
        el.getAttribute("role") === "button" ||
        el.classList.contains("cursor-pointer") ||
        window.getComputedStyle(el).cursor === "pointer";

      if (isClickable) return el;
      return findInteractiveAncestor(el.parentElement);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const interactiveEl = findInteractiveAncestor(e.target as HTMLElement);
      if (interactiveEl && interactiveEl !== lastHoveredElement) {
        lastHoveredElement = interactiveEl;
        audioEngine.playHover();
      } else if (!interactiveEl) {
        lastHoveredElement = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const interactiveEl = findInteractiveAncestor(e.target as HTMLElement);
      if (interactiveEl) {
        audioEngine.playClick();
        setClickCount((prev) => prev + 1);
        setIsSpiking(true);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Sync changes to SFX muted state
  useEffect(() => {
    audioEngine.setSFXMuted(isSfxMuted);
  }, [isSfxMuted]);

  // Handle transient spiking state on clicks to flash visualizer bars
  useEffect(() => {
    if (isSpiking) {
      const timer = setTimeout(() => setIsSpiking(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isSpiking]);

  const toggleSfx = () => {
    setHasInteracted(true);
    const newState = !isSfxMuted;
    setIsSfxMuted(newState);
    audioEngine.setSFXMuted(newState);
    if (!newState) {
      setTimeout(() => {
        audioEngine.playClick();
        setClickCount((prev) => prev + 1);
        setIsSpiking(true);
      }, 50);
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isMusicPlaying) {
      audioEngine.pause();
      setIsMusicPlaying(false);
    } else {
      audioEngine.play();
      setIsMusicPlaying(true);
      // Trigger a direct click tone confirmation
      audioEngine.playClick();
      setClickCount((prev) => prev + 1);
      setIsSpiking(true);
    }
  };

  const isAudioActive = !isSfxMuted || isMusicPlaying;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3 font-mono text-[10px] select-none">
      {/* Mini floating launcher capsule */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          audioEngine.playClick();
          setIsSpiking(true);
        }}
        onMouseEnter={() => audioEngine.playHover()}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.8)] cursor-pointer ${
          isOpen
            ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            : isAudioActive
            ? "bg-black/75 border-white/10 text-white hover:bg-white/5 hover:border-white/20"
            : "bg-black/60 border-white/5 text-white/40 hover:text-white/75 hover:border-white/10"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        title="Audio Control System"
      >
        <div className="relative flex items-center justify-center w-4 h-4">
          {isAudioActive && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/40"
            />
          )}
          <Radio className="w-3.5 h-3.5" />
        </div>
        <span className="tracking-[0.2em] font-semibold text-[9px] uppercase hidden sm:inline-block">
          {isOpen ? "CLOSE_PANEL" : "AUDIO_SYS"}
        </span>

        {/* Minimalist Micro-Visualizer Bars on Button when Active */}
        {isAudioActive ? (
          <div className="flex items-end gap-[2px] h-3 px-0.5">
            {[0, 1, 2, 3].map((bar) => {
              const defaultMax = 35 + bar * 15;
              const speedMultiplier = isMusicPlaying ? 1.5 : 1.0;
              return (
                <motion.div
                  key={bar}
                  animate={{
                    height: isSpiking 
                      ? ["100%", "20%"] 
                      : ["20%", `${defaultMax + Math.random() * 40}%`, "20%"]
                  }}
                  transition={{
                    duration: (isSpiking ? 0.15 : 0.35 + bar * 0.08) / speedMultiplier,
                    repeat: isSpiking ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-[2px] bg-white rounded-full"
                />
              );
            })}
          </div>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-white/25 mx-0.5" />
        )}
      </motion.button>

      {/* Slide-out controller console */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-56 rounded-2xl bg-[#09070f]/95 border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Glossy top highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
              <span className="text-[9px] text-white/40 tracking-[0.25em] font-semibold uppercase">
                COSMIC_AUDIO_CENTER
              </span>
              <Activity className={`w-3 h-3 ${isAudioActive ? "text-white/60 animate-pulse" : "text-white/15"}`} />
            </div>

            {/* Animated Frequency Bars if active */}
            <div className="h-7 flex items-end justify-between gap-[2px] bg-black/40 rounded-lg p-2 mb-3.5 border border-white/5 overflow-hidden">
              {isAudioActive ? (
                Array.from({ length: 22 }).map((_, idx) => {
                  const baseHeight = 15 + (idx % 4) * 15;
                  const speedMultiplier = isMusicPlaying ? 1.6 : 1.0;
                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        height: isSpiking
                          ? ["100%", "15%"]
                          : ["15%", `${baseHeight + Math.random() * 45}%`, "15%"],
                      }}
                      transition={{
                        repeat: isSpiking ? 0 : Infinity,
                        duration: (isSpiking ? 0.12 : 0.3 + (idx % 5) * 0.06) / speedMultiplier,
                        ease: "easeInOut",
                      }}
                      className="w-[3px] bg-white/40 rounded-full"
                    />
                  );
                })
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] text-white/20 uppercase tracking-[0.15em]">
                  [ AUDIO_SYSTEM_OFFLINE ]
                </div>
              )}
            </div>

            {/* Control Toggles */}
            <div className="space-y-2">
              {/* SFX Click/Hover Toggle */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/95 font-medium tracking-wide">TACTILE SFX</span>
                  <span className="text-[8px] text-white/35 uppercase tracking-wider">
                    {isSfxMuted ? "MUTED_OFFLINE" : "ENHANCED_CLICKS"}
                  </span>
                </div>
                <button
                  onClick={toggleSfx}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    !isSfxMuted ? "bg-white" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-transform duration-300 ${
                      !isSfxMuted ? "translate-x-5 bg-black" : "translate-x-0 bg-white/50"
                    }`}
                  />
                </button>
              </div>

              {/* Soothing Music Toggle */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/95 font-medium tracking-wide">SOOTHING CHORDS</span>
                  <span className="text-[8px] text-white/35 uppercase tracking-wider">
                    {isMusicPlaying ? "GENERATIVE_MUSIC" : "MUTED_OFFLINE"}
                  </span>
                </div>
                <button
                  onClick={toggleMusic}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    isMusicPlaying ? "bg-white" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-transform duration-300 ${
                      isMusicPlaying ? "translate-x-5 bg-black" : "translate-x-0 bg-white/50"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Active feedback stats */}
            {isAudioActive && (
              <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[8px] text-white/30 uppercase tracking-wider flex-shrink-0">
                <span>SESSION_TRIGGERS:</span>
                <span className="font-semibold text-white/50 animate-bounce">{clickCount}</span>
              </div>
            )}

            {/* Hint alert for first interaction */}
            {!hasInteracted && isSfxMuted && !isMusicPlaying && (
              <div className="mt-3.5 text-[8px] text-center text-white/35 leading-normal animate-pulse">
                UNMUTE FOR PREMIUM SOUNDS & MUSIC
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
