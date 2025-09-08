import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface DressCodeProps {
  code: string;
}

const DressCode: React.FC<DressCodeProps> = ({ code }) => {
  return (
    <motion.section
      className="py-12 px-4 text-center bg-gradient-to-br from-rose-50 via-white to-rose-100 rounded-3xl shadow-lg max-w-3xl mx-auto border-2 border-rose-300 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Fondo decorativo suave */}
      <div className="absolute inset-0 opacity-10 bg-[url('/flores-top.png')] bg-no-repeat bg-center bg-contain pointer-events-none"></div>

      {/* Ícono y título */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <FaExclamationTriangle className="text-rose-600 text-3xl animate-pulse" />
        <h3 className="text-3xl font-[Parisienne] text-rose-700 drop-shadow-sm">
          Dress Code
        </h3>
      </div>

      {/* Mensaje */}
      <p className="text-lg md:text-xl font-medium text-gray-800 px-4">
        {code}
      </p>
    </motion.section>
  );
};

export default DressCode;
