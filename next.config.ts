import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits in the home directory; pin the root so
  // Turbopack does not walk up and adopt it.
  turbopack: { root: path.resolve(__dirname) },
  experimental: {
    // Hero videos and gallery images are uploaded through /partnership/manage.
    serverActions: { bodySizeLimit: "200mb" },
  },
};

export default nextConfig;
