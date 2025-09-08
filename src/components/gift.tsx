// src/components/Gift.tsx
import { motion } from "framer-motion";
import { FaGift, FaCopy } from "react-icons/fa";

interface GiftProps {
  alias: string; // ej: "Constanza.rc.mp"
  accentHex?: string; // rojo pasión (default #920112)
}

const Gift: React.FC<GiftProps> = ({ alias, accentHex = "#920112" }) => {
  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText(alias);
      alert("Alias copiado ✨");
    } catch {
      /* noop */
    }
  };

  return (
    <motion.section
      id="gift"
      className="relative w-full py-24 px-6 text-center bg-white"
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
        />
      </div>

      {/* Texto introductorio */}
      <p className="text-xl md:text-2xl font-body text-neutral-800 mb-10 leading-relaxed">
        Si no sabes qué regalarme, aquí te dejo <br />
        <span className="font-semibold">mi alias</span> como opción.
      </p>

      {/* Alias resaltado */}
      <div className="flex justify-center mb-10">
        <button
          onClick={copyAlias}
          className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-2xl font-bold text-white shadow-lg transition-transform hover:scale-105"
          style={{
            background: accentHex,
            boxShadow: "0 12px 26px rgba(146,1,18,0.25)",
          }}
        >
          {alias}
          <FaCopy className="text-lg opacity-90" />
        </button>
      </div>

      {/* Nota final */}
      <p className="text-lg md:text-xl text-neutral-700">
        ¡Lo importante es compartir ese momento juntos!
      </p>

      {/* Decoraciones opcionales */}
      <img
        src="/decor-left.png"
        alt=""
        aria-hidden
        className="absolute top-8 left-6 w-32 opacity-80 pointer-events-none"
      />
      <img
        src="/decor-right.png"
        alt=""
        aria-hidden
        className="absolute bottom-8 right-6 w-32 opacity-80 pointer-events-none"
      />

      {/* Fuente */}
      <style>{`
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>
    </motion.section>
  );
};

export default Gift;
