import Chip from "@/components/ui/Chip";
import { cajero } from "@/lib/mock";

export default function StaffHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">Modo caja</p>
        <p className="text-[15px] font-semibold">
          {cajero.punto} · {cajero.nombre}
        </p>
      </div>
      {cajero.turnoAbierto && <Chip tone="ok">Turno abierto</Chip>}
    </header>
  );
}
