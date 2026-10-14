import Chip, { type ChipTone } from "@/components/ui/Chip";
import type { Movimiento, EstadoMov } from "@/lib/mock";

const tone: Record<EstadoMov, ChipTone> = {
  Pendiente: "warn",
  Confirmada: "ok",
  Canje: "redeem",
  Revertida: "danger",
};

export default function MovementItem({
  mov,
  reported,
  onReport,
}: {
  mov: Movimiento;
  reported: boolean;
  onReport: (id: string) => void;
}) {
  const puntosCls =
    mov.estado === "Canje"
      ? "text-redeem"
      : mov.estado === "Revertida"
        ? "text-muted line-through"
        : "text-ink";
  const texto = mov.puntos < 0 ? `−${Math.abs(mov.puntos)}` : `+${mov.puntos}`;
  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold">{mov.titulo}</p>
          <p className="text-[13px] text-muted">{mov.meta}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className={`font-display text-lg font-bold ${puntosCls}`}>{texto}</span>
          <Chip tone={tone[mov.estado]}>{mov.estado}</Chip>
        </div>
      </div>
      {mov.estado === "Pendiente" &&
        (reported ? (
          <p className="mt-3 text-[13px] text-ok">Reporte enviado. Lo revisaremos al cierre del día.</p>
        ) : (
          <button
            type="button"
            onClick={() => onReport(mov.id)}
            className="mt-3 min-h-[44px] text-[13px] font-semibold text-danger"
          >
            No reconozco esta compra
          </button>
        ))}
    </div>
  );
}
