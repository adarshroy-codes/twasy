import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  hoverScramble?: boolean;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?[]\\/=-";

export default function GlitchText({
  children,
  className = "",
  delay = 0,
  duration = 2000,
  hoverScramble = false,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const triggerRef = useRef<boolean>(false);
  const intervalRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  // Function to run a resolve animation from current state to originalText
  const startResolve = (originalText: string, resolveDuration: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    const startTime = Date.now();
    const length = originalText.length;

    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / resolveDuration, 1);
      const resolvedCount = Math.floor(length * progress);

      const scrambled = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < resolvedCount) {
            return char;
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (progress === 1) {
        setDisplayText(originalText);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 30);
  };

  // Entrance animation (only run once on mount if not hovered)
  useEffect(() => {
    if (triggerRef.current) return;
    triggerRef.current = true;

    const startGlitch = () => {
      if (isHovered) return; // Skip entrance glitch if user is already hovering
      startResolve(children, duration);
    };

    timeoutRef.current = setTimeout(startGlitch, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [children, delay, duration]);

  // Handle hover scramble logic
  useEffect(() => {
    if (!hoverScramble) return;

    if (isHovered) {
      // Clear any running timeouts/intervals
      clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Start continuous scramble
      intervalRef.current = setInterval(() => {
        const scrambled = children
          .split("")
          .map((char) => {
            if (char === " ") return " ";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setDisplayText(scrambled);
      }, 40);
    } else {
      // When hover leaves, start a quick resolve animation to return to original text
      if (triggerRef.current) {
        startResolve(children, 600);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, hoverScramble, children]);

  const handleMouseEnter = () => {
    if (hoverScramble) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverScramble) {
      setIsHovered(false);
    }
  };

  return (
    <span
      className={`${className} ${hoverScramble ? "cursor-default" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
}
