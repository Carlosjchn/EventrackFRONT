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
            value: `
              default-src 'self';
              script-src 'self';
              style-src 'self';
              connect-src 'self' http://alexcoding.es:3030/api/ http://localhost:3030/; 
              img-src 'self';
              font-src 'self';
            `, // Allow HTTP connections for API calls (temporary solution)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
