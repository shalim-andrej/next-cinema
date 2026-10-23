// src/app/components/InfiniteMovieList.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Movie, FilterParams } from "../api-service";
import { loadMoreMovies } from "../actions";
import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";

interface InfiniteMovieListProps {
  initialMovies: Movie[];
  query: string;
  filters: FilterParams;
  totalPages: number;
}

export default function InfiniteMovieList({ initialMovies, query, filters, totalPages }: InfiniteMovieListProps) {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

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
      <EmptyState
        title="Ничего не найдено"
        description="По вашему запросу не нашлось ни одного фильма. Попробуйте изменить параметры поиска или сбросить фильтры."
        icon="search"
        actionLabel="Сбросить фильтры"
        onAction={() => router.push("/")}
      />
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