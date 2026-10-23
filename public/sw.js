// public/sw.js
const CACHE_NAME = "kinoteka-cache-v1";
const urlsToCache = [
  "/",
  "/favorites",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Сначала пытаемся загрузить из сети, если не выходит — берем из кэша
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});