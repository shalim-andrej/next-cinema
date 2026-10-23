// src/app/components/AuthForm.tsx
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, loginAction, AuthState } from "../auth-actions";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const isLogin = type === "login";
  const action = isLogin ? loginAction : registerAction;

  const [state, formAction, isPending] = useActionState<AuthState, FormData>(action, {});

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-surface-light/50 p-8 backdrop-blur-xl">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
        {isLogin ? "С возвращением" : "Создать аккаунт"}
      </h1>
      <p className="mb-8 text-sm text-neutral-400">
        {isLogin ? "Войдите, чтобы синхронизировать избранное." : "Зарегистрируйтесь, чтобы сохранять фильмы."}
      </p>

      <form action={formAction} className="flex flex-col gap-4">
        {!isLogin && (
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Имя</label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-white/30"
              placeholder="Иван"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-white/30"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-400">Пароль</label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-white/30"
            placeholder="••••••••"
          />
        </div>

        {state?.error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-neutral-200 disabled:opacity-50"
        >
          {isPending ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
        <Link href={isLogin ? "/register" : "/login"} className="font-semibold text-white hover:underline">
          {isLogin ? "Создать" : "Войти"}
        </Link>
      </p>
    </div>
  );
}