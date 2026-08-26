"use client";

import { useState } from "react";
import { MEALS, MUSCLE_NUTRITION, NUTRITION_GUIDANCE } from "@/lib/data/meals";
import { MUSCLE_GROUPS } from "@/lib/types";

type Goal = "bulking" | "cutting" | "maintenance";

const GOALS: { value: Goal; label: string }[] = [
  { value: "bulking", label: "Bulking" },
  { value: "cutting", label: "Cutting" },
  { value: "maintenance", label: "Maintenance" },
];

const MEAL_TYPES: { value: Meal["type"]; label: string; icon: string }[] = [
  { value: "breakfast", label: "Breakfast", icon: "🌅" },
  { value: "lunch", label: "Lunch", icon: "☀️" },
  { value: "dinner", label: "Dinner", icon: "🌙" },
  { value: "snack", label: "Snacks", icon: "🍎" },
  { value: "pre-workout", label: "Pre-workout", icon: "⚡" },
  { value: "post-workout", label: "Post-workout", icon: "🥤" },
];

type Meal = (typeof MEALS)[number];

export default function MealsPage() {
  const [goal, setGoal] = useState<Goal>("maintenance");

  const filtered = MEALS.filter((m) => m.tags.includes(goal));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Meals &amp; Guidance</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Nutrition matched to your goal and the muscles you train.
      </p>

      <div
        role="group"
        aria-label="Choose your goal"
        className="mt-5 flex flex-wrap gap-2"
      >
        {GOALS.map((g) => (
          <button
            key={g.value}
            onClick={() => setGoal(g.value)}
            aria-pressed={goal === g.value}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              goal === g.value
                ? "bg-blue-600 text-white"
                : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <section aria-label={`Guidance for ${goal}`} className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold capitalize">{goal} guidance</h2>
        {NUTRITION_GUIDANCE[goal].map((section) => (
          <div
            key={section.title}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-semibold">📌 {section.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
              {section.body}
            </p>
          </div>
        ))}
      </section>

      <section aria-label="Meals by type" className="mt-8 space-y-6">
        <h2 className="text-lg font-semibold">
          Suggested meals <span className="text-sm font-normal text-zinc-500">({goal})</span>
        </h2>
        {MEAL_TYPES.map(({ value, label, icon }) => {
          const meals = filtered.filter((m) => m.type === value);
          if (meals.length === 0) return null;
          return (
            <div key={value}>
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                <span>{icon}</span> {label}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {meals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section aria-label="Muscle-specific nutrition tips" className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">Fuel per muscle group</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {MUSCLE_GROUPS.map((g) => (
            <div
              key={g.value}
              className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span
                className="mt-0.5 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: g.color }}
              />
              <div>
                <p className="text-sm font-semibold">{g.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {MUSCLE_NUTRITION[g.value]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 rounded-xl bg-zinc-100 p-4 text-center text-[11px] leading-relaxed text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">
        General information only - not medical or dietetic advice. Consult a
        professional for personalized plans.
      </p>
    </main>
  );
}

function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug">{meal.name}</p>
        <div className="shrink-0 text-right">
          <p className="text-xs font-semibold tabular-nums">{meal.kcal} kcal</p>
          <p className="text-[10px] tabular-nums text-zinc-500 dark:text-zinc-400">
            {meal.protein} g protein
          </p>
        </div>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        {meal.description}
      </p>
    </div>
  );
}
