🎬 Кинотека
Веб-приложение для поиска фильмов, просмотра трейлеров и сохранения избранного. Проект создан для портфолио.

🔗 Демо: https://next-cinema-5ix5.vercel.app/

Стек технологий
Next.js 16 (App Router, Turbopack)

React 19 (Server Components, useOptimistic)

TypeScript

Tailwind CSS v4

Jest + React Testing Library

Что реализовано
SSR и Streaming: Быстрая загрузка страниц за счет отложенного рендеринга (Suspense).

Синхронизация с URL: Поиск, фильтры и пагинация хранятся в searchParams.

Server Actions: Работа с избранным и авторизацией без сторонних API.

Бесконечный скролл: Подгрузка фильмов при прокрутке.

Оптимистичный UI: Мгновенная реакция кнопки "В избранное".

PWA: Возможность установки на телефон.

Доступность (a11y): Навигация с клавиатуры, aria-атрибуты.

CI/CD: GitHub Actions (автотесты и сборка при пуше).

Запуск проекта локально
Клонирование и установка
Склонируйте репозиторий и установите зависимости:

bash
git clone https://github.com/shalim-andrej/next-cinema.git
cd next-cinema
npm install
Переменные окружения
Создайте в корне проекта файл .env.local и добавьте ключ API Кинопоиска:

text
KINOPOISK_API_KEY=ваш_ключ_здесь
Запуск сервера
Запустите сервер разработки:

bash
npm run dev
Открытие в браузере
Перейдите по адресу http://localhost:3000.
Скрипты
npm run dev — запуск локального сервера

npm run build — сборка production-версии

npm run lint — проверка кода линтером

npm run test — запуск юнит-тестов