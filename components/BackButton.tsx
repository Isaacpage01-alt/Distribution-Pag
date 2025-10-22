"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="rounded-full border border-white/30 px-3 py-1 text-white hover:bg-white/10"
      aria-label="Retour"
      title="Retour"
    >
      ← Retour
    </button>
  );
}
