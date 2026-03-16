import Link from "next/link";
import { APP_NAME, DASHBOARD_NAV } from "@/lib/constants";
import type { UserRole } from "@/types";

export function Sidebar({ role }: { role: UserRole }) {
  const navItems =
    role === "ORGANIZATION"
      ? DASHBOARD_NAV.ORGANIZATION
      : DASHBOARD_NAV.TRAINER;

  return (
    <aside className="w-64 border-r bg-muted/30 p-6">
      <Link href="/" className="text-lg font-bold mb-8 block">
        {APP_NAME}
      </Link>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
