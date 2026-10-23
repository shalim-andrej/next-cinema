// src/app/components/GenreFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { GENRES } from "../api-service";

export default function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentGenre = searchParams.get("genre") || "";

  const handleGenreChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("genre", id);
    else params.delete("genre");
    params.delete("page");

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  };

  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide ${isPending ? "opacity-50" : ""}`}>
      <button
        onClick={() => handleGenreChange("")}
        className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
          currentGenre === "" 
            ? "bg-white text-black" 
            : "bg-surface-light text-neutral-400 hover:bg-surface-lighter hover:text-white"
        }`}
      >
        Все
      </button>
      
      {GENRES.map((g) => (
        <button
          key={g.id}
          onClick={() => handleGenreChange(g.id.toString())}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
            currentGenre === g.id.toString()
              ? "bg-white text-black" 
              : "bg-surface-light text-neutral-400 hover:bg-surface-lighter hover:text-white"
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}