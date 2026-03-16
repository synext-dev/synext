"use client";

import { useSession } from "next-auth/react";
import type { AuthUser } from "@/types";

export function useCurrentUser(): AuthUser | null {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return {
    id: session.user.id,
    name: session.user.name ?? "",
    email: session.user.email ?? "",
    role: session.user.role,
    image: session.user.image ?? undefined,
  };
}
