export function Audience() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-semibold text-synext-navy sm:text-5xl">
          &Agrave;{" "}
          <span className="italic text-synext-blue">qui</span>{" "}
          s&apos;adresse Synext ?
        </h2>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row">
          {/* Formateur Card */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="rounded-[32px] bg-white p-7 text-left">
              <h3 className="mb-4 text-lg font-medium text-synext-navy">
                Vous &ecirc;tes formateur ?
              </h3>
              <p className="text-base text-synext-navy">
                Synext c&apos;est l&apos;outil id&eacute;al pour vous
                offrir la{" "}
                <span className="text-synext-blue">
                  visibilit&eacute; que vous m&eacute;ritez
                </span>{" "}
                sur un espace d&eacute;di&eacute; et trouver enfin
                <span className="text-synext-blue">
                  {" "}
                  de nouvelles opportunit&eacute;s
                </span>
                .
              </p>
              <div className="mt-6 h-[200px] w-full" />
            </div>
            <div className="flex items-center justify-center rounded-[32px] bg-synext-light px-12 py-6">
              <span className="text-center text-xl font-medium text-black sm:text-2xl">
                + 2508 Formateurs R&eacute;f&eacute;renc&eacute;s
              </span>
            </div>
          </div>

          {/* Organisme Card */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-center rounded-[32px] bg-synext-light px-12 py-6">
              <span className="text-center text-xl font-medium text-black sm:text-2xl">
                + 32 Organismes Devenus Clients
              </span>
            </div>
            <div className="rounded-[32px] bg-white p-7 text-left">
              <h3 className="mb-4 text-lg font-medium text-synext-navy">
                Vous &ecirc;tes un organisme de formation ?
              </h3>
              <p className="text-base text-synext-navy">
                Utilisez Synext en tant qu&apos;
                <span className="text-synext-blue">
                  &eacute;cole sup&eacute;rieur
                </span>
                ,{" "}
                <span className="text-synext-blue">
                  centre de formation pro
                </span>{" "}
                ou{" "}
                <span className="text-synext-blue">
                  plateforme digitale
                </span>{" "}
                pour trouver le formateur qualifi&eacute; qui animera vos
                formations.
              </p>
              <div className="mt-6 h-[200px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
