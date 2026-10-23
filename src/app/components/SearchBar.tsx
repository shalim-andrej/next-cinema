// src/app/components/SearchBar.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  const [input, setInput] = useState(currentQuery);
  const debouncedInput = useDebouncedValue(input, 400);
  const [isPending, startTransition] = useTransition();
  
  // Синхронизация состояния без useEffect
  const [prevQuery, setPrevQuery] = useState(currentQuery);
  if (currentQuery !== prevQuery) {
    setPrevQuery(currentQuery);
    setInput(currentQuery);
  }

  useEffect(() => {
    if (debouncedInput === currentQuery) return;
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedInput.trim()) params.set("q", debouncedInput.trim());
    else params.delete("q");
    params.delete("page");

    startTransition(() => {
      router.replace(`/?${params.toString()}`, { scroll: false });
    });
  }, [debouncedInput, currentQuery, searchParams, router]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Поиск..."
        className="w-full rounded-full border border-white/10 bg-surface-light py-3 pl-11 pr-10 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-white/30 focus:bg-surface-lighter focus:ring-1 focus:ring-white/30"
      />
      {isPending && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </span>
      )}
    </div>
  );
}