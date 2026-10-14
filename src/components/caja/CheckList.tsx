import { validacionesCaja } from "@/lib/mock";

export default function CheckList() {
  return (
    <ul className="flex flex-col divide-y divide-line rounded-card border border-line bg-surface">
      {validacionesCaja.map((v) => (
        <li key={v.label} className="flex items-center gap-3 px-4 py-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ok" aria-hidden />
          <span className="flex-1 text-[15px] text-ink-2">{v.label}</span>
          <span className="text-[15px] font-semibold">{v.valor}</span>
        </li>
      ))}
    </ul>
  );
}
