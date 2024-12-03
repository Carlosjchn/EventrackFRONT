import { NextResponse } from 'next/server';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const middleware = (req) => {
  const { pathname } = req.nextUrl;

  // Only proxy API requests
  if (pathname.startsWith('/api')) {
    return new Promise((resolve, reject) => {
      // Create the proxy middleware
      const proxy = createProxyMiddleware({
        target: 'http://alexcoding.es:3030', // Your backend
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Remove /api prefix
      });

      // Call the proxy middleware
      proxy(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  return NextResponse.next(); // Continue normal request handling for other routes
};
