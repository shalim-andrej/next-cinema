// src/app/components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Movie, MovieDetails } from "../api-service";

// Карточка принимает как краткую инфу (Movie), так и полную (MovieDetails)
type MovieCardProps = {
  movie: Movie | MovieDetails;
  index: number;
};

export default function MovieCard({ movie, index }: MovieCardProps) {
  // Проверяем наличие конкретного поля для постера и ставим пустую строку, если ничего нет
  const posterUrl = ('posterUrlPreview' in movie ? movie.posterUrlPreview : movie.posterUrl) || "";
  
  const rating = movie.ratingKinopoisk;

  let ratingColor = "text-neutral-400 bg-black/60";
  if (rating && rating >= 7) ratingColor = "text-green-400 bg-green-500/20";
  else if (rating && rating >= 5) ratingColor = "text-yellow-400 bg-yellow-500/20";
  else if (rating) ratingColor = "text-red-400 bg-red-500/20";

  return (
    <Link
      href={`/movie/${movie.kinopoiskId}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-light transition-all duration-300 hover:ring-2 hover:ring-white/20"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={posterUrl}
          alt={movie.nameRu || movie.nameEn || "Постер"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 5}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {rating && (
          <div className={`absolute left-2 top-2 rounded px-1.5 py-0.5 text-xs font-bold backdrop-blur-md ${ratingColor}`}>
            {rating.toFixed(1)}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="line-clamp-2 text-sm font-bold text-white">
            {movie.nameRu || movie.nameEn || "Без названия"}
          </h3>
          <p className="mt-1 text-xs text-neutral-400">{movie.year || "—"}</p>
        </div>
      </div>
    </Link>
  );
}