import Nav from "@/components/Nav";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
