import { Gift, GlassWater, Percent, Ticket } from "lucide-react";
import type { Premio } from "@/lib/mock";

const icons = { Tragos: GlassWater, Descuentos: Percent, Experiencias: Ticket } as const;

export default function RewardItem({
  premio,
  saldo,
  onRedeem,
}: {
  premio: Premio;
  saldo: number;
  onRedeem: (p: Premio) => void;
}) {
  const Icon = icons[premio.categoria] ?? Gift;
  const faltan = premio.costo - saldo;
  return (
    <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-3">
      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-surface-3 text-accent">
        <Icon size={24} strokeWidth={1.8} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold">{premio.nombre}</p>
        <p className="truncate text-[13px] text-muted">{premio.lugar}</p>
        <p className="text-sm font-semibold text-accent">{premio.costo.toLocaleString("es-PE")} pts</p>
      </div>
      {faltan > 0 ? (
        <span className="shrink-0 text-xs text-muted">Faltan {faltan} pts</span>
      ) : (
        <button
          type="button"
          onClick={() => onRedeem(premio)}
          className="min-h-[44px] shrink-0 rounded-btn bg-accent px-4 text-sm font-semibold text-on-accent active:opacity-80"
        >
          Canjear
        </button>
      )}
    </div>
  );
}
