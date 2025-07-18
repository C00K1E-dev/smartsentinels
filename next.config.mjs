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
  // Webpack configuration to handle Sentry warnings
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Suppress Sentry warnings in development
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sentry/browser': false,
        '@sentry/tracing': false,
      };
    }
    return config;
  },
}

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.CIVIC_AUTH_CLIENT_ID || '',
  loginSuccessUrl: '/hub',
  baseUrl: 'http://localhost:3000',
})

export default withCivicAuth(nextConfig)