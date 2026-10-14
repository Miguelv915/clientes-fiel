import Sidebar from "@/components/admin/Sidebar";
import KpiCard from "@/components/admin/KpiCard";
import AlertsTable from "@/components/admin/AlertsTable";
import PointsByVenue from "@/components/admin/PointsByVenue";
import ReconciliationPanel from "@/components/admin/ReconciliationPanel";
import { kpis } from "@/lib/mock";

const filtros = ["Todos los locales", "Últimos 7 días"];

export default function Admin() {
  return (
    <div className="flex min-h-dvh flex-wrap">
      <Sidebar />
      <main className="flex min-w-0 flex-[999_1_560px] flex-col gap-5 p-5 sm:p-8">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Grupo [Nombre]</p>
            <h1 className="font-display text-[26px] font-bold">Resumen de la semana</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                type="button"
                className="min-h-[44px] rounded-btn border border-line-strong bg-surface px-4 text-sm font-semibold"
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </section>

        <section className="flex flex-wrap gap-4">
          <AlertsTable />
          <PointsByVenue />
        </section>

        <ReconciliationPanel />
      </main>
    </div>
  );
}
