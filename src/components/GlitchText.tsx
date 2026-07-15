import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const GLYPHS = "X█_01[]+*_^%$#@!?~&|/\\:-=";

export default function GlitchText({
  children,
  className = "",
  delay = 0,
  duration = 800,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const triggerRef = useRef<boolean>(false);

  useEffect(() => {
    if (triggerRef.current) return;
    triggerRef.current = true;

    let isMounted = true;
    const originalText = children;
    const length = originalText.length;
    
    const startGlitch = () => {
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        if (!isMounted) {
          clearInterval(interval);
          return;
        }

        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Calculate how many characters are resolved (fully decoded)
        const resolvedCount = Math.floor(length * progress);

        const scrambled = originalText
          .split("")
          .map((char, index) => {
            // Space stays space
            if (char === " ") return " ";
            
            // If already resolved, return the real character
            if (index < resolvedCount) {
              return char;
            }
            
            // Randomly decide if we display a glyph or a scrambled char
            if (Math.random() < 0.35) {
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            
            return char;
          })
          .join("");

        setDisplayText(scrambled);

        if (progress === 1) {
          setDisplayText(originalText);
          clearInterval(interval);
        }
      }, 30); // ~33fps high-frequency updates
    };

    const delayTimeout = setTimeout(startGlitch, delay);

    return () => {
      isMounted = false;
      clearTimeout(delayTimeout);
    };
  }, [children, delay, duration]);

  return <span className={className}>{displayText}</span>;
}
