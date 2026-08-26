import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (project site at /workoutplaner/)
  output: "export",
  // In production the site is served from the repository subpath;
  // locally (dev) we serve from root so `npm run dev` works at http://localhost:3000/
  basePath: isProd ? "/workoutplaner" : "",
  assetPrefix: isProd ? "/workoutplaner/" : undefined,
  // Ensures /progress and /exercise/[id] resolve on GitHub Pages static hosting
  trailingSlash: true,
  // GitHub Pages is static hosting - no Next.js image optimizer
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
