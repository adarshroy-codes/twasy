import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    rawX: window.innerWidth / 2,
    rawY: window.innerHeight / 2,
    rawTargetX: window.innerWidth / 2,
    rawTargetY: window.innerHeight / 2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Handle resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement for interactive parallax and spotlight
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
      
      mouseRef.current.rawTargetX = e.clientX;
      mouseRef.current.rawTargetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      time += 0.8; // Time step for animations
      const mouse = mouseRef.current;
      
      // Interpolate mouse coordinates smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      mouse.rawX += (mouse.rawTargetX - mouse.rawX) * 0.08;
      mouse.rawY += (mouse.rawTargetY - mouse.rawY) * 0.08;

      // Solid absolute black backdrop matching the minimal spirograph style
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Subtle, luxury ambient radial glows that follow the cursor subtly
      const radialGlow1 = ctx.createRadialGradient(
        width * 0.25 + mouse.x * 80,
        height * 0.3 + mouse.y * 80,
        50,
        width * 0.25 + mouse.x * 80,
        height * 0.3 + mouse.y * 80,
        width * 0.7
      );
      radialGlow1.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      radialGlow1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow1;
      ctx.fillRect(0, 0, width, height);

      const radialGlow2 = ctx.createRadialGradient(
        width * 0.75 - mouse.x * 80,
        height * 0.7 - mouse.y * 80,
        50,
        width * 0.75 - mouse.x * 80,
        height * 0.7 - mouse.y * 80,
        width * 0.7
      );
      radialGlow2.addColorStop(0, "rgba(228, 228, 231, 0.025)");
      radialGlow2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow2;
      ctx.fillRect(0, 0, width, height);

      // Grid specifications
      const spacing = 36; // Premium crisp density spacing
      const baseParallaxX = -mouse.x * 15;
      const baseParallaxY = -mouse.y * 15;

      // Overscan grid borders to guarantee no edge clipping during wave warp
      const startX = -spacing * 2;
      const endX = width + spacing * 2;
      const startY = -spacing * 2;
      const endY = height + spacing * 2;

      for (let xPos = startX; xPos < endX; xPos += spacing) {
        for (let yPos = startY; yPos < endY; yPos += spacing) {
          
          // 1. DYNAMIC WAVE OFFSETS (Organically shifts positions of dots like a gentle liquid ripple)
          // Uses spatial frequencies and temporal modulation to create cohesive moving wave patches
          const waveX = Math.sin(time * 0.02 + xPos * 0.004 + yPos * 0.002) * 10;
          const waveY = Math.cos(time * 0.016 + xPos * 0.002 + yPos * 0.004) * 10;

          const renderX = xPos + baseParallaxX + waveX;
          const renderY = yPos + baseParallaxY + waveY;

          // 2. ORGANIC DENSITY PATCH TRANSITIONS
          // Opacity swells in high-contrast patches that slowly drift across the screen
          const patchIntensity = 
            Math.sin(xPos * 0.002 - yPos * 0.001 + time * 0.012) * 0.5 + 
            Math.cos(-xPos * 0.001 + yPos * 0.003 + time * 0.008) * 0.5;
          
          // Map to safe range and increase base opacity to make them much more visible
          const normalizedPatch = (patchIntensity + 1) / 2; // 0.0 to 1.0
          let opacity = 0.08 + normalizedPatch * 0.16; // Resting state is beautifully visible (8% to 24%)

          // 3. INTERACTIVE SPOTLIGHT HIGHLIGHT (Hover response)
          const dx = renderX - mouse.rawX;
          const dy = renderY - mouse.rawY;
          const distSq = dx * dx + dy * dy;
          const maxDist = 300;

          let dotSize = 1.3; // Crisp baseline square size

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const intensity = 1 - dist / maxDist; // 0 to 1
            opacity = opacity * (1 - intensity) + (0.35 * intensity); // Subtly flares up to 35% opacity
            dotSize = 1.3 + intensity * 0.8; // Gently swells the pixel dots up to 2.1px
          }

          // Render high-contrast crisp square dot
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
          ctx.fillRect(renderX - dotSize / 2, renderY - dotSize / 2, dotSize, dotSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
