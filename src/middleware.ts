import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/trainers", "/marketplace"];
const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/trainers/") ||
    pathname.startsWith("/marketplace/") ||
    pathname.startsWith("/api/auth");
  const isAuthRoute = authRoutes.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  // Already logged in trying to access login/register → redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  // Phase 1: allow unauthenticated access to dashboard for demo
  // if (isDashboard && !isLoggedIn) {
  //   const callbackUrl = encodeURIComponent(pathname);
  //   return Response.redirect(
  //     new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
  //   );
  // }

  // Role-based dashboard access
  if (isDashboard && isLoggedIn) {
    const role = req.auth?.user?.role;
    if (pathname.startsWith("/dashboard/trainer") && role !== "TRAINER" && role !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    if (pathname.startsWith("/dashboard/organization") && role !== "ORGANIZATION" && role !== "ADMIN") {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|.*\\..*).*)"],
};
