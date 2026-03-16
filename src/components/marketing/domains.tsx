import { TRAINING_DOMAINS } from "@/lib/constants";

export function Domains() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-md text-3xl font-semibold text-synext-navy sm:text-5xl">
          Plus de{" "}
          <span className="italic text-synext-blue">40 domaines</span>{" "}
          r&eacute;f&eacute;renc&eacute;s et leurs{" "}
          <span className="italic text-synext-blue">
            250 sp&eacute;cialit&eacute;s
          </span>
        </h2>
        <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
          {TRAINING_DOMAINS.map((domain) => (
            <span
              key={domain}
              className="rounded-full bg-white px-4 py-2.5 text-sm text-synext-blue shadow-[0px_2px_4px_0px_rgba(217,217,217,0.25)]"
            >
              {domain}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
