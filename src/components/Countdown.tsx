import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate).getTime() - new Date().getTime();
      setTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="bg-white py-10 text-center">
      <h3 className="text-2xl font-bold text-rose-600 mb-4">Faltan</h3>
      <div className="flex justify-center gap-6">
        <div><span className="text-3xl font-bold">{timeLeft.days}</span> días</div>
        <div><span className="text-3xl font-bold">{timeLeft.hours}</span> horas</div>
        <div><span className="text-3xl font-bold">{timeLeft.minutes}</span> min</div>
      </div>
    </section>
  );
};

export default Countdown;
