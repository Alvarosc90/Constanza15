import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

interface HeroProps {
  name: string;
  date: string;
  time: string;
}

const Hero: React.FC<HeroProps> = ({ name, date, time }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bubbles: { x: number; y: number; r: number; speed: number; drift: number; color: string }[] = [];
    const colors = ["rgba(255,182,193,0.3)", "rgba(255,105,180,0.3)", "rgba(255,255,255,0.2)"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    for (let i = 0; i < 25; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 8 + 3,
        speed: Math.random() * 0.6 + 0.2,
        drift: Math.random() * 0.5 - 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        b.y += b.speed;
        b.x += b.drift + (mouseX / window.innerWidth - 0.5) * 0.05;

        if (b.y > canvas.height + 10) {
          b.y = -10;
          b.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 flex flex-col items-center justify-center text-center overflow-hidden overflow-x-hidden">
      {/* Fondo floral PNG */}
      <img
        src="/fondo.png"
        alt="Fondo floral"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      />

      {/* Canvas burbujas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      ></canvas>

      {/* Decoraciones */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <img src="/flores-top.png" alt="" aria-hidden className="absolute top-0 left-0 w-40 opacity-70" />
        <img src="/flores-bottom.png" alt="" aria-hidden className="absolute bottom-0 right-0 w-40 opacity-70" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-30 w-full max-w-4xl px-4">
        {/* LOGO respirando continuo (sin reinicio visible) */}
        <div className="flex justify-center mb-1 md:mb-2">
          <img
            src="/logo.png"
            alt={`Logo Mis XV - ${name}`}
            className="breath w-[260px] sm:w-[320px] md:w-[420px] lg:w-[500px] h-auto"
            style={{ filter: "drop-shadow(0 10px 28px rgba(139,46,60,.22))" }}
          />
        </div>

        {/* Fecha y hora — pegadas al logo y SIN desbordes */}
        <motion.div
          className="relative mx-auto mt-1 md:mt-2 w-full max-w-[90vw] sm:max-w-[24rem] overflow-hidden px-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Anillos seguros (ocultos en mobile para zero overflow) */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-rose-200/40 rotate-2 hidden sm:block" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-pink-200/40 -rotate-2 hidden sm:block" />

          <div className="relative bg-gradient-to-b from-rose-50 to-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-lg border border-rose-100">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarAlt className="text-base sm:text-lg text-rose-600 shrink-0" />
                <span className="text-sm sm:text-base md:text-lg font-medium text-rose-800 truncate">
                  {date}
                </span>
              </div>
              <div className="text-sm sm:text-lg md:text-xl font-bold text-rose-700 bg-white px-4 sm:px-5 py-1.5 rounded-full border border-rose-200 shadow-inner">
                {time} hs
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-rose-700 flex items-center"
        >
          <span className="mr-2">Ver más detalles</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Keyframes para el “breath” continuo */}
      <style jsx global>{`
        @keyframes breath {
          0% { transform: scale(1); }
          100% { transform: scale(1.03); }
        }
        .breath {
          animation: breath 4.5s ease-in-out infinite alternate;
          will-change: transform;
        }
        @font-face {
          font-family: 'GreatVibes';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/greatvibes/v9/RWmMoKWR9v4ksMfaWd_JN9XKiaQ6DQ.woff2) format('woff2');
        }
        .font-serif { font-family: Georgia, 'Times New Roman', Times, serif; }
      `}</style>
    </section>
  );
};

export default Hero;
