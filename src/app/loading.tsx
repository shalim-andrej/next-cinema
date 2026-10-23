// src/app/loading.tsx
export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Скелетон Hero */}
        <div className="mb-16 h-[400px] w-full animate-pulse rounded-3xl bg-surface-light" />

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-surface-light" />
          <div className="h-12 w-full max-w-md animate-pulse rounded-full bg-surface-light" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-[2/3] animate-pulse overflow-hidden rounded-2xl bg-surface-light"
            >
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface to-transparent p-4">
                <div className="mb-2 h-4 w-3/4 rounded bg-surface-lighter" />
                <div className="h-3 w-1/2 rounded bg-surface-lighter" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}