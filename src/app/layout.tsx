// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PwaRegister from "./components/PwaRegister";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Кинотека | Премиальный поиск фильмов",
  description: "Смотрите трейлеры, читайте описания и собирайте свою коллекцию кино.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Кинотека",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const favoritesCookie = cookieStore.get("favorites")?.value;
  const favoritesCount = favoritesCookie ? favoritesCookie.split(",").length : 0;
  
  const sessionCookie = cookieStore.get("session_user")?.value;
  const user = sessionCookie ? JSON.parse(sessionCookie) : null;

  return (
    <html lang="ru">
      <body className={`${manrope.className} flex min-h-screen flex-col bg-surface text-white antialiased`}>
        <PwaRegister />
        
        {/* Skip Link для доступности */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:outline-none"
        >
          Перейти к контенту
        </a>

        <Navbar favoritesCount={favoritesCount} user={user} />
        
        <div id="main-content" className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}