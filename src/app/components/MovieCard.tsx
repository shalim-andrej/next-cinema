// src/app/components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../api-service";

// Строгий тип для компонента
type MovieCardProps = {
  movie: Movie & { posterUrl?: string }; 
  index: number;
};

export default function MovieCard({ movie, index }: MovieCardProps) {
  const poster = movie.posterUrlPreview || movie.posterUrl;
  
  let ratingColor = "text-neutral-400 bg-black/60";
  if (movie.ratingKinopoisk && movie.ratingKinopoisk >= 7) ratingColor = "text-green-400 bg-green-500/20";
  else if (movie.ratingKinopoisk && movie.ratingKinopoisk >= 5) ratingColor = "text-yellow-400 bg-yellow-500/20";
  else if (movie.ratingKinopoisk) ratingColor = "text-red-400 bg-red-500/20";

  return (
    <Link
      href={`/movie/${movie.kinopoiskId}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-light transition-all duration-300 hover:ring-2 hover:ring-white/20"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={poster}
          alt={movie.nameRu || movie.nameEn || "Постер"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 5}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {movie.ratingKinopoisk && (
          <div className={`absolute left-2 top-2 rounded px-1.5 py-0.5 text-xs font-bold backdrop-blur-md ${ratingColor}`}>
            {movie.ratingKinopoisk.toFixed(1)}
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