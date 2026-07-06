"use client";

import { useEffect, useRef } from "react";

/**
 * Bohr-model atom animation — the site's signature visual.
 * Nucleus = gold ground state. Three shells (gold/silver/bronze) orbit
 * at physically distinct speeds — inner shell fastest, outer slowest —
 * mirroring the medal-tier metaphor used across the site.
 */
export default function AtomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let animationFrameId: number;
    let t = 0;

    const shells = [
      { rx: 0.13, ry: 0.045, tilt: 0.15, speed: 1.6, color: "224,181,85", size: 4.2 },
      { rx: 0.2, ry: 0.075, tilt: -0.25, speed: 1.05, color: "199,204,214", size: 3.6 },
      { rx: 0.28, ry: 0.1, tilt: 0.4, speed: 0.7, color: "205,148,99", size: 3.2 },
    ];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.46;
      const scale = Math.min(w, h);

      const glowR = scale * 0.05;
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowR * 3);
      grad.addColorStop(0, "rgba(224,181,85,0.9)");
      grad.addColorStop(0.3, "rgba(224,181,85,0.25)");
      grad.addColorStop(1, "rgba(224,181,85,0)");
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(cx, cy, glowR * 3, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = "#f5dca0";
      ctx!.beginPath();
      ctx!.arc(cx, cy, glowR * 0.55, 0, Math.PI * 2);
      ctx!.fill();

      shells.forEach((s, i) => {
        const rx = scale * s.rx;
        const ry = scale * s.ry;
        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(s.tilt);

        ctx!.strokeStyle = `rgba(${s.color},0.22)`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx!.stroke();

        const angle = t * s.speed + i * 2;
        const ex = Math.cos(angle) * rx;
        const ey = Math.sin(angle) * ry;

        const eGlow = ctx!.createRadialGradient(ex, ey, 0, ex, ey, s.size * 4);
        eGlow.addColorStop(0, `rgba(${s.color},0.9)`);
        eGlow.addColorStop(1, `rgba(${s.color},0)`);
        ctx!.fillStyle = eGlow;
        ctx!.beginPath();
        ctx!.arc(ex, ey, s.size * 4, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(${s.color},1)`;
        ctx!.beginPath();
        ctx!.arc(ex, ey, s.size, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.restore();
      });
    }

    function loop() {
      drawFrame();
      t += 0.012;
      animationFrameId = requestAnimationFrame(loop);
    }

    resize();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      loop();
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}