import React, { useRef, useState } from "react";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";
import { motion } from "framer-motion";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn("El navegador bloqueó la reproducción automática:", err);
      });
    }
    setPlaying(!playing);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
    >
      {/* Botón flotante animado */}
      <motion.button
        onClick={togglePlay}
        className="flex flex-col items-center gap-2 bg-[#920112] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#75010e] transition focus:outline-none"
        animate={
          playing
            ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Icono música */}
        <FaMusic className="text-2xl" />

        {/* Icono play/pause */}
        {playing ? (
          <div className="flex items-center gap-2 text-sm font-semibold">
            <FaPause /> <span className="hidden sm:inline">Pausar</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-semibold">
            <FaPlay /> <span className="hidden sm:inline">¡Reproducime!</span>
          </div>
        )}
      </motion.button>

      {/* Elemento de audio */}
      <audio ref={audioRef} src="/Coldplay-Paradise.mp3" loop />
    </motion.div>
  );
};

export default MusicPlayer;
