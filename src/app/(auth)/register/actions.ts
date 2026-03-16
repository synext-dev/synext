"use server";

import { signIn } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function registerAction(values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "TRAINER" | "ORGANIZATION";
}) {
  const validated = registerSchema.safeParse(values);
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? "Données invalides" };
  }

  // Phase 2: create user in DB with hashed password
  // For Phase 1, we just sign in with mock users

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Une erreur est survenue lors de l'inscription" };
    }
    throw error;
  }
}
