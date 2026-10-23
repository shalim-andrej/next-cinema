// src/app/components/PwaRegister.tsx
"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW зарегистрирован: ", registration.scope);
        })
        .catch((err) => {
          console.log("Ошибка регистрации SW: ", err);
        });
    }
  }, []);

  return null; // Этот компонент ничего не рисует на экране
}