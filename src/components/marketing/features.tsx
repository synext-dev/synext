import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Matchmaking intelligent",
    description:
      "Trouvez le formateur idéal grâce à notre algorithme de mise en relation basé sur vos besoins.",
  },
  {
    title: "Marketplace de formations",
    description:
      "Achetez et vendez des formations en toute confiance avec paiement sécurisé via Stripe.",
  },
  {
    title: "Gestion simplifiée",
    description:
      "Tableaux de bord dédiés pour formateurs et organismes. Suivez vos KPIs en temps réel.",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi Synext ?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
