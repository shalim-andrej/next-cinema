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
        {/* Активация PWA */}
        <PwaRegister />
        
        <Navbar favoritesCount={favoritesCount} user={user} />
        
        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}