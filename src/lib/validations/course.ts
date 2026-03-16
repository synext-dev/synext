import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Minimum 3 caractères"),
  description: z.string().min(10, "Minimum 10 caractères"),
  price: z.number().positive("Le prix doit être positif"),
  duration: z.string().min(1, "Durée requise"),
  category: z.enum([
    "DEVELOPMENT",
    "DESIGN",
    "MARKETING",
    "MANAGEMENT",
    "DATA",
    "DEVOPS",
  ]),
});

export type CourseInput = z.infer<typeof courseSchema>;
