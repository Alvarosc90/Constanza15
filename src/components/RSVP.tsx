import { motion } from "framer-motion";
import { FaCalendarCheck } from "react-icons/fa";

export default function RSVP() {
  return (
    <motion.section
      id="rsvp"
      className="relative py-16 px-6 text-center bg-[#920112] overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >

      {/* Icono */}
      <div className="flex justify-center mb-2">
        <FaCalendarCheck className="text-white text-5xl drop-shadow-sm" />
      </div>

      {/* Texto principal */}
      <p className="max-w-2xl mx-auto text-white text-lg md:text-xl leading-relaxed mb-8 font-body">
        La fiesta no sería lo mismo sin vos.{" "}
        <span className="font-semibold">Confirma tu asistencia</span> y sé parte
        de esta noche única, confirmar hasta el día{" "}
        <span className="font-semibold">09/10</span>
      </p>

      {/* Botón de confirmación (tipografía de molde: Poppins) */}
      <div className="mb-8">
        <a
          href="https://api.whatsapp.com/send/?phone=5493855879410&text=Hola%21+Confirmo+mi+asistencia+al+cumple+de+Coty%2C+yo+soy+%28tu+nombre%29%2C+y+mi+recomendaci%C3%B3n+de+canciones+es%3A&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-[#920112] px-10 py-4 rounded-full font-body font-bold shadow-lg text-lg tracking-wide transition-transform transform hover:scale-105"
        >
          CONFIRMAR
        </a>
      </div>

      {/* Mensaje extra */}
      <p className="text-white/90 text-md md:text-lg font-body">
        Cuando confirmes, <span className="font-semibold">¡mandame las canciones</span> que te gustaría escuchar esa noche!
      </p>

      <style>{`
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>
    </motion.section>
  );
}
