export type ChipTone = "warn" | "ok" | "redeem" | "danger" | "neutral";

const tones: Record<ChipTone, string> = {
  warn: "bg-warn-bg text-accent",
  ok: "bg-ok-bg text-ok",
  redeem: "bg-redeem-bg text-redeem",
  danger: "bg-danger-bg text-danger",
  neutral: "bg-surface-3 text-ink-2",
};

export default function Chip({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: ChipTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
