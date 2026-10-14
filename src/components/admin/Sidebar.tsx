const links = [
  { label: "Resumen", active: true },
  { label: "Alertas", badge: 3 },
  { label: "Conciliación" },
  { label: "Clientes" },
  { label: "Premios" },
  { label: "Locales y cajeros" },
  { label: "Reglas de puntos" },
];

export default function Sidebar() {
  return (
    <aside className="max-w-[260px] basis-[220px] bg-surface-2 p-5">
      <p className="mb-6 font-display text-2xl font-extrabold">
        Pulso<span className="text-accent">.</span>
      </p>
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <span
            key={l.label}
            className={`flex min-h-[44px] items-center justify-between rounded-xl px-3 text-[15px] ${
              l.active ? "bg-surface-3 font-semibold text-ink" : "text-muted"
            }`}
          >
            {l.label}
            {l.badge && (
              <span className="rounded-full bg-danger-bg px-2 py-0.5 text-xs font-semibold text-danger">
                {l.badge}
              </span>
            )}
          </span>
        ))}
      </nav>
    </aside>
  );
}
