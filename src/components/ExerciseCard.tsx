import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "@/lib/types";
import { GROUP_COLORS, MUSCLE_GROUP_LABELS } from "@/lib/types";

const difficultyStyles: Record<Exercise["difficulty"], string> = {
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const color = GROUP_COLORS[exercise.muscleGroup];

  return (
    <Link
      href={`/exercise/${exercise.id}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-800/50">
        <Image
          src={exercise.image}
          alt={`${exercise.name} illustration`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-1.5 border-t border-zinc-100 p-3 dark:border-zinc-800">
        <p className="text-sm font-medium leading-snug text-zinc-900 dark:text-zinc-100">
          {exercise.name}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span
            className={`rounded-full px-2 py-0.5 font-medium`}
            style={{ backgroundColor: `${color}22`, color }}
          >
            {MUSCLE_GROUP_LABELS[exercise.muscleGroup]}
          </span>
          <span className={`rounded-full px-2 py-0.5 capitalize ${difficultyStyles[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}
