// src/components/DecorCorner.tsx
import React from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface DecorCornerProps {
  src: string;          // ruta del PNG (en /public o import)
  corner: Corner;       // esquina
  width?: number;       // ancho en px (default 160)
  flipX?: boolean;      // espejar horizontal
  flipY?: boolean;      // espejar vertical
  offset?: number;      // cuánto “sale” del borde (px negativos), default 12
  zIndex?: number;      // z-index
}

const DecorCorner: React.FC<DecorCornerProps> = ({
  src,
  corner,
  width = 160,
  flipX = false,
  flipY = false,
  offset = 12,
  zIndex = 2,
}) => {
  const stylePos: React.CSSProperties = {
    position: "absolute",
    width,
    ...(corner.includes("top") ? { top: -offset } : { bottom: -offset }),
    ...(corner.includes("left") ? { left: -offset } : { right: -offset }),
    zIndex,
    transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
    transformOrigin:
      corner === "top-left"
        ? "top left"
        : corner === "top-right"
        ? "top right"
        : corner === "bottom-left"
        ? "bottom left"
        : "bottom right",
    imageRendering: "crisp-edges",
    pointerEvents: "none",
    userSelect: "none",
  };

  return <img src={src} alt="" aria-hidden style={stylePos} decoding="async" loading="lazy" draggable={false} />;
};

export default DecorCorner;
