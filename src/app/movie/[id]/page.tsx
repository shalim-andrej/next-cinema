// src/app/movie/[id]/page.tsx
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getMovieVideos, getMovieStaff } from "../../api-service";
import { cookies } from "next/headers";
import FavoriteButton from "../../components/FavoriteButton";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TrailerSection from "./TrailerSection";
import MovieStaff from "../../components/MovieStaff";
import SimilarMovies from "../../components/SimilarMovies";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) return { title: "Фильм не найден" };
  return { title: `${movie.nameRu || movie.nameEn} — Кинотека` };
}

async function TrailerLoader({ id }: { id: string }) {
  const videos = await getMovieVideos(id);
  const trailer = videos[0];
  if (!trailer) return null;
  return <TrailerSection trailerUrl={trailer.url} />;
}

async function StaffLoader({ id }: { id: string }) {
  const staff = await getMovieStaff(id);
  return <MovieStaff staff={staff} />;
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) notFound();

  const cookieStore = await cookies();
  const favorites = cookieStore.get("favorites")?.value.split(",") || [];
  const isFavorite = favorites.includes(id);

  return (
    <main className="relative min-h-screen pb-24">
      
      <div className="absolute inset-0 -z-10 h-[70vh] w-full overflow-hidden">
        <Image
          src={movie.posterUrl}
          alt=""
          fill
          className="object-cover object-top opacity-30 blur-2xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-surface/90 to-surface" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-12">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-white">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          На главную
        </Link>

        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[300px] shrink-0 overflow-hidden rounded-xl shadow-2xl shadow-black/60 md:mx-0">
            <Image
              src={movie.posterUrl}
              alt={movie.nameRu || "Постер"}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col pt-2">
            <h1 className="mb-2 text-4xl font-black leading-tight text-white md:text-5xl">
              {movie.nameRu || movie.nameEn}
            </h1>
            {movie.nameOriginal && (
              <p className="mb-6 text-lg font-medium text-neutral-400">{movie.nameOriginal}</p>
            )}

            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm font-semibold">
              <span className="text-neutral-300">{movie.year || "—"}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300">{movie.filmLength ? `${movie.filmLength} мин` : "—"}</span>
              <span className="text-neutral-600">•</span>
              <div className="flex gap-2 text-neutral-400">
                {movie.genres?.map((g) => (
                  <span key={g.genre}>{g.genre}</span>
                ))}
              </div>
            </div>

            <p className="mb-8 text-base leading-relaxed text-neutral-300">
              {movie.description || movie.shortDescription || "Описание отсутствует."}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-3">
              <FavoriteButton movieId={Number(id)} isFavorite={isFavorite} />
              <Suspense fallback={<div className="h-[48px] w-[180px] animate-pulse rounded-xl bg-neutral-800" />}>
                <TrailerLoader id={id} />
              </Suspense>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="mt-16 h-[150px] w-full animate-pulse rounded-xl bg-neutral-800/50" />}>
          <StaffLoader id={id} />
        </Suspense>

        {/* Блок Похожих фильмов */}
        <Suspense fallback={
          <div className="mt-20">
            <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-surface-light" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-surface-light" />
              ))}
            </div>
          </div>
        }>
          <SimilarMovies movieId={id} />
        </Suspense>

      </div>
    </main>
  );
}