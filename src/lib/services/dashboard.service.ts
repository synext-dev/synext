import {
  trainerDashboardKPIs,
  organizationDashboardKPIs,
  availableAnnonces,
  trainerAvailability,
} from "@/lib/mock-data";
import type {
  TrainerDashboardKPIs,
  OrganizationDashboardKPIs,
  Annonce,
  TrainerAvailability,
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

export async function getTrainerAvailability(): Promise<TrainerAvailability> {
  return trainerAvailability;
}
