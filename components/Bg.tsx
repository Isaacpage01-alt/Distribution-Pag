"use client";
import { useState } from "react";

export default function Bg() {
  const [src, setSrc] = useState("/bg.jpg?v=1");
  return (
    <div className="fixed inset-0 -z-10">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        onError={() => setSrc("/banniere.png?v=1")}
      />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
