import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@walletcrow/ui", "@walletcrow/config", "@walletcrow/supabase", "@walletcrow/types"],
};

export default nextConfig;
