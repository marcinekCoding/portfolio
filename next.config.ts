import type { NextConfig } from "next";

/**
 * GitHub Pages project site: https://marcinekCoding.github.io/portfolio/
 * Set NEXT_PUBLIC_BASE_PATH=/portfolio in CI (see .github/workflows/deploy.yml).
 * For a user/org site (username.github.io repo), leave NEXT_PUBLIC_BASE_PATH unset.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
