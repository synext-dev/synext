import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-synext-bg">
      <Navbar />
      <main className="flex-1 space-y-0">{children}</main>
      <Footer />
    </div>
  );
}
