import { createCivicAuthPlugin } from "@civic/auth/nextjs"

const nextConfig = {
  // Add headers to handle iframe detection issues in development
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
    ]
  },
  // Suppress hydration warnings in development
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  // Webpack configuration to handle Sentry warnings and multiple instances
  webpack: (config, { dev, isServer }) => {
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
    if (!dev) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new config.webpack.DefinePlugin({
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