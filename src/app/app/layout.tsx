import BottomNav from "@/components/cliente/BottomNav";

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-[430px] pb-[100px]">
      {children}
      <BottomNav />
    </div>
  );
}
