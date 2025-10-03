import React, { useEffect, useMemo, useRef, useState } from "react";

interface GalleryProps {
  images?: string[];
  intervalMs?: number; // tiempo entre slides
}

const DEFAULT_IMAGES = ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg"];

const Gallery: React.FC<GalleryProps> = ({ images, intervalMs = 3500 }) => {
  const slides = useMemo(() => (images?.length ? images : DEFAULT_IMAGES), [images]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);
  const hoverRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);
  const go = (i: number) => setIdx(((i % slides.length) + slides.length) % slides.length);

  // autoplay con pausa en hover
  useEffect(() => {
    const tick = () => {
      if (!hoverRef.current) next();
    };
    timerRef.current = window.setInterval(tick, intervalMs) as unknown as number;
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs, slides.length]);

  return (
    <section
      className="relative bg-pink-50 py-10 select-none"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchMove={(e) => {
        if (touchStartX.current == null) return;
        const delta = e.touches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 60) {
          delta < 0 ? next() : prev();
          touchStartX.current = null;
        }
      }}
      onTouchEnd={() => (touchStartX.current = null)}
    >
      <h3 className="text-2xl font-bold text-rose-600 text-center mb-6">Galería</h3>

      {/* Viewport */}
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={i} className="min-w-full h-[360px] md:h-[520px] bg-gray-200">
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2 shadow"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white p-2 shadow"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a la foto ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === idx ? "w-6 bg-rose-600" : "w-2.5 bg-white/80 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
