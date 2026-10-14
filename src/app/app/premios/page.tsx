"use client";
import { useState } from "react";
import Chip from "@/components/ui/Chip";
import RewardItem from "@/components/cliente/RewardItem";
import RedeemSheet from "@/components/cliente/RedeemSheet";
import { cliente, premios, type Premio } from "@/lib/mock";

const tabs = ["Todos", "Tragos", "Descuentos", "Experiencias"] as const;

export default function Premios() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Todos");
  const [selected, setSelected] = useState<Premio | null>(null);
  const lista = tab === "Todos" ? premios : premios.filter((p) => p.categoria === tab);

  return (
    <main className="flex flex-col gap-4 px-[22px] pt-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-[26px] font-bold">Premios</h1>
        <Chip tone="warn">{cliente.puntos.toLocaleString("es-PE")} pts</Chip>
      </header>

      <div className="flex gap-2 overflow-x-auto" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm font-semibold ${
              tab === t ? "bg-ink text-bg" : "border border-line bg-surface text-ink-2"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {lista.map((p) => (
          <RewardItem key={p.id} premio={p} saldo={cliente.puntos} onRedeem={setSelected} />
        ))}
      </div>

      {selected && <RedeemSheet premio={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
