import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.ctfassets.net"],
  },
};

export default withBundleAnalyzer(nextConfig);
