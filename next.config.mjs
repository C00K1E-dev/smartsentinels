import { createCivicAuthPlugin } from "@civic/auth/nextjs"

const nextConfig = {
  // Optimize images for better LCP
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bscscan.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'testnet.bscscan.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compress for better performance
  compress: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Add headers to handle iframe detection issues in development + performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' vscode-webview: https://*.vscode-cdn.net",
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Suppress hydration warnings in development
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  // Webpack configuration to handle Sentry warnings and multiple instances
  webpack: (config, { dev, isServer, webpack }) => {
    // Suppress Sentry warnings and prevent multiple instances
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Prevent multiple Sentry instances
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Suppress console warnings for Sentry in production
    if (!dev && webpack) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.SENTRY_DEBUG': JSON.stringify(false),
        })
      );
    }
    
    return config;
  },
}

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.CIVIC_AUTH_CLIENT_ID || '',
  loginSuccessUrl: '/hub',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://www.smartsentinels.net' 
    : 'http://localhost:3000',
})

export default withCivicAuth(nextConfig)