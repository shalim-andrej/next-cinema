import Image from "next/image";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-surface">
      {/* Левая часть - форма */}
      <div className="flex w-full items-center justify-center px-6 md:w-1/2">
        <AuthForm type="login" />
      </div>
      
      {/* Правая часть - кинематографичный фон */}
      <div className="relative hidden w-1/2 md:block">
        <Image src="https://st.kp.yandex.net/images/film_iphone/iphone360_8431006.jpg" alt="Cinema" fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface" />
      </div>
    </main>
  );
}