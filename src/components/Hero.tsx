// src/components/Hero.tsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

interface HeroProps {
  name: string;
  date: string;            // "01/11/2025" (DD/MM/YYYY)
  time: string;            // "21:30"     (HH:mm)
  logoSrc?: string;        // "/logo.png"
  bgPatternSrc?: string;   // "/fondo.png"
  decoTopSrc?: string;     // "/flores-top.png"
  decoBottomSrc?: string;  // "/flores-bottom.png"
  accentHex?: string;      // "#920112" (rojo pasión)

  // Opcionales para el botón de Agendar
  calendarTitle?: string;      // ej: "Mis XV – Constanza"
  calendarLocation?: string;   // ej: "Las Marias Multiespacio, C. Estrecho..."
  durationHours?: number;      // default 6
}

const Hero: React.FC<HeroProps> = ({
  name,
  date,
  time,
  logoSrc = "/logo2.png",
  bgPatternSrc = "/fondo.png",
  decoTopSrc = "/flores-top.png",
  decoBottomSrc = "/flores-bottom.png",
  accentHex = "#920112",
  calendarTitle,
  calendarLocation,
  durationHours = 6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ===== Utilidades fecha/hora =====
  const parseDateTime = (d: string, t: string) => {
    // d: "DD/MM/YYYY", t: "HH:mm"
    try {
      const [dd, mm, yyyy] = d.split("/").map(Number);
      const [HH, MM] = t.split(":").map(Number);
      // Construimos en hora local del dispositivo (para que al usuario le coincida)
      return new Date(yyyy, (mm ?? 1) - 1, dd ?? 1, HH ?? 0, MM ?? 0, 0);
    } catch {
      return null;
    }
  };

  const formatFechaBonita = (dt: Date | null) => {
    if (!dt) return { linea1: date, linea2: `${time} hs` };
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diaNombre = dias[dt.getDay()];
    const diaNumero = dt.getDate();
    const mesNombre = meses[dt.getMonth()];
    // "Sábado 1 de"  +  "Noviembre - 21:30 hs"
    return {
      linea1: `${capitalize(diaNombre)} ${diaNumero} de`,
      linea2: `${mesNombre} - ${time} hs`,
    };
  };

  const buildGoogleCalendarUrl = (start: Date | null) => {
    if (!start) return "#";
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

    // Pasamos a UTC y formateamos YYYYMMDDTHHmmssZ
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z"); // 2025-11-01T00:00:00.000Z -> 20251101T000000Z

    const text = encodeURIComponent(calendarTitle ?? `Fiesta de 15 de ${name}`);
    const details = encodeURIComponent("Te espero para celebrar una noche inolvidable ✨");
    const location = encodeURIComponent(calendarLocation ?? "");
    const dates = `${fmt(start)}/${fmt(end)}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const startDate = parseDateTime(date, time);
  const fechaBonita = formatFechaBonita(startDate);
  const calendarUrl = buildGoogleCalendarUrl(startDate);

  // ===== Canvas bubbles (DPR, cleanup, reduce motion) =====
  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "rgba(255,182,193,0.28)",  // light pink
      "rgba(255,105,180,0.28)",  // hot pink
      "rgba(255,255,255,0.2)",
    ];

    let raf = 0;
    let mouseX = 0;
    let bubbles: { x: number; y: number; r: number; speed: number; drift: number; color: string }[] = [];

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      bubbles = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 10 + 4,
          speed: Math.random() * 0.7 + 0.2,
          drift: Math.random() * 0.6 - 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const onMouse = (e: MouseEvent) => (mouseX = e.clientX);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const wind = (mouseX / window.innerWidth - 0.5) * 0.12;

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        b.y += b.speed;
        b.x += b.drift + wind;

        if (b.y > window.innerHeight + 12) {
          b.y = -12;
          b.x = Math.random() * window.innerWidth;
        }
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("countdown");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #fff1f2 0%, #ffffff 55%, #fff1f2 100%)",
      }}
    >
      {/* Fondo floral PNG */}
      <img
        src={bgPatternSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      />

      {/* Canvas burbujas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Decoraciones */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <img src={decoTopSrc} alt="" aria-hidden className="absolute top-0 left-0 w-44 md:w-60 opacity-80" />
        <img src={decoBottomSrc} alt="" aria-hidden className="absolute bottom-0 right-0 w-44 md:w-60 opacity-80" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-30 w-full max-w-5xl px-6">
        {/* Logo / Sello respirando */}
        <div className="flex justify-center mb-4 md:mb-6">
          <img
            src={logoSrc}
            alt={`Mis XV – ${name}`}
            className="breath w-[min(88vw,600px)] sm:w-[420px] md:w-[520px] lg:w-[600px] h-auto"
            style={{ filter: "drop-shadow(0 14px 30px rgba(146,1,18,.18))" }}
          />
        </div>


        {/* Tarjeta fecha y hora centrada (contenedor grande) */}
        <motion.div
          className="relative mx-auto w-full max-w-2xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* anillos decorativos (solo desktop para evitar overflow) */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-rose-200/50 rotate-2 hidden sm:block" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-pink-200/50 -rotate-2 hidden sm:block" />

          <div className="relative rounded-3xl border border-rose-100 bg-white/90 shadow-xl px-6 py-6 md:px-8 md:py-7">
            <div className="flex flex-col items-center gap-2 text-rose-800">
              <div className="text-base md:text-lg font-medium leading-tight whitespace-pre-line text-rose-900">
                {/* Línea superior: Sábado 1 de */}
                {fechaBonita.linea1}
              </div>
              <div
                className="text-lg md:text-2xl font-bold px-5 md:px-6 py-2 rounded-full shadow-inner border"
                style={{
                  color: accentHex,
                  background: "white",
                  borderColor: "#fecdd3",
                }}
              >
                {/* Línea inferior: Noviembre - 21:30 hs */}
                {fechaBonita.linea2}
              </div>
            </div>

            {/* Botón Agendar en Google Calendar */}
            <div className="mt-4 flex justify-center">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow transition"
                style={{
                  background: accentHex,
                  color: "#ffffff",
                  boxShadow: "0 8px 24px rgba(146,1,18,0.25)",
                }}
              >
                <FaCalendarAlt className="text-white" />
                Agendar
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 flex flex-col items-center text-rose-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        aria-label="Ver más detalles"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-sm"
        >
          Ver más detalles
        </motion.span>
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>

      {/* Keyframes locales */}
      <style>{`
        @keyframes breath { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }
        .breath { animation: breath 4.6s ease-in-out infinite alternate; will-change: transform; }
      `}</style>
    </section>
  );
};

export default Hero;
