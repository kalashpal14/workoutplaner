/**
 * Base path where the site is hosted.
 * Matches `basePath` in next.config.ts — empty locally, `/workoutplaner` in production.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/workoutplaner" : "";
