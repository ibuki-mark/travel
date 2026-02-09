import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evsgrtxsbwctmpktjfzv.supabase.co",
      },
    ],
  }
};

export default nextConfig;
