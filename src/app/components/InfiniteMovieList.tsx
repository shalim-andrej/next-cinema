// src/app/components/InfiniteMovieList.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Movie, FilterParams } from "../api-service";
import { loadMoreMovies } from "../actions";
import MovieCard from "./MovieCard";

interface InfiniteMovieListProps {
  initialMovies: Movie[];
  query: string;
  filters: FilterParams;
  totalPages: number;
}

export default function InfiniteMovieList({ initialMovies, query, filters, totalPages }: InfiniteMovieListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Сбрасываем стейт, если изменились фильтры
  useEffect(() => {
    setMovies(initialMovies);
    setPage(1);
  }, [initialMovies, query, JSON.stringify(filters)]);

  useEffect(() => {
    const currentObserver = observerRef.current;
    if (!currentObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && page < totalPages) {
          setIsLoading(true);
          
          loadMoreMovies(page + 1, query, filters)
            .then((res) => {
              setMovies((prev) => [...prev, ...res.items]);
              setPage((p) => p + 1);
            })
            .finally(() => setIsLoading(false));
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentObserver);
    return () => observer.disconnect();
  }, [page, totalPages, query, filters, isLoading]);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-2xl font-bold text-neutral-300">Ничего не найдено</p>
        <p className="mt-2 text-neutral-500">Попробуйте изменить фильтры или поисковый запрос.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.kinopoiskId}-${index}`} movie={movie} index={index} />
        ))}
      </div>

      {page < totalPages && (
        <div ref={observerRef} className="mt-12 flex justify-center py-10">
          {isLoading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-800 border-t-white" />
          ) : (
            <span className="text-sm text-neutral-500">Загрузка...</span>
          )}
        </div>
      )}
    </div>
  );
}