// src/app/manifest.ts
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Кинотека | Премиальный поиск фильмов",
    short_name: "Кинотека",
    description: "Смотрите трейлеры, читайте описания и собирайте свою коллекцию кино.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#e50914",
    icons: [
      {
        src: "/pwa-icon.png", // ИЗМЕНЕНО ЗДЕСЬ
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}