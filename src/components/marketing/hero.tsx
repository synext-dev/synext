import { Star } from "lucide-react";

export function Hero() {
  return (
    <section className="px-4 pt-12 pb-0 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0px_4px_10px_0px_rgba(222,222,222,0.25)]">
          <span className="text-sm">Outil de mise en relation</span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight text-synext-navy sm:text-5xl lg:text-[58px] lg:leading-[70px]">
          L&apos;outil qui r&eacute;f&eacute;rence des{" "}
          <span className="italic text-synext-blue">
            formateurs qualifi&eacute;s
          </span>{" "}
          pour animer vos{" "}
          <span className="italic text-synext-blue">formations</span>
        </h1>

        {/* Google Reviews */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-synext-navy">
            not&eacute; 5/5 (10 avis)
          </span>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mx-auto mt-8 h-[300px] w-full max-w-[900px] rounded-3xl bg-gradient-to-br from-synext-light to-white sm:h-[400px]" />
      </div>
    </section>
  );
}
