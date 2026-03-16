import {
  trainerDashboardKPIs,
  organizationDashboardKPIs,
} from "@/lib/mock-data";
import type { TrainerDashboardKPIs, OrganizationDashboardKPIs } from "@/types";

export async function getTrainerKPIs(): Promise<TrainerDashboardKPIs> {
  return trainerDashboardKPIs;
}

export async function getOrgKPIs(): Promise<OrganizationDashboardKPIs> {
  return organizationDashboardKPIs;
}
