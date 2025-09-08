import { motion } from "framer-motion";

export default function RSVP() {
  return (
    <motion.div
      className="text-center my-12"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-cursive text-red-700 mb-4">
        📲 Confirmar asistencia
      </h2>
      <a
        href="https://api.whatsapp.com/send/?phone=5493855879410&text=Hola%21+Confirmo+mi+asistencia+al+cumple+de+Coty%2C+yo+soy+%28tu+nombre%29%2C+y+mi+recomendaci%C3%B3n+de+canciones+es%3A&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg text-lg transition-transform transform hover:scale-105"
      >
        Confirmar vía WhatsApp
      </a>
    </motion.div>
  );
}
