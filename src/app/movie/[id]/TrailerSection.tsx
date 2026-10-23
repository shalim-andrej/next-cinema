// src/app/movie/[id]/TrailerSection.tsx
export default function TrailerSection({ trailerUrl }: { trailerUrl: string }) {
  return (
    <a
      href={trailerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
        <svg className="ml-0.5 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      Смотреть трейлер
    </a>
  );
}