import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} {APP_NAME}. Tous droits
          r&eacute;serv&eacute;s.
        </p>
      </div>
    </footer>
  );
}
