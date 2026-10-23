// src/app/auth-actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// В реальном проекте здесь была бы база данных (Prisma, Drizzle и т.д.)
// Мы создадим фейковую "базу" в памяти для демонстрации
const usersDb = new Map<string, string>(); 

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function registerAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Валидация
  if (!name || name.length < 2) return { error: "Имя должно содержать минимум 2 символа" };
  if (!email || !email.includes("@")) return { error: "Введите корректный email" };
  if (!password || password.length < 6) return { error: "Пароль должен быть не менее 6 символов" };

  if (usersDb.has(email)) {
    return { error: "Пользователь с таким email уже существует" };
  }

  // Сохраняем пользователя
  usersDb.set(email, password);

  // Создаем сессию (сохраняем имя и email в куки)
  const cookieStore = await cookies();
  cookieStore.set("session_user", JSON.stringify({ name, email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: "/",
  });

  redirect("/");
}

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Заполните все поля" };

  const storedPassword = usersDb.get(email);

  // Для демо: если база пуста (сервер перезагрузился), пропускаем любого
  if (usersDb.size > 0 && storedPassword !== password) {
    return { error: "Неверный email или пароль" };
  }

  const name = email.split("@")[0]; // Берем имя из почты для демо

  const cookieStore = await cookies();
  cookieStore.set("session_user", JSON.stringify({ name, email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user");
  redirect("/");
}