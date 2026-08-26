import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExerciseProgressSummary from "@/components/ExerciseProgressSummary";
import WorkoutPanel from "@/components/WorkoutPanel";
import { EXERCISES, getExercise } from "@/lib/data";
import { GROUP_COLORS, MUSCLE_GROUP_LABELS } from "@/lib/types";

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ id: e.id }));
}

export default async function ExercisePage({
  params,
}: PageProps<"/exercise/[id]">) {
  const { id } = await params;
  const exercise = getExercise(id);
  if (!exercise) notFound();

  const color = GROUP_COLORS[exercise.muscleGroup];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Back to library
      </Link>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sm:w-[220px]">
          <Image
            src={exercise.image}
            alt={`${exercise.name} illustration`}
            fill
            sizes="220px"
            priority
            className="object-contain p-2"
          />
        </div>
        <div className="min-w-0">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {MUSCLE_GROUP_LABELS[exercise.muscleGroup]}
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {exercise.name}
          </h1>
          <p className="mt-1 text-sm capitalize text-zinc-500 dark:text-zinc-400">
            {exercise.equipment} · {exercise.difficulty}
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Rest between sets: <strong>40 seconds</strong>
          </p>
        </div>
      </div>

      <section aria-label="Workout tracker" className="mt-8">
        <WorkoutPanel exercise={exercise} />
      </section>

      <section aria-label="Your progress" className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Your progress</h2>
        <ExerciseProgressSummary exerciseId={exercise.id} />
      </section>

      <section aria-label="Tutorial" className="mt-8 space-y-6">
        <h2 className="text-lg font-semibold">How to do it</h2>
        <ol className="space-y-3">
          {exercise.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="grid gap-4 sm:grid-cols-2">
          <TipsCard title="Tips" icon="💡" items={exercise.tips} tone="blue" />
          <TipsCard
            title="Common mistakes"
            icon="⚠️"
            items={exercise.mistakes}
            tone="red"
          />
        </div>
      </section>
    </main>
  );
}

function TipsCard({
  title,
  icon,
  items,
  tone,
}: {
  title: string;
  icon: string;
  items: string[];
  tone: "blue" | "red";
}) {
  const styles =
    tone === "blue"
      ? "border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/10"
      : "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10";

  return (
    <div className={`rounded-xl border p-4 ${styles}`}>
      <p className="mb-2 text-sm font-semibold">
        {icon} {title}
      </p>
      <ul className="list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
