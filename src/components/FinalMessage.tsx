// src/components/FinalMessage.tsx
import { motion } from "framer-motion";

export default function FinalMessage() {
  return (
    <motion.section
      id="final"
      className="relative py-10 px-2 text-center bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.5 }}
    >
      {/* Texto principal */}
      <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-body mb-10"
         style={{ color: "#920112" }}>
        Te espero para compartir la alegría de <br />
        esa noche que será para mi{" "}
        <span className="font-semibold">mágica, inolvidable</span> y{" "}
        <span className="font-semibold">única</span>.
      </p>

      {/* Firma */}
      <h3 className="text-4xl md:text-5xl font-script"
          style={{ color: "#920112" }}>
        Constanza
      </h3>

      {/* Estilos tipográficos */}
      <style>{`
        .font-body { font-family: 'Poppins', sans-serif; }
        .font-script { font-family: 'Parisienne', cursive; }
      `}</style>
    </motion.section>
  );
}
