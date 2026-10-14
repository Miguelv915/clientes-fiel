import Link from "next/link";

const grupos = [
  {
    titulo: "Cliente",
    rutas: [
      ["/app", "Inicio"],
      ["/app/check-in", "Check-in"],
      ["/app/qr", "Mi QR"],
      ["/app/premios", "Premios"],
      ["/app/movimientos", "Movimientos"],
    ],
  },
  {
    titulo: "Cajero",
    rutas: [
      ["/caja", "Escanear"],
      ["/caja/confirmar", "Confirmar compra"],
    ],
  },
  { titulo: "Administración", rutas: [["/admin", "Panel"]] },
];

export default function Indice() {
  return (
    <main className="mx-auto flex max-w-[430px] flex-col gap-8 px-[22px] py-10">
      <h1 className="font-display text-3xl font-extrabold">
        Pulso<span className="text-accent">.</span> prototipo
      </h1>
      {grupos.map((g) => (
        <section key={g.titulo} className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{g.titulo}</h2>
          {g.rutas.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-[52px] items-center justify-between rounded-card border border-line bg-surface px-4 font-semibold"
            >
              {label} <span className="text-sm text-muted">{href}</span>
            </Link>
          ))}
        </section>
      ))}
    </main>
  );
}
