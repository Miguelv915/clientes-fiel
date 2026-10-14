export default function CajaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col gap-4 px-[22px] pt-6 pb-8">
      {children}
    </div>
  );
}
