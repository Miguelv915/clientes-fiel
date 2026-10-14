"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffHeader from "@/components/caja/StaffHeader";
import Scanner from "@/components/caja/Scanner";
import Button from "@/components/ui/Button";

const tabs = [
  { id: "acreditar", label: "Acreditar compra", texto: "Apunta al QR del cliente para acreditar su compra" },
  { id: "canje", label: "Validar canje", texto: "Apunta al código de canje del cliente para validarlo" },
] as const;

export default function CajaEscanear() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("acreditar");
  const actual = tabs.find((t) => t.id === tab)!;

  return (
    <>
      <StaffHeader />

      <div className="grid grid-cols-2 rounded-btn bg-surface p-1" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-[44px] rounded-xl text-sm font-semibold ${
              tab === t.id ? "bg-surface-3 text-ink" : "text-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Scanner texto={actual.texto} />

      <form
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/caja/confirmar");
        }}
      >
        <input
          type="text"
          placeholder="Código manual"
          autoCapitalize="characters"
          className="min-h-[56px] min-w-0 flex-1 rounded-btn border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-muted"
        />
        <Button type="submit" className="!w-auto">
          Validar
        </Button>
      </form>
    </>
  );
}
