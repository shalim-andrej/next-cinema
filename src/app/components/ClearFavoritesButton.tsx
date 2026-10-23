// src/app/components/ClearFavoritesButton.tsx
"use client";

import { useTransition } from "react";
import { clearFavorites } from "../actions";

export default function ClearFavoritesButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Вы уверены, что хотите полностью очистить избранное?")) {
          startTransition(() => {
            clearFavorites();
          });
        }
      }}
      disabled={isPending}
      className="group flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-6 py-3 text-sm font-bold text-brand backdrop-blur-md transition-all hover:bg-brand/10 hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] disabled:opacity-50"
    >
      <svg className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      {isPending ? "Очистка..." : "Очистить всё"}
    </button>
  );
}