/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration
  turbopack: {},
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Uppal Kalan Street Food Guide',
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  },

  // Vercel Optimization
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Production source maps (set to false for smaller deployments)
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;