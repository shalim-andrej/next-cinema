// src/app/actions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPopularMovies, searchMovies, FilterParams } from "./api-service";

export async function toggleFavorite(movieId: number) {
  const cookieStore = await cookies();
  const favoritesCookie = cookieStore.get("favorites")?.value;
  
  let favorites: string[] = favoritesCookie ? favoritesCookie.split(",") : [];
  const idStr = movieId.toString();

  if (favorites.includes(idStr)) {
    favorites = favorites.filter((id) => id !== idStr);
  } else {
    favorites.push(idStr);
  }

  cookieStore.set("favorites", favorites.join(","), {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  revalidatePath("/", "layout");
}

export async function clearFavorites() {
  const cookieStore = await cookies();
  cookieStore.delete("favorites");
  revalidatePath("/", "layout");
}

export async function loadMoreMovies(page: number, query: string, filters: FilterParams) {
  if (query) {
    return await searchMovies(query, page, filters);
  } else {
    return await getPopularMovies(page, filters);
  }
}