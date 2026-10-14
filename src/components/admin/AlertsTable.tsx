import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { alertas } from "@/lib/mock";

export default function AlertsTable() {
  return (
    <Card className="min-w-0 flex-[2_1_380px]">
      <h2 className="mb-3 font-display text-lg font-bold">Alertas recientes</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[14px]">
          <thead className="text-xs uppercase tracking-[0.1em] text-muted">
            <tr>
              <th className="pb-2 font-semibold">Severidad</th>
              <th className="pb-2 font-semibold">Motivo</th>
              <th className="pb-2 font-semibold">Involucrados</th>
            </tr>
          </thead>
          <tbody>
            {alertas.map((a) => (
              <tr key={a.motivo} className="border-t border-line">
                <td className="py-3 pr-3">
                  <Chip tone={a.severidad === "Alta" ? "danger" : "warn"}>{a.severidad}</Chip>
                </td>
                <td className="py-3 pr-3">{a.motivo}</td>
                <td className="py-3 text-ink-2">{a.quien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
