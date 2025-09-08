import React, { useState, useEffect, useMemo } from "react";

interface CountdownProps {
  /** ISO local recomendado: "2025-11-01T21:30:00" */
  targetDate: string;
}

const pad = (n: number) => n.toString().padStart(2, "0");

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const target = useMemo(() => new Date(targetDate), [targetDate]);

  const getDiff = () => {
    const now = new Date().getTime();
    const end = target.getTime();
    const diff = Math.max(0, end - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getDiff);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getDiff()), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return (
    <section
      id="countdown"
      className="bg-white py-12 text-center"
      aria-label="Cuenta regresiva"
    >
      <h3 className="text-3xl md:text-6xl font-extrabold text-rose-700 mb-8">
        Faltan
      </h3>

      <div className="flex justify-center gap-2 md:gap-6">
        {[
          { value: pad(timeLeft.days), label: "días" },
          { value: pad(timeLeft.hours), label: "horas" },
          { value: pad(timeLeft.minutes), label: "min" },
          { value: pad(timeLeft.seconds), label: "seg" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex-1 max-w-[70px] md:min-w-[120px] rounded-xl md:rounded-3xl border border-rose-200 bg-rose-50 px-2 md:px-6 py-4 md:py-6 shadow-md"
          >
            <div className="text-2xl md:text-6xl font-extrabold text-rose-700">
              {item.value}
            </div>
            <div className="mt-1 text-xs md:text-base uppercase tracking-widest text-rose-600">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Countdown;
