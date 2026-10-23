// src/app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "../auth-actions";

export default function Navbar({ favoritesCount, user }: { favoritesCount: number, user: any }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isFavorites = pathname === "/favorites";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2 text-2xl font-black tracking-tighter transition-colors">
          <span className="text-brand group-hover:animate-pulse">●</span> 
          КИНОТЕКА
        </Link>
        
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link 
            href="/" 
            className={`rounded-full px-4 py-2 transition-all ${isHome ? "text-white" : "text-neutral-400 hover:text-white"}`}
          >
            Главная
          </Link>
          
          <Link 
            href="/favorites" 
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 transition-all ${isFavorites ? "text-white" : "text-neutral-400 hover:text-white"}`}
          >
            Избранное
            {favoritesCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </Link>

          <div className="ml-4 h-4 w-px bg-white/20" />

          {/* Блок авторизации */}
          {user ? (
            <div className="flex items-center gap-4 pl-2">
              <span className="text-sm font-medium text-neutral-300">
                Привет, <span className="text-white">{user.name}</span>
              </span>
              <form action={logoutAction}>
                <button type="submit" className="rounded-full bg-white/5 px-4 py-2 text-xs font-bold text-neutral-400 transition hover:bg-white/10 hover:text-white">
                  Выйти
                </button>
              </form>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="ml-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition hover:scale-105"
            >
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}