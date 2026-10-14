import type { Premio } from "@/lib/mock";

export default function RedeemSheet({ premio, onClose }: { premio: Premio; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70" role="dialog" aria-modal="true">
      <div className="mx-auto w-full max-w-[430px] rounded-t-[26px] bg-ink p-6 pb-[max(24px,env(safe-area-inset-bottom))] text-bg">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#55505F]">Canje</p>
        <h2 className="font-display text-[22px] font-bold">{premio.nombre}</h2>
        <p className="text-[13px] text-[#55505F]">{premio.lugar}</p>
        <div className="my-5 rounded-card border-2 border-dashed border-bg/40 py-5 text-center">
          <span className="font-display text-4xl font-extrabold tracking-[0.14em]">K7M-4PX</span>
        </div>
        <p className="mb-4 text-center text-sm text-[#55505F]">Válido por 10 minutos</p>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[56px] w-full rounded-btn bg-bg text-base font-semibold text-ink active:opacity-80"
        >
          Listo
        </button>
      </div>
    </div>
  );
}
