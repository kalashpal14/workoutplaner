"use client";

import { useMemo, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import { EXERCISES } from "@/lib/data";
import type { MuscleGroup } from "@/lib/types";
import { MUSCLE_GROUPS } from "@/lib/types";

export default function Library() {
  const [group, setGroup] = useState<MuscleGroup | "all">("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EXERCISES.filter(
      (e) =>
        (group === "all" || e.muscleGroup === group) &&
        (!q || e.name.toLowerCase().includes(q))
    );
  }, [group, search]);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Exercise Library</h1>
      <p className="mt-1 mb-5 text-sm text-zinc-500 dark:text-zinc-400">
        {EXERCISES.length} exercises · tap any card for tutorial &amp; workout mode
      </p>

      <div className="mb-6 space-y-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search exercises..."
          aria-label="Search exercises"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by muscle group">
          <button
            onClick={() => setGroup("all")}
            aria-pressed={group === "all"}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              group === "all"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            All
          </button>
          {MUSCLE_GROUPS.map((g) => (
            <button
              key={g.value}
              onClick={() => setGroup(group === g.value ? "all" : g.value)}
              aria-pressed={group === g.value}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium transition-all"
              style={
                group === g.value
                  ? { backgroundColor: g.color, color: "#fff" }
                  : { backgroundColor: `${g.color}18`, color: g.color }
              }
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          No exercises match your search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </main>
  );
}
