import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "accent" | "light" | "ghost";

const styles: Record<Variant, string> = {
  accent: "bg-accent text-on-accent",
  light: "bg-ink text-bg",
  ghost: "border border-line-strong bg-transparent text-ink",
};

const base =
  "inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-btn px-5 text-base font-semibold active:opacity-80";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; href?: string };

export default function Button({ variant = "accent", href, className = "", ...rest }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{rest.children}</Link>;
  return <button className={cls} {...rest} />;
}
