// src/app/movie/[id]/loading.tsx
export default function MovieLoading() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        
        {/* Скелетон кнопки "Назад" */}
        <div className="mb-8 h-6 w-32 animate-pulse rounded bg-neutral-800" />

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Скелетон постера */}
          <div className="aspect-[2/3] w-full max-w-sm shrink-0 animate-pulse rounded-2xl bg-neutral-800" />

          {/* Скелетон текстовой информации */}
          <div className="flex flex-1 flex-col">
            <div className="mb-4 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-800" />
            <div className="mb-6 h-6 w-1/2 animate-pulse rounded-lg bg-neutral-800" />
            
            <div className="mb-8 flex gap-4">
              <div className="h-8 w-20 animate-pulse rounded bg-neutral-800" />
              <div className="h-8 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="h-8 w-16 animate-pulse rounded bg-neutral-800" />
            </div>

            <div className="mb-8">
              <div className="mb-2 h-6 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="flex gap-2">
                <div className="h-8 w-20 animate-pulse rounded-full bg-neutral-800" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-800" />
              </div>
            </div>

            <div className="mb-8 flex-1">
              <div className="mb-2 h-6 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-neutral-800" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-neutral-800" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-800" />
            </div>

            <div className="h-12 w-48 animate-pulse rounded-xl bg-neutral-800" />
          </div>
        </div>
      </div>
    </main>
  );
}