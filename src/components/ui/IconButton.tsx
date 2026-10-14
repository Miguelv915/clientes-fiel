import Link from "next/link";

type Props = { label: string; href?: string; onClick?: () => void; children: React.ReactNode };

const cls =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink active:opacity-80";

export default function IconButton({ label, href, onClick, children }: Props) {
  if (href)
    return (
      <Link href={href} aria-label={label} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
