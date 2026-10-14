import Link from "next/link";
import { Bell, QrCode } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import Button from "@/components/ui/Button";
import PointsCard from "@/components/cliente/PointsCard";
import VisitBanner from "@/components/cliente/VisitBanner";
import { cliente, premios } from "@/lib/mock";

export default function Inicio() {
  return (
    <main className="flex flex-col gap-4 px-[22px] pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-muted">Buenas noches,</p>
          <h1 className="font-display text-2xl font-bold">{cliente.nombre}</h1>
        </div>
        <IconButton label="Notificaciones">
          <Bell size={20} strokeWidth={1.8} aria-hidden />
        </IconButton>
      </header>

      <PointsCard />
      <VisitBanner />

      <Button variant="light" href="/app/qr">
        <QrCode size={20} aria-hidden /> Mostrar mi QR al pagar
      </Button>

      <section className="mt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Premios para ti</h2>
          <Link href="/app/premios" className="text-sm font-semibold text-accent">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {premios.slice(0, 2).map((p) => (
            <Link
              key={p.id}
              href="/app/premios"
              className="rounded-card border border-line bg-surface p-4"
            >
              <p className="text-[15px] font-semibold">{p.nombre}</p>
              <p className="text-[13px] text-muted">{p.lugar}</p>
              <p className="mt-2 text-sm font-semibold text-accent">{p.costo} pts</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
