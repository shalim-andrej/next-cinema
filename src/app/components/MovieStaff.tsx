// src/app/components/MovieStaff.tsx
"use client";

import Image from "next/image";
import { StaffMember } from "../api-service";

export default function MovieStaff({ staff }: { staff: StaffMember[] }) {
  if (!staff || staff.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="mb-8 text-2xl font-bold tracking-tight text-white">Актерский состав</h3>
      
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {staff.map((person) => {
          const roleText = person.description || "Актер";

          return (
            <div key={person.staffId} className="flex flex-col items-center">
              
              <div className="group relative mb-4 aspect-square w-full cursor-pointer overflow-hidden rounded-full border border-white/10 bg-surface-light shadow-lg">
                {person.posterUrl ? (
                  <Image
                    src={person.posterUrl}
                    alt={person.nameRu || person.nameEn || "Актер"}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-neutral-600">
                    {person.nameRu?.[0] || "?"}
                  </div>
                )}
                
                {/* Роль появляется прямо поверх фото (без обрезания) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-2 text-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Роль</span>
                  <span className="text-xs font-semibold text-white line-clamp-3 leading-tight">
                    {roleText}
                  </span>
                </div>
              </div>
              
              <span className="text-center text-sm font-medium text-neutral-300 line-clamp-1">
                {person.nameRu || person.nameEn}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}