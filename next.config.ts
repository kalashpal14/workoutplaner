import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages deployment (see .github/workflows/nextjs.yml)
  output: "export",
  // Repo is served from https://kalashpal14.github.io/workoutplaner/
  basePath: "/workoutplaner",
  // Ensures /progress and /exercise/[id] resolve on GitHub Pages static hosting
  trailingSlash: true,
  // SVG illustrations don't need (and can't use) the image optimizer
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
