/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  typescript: {
    ignoreBuildErrors: true, // ⛔ Ignore TypeScript errors during build
  },

  eslint: {
    ignoreDuringBuilds: true, // ⛔ Ignore ESLint errors during build
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
