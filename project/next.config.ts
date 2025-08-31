import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://69fekuudzaleylr8.public.blob.vercel-storage.com/**")]
  }
};

export default nextConfig;
