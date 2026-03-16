export function Concept() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-semibold text-synext-navy sm:text-5xl">
          Le{" "}
          <span className="italic text-synext-blue">concept</span>{" "}
          en r&eacute;sum&eacute;...
        </h2>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row">
          <div className="h-[400px] flex-1 rounded-[32px] bg-white" />
          <div className="h-[400px] flex-1 rounded-[32px] bg-white" />
        </div>
      </div>
    </section>
  );
}
