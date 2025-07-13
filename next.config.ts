import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/nikolai-smirnov-1940",
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eternal-garden.fly.io",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "zqqyhudmcjwubslcaznh.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
