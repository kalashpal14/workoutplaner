"use client";

import { useEffect, useRef, useState } from "react";
import { REST_SECONDS } from "@/lib/types";
import { playRestOverCue } from "@/lib/beep";

interface RestTimerProps {
  onComplete: () => void;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function RestTimer({ onComplete }: RestTimerProps) {
  const [left, setLeft] = useState(REST_SECONDS);
  const firedRef = useRef(false);

  useEffect(() => {
    firedRef.current = false;
    const started = Date.now();
    const interval = setInterval(() => {
      const remaining = Math.max(0, REST_SECONDS - Math.floor((Date.now() - started) / 1000));
      setLeft(remaining);
      if (remaining === 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(interval);
        playRestOverCue();
        onComplete();
      }
    }, 250);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = left / REST_SECONDS;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-blue-500/40 bg-blue-50 p-5 dark:border-blue-500/30 dark:bg-blue-500/10">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Rest - recover between sets
      </p>
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#e4e4e7" strokeWidth="10" className="stroke-zinc-200 dark:stroke-zinc-800" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            className="text-blue-600 transition-[stroke-dashoffset] duration-250 ease-linear"
            stroke="currentColor"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
            {left}
          </span>
          <span className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">sec</span>
        </div>
      </div>
      <button
        onClick={() => {
          if (!firedRef.current) {
            firedRef.current = true;
            playRestOverCue();
            onComplete();
          }
        }}
        className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-700"
      >
        Skip rest
      </button>
    </div>
  );
}
