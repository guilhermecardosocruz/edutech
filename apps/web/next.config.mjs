/** @type {import('next').NextConfig} */
const nextConfig = {
  // não usar output: 'export'
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { serverActions: { allowedOrigins: ['*'] } },
};
export default nextConfig;
