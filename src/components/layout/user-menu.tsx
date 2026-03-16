"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { AuthUser } from "@/types";

export function UserMenu({ user }: { user: AuthUser }) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-muted">
        <Avatar className="size-8">
          <AvatarFallback className="bg-synext-light text-synext-navy text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium text-synext-navy sm:block">
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Link href="/dashboard" className="w-full">Tableau de bord</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
