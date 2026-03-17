"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Lock,
  User,
  HeadphonesIcon,
  LayoutGrid,
  Users,
  BookOpen,
  LogOut,
} from "lucide-react";
import { APP_NAME, DASHBOARD_NAV } from "@/lib/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { UserRole } from "@/types";

const TRAINER_ICONS = [
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Lock,
  User,
  HeadphonesIcon,
] as const;

const ORG_ICONS = [LayoutGrid, Users, BookOpen] as const;

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const navItems =
    role === "ORGANIZATION"
      ? DASHBOARD_NAV.ORGANIZATION
      : DASHBOARD_NAV.TRAINER;
  const icons = role === "ORGANIZATION" ? ORG_ICONS : TRAINER_ICONS;

  const isActive = (href: string) => {
    if (href === "/dashboard/trainer" || href === "/dashboard/organization") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex w-56 flex-col border-r bg-white">
      <div className="flex items-center justify-center px-4 py-6">
        <Link href="/" className="font-heading text-xl font-bold text-synext-navy">
          {APP_NAME}
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map((item, index) => {
          const Icon = icons[index];
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-synext-light text-synext-navy font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-synext-light text-synext-navy text-xs font-semibold">
              SM
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">Sophie Martin</p>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {role === "ORGANIZATION" ? "Organisme" : "Formateur"}
            </Badge>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
