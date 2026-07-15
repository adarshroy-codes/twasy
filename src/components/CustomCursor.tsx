import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: string;
  } | null>(null);

  // Smooth springs for the outer cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 320, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Smooth springs for cursor size and shape when snapping
  const cursorWidth = useSpring(24, springConfig);
  const cursorHeight = useSpring(24, springConfig);
  const cursorBorderRadius = useSpring(9999, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with a mouse
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      if (targetRect) {
        // Magnetic effect: snap to center of the hovered element, but allow subtle movement based on mouse
        const pullFactor = 0.22; // subtle interactive pull towards mouse inside the snapped state
        const targetCenterX = targetRect.x;
        const targetCenterY = targetRect.y;
        
        const deltaX = e.clientX - targetCenterX;
        const deltaY = e.clientY - targetCenterY;

        cursorX.set(targetCenterX + deltaX * pullFactor);
        cursorY.set(targetCenterY + deltaY * pullFactor);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button'], [data-cursor='magnetic']");
      if (target) {
        setIsHovered(true);
        const rect = target.getBoundingClientRect();
        const style = window.getComputedStyle(target);
        
        setTargetRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          borderRadius: style.borderRadius || "8px",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button'], [data-cursor='magnetic']");
      if (target) {
        setIsHovered(false);
        setTargetRect(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [targetRect, cursorX, cursorY]);

  // Dynamically update sizes based on hover state and magnetic target
  useEffect(() => {
    if (isHovered && targetRect) {
      // Dynamic expansion to envelop the snapped target gracefully
      cursorWidth.set(targetRect.width + 12);
      cursorHeight.set(targetRect.height + 12);
      
      // Parse border radius value
      const parsedRadius = parseInt(targetRect.borderRadius, 10);
      cursorBorderRadius.set(isNaN(parsedRadius) ? 8 : parsedRadius + 6);
    } else {
      cursorWidth.set(isClicking ? 18 : 24);
      cursorHeight.set(isClicking ? 18 : 24);
      cursorBorderRadius.set(9999);
    }
  }, [isHovered, isClicking, targetRect, cursorWidth, cursorHeight, cursorBorderRadius]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Outer Glass Magnetic Ring */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: cursorWidth,
          height: cursorHeight,
          borderRadius: cursorBorderRadius,
          x: "-50%",
          y: "-50%",
        }}
        className={`fixed z-[9999] pointer-events-none transition-colors duration-300 border backdrop-blur-[1px] ${
          isHovered
            ? "bg-white/[0.04] border-cyber-magenta/50 shadow-[0_0_20px_rgba(224,75,255,0.25),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            : "bg-transparent border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        }`}
      />

      {/* 2. Inner Precise Core Dot */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovered ? 0 : 1,
          backgroundColor: isHovered ? "#e04bff" : "#00f2fe",
          boxShadow: isHovered
            ? "0 0 10px rgba(224, 75, 255, 0.8)"
            : "0 0 8px rgba(0, 242, 254, 0.8)",
        }}
        transition={{ duration: 0.15 }}
        className="fixed w-1.5 h-1.5 rounded-full z-[10000] pointer-events-none"
      />
    </>
  );
}
