// src/components/Header.tsx
import React from "react";

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "countdown", label: "Cuenta regresiva" },
  { id: "location", label: "Ubicación" },
  { id: "dresscode", label: "Código de vestimenta" },
  { id: "gallery", label: "Galería" },
  { id: "rsvp", label: "Confirmar" },
  { id: "final", label: "Mensaje final" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Header: React.FC = () => {
  return (
    <header className="bg-rose-700 text-white fixed top-0 w-full z-50 shadow-md font-poppins">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-6 py-4">
        {/* Navegación */}
        <nav className="hidden md:flex space-x-6 text-sm sm:text-base">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="hover:opacity-80 transition"
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
