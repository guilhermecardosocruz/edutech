import type { NextConfig } from 'next'

const ORIGIN = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

/**
 * CSP estrita. Ajuste connect-src para seu domínio do Neon se necessário.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "img-src 'self' data:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self' ${ORIGIN}`,
  "frame-ancestors 'none'",
].join('; ')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: csp },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        // CORS estrito para APIs
        { key: 'Access-Control-Allow-Origin', value: ORIGIN },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
      ],
    },
  ],
}

export default nextConfig
