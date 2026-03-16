"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function loginAction(values: { email: string; password: string }) {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Données invalides" };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou mot de passe incorrect" };
        default:
          return { error: "Une erreur est survenue" };
      }
    }
    throw error;
  }
}
