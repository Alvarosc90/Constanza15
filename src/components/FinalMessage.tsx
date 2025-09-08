import { motion } from "framer-motion";

export default function FinalMessage() {
  return (
    <motion.div
      className="text-center my-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <h2 className="text-5xl font-cursive text-red-700 mb-4">¡Te espero!</h2>
      <p className="text-xl text-gray-700 font-cursive">
        Será una noche mágica ✨
      </p>
    </motion.div>
  );
}
