"use client";

import { useMemo, useState } from "react";
import RestTimer from "./RestTimer";
import { useHydrated, useWorkoutLog } from "@/lib/hooks/useWorkoutLog";
import type { Exercise } from "@/lib/types";

interface WorkoutPanelProps {
  exercise: Exercise;
}

interface SessionSet {
  reps: number;
  weight: number;
  date: number;
}

export default function WorkoutPanel({ exercise }: WorkoutPanelProps) {
  const { addSet, logs } = useWorkoutLog();
  const hydrated = useHydrated();

  const [started, setStarted] = useState(false);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("10");
  const [resting, setResting] = useState(false);
  const [finished, setFinished] = useState<SessionSet[] | null>(null);

  const todayKey = new Date().toDateString();
  const sessionSets = useMemo(() => {
    if (finished) return finished;
    return (logs[exercise.id] ?? [])
      .filter((s) => new Date(s.date).toDateString() === todayKey)
      .map((s) => ({ reps: s.reps, weight: s.weight, date: s.date }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs, exercise.id, finished]);

  const sessionVolume = sessionSets.reduce((sum, s) => sum + s.reps * s.weight, 0);

  function handleLogSet() {
    const r = parseInt(reps, 10);
    const w = parseFloat(weight) || 0;
    if (!Number.isFinite(r) || r < 1 || r > 100) return;
    if (!Number.isFinite(w) || w < 0 || w > 1000) return;
    addSet(exercise.id, r, w);
    setResting(true);
  }

  function handleFinish() {
    setFinished(sessionSets);
    setResting(false);
  }

  function handleNewSession() {
    setFinished(null);
    setStarted(false);
  }

  if (!hydrated) {
    return (
      <div className="h-40 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
    );
  }

  if (finished) {
    return (
      <div className="space-y-4 rounded-xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          Session complete - great work! 🎉
        </p>
        <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          {sessionSets.map((s, i) => (
            <li key={s.date} className="flex justify-between tabular-nums">
              <span>Set {i + 1}</span>
              <span>
                {s.reps} reps{s.weight > 0 ? ` × ${s.weight} kg` : " (bodyweight)"}
              </span>
            </li>
          ))}
          <li className="flex justify-between border-t border-emerald-200 pt-1 font-medium dark:border-emerald-500/30">
            <span>Total volume</span>
            <span>{sessionVolume.toLocaleString()} kg</span>
          </li>
        </ul>
        <button
          onClick={handleNewSession}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Start new session
        </button>
      </div>
    );
  }

  if (!started) {
    return (
      <button
        onClick={() => setStarted(true)}
        className="w-full rounded-xl bg-blue-600 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        Start workout
      </button>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Active session</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {sessionSets.length} set{sessionSets.length === 1 ? "" : "s"} ·{" "}
          {sessionVolume.toLocaleString()} kg volume
        </p>
      </div>

      {resting ? (
        <RestTimer onComplete={() => setResting(false)} />
      ) : (
        <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Weight (kg)
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={1000}
              step={2.5}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm tabular-nums outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Reps
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={100}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm tabular-nums outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <button
            onClick={handleLogSet}
            disabled={!reps}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
          >
            Log set
          </button>
        </div>
      )}

      {sessionSets.length > 0 && (
        <ol className="space-y-1 text-sm">
          {sessionSets.map((s, i) => (
            <li
              key={s.date}
              className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-1.5 tabular-nums dark:bg-zinc-800/60"
            >
              <span className="font-medium text-zinc-500 dark:text-zinc-400">
                Set {i + 1}
              </span>
              <span className="text-zinc-800 dark:text-zinc-200">
                {s.reps} reps{s.weight > 0 ? ` × ${s.weight} kg` : " (bodyweight)"}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleFinish}
          disabled={sessionSets.length === 0}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-40 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Finish workout
        </button>
        <button
          onClick={() => {
            setStarted(false);
            setResting(false);
          }}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
