import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://alexcoding.es:3030/api/:path*', // Proxy to your HTTP backend
      },
    ];
  },

  // You can also add custom middleware for full control of the proxy
  async serverMiddleware() {
    // Proxy API requests
    return [
      {
        path: '/api/*',
        handler: createProxyMiddleware({
          target: 'http://alexcoding.es:3030',
          changeOrigin: true, // Ensure the origin is correctly set for the proxy
          pathRewrite: { '^/api': '' }, // Optional: strip the '/api' prefix from the forwarded request
        }),
      },
    ];
  },
};

export default nextConfig;
