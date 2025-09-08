import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDirections, FaCopy } from "react-icons/fa";
import DecorCorner from "./DecorCorner";

interface LocationProps {
  place: string;
  address?: string;
  mapUrl?: string;
  accentHex?: string;
  embedSrc?: string;
}

const Location: React.FC<LocationProps> = ({
  place,
  address = "C. Estrecho San Carlos\nCapital, Santiago del Estero",
  mapUrl = "https://maps.app.goo.gl/J4XXTugm6hoEeTqq7",
  accentHex = "#920112",
  embedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.307826073067!2d-64.2408017!3d-27.8468453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b4fbad95f63d7%3A0x5ace9fb2a6b51e99!2sLas%20Maria's%20Multiespacio!5e0!3m2!1ses-419!2sar!4v1699999999999!5m2!1ses-419!2sar",
}) => {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${place}\n${address}`);
      alert("Dirección copiada ✨");
    } catch {
      /* noop */
    }
  };

  return (
    <motion.section
      id="location"
      className="relative py-16 px-4 text-center text-white overflow-hidden"
      style={{ background: accentHex }}
    // ...
    >
      {/* Esquina superior izquierda — usar la blanca y espejar vertical */}
      <DecorCorner
        src="/bottom-white.png"
        corner="top-left"
        width={190}       // ajustá a gusto
        flipY
        offset={16}
      />

      {/* Esquina inferior derecha — usar la otra blanca y espejar horizontal */}
      <DecorCorner
        src="/bottom-white2.png"
        corner="bottom-right"
        width={190}
        flipX
        offset={16}
      />



      {/* Título */}
      <motion.div
        className="mb-8 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <FaMapMarkerAlt className="text-3xl drop-shadow-md" />
        <h2 className="text-4xl md:text-5xl font-script drop-shadow-sm">
          Ubicación
        </h2>
      </motion.div>

      {/* Tarjeta info + mapa */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 font-body">
        {/* Datos de dirección */}
        <motion.div
          className="rounded-3xl bg-white/95 text-neutral-800 p-8 text-left shadow-xl"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-700">
            <FaMapMarkerAlt />
            <span className="text-sm font-medium">Salón</span>
          </div>

          <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-rose-700">
            {place}
          </h3>

          <p className="mt-2 whitespace-pre-line leading-relaxed text-neutral-700">
            {address}
          </p>

          {/* Acciones */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow transition hover:opacity-95"
              style={{
                background: accentHex,
                boxShadow: "0 10px 20px rgba(146,1,18,0.22)",
              }}
            >
              <FaDirections />
              Cómo llegar
            </a>

            <button
              onClick={copyAddress}
              className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
            >
              <FaCopy />
              Copiar dirección
            </button>
          </div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title={`Mapa de ${place}`}
            src={embedSrc}
            className="h-[380px] w-full rounded-3xl transition-transform duration-500 ease-out hover:scale-[1.02]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>

      <style>{`
        .font-script { font-family: 'Parisienne', cursive; }
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>
    </motion.section>
  );
};

export default Location;
