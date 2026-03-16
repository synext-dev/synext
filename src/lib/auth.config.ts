import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";
import type { UserRole } from "@/types";

// Phase 1: mock users — any password accepted
const MOCK_USERS = [
  { id: "t1", name: "Sophie Martin", email: "trainer@synext.com", role: "TRAINER" as UserRole },
  { id: "o1", name: "TechCorp Formation", email: "org@synext.com", role: "ORGANIZATION" as UserRole },
  { id: "a1", name: "Admin Synext", email: "admin@synext.com", role: "ADMIN" as UserRole },
];

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        // Phase 1: find mock user by email
        // Phase 2: query DB + bcrypt.compare
        const user = MOCK_USERS.find(
          (u) => u.email === validated.data.email
        );

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
