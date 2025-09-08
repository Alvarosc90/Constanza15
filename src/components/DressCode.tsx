import { motion } from "framer-motion";
import { FaExclamationTriangle, FaUserTie, FaFemale } from "react-icons/fa";

interface DressCodeProps {
  code: string;
  accentHex?: string; // color principal (por defecto rojo pasión)
}

const DressCode: React.FC<DressCodeProps> = ({ code, accentHex = "#920112" }) => {
  return (
    <motion.section
      id="dresscode"
      className="relative py-14 px-6 text-center max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border"
      style={{ borderColor: accentHex }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ícono + título */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <FaExclamationTriangle
          className="text-3xl animate-pulse drop-shadow-sm"
          style={{ color: accentHex }}
        />
        <h3
          className="text-4xl font-script drop-shadow-sm"
          style={{ color: accentHex }}
        >
          Dress Code
        </h3>
      </div>

      {/* Mensaje */}
      <p
        className="text-lg md:text-xl font-body leading-relaxed"
        style={{ color: accentHex }}
      >
        {code}
      </p>

      {/* Íconos de vestimenta */}
      <div className="mt-8 flex justify-center gap-10 text-black">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="flex flex-col items-center gap-2"
        >
          <FaUserTie className="text-5xl" />
          <span className="text-sm font-medium text-black"></span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex flex-col items-center gap-2"
        >
          <FaFemale className="text-5xl" />
          <span className="text-sm font-medium text-black"></span>
        </motion.div>
      </div>

      {/* Estilos tipográficos */}
      <style>{`
        .font-script { font-family: 'Parisienne', cursive; }
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>
    </motion.section>
  );
};

export default DressCode;
