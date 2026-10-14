import { cliente } from "@/lib/mock";

export default function PointsCard() {
  const faltan = cliente.puntosSiguienteNivel - cliente.puntos;
  const pct = Math.min(100, (cliente.puntos / cliente.puntosSiguienteNivel) * 100);
  return (
    <div className="rounded-hero bg-accent p-5 text-on-accent">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.1em]">Tus puntos</span>
        <span className="rounded-full bg-bg px-3 py-1 text-xs font-semibold text-accent">
          Nivel {cliente.nivel}
        </span>
      </div>
      <p className="mt-3 font-display text-[56px] font-extrabold leading-none">
        {cliente.puntos.toLocaleString("es-PE")}
      </p>
      <p className="mt-2 text-[15px]">
        Te faltan {faltan} pts para el nivel {cliente.siguienteNivel}
      </p>
      <div className="mt-3 h-2 rounded-full bg-on-accent/20">
        <div className="h-2 rounded-full bg-on-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
