import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sophia Moore",
    role: "Formatrice Digital",
    quote: "Synext m'a permis de trouver des missions régulières",
    text: "Grâce à Synext, j'ai pu développer mon activité de formatrice indépendante et trouver des organismes qui correspondent parfaitement à mon expertise.",
  },
  {
    name: "Adam Smith",
    role: "Formateur Management",
    quote: "La plateforme idéale pour les formateurs",
    text: "Une interface claire, des organismes sérieux et un système de mise en relation efficace. Je recommande Synext à tous mes collègues formateurs.",
  },
  {
    name: "Mike Warren",
    role: "Formateur IA & Data",
    quote: "Un outil indispensable pour la formation",
    text: "Synext a révolutionné ma façon de trouver des missions. Le processus est simple, rapide et les organismes sont de qualité.",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-semibold text-synext-navy sm:text-5xl">
          Les{" "}
          <span className="italic text-synext-blue">avis</span> de nos
          formateurs
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-[32px] bg-white p-8 text-left"
            >
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
