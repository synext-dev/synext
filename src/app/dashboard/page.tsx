import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  switch (session.user.role) {
    case "TRAINER":
      redirect("/dashboard/trainer");
    case "ORGANIZATION":
      redirect("/dashboard/organization");
    case "ADMIN":
      redirect("/dashboard/trainer");
    default:
      redirect("/login");
  }
}
