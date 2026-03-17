import {
  trainerDashboardKPIs,
  organizationDashboardKPIs,
  availableAnnonces,
  trainerAvailability,
  trainerAccountSettings,
} from "@/lib/mock-data";
import type {
  TrainerDashboardKPIs,
  OrganizationDashboardKPIs,
  Annonce,
  TrainerAvailability,
  TrainerAccountSettings,
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

export async function getTrainerAccountSettings(): Promise<TrainerAccountSettings> {
  return trainerAccountSettings;
}
