import { visitaActiva } from "@/lib/mock";

export default function VisitBanner() {
  return (
    <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
      <span className="h-3 w-3 shrink-0 rounded-full bg-ok" aria-hidden />
      <div>
        <p className="text-[15px] font-semibold">Visita activa · {visitaActiva.local}</p>
        <p className="text-[13px] text-muted">
          Check-in {visitaActiva.checkIn} · válida hasta {visitaActiva.validaHasta}
        </p>
      </div>
    </div>
  );
}
