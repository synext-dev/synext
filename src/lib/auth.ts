import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import type { UserRole } from "@/types";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as UserRole;
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  ...authConfig,
});
