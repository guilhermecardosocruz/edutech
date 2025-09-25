import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Garante que pacotes internos em TypeScript sejam transpilados pelo Next (pnpm + workspaces)
    transpilePackages: ["@edu/db", "@edu/ui", "@edu/utils"]
  }
};

export default nextConfig;
