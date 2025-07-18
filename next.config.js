/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  typescript: {
    // It's best practice to set this to false for production builds.
    ignoreBuildErrors: false,
  },

  eslint: {
    // It's best practice to set this to false for production builds.
    ignoreDuringBuilds: false,
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
