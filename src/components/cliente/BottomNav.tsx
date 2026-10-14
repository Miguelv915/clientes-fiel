"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, QrCode, Gift, List } from "lucide-react";

const items = [
  { href: "/app", label: "Inicio", Icon: Home },
  { href: "/app/qr", label: "Mi QR", Icon: QrCode },
  { href: "/app/premios", label: "Premios", Icon: Gift },
  { href: "/app/movimientos", label: "Movimientos", Icon: List },
];

export default function BottomNav() {
  const path = usePathname();
  if (path === "/app/check-in") return null;
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 mx-auto grid h-[84px] max-w-[430px] grid-cols-4 border-t border-line bg-surface-2 px-2 pb-[max(14px,env(safe-area-inset-bottom))]"
    >
      {items.map(({ href, label, Icon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${active ? "text-accent" : "text-muted"}`}
          >
            <Icon size={22} strokeWidth={1.8} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
