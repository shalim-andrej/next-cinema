// src/app/favorites/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { getMovieDetails } from "../api-service";
import ClearFavoritesButton from "../components/ClearFavoritesButton";
import MovieCard from "../components/MovieCard";

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const favoritesCookie = cookieStore.get("favorites")?.value;
  const favoriteIds = favoritesCookie ? favoritesCookie.split(",") : [];

  if (favoriteIds.length === 0) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <svg className="h-16 w-16 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="mb-3 text-3xl font-black">Здесь пока пусто</h1>
        <p className="mb-8 max-w-md text-neutral-400">
          Вы еще не добавили ни один фильм в свою коллекцию. Самое время это исправить!
        </p>
        <Link 
          href="/" 
          className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-neutral-200"
        >
          Перейти к фильмам
        </Link>
      </main>
    );
  }

  const moviesData = await Promise.all(favoriteIds.map((id) => getMovieDetails(id)));
  const movies = moviesData.filter((movie) => movie !== null);

  return (
    <main className="min-h-screen pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            Моя коллекция <span className="ml-2 text-brand">{movies.length}</span>
          </h1>
          <ClearFavoritesButton />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {movies.map((movie, index) => (
            <MovieCard key={movie.kinopoiskId} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}