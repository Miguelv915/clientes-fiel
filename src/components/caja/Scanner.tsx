export default function Scanner({ texto }: { texto: string }) {
  const corner = "absolute h-8 w-8 border-accent";
  return (
    <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[22px] bg-[#050407]">
      <span className={`${corner} left-6 top-6 rounded-tl-lg border-l-4 border-t-4`} />
      <span className={`${corner} right-6 top-6 rounded-tr-lg border-r-4 border-t-4`} />
      <span className={`${corner} bottom-16 left-6 rounded-bl-lg border-b-4 border-l-4`} />
      <span className={`${corner} bottom-16 right-6 rounded-br-lg border-b-4 border-r-4`} />
      <span
        className="absolute inset-x-8 h-0.5 bg-accent shadow-[0_0_12px_var(--color-accent)]"
        style={{ animation: "scan 3s ease-in-out infinite" }}
      />
      <p className="absolute inset-x-0 bottom-5 text-center text-sm text-ink-2">{texto}</p>
    </div>
  );
}
