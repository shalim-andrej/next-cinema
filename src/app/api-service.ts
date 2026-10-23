// src/app/api-service.ts

const API_KEY = process.env.KINOPOISK_API_KEY;
const BASE_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2';
const BASE_URL_V1 = 'https://kinopoiskapiunofficial.tech/api/v1';

export const GENRES = [
  { id: 1, name: "Драма" },
  { id: 2, name: "Комедия" },
  { id: 3, name: "Боевик" },
  { id: 6, name: "Фантастика" },
  { id: 11, name: "Ужасы" },
  { id: 13, name: "Триллер" },
  { id: 17, name: "Приключения" },
];

export const YEARS = [
  { label: "2020-2026", from: "2020", to: "2026" },
  { label: "2010-2019", from: "2010", to: "2019" },
  { label: "2000-2009", from: "2000", to: "2009" },
  { label: "1990-1999", from: "1990", to: "1999" },
];

export const RATINGS = [
  { label: "Высокий (8+)", from: "8", to: "10" },
  { label: "Хороший (6+)", from: "6", to: "10" },
  { label: "Любой", from: "0", to: "10" },
];

// ... интерфейсы Movie, MovieDetails, MoviesResponse, MovieVideo, StaffMember остаются без изменений ...
export interface Movie {
  kinopoiskId: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal?: string | null;
  posterUrlPreview: string;
  ratingKinopoisk: number | null;
  year: number | null;
  genres: { genre: string }[];
}

export interface MovieDetails {
  kinopoiskId?: number;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal?: string | null;
  posterUrl: string;
  ratingKinopoisk: number | null;
  year: number | null;
  filmLength: number | null;
  description: string | null;
  shortDescription: string | null;
  genres: { genre: string }[];
}

export interface MoviesResponse { items: Movie[]; totalPages: number; }
export interface MovieVideo { url: string; name: string; site: string; }
export interface StaffMember { staffId: number; nameRu: string | null; nameEn: string | null; description: string | null; posterUrl: string; professionText: string; }

export interface FilterParams {
  genreId?: number;
  yearFrom?: string;
  yearTo?: string;
  ratingFrom?: string;
  ratingTo?: string;
}

// Вспомогательная функция для сборки URL с фильтрами
function buildFilterUrl(baseUrl: string, filters: FilterParams): string {
  let url = baseUrl;
  if (filters.genreId) url += `&genres=${filters.genreId}`;
  if (filters.yearFrom) url += `&yearFrom=${filters.yearFrom}&yearTo=${filters.yearTo}`;
  if (filters.ratingFrom) url += `&ratingFrom=${filters.ratingFrom}&ratingTo=${filters.ratingTo}`;
  return url;
}

export async function getPopularMovies(page: number = 1, filters: FilterParams = {}): Promise<MoviesResponse> {
  try {
    // Если есть фильтры, используем общий поиск с сортировкой по рейтингу. Иначе - топ популярных.
    let url = Object.keys(filters).length > 0 
      ? `${BASE_URL}/films?order=RATING&page=${page}&type=ALL`
      : `${BASE_URL}/films/collections?type=TOP_POPULAR_ALL&page=${page}`;
      
    if (Object.keys(filters).length > 0) {
      url = buildFilterUrl(url, filters);
    }

    const response = await fetch(url, {
      headers: { 'X-API-KEY': API_KEY || '', 'Content-Type': 'application/json' },
      next: { revalidate: 3600 } 
    });
    if (!response.ok) return { items: [], totalPages: 0 };
    const data = await response.json();
    return { items: data.items || [], totalPages: data.totalPages || 1 };
  } catch (error) {
    return { items: [], totalPages: 0 };
  }
}

export async function searchMovies(query: string, page: number = 1, filters: FilterParams = {}): Promise<MoviesResponse> {
  try {
    let url = `${BASE_URL}/films?keyword=${encodeURIComponent(query)}&page=${page}`;
    url = buildFilterUrl(url, filters);
    
    const response = await fetch(url, {
      headers: { 'X-API-KEY': API_KEY || '', 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }
    });
    if (!response.ok) return { items: [], totalPages: 0 };
    const data = await response.json();
    return { items: data.items || [], totalPages: data.totalPages || 1 };
  } catch (error) {
    return { items: [], totalPages: 0 };
  }
}

// ... остальные функции (getMovieDetails, getMovieVideos, getMovieStaff, getSimilarMovies) оставляем как были ...
export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(`${BASE_URL}/films/${id}`, {
      headers: { 'X-API-KEY': API_KEY || '', 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) { return null; }
}

export async function getMovieVideos(id: string): Promise<MovieVideo[]> {
  try {
    const response = await fetch(`${BASE_URL}/films/${id}/videos`, {
      headers: { 'X-API-KEY': API_KEY || '', 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.items || []).filter((v: MovieVideo) => v.name.toLowerCase().includes('трейлер') || v.name.toLowerCase().includes('trailer'));
  } catch (error) { return []; }
}

export async function getMovieStaff(id: string): Promise<StaffMember[]> {
  try {
    const response = await fetch(`${BASE_URL_V1}/staff?filmId=${id}`, {
      headers: { 'X-API-KEY': API_KEY || '', 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data || []).filter((person: any) => person.professionKey === 'ACTOR').slice(0, 10);
  } catch (error) { return []; }
}

export async function getSimilarMovies(id: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${BASE_URL}/films/${id}/similars`, {
      headers: { 'X-API-KEY': API_KEY || '', 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    
    const data = await response.json();
    const similarIds = (data.items || []).slice(0, 5).map((item: any) => item.filmId);
    if (similarIds.length === 0) return [];

    const moviesData = await Promise.all(similarIds.map((filmId: number) => getMovieDetails(filmId.toString())));
    return moviesData.filter((m): m is MovieDetails => m !== null).map((m) => ({
        kinopoiskId: m.kinopoiskId as number,
        nameRu: m.nameRu,
        nameEn: m.nameEn,
        posterUrlPreview: m.posterUrl,
        ratingKinopoisk: m.ratingKinopoisk,
        year: m.year,
        genres: m.genres,
      }));
  } catch (error) { return []; }
}