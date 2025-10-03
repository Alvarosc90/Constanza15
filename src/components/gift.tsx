// src/components/Gift.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGift, FaCopy, FaCheck } from "react-icons/fa";

interface GiftProps {
  alias: string; // ej: "Constanza.rc.mp"
  accentHex?: string; // rojo pasión (default #920112)
}

const Gift: React.FC<GiftProps> = ({ alias, accentHex = "#920112" }) => {
  const [copied, setCopied] = useState(false);

  const copyAlias = async () => {
    try {
      // Copiar al portapapeles con fallback
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(alias);
      } else {
        const el = document.createElement("textarea");
        el.value = alias;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }

      // Haptic feedback si existe
      if ("vibrate" in navigator) {
        // @ts-ignore
        navigator.vibrate?.(10);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  };

  return (
    <motion.section
      id="gift"
      className="relative w-full py-12 px-6 text-center bg-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ícono */}
      <div className="flex justify-center mb-6">
        <FaGift
          className="text-6xl drop-shadow-md"
          style={{ color: accentHex }}
          aria-hidden="true"
          focusable="false"
        />
      </div>

      {/* Texto introductorio */}
      <p className="text-xl md:text-2xl font-body text-neutral-800 mb-10 leading-relaxed">
        Si no sabes qué regalarme, aquí te dejo <br />
        <span className="font-semibold">mi alias</span> como opción.
      </p>

      {/* Alias + acción copiar */}
      <div className="flex justify-center mb-10">
        <button
          type="button"
          onClick={copyAlias}
          title="Copiar alias"
          aria-label={`Copiar alias ${alias}`}
          className="inline-flex items-center justify-center gap-5 rounded-full px-8 md:px-10 py-4 md:py-5 text-white shadow-lg transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-4"
          style={{
            background: accentHex,
            boxShadow: "0 12px 26px rgba(146,1,18,0.25)",
          }}
        >
          {/* Alias con tipografía legible, sin cursiva ni ligaduras */}
          <span className="alias-text text-lg md:text-2xl font-bold select-all">
            {alias}
          </span>

          {/* Separador sutil */}
          <span
            aria-hidden="true"
            className="hidden md:inline-block w-px h-6 md:h-7"
            style={{ background: "rgba(255,255,255,0.35)" }}
          />

          {/* Acción de copiado (visible) */}
          <span className="inline-flex items-center gap-2 text-sm md:text-base font-semibold">
            {copied ? (
              <>
                <FaCheck aria-hidden="true" focusable="false" />
                Copiado
              </>
            ) : (
              <>
                <FaCopy role="img" aria-label="Copiar alias" />
                Copiar alias
              </>
            )}
          </span>

          {/* Anuncio accesible para lectores de pantalla */}
          <span className="sr-only" aria-live="polite">
            {copied ? "Alias copiado" : ""}
          </span>
        </button>
      </div>

      {/* Nota final */}
      <p className="text-lg md:text-xl text-neutral-700">
        ¡Lo importante es compartir ese momento juntos!
      </p>

      {/* Fuentes y utilidades */}
      <style>{`
        .font-body { font-family: 'Poppins', sans-serif; }

        /* Fuente del alias: clara, sin cursiva ni ligaduras, mono-espaciada para distinguir puntos y letras */
        .alias-text {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-style: normal;
          font-variant-ligatures: none;
          letter-spacing: .2px;
        }

        /* Si no usas Tailwind's sr-only en tu build, este fallback asegura accesibilidad */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Anillo de enfoque accesible */
        .focus-visible\\:ring-4:focus-visible {
          box-shadow: 0 0 0 4px rgba(255,255,255,0.6), 0 0 0 8px ${accentHex}55;
        }
      `}</style>
    </motion.section>
  );
};

export default Gift;
