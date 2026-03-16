import Link from "next/link";

export function Cta() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-8 text-center shadow-[0px_11px_33px_0px_rgba(222,222,222,0.25)] sm:p-12">
        <h2 className="mx-auto max-w-xl text-3xl font-semibold text-synext-navy sm:text-5xl">
          Faite de Synext votre{" "}
          <span className="italic text-synext-blue">
            nouvel outil de recrutement
          </span>{" "}
          pour la formation !
        </h2>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-full bg-synext-light px-6 py-3 font-medium text-synext-navy transition-colors hover:bg-synext-blue hover:text-white"
        >
          Utiliser Synext Maintenant !
        </Link>
      </div>
    </section>
  );
}
