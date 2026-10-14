import Card from "@/components/ui/Card";
import { puntosPorLocal } from "@/lib/mock";

export default function PointsByVenue() {
  const max = Math.max(...puntosPorLocal.map((p) => p.puntos));
  return (
    <Card className="min-w-0 flex-[1_1_280px]">
      <h2 className="mb-3 font-display text-lg font-bold">Puntos por local</h2>
      <ul className="flex flex-col gap-3">
        {puntosPorLocal.map((p) => (
          <li key={p.local}>
            <div className="mb-1 flex justify-between text-[13px]">
              <span className="text-ink-2">{p.local}</span>
              <span className="font-semibold">{p.puntos.toLocaleString("es-PE")}</span>
            </div>
            <div className="h-2 rounded-full bg-line">
              <div className="h-2 rounded-full bg-accent" style={{ width: `${(p.puntos / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
