import React, { useEffect, useMemo, useState } from "react";
import { FaBars, FaTimes, FaCheckCircle } from "react-icons/fa";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "countdown", label: "Cuenta regresiva" },
  { id: "location", label: "Ubicación" },
  { id: "dresscode", label: "Código de vestimenta" },
  { id: "rsvp", label: "Confirmar" },
  { id: "final", label: "Mensaje final" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [progress, setProgress] = useState(0);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy (observa las secciones y actualiza "active")
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      {
        // margen para contemplar header fijo
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0.01,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const onNav = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  const NavItem: React.FC<{ id: string; label: string }> = ({ id, label }) => {
    const isActive = active === id;
    return (
      <button
        onClick={() => onNav(id)}
        className={[
          "relative transition font-medium",
          isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
        ].join(" ")}
      >
        <span
          className={[
            "nav-underline",
            "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300",
            isActive ? "after:w-full" : "hover:after:w-full",
          ].join(" ")}
        >
          {label}
        </span>
      </button>
    );
  };

  // sombra más intensa cuando se scrollea
  const elevated = useMemo(() => typeof window !== "undefined" && window.scrollY > 4, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-md bg-gradient-to-r from-rose-700/95 via-rose-700/90 to-rose-700/95",
        "text-white",
        "transition-shadow",
      ].join(" ")}
      style={{
        boxShadow:
          elevated || progress > 0
            ? "0 8px 24px rgba(0,0,0,.16)"
            : "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      {/* Barra de progreso de scroll */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-white/90"
        style={{ width: `${progress}%` }}
      />

      <div className="h-14 md:h-16 flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Marca / Logo texto */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm md:text-base font-semibold tracking-wide"
          aria-label="Ir al inicio"
        >
          Mis XV – Constanza
        </button>

        {/* Menú desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-body">
          {sections.slice(0, -2).map((s) => (
            <NavItem key={s.id} id={s.id} label={s.label} />
          ))}

        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNav("rsvp")}
            className="inline-flex items-center gap-2 rounded-full bg-white text-rose-700 px-5 py-2.5 text-sm font-bold shadow hover:shadow-lg transition"
          >
            <FaCheckCircle />
            Confirmar
          </button>
        </div>

        {/* Hamburguesa mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Panel desplegable mobile */}
      <div
        className={[
          "md:hidden border-t border-white/10 overflow-hidden",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300 ease-out bg-rose-700/95",
        ].join(" ")}
      >
        <nav className="flex flex-col py-2 font-body">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onNav(s.id)}
              className={[
                "text-left px-4 py-3 hover:bg-white/10 transition",
                active === s.id ? "bg-white/10" : "",
              ].join(" ")}
            >
              {s.label}
            </button>
          ))}

          {/* CTA móvil */}
          <div className="px-4 py-3">
            <button
              onClick={() => onNav("rsvp")}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-rose-700 px-5 py-3 text-sm font-bold shadow hover:shadow-lg transition"
            >
              <FaCheckCircle />
              Confirmar asistencia
            </button>
          </div>
        </nav>
      </div>

      {/* estilos locales para subrayado */}
      <style>{`
        .nav-underline { position: relative; padding-bottom: 2px; }
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>
    </header>
  );
};

export default Header;
