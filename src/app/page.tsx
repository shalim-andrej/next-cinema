// src/app/page.tsx
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
// ДОБАВЛЕНЫ YEARS И RATINGS
import { getPopularMovies, searchMovies, FilterParams, YEARS, RATINGS } from "./api-service"; 
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import InfiniteMovieList from "./components/InfiniteMovieList";
import ScrollToTop from "./components/ScrollToTop";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string; year?: string; rating?: string }>;
}) {
  const { q, genre, year, rating } = await searchParams;
  const query = q?.trim() ?? "";
  
  // Собираем объект фильтров
  const filters: FilterParams = {};
  
  if (genre) filters.genreId = Number(genre);
  
  if (year) {
    const yearRange = YEARS.find(y => y.label === year);
    if (yearRange) {
      filters.yearFrom = yearRange.from;
      filters.yearTo = yearRange.to;
    }
  }
  
  if (rating) {
    const ratingRange = RATINGS.find(r => r.label === rating);
    if (ratingRange) {
      filters.ratingFrom = ratingRange.from;
      filters.ratingTo = ratingRange.to;
    }
  }

  const hasFilters = Object.keys(filters).length > 0;
  const data = query || hasFilters
    ? await searchMovies(query, 1, filters)
    : await getPopularMovies(1);

  const heroMovie = !query && !hasFilters && data.items.length > 0 ? data.items[0] : null;

  return (
    <main className="min-h-screen bg-surface pb-24 text-white">
      
      {/* HERO СЕКЦИЯ */}
      {heroMovie && (
        <section className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col-reverse items-center justify-center gap-12 px-6 py-20 md:flex-row md:justify-between md:gap-20">
          <div className="flex w-full flex-col items-start md:w-1/2">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Выбор недели
              </span>
              <span className="text-sm font-semibold text-gold">★ {heroMovie.ratingKinopoisk}</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tighter md:text-7xl lg:text-8xl">
              {heroMovie.nameRu || heroMovie.nameEn}
            </h1>
            
            <p className="mb-8 text-lg font-medium text-neutral-400">
              {heroMovie.year} • {heroMovie.genres.map((g:any) => g.genre).join(", ")}
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                href={`/movie/${heroMovie.kinopoiskId}`}
                className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-neutral-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Смотреть
              </Link>
              <Link 
                href={`/movie/${heroMovie.kinopoiskId}`}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Подробнее
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[320px] shrink-0 md:w-1/2 md:max-w-[450px]">
            <div className="absolute -inset-4 rounded-3xl bg-brand/20 blur-3xl" />
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">
              <Image
                src={heroMovie.posterUrlPreview.replace('preview', 'original')}
                alt={heroMovie.nameRu || ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw" // ДОБАВЛЕН sizes
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">
              {query ? `Результаты: «${query}»` : "Каталог фильмов"}
            </h2>
            <Suspense fallback={<div className="h-12 w-full max-w-sm animate-pulse rounded-full bg-surface-lighter" />}>
              <SearchBar />
            </Suspense>
          </div>
          
          <Suspense fallback={<div className="h-24 w-full animate-pulse rounded-xl bg-surface-lighter" />}>
            <FilterBar />
          </Suspense>
        </div>

        <InfiniteMovieList 
          initialMovies={data.items} 
          query={query} 
          filters={filters} 
          totalPages={data.totalPages} 
        />
        
      </div>

      <ScrollToTop />
    </main>
  );
}