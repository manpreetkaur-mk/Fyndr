import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on specific directories during production builds
    dirs: ['src'],
    // Don't fail the build on ESLint warnings
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail the build on TypeScript errors in development
    ignoreBuildErrors: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common');
    }
    return config;
  },
}

export default nextConfig;
