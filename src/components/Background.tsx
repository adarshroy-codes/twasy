import { useEffect, useRef } from "react";


interface Star {
  x: number;
  y: number;
  size: number;
  flickerSpeed: number;
  phase: number;
  color: string;
  depth: number; // For multi-layered parallax
  isFlarer?: boolean; // Highlighted supergiant star with 4-point lens flare
}

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
    rawInitialized: false
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

    // Star colors to create a diverse cosmic sky
    const starColors = [
      "rgba(255, 255, 255, ",       // Pure White
      "rgba(224, 75, 255, ",       // Cyber Magenta
      "rgba(0, 242, 254, ",        // Neon Cyan
      "rgba(202, 142, 255, ",      // Soft Lavender
      "rgba(255, 240, 180, "       // Warm Gold
    ];

    // Initialize 240 multi-layered stars
    const stars: Star[] = Array.from({ length: 240 }, (_, idx) => {
      const depth = Math.random() * 0.8 + 0.2; // 0.2 (far, slow) to 1.0 (near, fast)
      const colorBase = starColors[Math.floor(Math.random() * starColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        size: (Math.random() * 1.6 + 0.4) * (depth * 1.2),
        flickerSpeed: Math.random() * 0.03 + 0.006,
        phase: Math.random() * Math.PI * 2,
        color: colorBase,
        depth: depth,
        isFlarer: idx < 12 // Create 12 majestic flaring supergiant stars
      };
    });


    // Handle resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement for parallax and spotlight
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
      
      mouseRef.current.rawTargetX = e.clientX;
      mouseRef.current.rawTargetY = e.clientY;
      mouseRef.current.rawInitialized = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let gridOffset = 0;

    const render = () => {
      time += 1;
      // Smoothly interpolate mouse parallax and raw spotlight coordinate
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      mouse.rawX += (mouse.rawTargetX - mouse.rawX) * 0.075;
      mouse.rawY += (mouse.rawTargetY - mouse.rawY) * 0.075;

      // Pure deep black space backdrop
      ctx.fillStyle = "#020104";
      ctx.fillRect(0, 0, width, height);

      // Draw Volumetric Lighting / Ambient Nebulae (Soft rich glows)
      const gradientPurple = ctx.createRadialGradient(
        width * 0.25 + mouse.x * 70,
        height * 0.3 + mouse.y * 70,
        50,
        width * 0.25 + mouse.x * 70,
        height * 0.3 + mouse.y * 70,
        width * 0.65
      );
      gradientPurple.addColorStop(0, "rgba(22, 5, 41, 0.7)");
      gradientPurple.addColorStop(0.5, "rgba(138, 63, 252, 0.05)");
      gradientPurple.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradientPurple;
      ctx.fillRect(0, 0, width, height);

      const gradientCyan = ctx.createRadialGradient(
        width * 0.8 - mouse.x * 70,
        height * 0.7 - mouse.y * 70,
        50,
        width * 0.8 - mouse.x * 70,
        height * 0.7 - mouse.y * 70,
        width * 0.6
      );
      gradientCyan.addColorStop(0, "rgba(5, 25, 45, 0.55)");
      gradientCyan.addColorStop(0.5, "rgba(0, 242, 254, 0.04)");
      gradientCyan.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradientCyan;
      ctx.fillRect(0, 0, width, height);

      // ----------------------------------------------------
      // DRAW MAGNIFICENT SWEEPING AURORA LIGHTING
      // ----------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      
      // We render 3 overlapping glowing ribbon bands of Aurora curtain lights
      const auroras = [
        {
          yOffset: height * 0.18,
          amplitude: 45,
          speed: 0.002,
          wavelength: 0.0025,
          height: 160,
          color1: "rgba(0, 242, 254, 0.07)",   // Neon Cyan
          color2: "rgba(138, 63, 252, 0.05)",  // Deep Purple
          color3: "rgba(0, 255, 140, 0.04)"    // Aurora Emerald
        },
        {
          yOffset: height * 0.28,
          amplitude: 65,
          speed: -0.0016,
          wavelength: 0.0018,
          height: 200,
          color1: "rgba(224, 75, 255, 0.06)",  // Cyber Magenta
          color2: "rgba(138, 63, 252, 0.07)",  // Soft Violet
          color3: "rgba(0, 242, 254, 0.05)"    // Neon Cyan
        },
        {
          yOffset: height * 0.08,
          amplitude: 35,
          speed: 0.001,
          wavelength: 0.0035,
          height: 120,
          color1: "rgba(0, 255, 160, 0.04)",   // Green Aurora
          color2: "rgba(0, 242, 254, 0.05)",   // Blue-green Glow
          color3: "rgba(138, 63, 252, 0.02)"   // Fading Purple
        }
      ];

      auroras.forEach((aurora) => {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.25, aurora.color1);
        gradient.addColorStop(0.55, aurora.color2);
        gradient.addColorStop(0.85, aurora.color3);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        // Pre-calculate the points of the aurora line to avoid redundant math in drawing passes
        const points: { x: number; y: number }[] = [];
        for (let x = -40; x <= width + 40; x += 20) {
          const wave1 = Math.sin(x * aurora.wavelength + time * aurora.speed) * aurora.amplitude;
          const wave2 = Math.cos(x * 0.001 + time * aurora.speed * 1.6) * (aurora.amplitude * 0.4);
          const y = aurora.yOffset + wave1 + wave2 + mouse.y * 35;
          points.push({ x, y });
        }

        // Draw multiple passes with varying widths and opacities to simulate a smooth, gorgeous volumetric glow
        const glowPasses = [
          { width: aurora.height * 1.5, alpha: 0.12 },
          { width: aurora.height * 0.9, alpha: 0.22 },
          { width: aurora.height * 0.45, alpha: 0.38 },
          { width: aurora.height * 0.15, alpha: 0.55 }
        ];

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        glowPasses.forEach((pass) => {
          ctx.strokeStyle = gradient;
          ctx.lineWidth = pass.width;
          ctx.globalAlpha = pass.alpha;

          ctx.beginPath();
          points.forEach((pt, index) => {
            if (index === 0) {
              ctx.moveTo(pt.x, pt.y);
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          });
          ctx.stroke();
        });
      });
      ctx.restore();

      // ----------------------------------------------------
      // DRAW STARS (With parallax depth & twinkling)
      // ----------------------------------------------------
      stars.forEach((star) => {
        star.phase += star.flickerSpeed;
        const brightness = Math.sin(star.phase) * 0.5 + 0.5; // range 0.0 to 1.0
        
        // Multi-layered Parallax: foreground stars (higher depth) move faster
        const starX = star.x - mouse.x * (star.depth * 30);
        const starY = star.y - mouse.y * (star.depth * 30);
        
        // Infinite screen wrapping
        const wrappedX = (starX + width + 100) % (width + 200) - 100;
        const wrappedY = (starY + height + 100) % (height + 200) - 100;

        ctx.fillStyle = star.color + (brightness * 0.95).toFixed(2) + ")";
        
        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // High fidelity: Draw beautiful artistic flares on prominent flarer stars
        if (star.isFlarer && brightness > 0.6) {
          const flareLength = star.size * 4 * brightness;
          ctx.strokeStyle = star.color + (brightness * 0.55).toFixed(2) + ")";
          ctx.lineWidth = 0.5;
          
          // Draw elegant 4-point crosshair flare
          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(wrappedX - flareLength, wrappedY);
          ctx.lineTo(wrappedX + flareLength, wrappedY);
          // Vertical line
          ctx.moveTo(wrappedX, wrappedY - flareLength);
          ctx.lineTo(wrappedX, wrappedY + flareLength);
          ctx.stroke();
        }
      });

      // ----------------------------------------------------
      // DRAW 3D PERSPECTIVE CYBERPUNK GRID
      // ----------------------------------------------------
      const vanishingPointY = height * 0.4;
      const vanishingPointX = width / 2 + mouse.x * 60;
      const gridStartY = height * 0.45;

      gridOffset += 0.01;
      if (gridOffset >= 1.0) gridOffset -= 1.0;

      ctx.save();
      const lineCount = 36;
      ctx.lineWidth = 1;
      
      for (let i = -lineCount / 2; i <= lineCount / 2; i++) {
        const angleOffset = (i * width) / (lineCount * 0.65);
        const xEnd = width / 2 + angleOffset + mouse.x * 100;
        
        const gradientLine = ctx.createLinearGradient(
          vanishingPointX,
          gridStartY,
          xEnd,
          height
        );
        gradientLine.addColorStop(0, "rgba(138, 63, 252, 0)");
        gradientLine.addColorStop(0.3, "rgba(138, 63, 252, 0.12)");
        gradientLine.addColorStop(0.8, "rgba(138, 63, 252, 0.35)");
        gradientLine.addColorStop(1, "rgba(224, 75, 255, 0.4)");

        ctx.strokeStyle = gradientLine;
        ctx.beginPath();
        ctx.moveTo(vanishingPointX, vanishingPointY);
        ctx.lineTo(xEnd, height);
        ctx.stroke();
      }

      const numHorizontalLines = 18;
      for (let i = 0; i < numHorizontalLines; i++) {
        const ratio = (i + gridOffset) / numHorizontalLines;
        const normY = Math.pow(ratio, 2.2);
        const lineY = gridStartY + (height - gridStartY) * normY;
        const opacity = Math.min(1, normY * 1.5) * 0.4;
        
        ctx.strokeStyle = `rgba(138, 63, 252, ${opacity})`;
        ctx.lineWidth = Math.max(0.5, normY * 2);

        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
      }
      ctx.restore();


      // Majestic vignette layer - Deeper rich black gradients at borders
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.35,
        width / 2,
        height / 2,
        width * 0.75
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.5, "rgba(2, 0, 6, 0.45)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.94)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

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
