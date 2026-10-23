// src/app/components/EmptyState.tsx
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "heart";
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  title, 
  description, 
  icon = "search", 
  actionLabel, 
  actionHref,
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center animate-in fade-in duration-500">
      
      {/* Иконка */}
      <div className="mb-6 rounded-full border border-white/10 bg-surface-light p-6 shadow-2xl">
        {icon === "search" ? (
          <svg className="h-12 w-12 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ) : (
          <svg className="h-12 w-12 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </div>

      {/* Текст */}
      <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
      <p className="mb-8 max-w-md text-neutral-400">{description}</p>

      {/* Кнопка действия */}
      {actionLabel && actionHref && (
        <Link 
          href={actionHref}
          className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-neutral-200"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-neutral-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}