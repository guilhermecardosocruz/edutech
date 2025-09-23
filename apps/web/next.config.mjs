/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@edu/ui'],
  experimental: { serverActions: { allowedOrigins: ['*'] } }
}
export default nextConfig
