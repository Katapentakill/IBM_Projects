import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Permite el deploy si hay errores ESLint
  },
  typescript: {
    ignoreBuildErrors: true,  // ✅ (opcional) Permite el deploy si hay errores de tipo
  },
}

export default nextConfig
