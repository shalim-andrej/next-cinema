// src/app/favorites/loading.tsx
export default function FavoritesLoading() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        
        <div className="mx-auto mb-8 h-10 w-64 animate-pulse rounded-lg bg-neutral-800" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-[2/3] animate-pulse overflow-hidden rounded-xl bg-neutral-800"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                <div className="mb-2 h-4 w-3/4 rounded bg-neutral-700" />
                <div className="h-3 w-1/2 rounded bg-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}