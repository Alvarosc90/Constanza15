// src/components/LogoXV.tsx
import React, { useRef } from "react";
// opcional para exportar PNG:
// import { toPng } from "html-to-image";

type Props = {
  name: string;
  title?: string;
  width?: number;
  titleColor?: string;
  strokeColor?: string;
  allowDownload?: boolean;
};

const LogoXV: React.FC<Props> = ({
  name,
  title = "Mis XV",
  width = 460,
  titleColor = "#8B2E3C",
  strokeColor = "#111111",
  allowDownload = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = async () => {
    if (!svgRef.current) return;
    // const dataUrl = await toPng(svgRef.current, { cacheBust: true, backgroundColor: "transparent" });
    // const a = document.createElement("a");
    // a.href = dataUrl;
    // a.download = `logo-xv-${name}.png`;
    // a.click();
  };

  return (
    <div className="inline-flex flex-col items-center gap-3">
      <svg
        ref={svgRef}
        width={width}
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="600" height="600" fill="none" />

        {/* Aro principal con gap */}
        <circle
          cx="300"
          cy="300"
          r="210"
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeDasharray="990 240"
          transform="rotate(-18 300 300)"
        />

        {/* Tallo + hojas izquierdas (line art) */}
        <g
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M190 115 C150 180,145 260,190 330" />
          <path d="M178 150 C165 160,160 175,168 190" />
          <path d="M185 180 C170 190,168 205,177 220" />
          <path d="M192 210 C178 220,176 235,186 250" />
          <path d="M198 242 C184 252,182 267,194 282" />
          <path d="M202 275 C190 286,190 300,202 312" />
          <path d="M158 188 C166 182,176 182,182 190" />
          <path d="M165 222 C173 216,183 216,189 224" />
        </g>

        {/* Título */}
        <text
          x="300"
          y="280"
          textAnchor="middle"
          fill={titleColor}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900 as any,
            fontSize: "108px",
            letterSpacing: "1px",
          }}
        >
          {title}
        </text>

        {/* Nombre */}
        <text
          x="300"
          y="350"
          textAnchor="middle"
          fill="#111"
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "78px",
          }}
        >
          {name}
        </text>
      </svg>

      {allowDownload && (
        <button
          onClick={handleDownload}
          className="rounded-full px-4 py-2 text-sm bg-rose-600 text-white hover:bg-rose-700 transition"
        >
          Descargar PNG (transparente)
        </button>
      )}
    </div>
  );
};

export default LogoXV;
