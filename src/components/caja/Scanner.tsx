"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Html5Qrcode } from "html5-qrcode";
import { Camera } from "lucide-react";

type Props = { texto: string; onDetect?: (value: string) => void };

const READER_ID = "qr-reader";

export default function Scanner({ texto, onDetect }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const onDetectRef = useRef(onDetect);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onDetectRef.current = onDetect;
  }, [onDetect]);

  const stop = useCallback(async () => {
    const s = scannerRef.current;
    scannerRef.current = null;
    if (!s) return;
    try {
      if (s.isScanning) await s.stop();
      s.clear();
    } catch {
      /* ya detenido */
    }
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setActive(true);
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode(READER_ID, { verbose: false });
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10 },
        (value) => {
          void stop().then(() => {
            setActive(false);
            onDetectRef.current?.(value);
          });
        },
        () => {},
      );
    } catch {
      scannerRef.current = null;
      setActive(false);
      setError(
        window.isSecureContext
          ? "No se pudo acceder a la cámara. Revisa el permiso del navegador."
          : "La cámara requiere HTTPS. Abre el sitio desde la URL desplegada (o localhost).",
      );
    }
  }, [stop]);

  useEffect(() => () => void stop(), [stop]);

  const corner = "absolute h-8 w-8 border-accent";
  return (
    <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[22px] bg-[#050407]">
      <div
        id={READER_ID}
        className="absolute inset-0 [&_video]:!h-full [&_video]:!w-full [&_video]:!object-cover"
      />

      <span className={`${corner} left-6 top-6 rounded-tl-lg border-l-4 border-t-4`} />
      <span className={`${corner} right-6 top-6 rounded-tr-lg border-r-4 border-t-4`} />
      <span className={`${corner} bottom-16 left-6 rounded-bl-lg border-b-4 border-l-4`} />
      <span className={`${corner} bottom-16 right-6 rounded-br-lg border-b-4 border-r-4`} />
      <span
        className="absolute inset-x-8 h-0.5 bg-accent shadow-[0_0_12px_var(--color-accent)]"
        style={{ animation: "scan 3s ease-in-out infinite" }}
      />

      {!active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#050407]/80 px-6 text-center">
          <button
            type="button"
            onClick={start}
            className="inline-flex min-h-[56px] items-center gap-2 rounded-btn bg-accent px-5 text-base font-semibold text-on-accent active:opacity-80"
          >
            <Camera size={20} aria-hidden /> Activar cámara
          </button>
          {error && <p className="text-[13px] text-danger">{error}</p>}
        </div>
      )}

      <p className="absolute inset-x-0 bottom-5 text-center text-sm text-ink-2 [text-shadow:0_1px_4px_#000]">
        {texto}
      </p>
    </div>
  );
}
