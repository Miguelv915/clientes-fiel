import { Upload } from "lucide-react";
import Card from "@/components/ui/Card";
import { conciliacion } from "@/lib/mock";

export default function ReconciliationPanel() {
  const items = [
    { label: "Último cierre", valor: conciliacion.ultimoCierre, cls: "" },
    { label: "Conciliadas", valor: String(conciliacion.conciliadas), cls: "text-ok" },
    { label: "Sin ticket", valor: String(conciliacion.sinTicket), cls: "text-danger" },
    { label: "Monto distinto", valor: String(conciliacion.montoDistinto), cls: "text-accent" },
  ];
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">Conciliación con ventas</h2>
          <p className="text-[13px] text-muted">
            Sube el reporte de ventas del cierre para confirmar o revertir puntos pendientes.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-btn bg-accent px-4 text-sm font-semibold text-on-accent"
        >
          <Upload size={18} aria-hidden /> Subir CSV / Excel
        </button>
      </div>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
        {items.map((i) => (
          <div key={i.label}>
            <p className="text-[13px] text-muted">{i.label}</p>
            <p className={`text-base font-semibold ${i.cls}`}>{i.valor}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
