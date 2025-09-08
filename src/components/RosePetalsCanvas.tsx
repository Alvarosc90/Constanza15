import React, { useEffect, useRef } from "react";

/**
 * Pétalos de rosa cayendo con canvas y requestAnimationFrame.
 * - No bloquea clicks (pointer-events: none)
 * - Respeta prefers-reduced-motion
 * - Pausa cuando la pestaña no está visible
 */
type RosePetalsCanvasProps = {
  /** Cantidad de pétalos en desktop */
  count?: number;
  /** Cantidad de pétalos en mobile (<= 640px) */
  countMobile?: number;
  /** Velocidad base vertical (px/frame) */
  speedY?: number;
  /** Amplitud del balanceo horizontal */
  sway?: number;
  /** Tamaño base (px) */
  size?: number;
  /** Z-index */
  zIndex?: number;
};

const RosePetalsCanvas: React.FC<RosePetalsCanvasProps> = ({
  count = 60,
  countMobile = 30,
  speedY = 0.8,
  sway = 1.4,
  size = 18,
  zIndex = 40,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // SVG del pétalo como dataURL (negro rellenable con tint en drawImage si quisieras)
  const PETAL_SVG_DATA_URL =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path d="M32 4c7 8 12 16 12 24 0 12-10 24-12 32-2-8-12-20-12-32 0-8 5-16 12-24z"
              fill="#e11d48"/>
      </svg>`
    );

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // No renderiza si el usuario prefiere menos animación

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Carga la imagen del pétalo
    const img = new Image();
    img.src = PETAL_SVG_DATA_URL;
    imgRef.current = img;

    // Partículas
    type Petal = {
      x: number; y: number;
      vy: number; vx: number;
      rot: number; vr: number;
      size: number; phase: number;
    };

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const N = isMobile ? countMobile : count;

    const petals: Petal[] = [];
    const spawn = (y = Math.random() * H * -1) => {
      const s = size * (0.6 + Math.random() * 0.9);
      return {
        x: Math.random() * W,
        y,
        vy: speedY * (0.6 + Math.random() * 1.2),
        vx: (Math.random() - 0.5) * 0.5,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.02,
        size: s,
        phase: Math.random() * Math.PI * 2,
      } as Petal;
    };

    for (let i = 0; i < N; i++) petals.push(spawn(Math.random() * H));

    let running = true;

    const onVis = () => {
      running = !document.hidden;
      if (running) loop();
      else if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, W, H);

      const imgEl = imgRef.current;
      if (!imgEl) return;

      for (let p of petals) {
        // Sway (balanceo) horizontal + caída
        p.phase += 0.01 + Math.random() * 0.01;
        const swayX = Math.sin(p.phase) * sway;
        p.x += p.vx + swayX * 0.2;
        p.y += p.vy;
        p.rot += p.vr;

        // Reaparece arriba al salir por abajo o por los costados
        if (p.y - p.size > H + 20 || p.x < -50 || p.x > W + 50) {
          const np = spawn(-Math.random() * 120);
          p.x = np.x; p.y = np.y; p.vy = np.vy; p.vx = np.vx;
          p.rot = np.rot; p.vr = np.vr; p.size = np.size; p.phase = np.phase;
        }

        // Dibujo
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(imgEl, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    };

    img.onload = () => loop();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, countMobile, size, speedY, sway]);

  // Canvas fijo que no interfiere con el UI
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex,
      }}
    />
  );
};

export default RosePetalsCanvas;
