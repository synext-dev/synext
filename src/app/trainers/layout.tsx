import { PublicLayout } from "@/components/layout/public-layout";

export default function TrainersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
