// src/app/components/SimilarMovies.tsx
import { getSimilarMovies } from "../api-service";
import MovieCard from "./MovieCard";

export default async function SimilarMovies({ movieId }: { movieId: string }) {
  const movies = await getSimilarMovies(movieId);

  if (movies.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="mb-8 text-2xl font-bold tracking-tight text-white">Похожие фильмы</h3>
      
      {/* Сетка для похожих фильмов */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.kinopoiskId} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}