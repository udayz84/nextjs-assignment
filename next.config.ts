import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  eslint: {
    // This allows production builds to successfully complete
    // even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
