// src/app/components/FilterBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { GENRES, YEARS, RATINGS } from "../api-service";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentGenre = searchParams.get("genre") || "";
  const currentYear = searchParams.get("year") || "";
  const currentRating = searchParams.get("rating") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // Сбрасываем страницу при смене фильтра

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  };

  // Стили для неактивной и активной кнопки
  const btnClass = (isActive: boolean) => 
    `whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
      isActive 
        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
        : "bg-surface-light text-neutral-400 hover:bg-surface-lighter hover:text-white"
    }`;

  return (
    <div className={`flex flex-col gap-5 transition-opacity duration-300 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      
      {/* 1 СТРОКА: ЖАНРЫ */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-widest text-neutral-500">
          Жанры
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => updateFilter("genre", "")} className={btnClass(currentGenre === "")}>
            Все
          </button>
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => updateFilter("genre", g.id.toString())}
              className={btnClass(currentGenre === g.id.toString())}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2 СТРОКА: ГОДА */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-widest text-neutral-500">
          Год
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => updateFilter("year", "")} className={btnClass(currentYear === "")}>
            Все
          </button>
          {YEARS.map((y) => (
            <button
              key={y.label}
              onClick={() => updateFilter("year", y.label)}
              className={btnClass(currentYear === y.label)}
            >
              {y.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 СТРОКА: РЕЙТИНГ */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-widest text-neutral-500">
          Рейтинг
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => updateFilter("rating", "")} className={btnClass(currentRating === "")}>
            Любой
          </button>
          {RATINGS.filter(r => r.label !== "Любой").map((r) => (
            <button
              key={r.label}
              onClick={() => updateFilter("rating", r.label)}
              className={btnClass(currentRating === r.label)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}