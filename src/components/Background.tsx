import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  force: number;
  width: number;
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
    isHovering: false,
  });

  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Generate floating particles with varying characteristics
    const numParticles = 75;
    const particles: Particle[] = [];
    const colors = [
      "rgba(255, 255, 255,", // Silver/White
      "rgba(6, 182, 212,",  // Cyber Cyan
      "rgba(236, 72, 153,", // Cyber Magenta
    ];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1.2 + Math.random() * 1.8,
        baseAlpha: 0.15 + Math.random() * 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        color: colors[Math.random() < 0.7 ? 0 : Math.random() < 0.5 ? 1 : 2],
      });
    }

    // Handle resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
      
      mouseRef.current.rawTargetX = e.clientX;
      mouseRef.current.rawTargetY = e.clientY;
      mouseRef.current.isHovering = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle mouse clicks for ripple waves
    const handleWindowClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.95,
        speed: 12,
        force: 55,
        width: 140,
      });
    };
    window.addEventListener("click", handleWindowClick);

    const render = () => {
      time += 0.8;
      const mouse = mouseRef.current;
      
      // Interpolate mouse coordinates smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      mouse.rawX += (mouse.rawTargetX - mouse.rawX) * 0.08;
      mouse.rawY += (mouse.rawTargetY - mouse.rawY) * 0.08;

      // Solid absolute black backdrop matching the minimal spirograph style
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient radial glows that follow the cursor subtly
      const radialGlow1 = ctx.createRadialGradient(
        width * 0.25 + mouse.x * 80,
        height * 0.3 + mouse.y * 80,
        50,
        width * 0.25 + mouse.x * 80,
        height * 0.3 + mouse.y * 80,
        width * 0.7
      );
      radialGlow1.addColorStop(0, "rgba(255, 255, 255, 0.035)");
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
      radialGlow2.addColorStop(0, "rgba(228, 228, 231, 0.02)");
      radialGlow2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radialGlow2;
      ctx.fillRect(0, 0, width, height);

      // Update and filter click ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += ripples[i].speed;
        if (ripples[i].radius > ripples[i].maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // ----------------------------------------------------
      // 1. RENDER INTERACTIVE GRID OF DOTTED SYSTEM
      // ----------------------------------------------------
      const spacing = 38; // Elegant grid spacing
      const baseParallaxX = -mouse.x * 12;
      const baseParallaxY = -mouse.y * 12;

      const startX = -spacing * 2;
      const endX = width + spacing * 2;
      const startY = -spacing * 2;
      const endY = height + spacing * 2;

      for (let xPos = startX; xPos < endX; xPos += spacing) {
        for (let yPos = startY; yPos < endY; yPos += spacing) {
          
          // Organic fluid wave drift
          const waveX = Math.sin(time * 0.018 + xPos * 0.005 + yPos * 0.003) * 8;
          const waveY = Math.cos(time * 0.015 + xPos * 0.003 + yPos * 0.005) * 8;

          let renderX = xPos + baseParallaxX + waveX;
          let renderY = yPos + baseParallaxY + waveY;

          // Mouse proximity displacement (elastic mesh behavior)
          const mDx = renderX - mouse.rawX;
          const mDy = renderY - mouse.rawY;
          const mDistSq = mDx * mDx + mDy * mDy;
          const mMaxDist = 240;

          let attractionMultiplier = 1;

          if (mDistSq < mMaxDist * mMaxDist) {
            const mDist = Math.sqrt(mDistSq);
            if (mDist > 0) {
              const pushFactor = (1 - mDist / mMaxDist) * 22;
              // Push dots slightly away from cursor to create dynamic depth
              renderX += (mDx / mDist) * pushFactor;
              renderY += (mDy / mDist) * pushFactor;
              attractionMultiplier = 1 + (1 - mDist / mMaxDist) * 0.6;
            }
          }

          // Ripple wave displacement & brightness flare
          let rippleOpacityBoost = 0;
          let rippleDisplacementX = 0;
          let rippleDisplacementY = 0;

          for (let rIdx = 0; rIdx < ripples.length; rIdx++) {
            const ripple = ripples[rIdx];
            const ripDx = renderX - ripple.x;
            const ripDy = renderY - ripple.y;
            const ripDist = Math.sqrt(ripDx * ripDx + ripDy * ripDy);
            
            if (ripDist > 0) {
              const distFromWavefront = Math.abs(ripDist - ripple.radius);
              if (distFromWavefront < ripple.width) {
                const waveIntensity = 1 - (distFromWavefront / ripple.width); // 0 to 1
                const push = waveIntensity * ripple.force;
                
                // Displace dots along the wave vector
                rippleDisplacementX += (ripDx / ripDist) * push;
                rippleDisplacementY += (ripDy / ripDist) * push;
                rippleOpacityBoost += waveIntensity * 0.45;
              }
            }
          }

          renderX += rippleDisplacementX;
          renderY += rippleDisplacementY;

          // Calculate visual properties
          const patchIntensity = 
            Math.sin(xPos * 0.0025 - yPos * 0.0015 + time * 0.01) * 0.5 + 
            Math.cos(-xPos * 0.0015 + yPos * 0.0025 + time * 0.007) * 0.5;
          
          const normalizedPatch = (patchIntensity + 1) / 2;
          let opacity = (0.06 + normalizedPatch * 0.12) * attractionMultiplier + rippleOpacityBoost;
          opacity = Math.min(Math.max(opacity, 0.03), 0.85);

          let dotSize = 1.1;
          if (mDistSq < mMaxDist * mMaxDist) {
            const mDist = Math.sqrt(mDistSq);
            const spotIntensity = 1 - mDist / mMaxDist;
            dotSize = 1.1 + spotIntensity * 0.8;
          }
          if (rippleOpacityBoost > 0) {
            dotSize += rippleOpacityBoost * 1.5;
          }

          // Draw crisp square dot for grid matrix
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
          ctx.fillRect(renderX - dotSize / 2, renderY - dotSize / 2, dotSize, dotSize);
        }
      }

      // ----------------------------------------------------
      // 2. RENDER DRiFTING CONSTELLATION PARTICLES (DOTTED)
      // ----------------------------------------------------
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slowly increment individual pulse phases for natural twinkling
        p.pulsePhase += p.pulseSpeed;
        const twinkle = Math.sin(p.pulsePhase) * 0.12 + 0.88;

        // Basic physics update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse vortex attraction logic
        const pDx = p.x - mouse.rawX;
        const pDy = p.y - mouse.rawY;
        const pDistSq = pDx * pDx + pDy * pDy;
        const swirlRadius = 260;

        let displayX = p.x;
        let displayY = p.y;
        let scaleFactor = 1.0;
        let opacityBoost = 0;

        if (pDistSq < swirlRadius * swirlRadius) {
          const pDist = Math.sqrt(pDistSq);
          if (pDist > 0) {
            const pullForce = (1 - pDist / swirlRadius) * 1.5;
            // Swirl vector (tangent to circle around mouse)
            const swirlX = -pDy / pDist;
            const swirlY = pDx / pDist;

            // Blend random drift with swirling orbit around cursor
            displayX += swirlX * pullForce * 15;
            displayY += swirlY * pullForce * 15;

            // Pull slightly inward toward spotlight core
            displayX -= (pDx / pDist) * pullForce * 10;
            displayY -= (pDy / pDist) * pullForce * 10;

            scaleFactor = 1.0 + (1 - pDist / swirlRadius) * 0.7;
            opacityBoost = (1 - pDist / swirlRadius) * 0.35;
          }
        }

        // Apply global ripple wave pushes to floating particles too
        for (let rIdx = 0; rIdx < ripples.length; rIdx++) {
          const ripple = ripples[rIdx];
          const ripDx = displayX - ripple.x;
          const ripDy = displayY - ripple.y;
          const ripDist = Math.sqrt(ripDx * ripDx + ripDy * ripDy);
          
          if (ripDist > 0) {
            const distFromWavefront = Math.abs(ripDist - ripple.radius);
            if (distFromWavefront < ripple.width) {
              const waveIntensity = 1 - (distFromWavefront / ripple.width);
              const push = waveIntensity * ripple.force * 0.7;
              displayX += (ripDx / ripDist) * push;
              displayY += (ripDy / ripDist) * push;
              opacityBoost += waveIntensity * 0.5;
            }
          }
        }

        const alpha = Math.min(Math.max((p.baseAlpha * twinkle) + opacityBoost, 0.05), 0.95);
        const finalSize = p.size * scaleFactor;

        // Render particle glowing aura
        if (alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(displayX, displayY, finalSize * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha * 0.08})`;
          ctx.fill();
        }

        // Render core dotted star
        ctx.beginPath();
        ctx.arc(displayX, displayY, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        // ----------------------------------------------------
        // 3. DRAW EXQUISITE VECTOR CONSTELLATION LINES
        // ----------------------------------------------------
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          
          // Calculate distance between displays
          const dxLine = displayX - p2.x;
          const dyLine = displayY - p2.y;
          const distLineSq = dxLine * dxLine + dyLine * dyLine;
          const lineLimit = 110;

          if (distLineSq < lineLimit * lineLimit) {
            const distLine = Math.sqrt(distLineSq);
            const lineAlpha = (1 - distLine / lineLimit) * 0.055 * Math.min(alpha, p2.baseAlpha);
            
            if (lineAlpha > 0.002) {
              ctx.beginPath();
              ctx.moveTo(displayX, displayY);
              ctx.lineTo(p2.x, p2.y);
              
              // Soft gray-white constellation vectors
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(4)})`;
              ctx.lineWidth = 0.55;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
