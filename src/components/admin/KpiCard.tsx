import Card from "@/components/ui/Card";

export default function KpiCard({ label, valor, nota }: { label: string; valor: string; nota: string }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{label}</p>
      <p className="mt-2 font-display text-[32px] font-extrabold leading-none">{valor}</p>
      <p className="mt-2 text-[13px] text-muted">{nota}</p>
    </Card>
  );
}
