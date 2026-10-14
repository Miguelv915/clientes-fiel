"use client";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const makeCode = () =>
  Array.from({ length: 6 }, (_, i) => ABC[Math.floor(Math.random() * ABC.length)] + (i === 2 ? "-" : "")).join("");

export default function DynamicQR({ ttl = 45 }: { ttl?: number }) {
  const [left, setLeft] = useState(ttl);
  // Código fijo en el primer render para evitar desajuste de hidratación; se genera al montar.
  const [code, setCode] = useState("ABC-123");

  useEffect(() => {
    const first = setTimeout(() => setCode(makeCode()), 0);
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setCode(makeCode());
          return ttl;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, [ttl]);

  // En el prototipo el contenido es simulado. En producción vendrá firmado del servidor.
  const payload = `pulso:demo:${code}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 rounded-[26px] bg-ink p-6 text-bg">
        <QRCodeSVG value={payload} size={252} bgColor="#F2EFE9" fgColor="#0E0D12" aria-label="Código QR personal" />
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#55505F]">Código manual</span>
          <span className="font-display text-2xl font-bold tracking-[0.12em]">{code}</span>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-ink-2">Se renueva en</span>
        <span className="font-semibold text-accent">{left} s</span>
      </div>
      <div className="h-1.5 rounded-full bg-line">
        <div
          className="h-1.5 rounded-full bg-accent transition-[width] duration-1000 ease-linear"
          style={{ width: `${(left / ttl) * 100}%` }}
        />
      </div>
    </div>
  );
}
