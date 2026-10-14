import { ShieldCheck } from "lucide-react";
import DynamicQR from "@/components/cliente/DynamicQR";

export default function MiQR() {
  return (
    <main className="flex flex-col gap-5 px-[22px] pt-6">
      <header>
        <h1 className="font-display text-[26px] font-bold">Mi QR</h1>
        <p className="mt-1 text-[15px] text-ink-2">
          Muéstralo al cajero después de pagar. Cambia cada 45 segundos y sirve una sola vez.
        </p>
      </header>

      <DynamicQR ttl={45} />

      <div className="flex items-start gap-3 rounded-card border border-line bg-surface p-4">
        <ShieldCheck size={22} className="mt-0.5 shrink-0 text-ok" aria-hidden />
        <p className="text-[13px] text-ink-2">
          No compartas capturas de tu QR. Solo el que ves en pantalla es válido y caduca en segundos.
        </p>
      </div>
    </main>
  );
}
