// src/app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // В реальном проекте здесь можно отправить ошибку в Sentry или другую систему логирования
    console.error("Произошла ошибка:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold text-red-600">Что-то пошло не так!</h2>
        <p className="mb-8 max-w-md text-neutral-400">
          Не удалось загрузить данные. Возможно, пропал интернет или API временно недоступно.
        </p>
        
        {/* Кнопка вызывает функцию reset(), которая заново пытается сделать запрос */}
        <button
          onClick={() => reset()}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Попробовать снова
        </button>
      </div>
    </main>
  );
}