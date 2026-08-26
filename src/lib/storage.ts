import type { WorkoutLogs } from "./types";

const STORAGE_KEY = "workoutplanner:logs";
const EMPTY: WorkoutLogs = {};

let cache: WorkoutLogs | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): WorkoutLogs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? (data as WorkoutLogs) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): WorkoutLogs {
  if (cache === null) {
    cache = typeof window === "undefined" ? EMPTY : readFromStorage();
  }
  return cache;
}

export function getServerSnapshot(): WorkoutLogs {
  return EMPTY;
}

export function commitLogs(logs: WorkoutLogs): void {
  cache = logs;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch {
    // storage unavailable - keep app working in-memory
  }
  listeners.forEach((listener) => listener());
}
