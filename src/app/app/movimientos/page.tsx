"use client";
import { useState } from "react";
import MovementItem from "@/components/cliente/MovementItem";
import { movimientos } from "@/lib/mock";

export default function Movimientos() {
  const [reported, setReported] = useState<Set<string>>(new Set());
  const report = (id: string) => setReported((s) => new Set(s).add(id));

  return (
    <main className="flex flex-col gap-5 px-[22px] pt-6">
      <header>
        <h1 className="font-display text-[26px] font-bold">Movimientos</h1>
        <p className="mt-1 text-[15px] text-ink-2">
          Los puntos quedan pendientes hasta que se confirma la venta al cierre del día.
        </p>
      </header>

      {movimientos.map((g) => (
        <section key={g.grupo} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{g.grupo}</h2>
          {g.items.map((m) => (
            <MovementItem key={m.id} mov={m} reported={reported.has(m.id)} onReport={report} />
          ))}
        </section>
      ))}
    </main>
  );
}
