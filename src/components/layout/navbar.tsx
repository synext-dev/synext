import Link from "next/link";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { auth } from "@/lib/auth";
import { UserMenu } from "@/components/layout/user-menu";
import type { AuthUser } from "@/types";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-8 rounded-full bg-white px-10 py-3.5 shadow-[0px_4px_30px_0px_rgba(222,222,222,0.25)]">
        <Link href="/" className="shrink-0 font-heading text-xl font-bold text-synext-navy">
          {APP_NAME}
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-foreground transition-colors hover:text-synext-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
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
                href="/dashboard/trainer"
                className="rounded-full border-[1.5px] border-synext-navy px-5 py-2.5 text-sm font-medium text-synext-navy transition-colors hover:bg-synext-navy hover:text-white"
              >
                Espace formateur
              </Link>
              <Link
                href="/dashboard/organization"
                className="rounded-full bg-synext-light px-5 py-2.5 text-sm font-medium text-synext-navy transition-colors hover:bg-synext-blue hover:text-white"
              >
                Espace organisme
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
