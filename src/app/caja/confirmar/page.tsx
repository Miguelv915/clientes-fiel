"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import CheckList from "@/components/caja/CheckList";
import Button from "@/components/ui/Button";
import { cliente, compraEjemplo } from "@/lib/mock";

const inputCls =
  "min-h-[56px] w-full rounded-btn border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-muted";

export default function ConfirmarCompra() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-ok bg-ok-bg text-ok">
          <Check size={56} strokeWidth={2.2} aria-hidden />
        </div>
        <h1 className="font-display text-[28px] font-bold">+{compraEjemplo.puntos} pts acreditados</h1>
        <p className="text-[15px] text-ink-2">
          Los puntos quedan pendientes hasta conciliar el ticket con las ventas del día.
        </p>
        <Button href="/caja" className="mt-4">
          Escanear siguiente cliente
        </Button>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center gap-3">
        <Link
          href="/caja"
          aria-label="Volver"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface"
        >
          <ArrowLeft size={20} aria-hidden />
        </Link>
        <h1 className="font-display text-[22px] font-bold">Confirmar compra</h1>
      </header>

      <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display font-bold text-on-accent">
          {cliente.iniciales}
        </div>
        <div>
          <p className="text-[15px] font-semibold">{cliente.nombreCorto}</p>
          <p className="text-[13px] text-muted">
            Nivel {cliente.nivel} · cliente desde {cliente.clienteDesde}
          </p>
        </div>
      </div>

      <CheckList />

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <label className="flex flex-col gap-2 text-[13px] text-muted">
          Monto (S/)
          <input
            inputMode="decimal"
            defaultValue={compraEjemplo.monto.toFixed(2)}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-2 text-[13px] text-muted">
          N° de ticket del sistema de ventas
          <input defaultValue={compraEjemplo.ticket} className={inputCls} />
          <span>Obligatorio. Se cruza con las ventas del día al cierre.</span>
        </label>
        <div className="flex items-center justify-between rounded-card bg-[#2A2312] px-4 py-3">
          <span className="text-[15px] text-ink-2">Puntos a acreditar</span>
          <span className="font-display text-xl font-bold text-accent">+{compraEjemplo.puntos} pts</span>
        </div>
        <Button type="submit">Confirmar compra</Button>
      </form>
    </>
  );
}
