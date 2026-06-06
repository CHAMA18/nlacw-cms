import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /* GitHub Pages basePath - matches repo name */
  basePath: "/nlacw-cms",
  /* Static export requires unoptimized images */
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
