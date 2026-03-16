"use client";

import { useSession } from "next-auth/react";
import type { UserRole } from "@/types";

export function useCurrentRole(): UserRole | null {
  const { data: session } = useSession();
  return session?.user?.role ?? null;
}
