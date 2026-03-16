import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  // Phase 1: default to trainer dashboard if not authenticated
  if (!session) redirect("/dashboard/trainer");

  switch (session.user.role) {
    case "TRAINER":
      redirect("/dashboard/trainer");
    case "ORGANIZATION":
      redirect("/dashboard/organization");
    case "ADMIN":
      redirect("/dashboard/trainer");
    default:
      redirect("/dashboard/trainer");
  }
}
