// src/app/components/FavoriteButton.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleFavorite } from "../actions";

export default function FavoriteButton({ movieId, isFavorite }: { movieId: number; isFavorite: boolean }) {
  const [optimisticIsFavorite, addOptimisticIsFavorite] = useOptimistic(isFavorite, (_, newState: boolean) => newState);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      addOptimisticIsFavorite(!optimisticIsFavorite);
      await toggleFavorite(movieId);
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={optimisticIsFavorite}
      aria-label={optimisticIsFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      className={`flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 hover:scale-105 ${
        optimisticIsFavorite
          ? "border border-brand/30 bg-brand/10 text-brand hover:bg-brand/20 shadow-[0_0_20px_rgba(229,9,20,0.2)]"
          : "border border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
      } ${isPending ? "opacity-70" : "opacity-100"}`}
    >
      {optimisticIsFavorite ? (
        <>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          В избранном
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          В избранное
        </>
      )}
    </button>
  );
}