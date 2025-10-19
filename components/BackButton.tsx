"use client";

export default function BackButton({
  className = "",
  children = "← Retour",
}: { className?: string; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => history.back()}
      className={className || "rounded-lg border border-white/20 bg-neutral-900/70 text-white px-3 py-2 text-sm hover:shadow"}
    >
      {children}
    </button>
  );
}
