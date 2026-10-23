// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-neutral-950 px-4 text-white">
      <div className="text-center">
        {/* Большая цифра 404 с эффектом градиента */}
        <h1 className="mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-8xl font-black text-transparent sm:text-9xl">
          404
        </h1>
        
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          Фильм не найден
        </h2>
        
        <p className="mx-auto mb-8 max-w-md text-neutral-400">
          Возможно, страница была удалена, или вы ошиблись в адресе. Но не расстраивайтесь, у нас есть много других интересных фильмов!
        </p>
        
        <Link
          href="/"
          className="inline-block rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 hover:scale-105 active:scale-95"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}