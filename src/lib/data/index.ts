import type { Exercise } from "@/lib/types";
import { CHEST_EXERCISES } from "./exercises/chest";
import { BACK_EXERCISES } from "./exercises/back";
import { LEG_EXERCISES } from "./exercises/legs";
import { SHOULDER_EXERCISES } from "./exercises/shoulders";
import { ARM_EXERCISES } from "./exercises/arms";
import { CORE_EXERCISES } from "./exercises/core";

export const EXERCISES: Exercise[] = [
  ...CHEST_EXERCISES,
  ...BACK_EXERCISES,
  ...LEG_EXERCISES,
  ...SHOULDER_EXERCISES,
  ...ARM_EXERCISES,
  ...CORE_EXERCISES,
].map((e) => ({ ...e, image: `/exercises/${e.id}.svg` }));

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}

export function exercisesByGroup(group: Exercise["muscleGroup"]): Exercise[] {
  return EXERCISES.filter((e) => e.muscleGroup === group);
}
