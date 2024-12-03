import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Other config options here */
  
  async headers() {
    return [
      {
        source: "/(.*)", // Apply for all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'  http://alexcoding.es:3030/api/; img-src 'self'; font-src 'self';", // Add your HTTP backend URL here
          },
        ],
      },
    ];
  },
};

export default nextConfig;
