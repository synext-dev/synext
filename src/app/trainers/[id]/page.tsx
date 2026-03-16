import { Badge } from "@/components/ui/badge";
import { getTrainerById, getTrainerCourses } from "@/lib/services/trainer.service";
import { notFound } from "next/navigation";

export default async function TrainerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trainer = await getTrainerById(id);

  if (!trainer) {
    notFound();
  }

  const trainerCourses = await getTrainerCourses(trainer.id);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
        <p className="text-muted-foreground mb-4">
          {trainer.city} &middot; {trainer.hourlyRate} &euro;/h &middot;{" "}
          {trainer.rating}/5 ({trainer.reviewCount} avis)
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {trainer.specialties.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
        <p className="text-lg mb-8">{trainer.bio}</p>

        {trainerCourses.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Formations</h2>
            <ul className="space-y-2">
              {trainerCourses.map((course) => (
                <li key={course.id} className="text-muted-foreground">
                  {course.title} — {course.price} &euro;
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
