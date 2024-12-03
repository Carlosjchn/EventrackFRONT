import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable linting during the build
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self' http://localhost:3001", // Add HTTP backend here
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*', // All API requests will be redirected to HTTP backend
        destination: 'http://localhost:3001/api/:path*', // Your HTTP backend
      },
    ];
  },
};

export default nextConfig;
