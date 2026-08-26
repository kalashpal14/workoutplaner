export type MuscleGroup =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "core";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Equipment = "barbell" | "dumbbell" | "cable" | "machine" | "bodyweight";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  difficulty: Difficulty;
  image: string;
  template: string;
  steps: string[];
  tips: string[];
  mistakes: string[];
}

export interface SetLog {
  reps: number;
  weight: number;
  date: number;
}

export type WorkoutLogs = Record<string, SetLog[]>;

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack" | "pre-workout" | "post-workout";
  kcal: number;
  protein: number;
  tags: ("bulking" | "cutting" | "maintenance")[];
  description: string;
}

export const REST_SECONDS = 40;

export const MUSCLE_GROUPS: {
  value: MuscleGroup;
  label: string;
  color: string;
}[] = [
  { value: "chest", label: "Chest", color: "#ef4444" },
  { value: "back", label: "Back", color: "#3b82f6" },
  { value: "legs", label: "Legs", color: "#10b981" },
  { value: "shoulders", label: "Shoulders", color: "#f59e0b" },
  { value: "arms", label: "Arms", color: "#a855f7" },
  { value: "core", label: "Core", color: "#ec4899" },
];

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: "Chest",
  back: "Back",
  legs: "Legs",
  shoulders: "Shoulders",
  arms: "Arms",
  core: "Core",
};

export const GROUP_COLORS: Record<MuscleGroup, string> = {
  chest: "#ef4444",
  back: "#3b82f6",
  legs: "#10b981",
  shoulders: "#f59e0b",
  arms: "#a855f7",
  core: "#ec4899",
};

export function getMuscleGroupMeta(group: MuscleGroup) {
  return MUSCLE_GROUPS.find((g) => g.value === group)!;
}
