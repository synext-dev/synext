import {
  trainerDashboardKPIs,
  organizationDashboardKPIs,
  availableAnnonces,
} from "@/lib/mock-data";
import type {
  TrainerDashboardKPIs,
  OrganizationDashboardKPIs,
  Annonce,
} from "@/types";

export async function getTrainerKPIs(): Promise<TrainerDashboardKPIs> {
  return trainerDashboardKPIs;
}

export async function getOrgKPIs(): Promise<OrganizationDashboardKPIs> {
  return organizationDashboardKPIs;
}

export async function getAvailableAnnonces(): Promise<Annonce[]> {
  return availableAnnonces;
}
