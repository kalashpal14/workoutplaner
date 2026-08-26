"use client";

import Link from "next/link";
import { computeStats, useHydrated, useWorkoutLog } from "@/lib/hooks/useWorkoutLog";

export default function ExerciseProgressSummary({
  exerciseId,
}: {
  exerciseId: string;
}) {
  const { logs } = useWorkoutLog();
  const hydrated = useHydrated();

  if (!hydrated) {
    return <div className="h-20 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />;
  }

  const stats = computeStats(logs, exerciseId);

  if (stats.totalSets === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-4 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        No history yet for this exercise - your sets will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Best weight" value={`${stats.bestWeight} kg`} />
        <Stat label="Total volume" value={`${stats.totalVolume.toLocaleString()} kg`} />
        <Stat label="Total sets" value={String(stats.totalSets)} />
        <Stat
          label="Last done"
          value={
            stats.lastPerformed
              ? new Date(stats.lastPerformed).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })
              : "-"
          }
        />
      </div>
      <Link
        href={`/progress#${exerciseId}`}
        className="block text-center text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        View full progress history →
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-100 p-3 text-center dark:bg-zinc-800/70">
      <p className="text-sm font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
    </div>
  );
}
