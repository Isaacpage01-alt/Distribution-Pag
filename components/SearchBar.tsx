"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";

export default function SearchBar() {
  // lit la query ?q= depuis l'URL
  const searchParams = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState<string>(searchParams.get("q") ?? "");

  // si l'URL change (ex: back/forward), on resynchronise l'input
  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = q ? `/search?q=${encodeURIComponent(q)}` : "/search";
    router.push(url);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher un produit…"
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button className="border rounded-lg px-4 py-2 bg-black text-white">
        Rechercher
      </button>
    </form>
  );
}
