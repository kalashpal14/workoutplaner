"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  commitLogs,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "../storage";
import type { WorkoutLogs } from "../types";

const noopSubscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useWorkoutLog() {
  const logs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addSet = useCallback(
    (exerciseId: string, reps: number, weight: number) => {
      const current = getSnapshot();
      const existing = current[exerciseId] ?? [];
      commitLogs({
        ...current,
        [exerciseId]: [...existing, { reps, weight, date: Date.now() }],
      });
    },
    []
  );

  const removeLastSet = useCallback((exerciseId: string) => {
    const current = getSnapshot();
    const existing = current[exerciseId] ?? [];
    if (existing.length === 0) return;
    const next = { ...current };
    next[exerciseId] = existing.slice(0, -1);
    commitLogs(next);
  }, []);

  const clearExercise = useCallback((exerciseId: string) => {
    const current = { ...getSnapshot() };
    delete current[exerciseId];
    commitLogs(current);
  }, []);

  const clearAll = useCallback(() => {
    commitLogs({});
  }, []);

  return { logs, addSet, removeLastSet, clearExercise, clearAll };
}

export interface ExerciseStats {
  totalSets: number;
  totalReps: number;
  totalVolume: number;
  bestWeight: number;
  bestSetVolume: number;
  lastPerformed: number | null;
  activeDays: Set<string>;
}

export function computeStats(logs: WorkoutLogs, exerciseId: string): ExerciseStats {
  const sets = logs[exerciseId] ?? [];
  let totalReps = 0;
  let totalVolume = 0;
  let bestWeight = 0;
  let bestSetVolume = 0;
  let lastPerformed: number | null = null;
  const activeDays = new Set<string>();

  for (const s of sets) {
    totalReps += s.reps;
    totalVolume += s.reps * s.weight;
    if (s.weight > bestWeight) bestWeight = s.weight;
    if (s.reps * s.weight > bestSetVolume) bestSetVolume = s.reps * s.weight;
    if (lastPerformed === null || s.date > lastPerformed) lastPerformed = s.date;
    activeDays.add(new Date(s.date).toDateString());
  }

  return {
    totalSets: sets.length,
    totalReps,
    totalVolume,
    bestWeight,
    bestSetVolume,
    lastPerformed,
    activeDays,
  };
}

/** Daily volume for the most recent `count` training days (chronological). */
export function recentDailyVolumes(
  logs: WorkoutLogs,
  exerciseId: string,
  count = 7
): { label: string; volume: number }[] {
  const byDay = new Map<string, number>();
  for (const s of logs[exerciseId] ?? []) {
    const key = new Date(s.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    byDay.set(key, (byDay.get(key) ?? 0) + s.reps * s.weight);
  }
  return [...byDay.entries()]
    .slice(-count)
    .map(([label, volume]) => ({ label, volume }));
}

/** Consecutive days (ending today or yesterday) with any logged set. */
export function computeStreak(logs: WorkoutLogs): number {
  const days = new Set<string>();
  for (const sets of Object.values(logs)) {
    for (const s of sets) days.add(new Date(s.date).toDateString());
  }
  if (days.size === 0) return 0;

  const day = new Date();
  day.setHours(0, 0, 0, 0);
  if (!days.has(day.toDateString())) {
    day.setDate(day.getDate() - 1);
    if (!days.has(day.toDateString())) return 0;
  }
  let streak = 0;
  while (days.has(day.toDateString())) {
    streak++;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}
