"use client";
import { useState } from "react";

/** Fond plein écran avec fallback automatique vers /banniere.png si /bg.jpg est absent */
export default function Bg() {
  const [src, setSrc] = useState("/bg.jpg?v=3"); // cache-buster

  return (
    <div className="fixed inset-0 -z-10">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        onError={() => setSrc("/banniere.png?v=3")}
      />
      {/* voile léger pour la lisibilité */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
