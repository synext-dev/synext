import { z } from "zod";

export const trainerProfileSchema = z.object({
  bio: z.string().min(10, "Minimum 10 caractères"),
  specialties: z.array(z.string()).min(1, "Au moins une spécialité"),
  city: z.string().min(2, "Ville requise"),
  hourlyRate: z.number().positive("Le tarif doit être positif"),
});

export const orgProfileSchema = z.object({
  companyName: z.string().min(2, "Minimum 2 caractères"),
  description: z.string().min(10, "Minimum 10 caractères"),
  employeeCount: z.number().int().positive("Nombre d'employés requis"),
});

export type TrainerProfileInput = z.infer<typeof trainerProfileSchema>;
export type OrgProfileInput = z.infer<typeof orgProfileSchema>;
