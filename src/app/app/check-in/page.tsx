import { Check, X } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import Button from "@/components/ui/Button";
import { visitaActiva } from "@/lib/mock";

export default function CheckIn() {
  const datos = [
    { label: "Hora", valor: visitaActiva.checkIn },
    { label: "Ubicación", valor: "Verificada" },
    { label: "Bono de entrada", valor: `+${visitaActiva.bonoEntrada} pts`, accent: true },
    { label: "Visitas este mes", valor: String(visitaActiva.visitasMes) },
  ];
  return (
    <main className="flex min-h-dvh flex-col gap-6 px-[22px] pt-6 pb-8">
      <div className="flex justify-end">
        <IconButton label="Cerrar" href="/app">
          <X size={20} aria-hidden />
        </IconButton>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-ok bg-ok-bg text-ok">
          <Check size={56} strokeWidth={2.2} aria-hidden />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ok">Check-in confirmado</p>
        <h1 className="font-display text-[34px] font-bold leading-tight">
          Bienvenida a {visitaActiva.local}
        </h1>
        <p className="text-[15px] text-ink-2">
          Tu visita queda activa hasta las {visitaActiva.validaHasta}. Muestra tu QR al pagar para sumar puntos.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-card border border-line bg-surface p-4">
        {datos.map((d) => (
          <div key={d.label}>
            <p className="text-[13px] text-muted">{d.label}</p>
            <p className={`text-base font-semibold ${d.accent ? "text-accent" : ""}`}>{d.valor}</p>
          </div>
        ))}
      </div>

      <Button href="/app">Ir a mi cuenta</Button>
    </main>
  );
}
