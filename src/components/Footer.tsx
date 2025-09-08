import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-rose-700 text-white text-center py-4 font-poppins">
      <p>© {new Date().getFullYear()} Mis XV – Constanza</p>
    </footer>
  );
};

export default Footer;
