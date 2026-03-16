import { PublicLayout } from "@/components/layout/public-layout";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
