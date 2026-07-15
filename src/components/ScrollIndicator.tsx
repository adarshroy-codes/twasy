import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out progress updates using high-performance spring settings
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Track scroll position to fade the indicator in only when the user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 10 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed right-3 sm:right-6 top-1/4 bottom-1/4 w-[3px] sm:w-[4px] z-50 rounded-full bg-white/[0.04] border border-white/[0.03] backdrop-blur-[2px] pointer-events-none"
    >
      {/* Glow highlight track backer */}
      <div className="absolute inset-0 rounded-full bg-cyber-purple/5" />

      {/* Actual progress track filler */}
      <motion.div
        style={{ scaleY }}
        className="absolute top-0 inset-x-0 rounded-full origin-top bg-gradient-to-b from-cyber-neon via-cyber-magenta to-cyber-purple shadow-[0_0_12px_rgba(0,242,254,0.6)]"
      />
    </motion.div>
  );
}
