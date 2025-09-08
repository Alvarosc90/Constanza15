import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

interface LocationProps {
  place: string;
}

export default function Location({ place }: LocationProps) {
  return (
    <motion.section
      className="py-12 px-4 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Título con ícono */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaMapMarkerAlt className="text-rose-600 text-3xl drop-shadow-md" />
        <h2 className="text-3xl md:text-4xl font-[Parisienne] text-rose-700 drop-shadow-md">
          {place}
        </h2>
      </div>

      {/* Marco decorativo */}
      <div className="relative max-w-4xl mx-auto p-2 bg-gradient-to-br from-rose-50 via-white to-rose-100 rounded-3xl shadow-xl border-4 border-rose-200">
        <div className="border-2 border-rose-300 rounded-2xl p-1 shadow-inner">
          <iframe
            title={`Ubicación de ${place}`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.307826073067!2d-64.2408017!3d-27.8468453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b4fbad95f63d7%3A0x5ace9fb2a6b51e99!2sLas%20Maria's%20Multiespacio!5e0!3m2!1ses-419!2sar!4v1699999999999!5m2!1ses-419!2sar"
            width="100%"
            height="350"
            className="rounded-xl shadow-lg"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </motion.section>
  );
}
