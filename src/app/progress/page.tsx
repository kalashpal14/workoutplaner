"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import VolumeChart from "@/components/VolumeChart";
import { EXERCISES } from "@/lib/data";
import {
  computeStats,
  computeStreak,
  recentDailyVolumes,
  useHydrated,
  useWorkoutLog,
} from "@/lib/hooks/useWorkoutLog";

export default function ProgressPage() {
  const { logs, clearAll } = useWorkoutLog();
  const hydrated = useHydrated();
  const [confirming, setConfirming] = useState(false);

  const active = useMemo(
    () =>
      EXERCISES.filter((e) => (logs[e.id] ?? []).length > 0).map((e) => ({
        exercise: e,
        stats: computeStats(logs, e.id),
        chart: recentDailyVolumes(logs, e.id),
      })),
    [logs]
  );

  const totals = useMemo(() => {
    let totalSets = 0;
    let totalVolume = 0;
    for (const a of active) {
      totalSets += a.stats.totalSets;
      totalVolume += a.stats.totalVolume;
    }
    return { totalSets, totalVolume };
  }, [active]);

  if (!hydrated) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="h-64 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Your Progress</h1>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <SummaryCard value={String(computeStreak(logs))} label="day streak" accent />
        <SummaryCard value={String(totals.totalSets)} label="total sets" />
        <SummaryCard value={`${totals.totalVolume.toLocaleString()} kg`} label="total volume" />
        <SummaryCard value={String(active.length)} label="exercises trained" />
      </div>

      <section aria-label="Per-exercise progress" className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">By exercise</h2>
        {active.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            Nothing tracked yet. Complete a workout to start building your history.
          </p>
        ) : (
          active.map(({ exercise, stats, chart }) => (
            <article
              key={exercise.id}
              id={exercise.id}
              className="scroll-mt-20 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/exercise/${exercise.id}`}
                  className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {exercise.name}
                </Link>
                {stats.lastPerformed && (
                  <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                    last:{" "}
                    {new Date(stats.lastPerformed).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                <MiniStat label="best" value={stats.bestWeight > 0 ? `${stats.bestWeight} kg` : "BW"} />
                <MiniStat label="sets" value={String(stats.totalSets)} />
                <MiniStat label="volume" value={`${stats.totalVolume.toLocaleString()} kg`} />
              </dl>
              <div className="mt-3">
                <VolumeChart data={chart} />
              </div>
            </article>
          ))
        )}
      </section>

      {totals.totalSets > 0 && (
        <div className="mt-10 text-center">
          {confirming ? (
            <div className="inline-flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm dark:border-red-500/30 dark:bg-red-500/10">
              <span>Delete all workout data?</span>
              <button
                onClick={() => {
                  clearAll();
                  setConfirming(false);
                }}
                className="rounded-lg bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-700"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg px-3 py-1 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="text-xs text-zinc-400 underline-offset-2 hover:text-red-500 hover:underline"
            >
              Reset all progress data
            </button>
          )}
        </div>
      )}
    </main>
  );
}

function SummaryCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        accent
          ? "bg-orange-100 dark:bg-orange-500/15"
          : "bg-white ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
      }`}
    >
      <p className="text-xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 px-2 py-1.5 dark:bg-zinc-800/60">
      <dd className="text-sm font-semibold tabular-nums">{value}</dd>
      <dt className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
    </div>
  );
}
