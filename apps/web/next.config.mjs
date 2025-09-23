/** @type {import('next').NextConfig} */
const nextConfig = {
  // NÃO usar `output: 'export'` em Vercel com App Router/APIs
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },
};
export default nextConfig;
