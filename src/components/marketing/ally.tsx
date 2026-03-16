export function Ally() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold text-synext-navy sm:text-5xl">
          Synext est votre{" "}
          <span className="italic text-synext-blue">futur alli&eacute;</span>
        </h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {/* Left column - tall card */}
          <div className="flex-1 rounded-[32px] bg-white px-7 py-4">
            <p className="leading-5 text-synext-navy">
              Vous aimez savoir o&ugrave; vous en &ecirc;tes ? Dashboard
              clair, profils sauvegard&eacute;s, contacts suivis. Tout est
              sous contr&ocirc;le.
            </p>
          </div>
          {/* Right column - two stacked cards */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="rounded-[32px] bg-white px-7 py-4">
              <p className="leading-5 text-synext-navy">
                Syst&egrave;me de recherche avanc&eacute; ! Filtrage par
                sp&eacute;cialit&eacute;, exp&eacute;rience, dispo.
                C&apos;est pr&eacute;cis.
              </p>
            </div>
            <div className="rounded-[32px] bg-white px-7 py-4">
              <p className="leading-5 text-synext-navy">
                Le formateur id&eacute;al trouv&eacute; ? Vous appelez.
                Vous &eacute;crivez. &Eacute;change direct. Sans
                interm&eacute;diaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
