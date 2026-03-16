import Link from "next/link";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { auth } from "@/lib/auth";
import { UserMenu } from "@/components/layout/user-menu";
import type { AuthUser } from "@/types";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-full bg-white px-6 py-3 shadow-[0px_4px_30px_0px_rgba(222,222,222,0.25)]">
        <Link href="/" className="text-xl font-bold text-synext-navy">
          {APP_NAME}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground transition-colors hover:text-synext-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <UserMenu
              user={{
                id: session.user.id,
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                role: session.user.role,
                image: session.user.image ?? undefined,
              } satisfies AuthUser}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border-[1.5px] border-synext-navy px-4 py-2 text-sm font-medium text-synext-navy transition-colors hover:bg-synext-navy hover:text-white"
              >
                Offres
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-synext-light px-4 py-2 text-sm font-medium text-synext-navy transition-colors hover:bg-synext-blue hover:text-white"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
