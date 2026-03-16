import { organizations } from "@/lib/mock-data";
import type { Organization } from "@/types";

export async function getOrganizations(): Promise<Organization[]> {
  return organizations;
}

export async function getOrganizationById(
  id: string
): Promise<Organization | null> {
  return organizations.find((o) => o.id === id) ?? null;
}
