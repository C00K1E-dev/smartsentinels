import CivicAuthWrapper from "@/component/common/CivicAuthWrapper";
import "../styles/index.css"
import ComingSoonOverlay from "@/component/homes/home-one/ComingSoonOverlay";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const isDev = process.env.NODE_ENV === 'development'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="description" content="SmartSentinels | AI is working. Literally. Our decentralized AI agents perform real tasks, generate tokens, and power the next evolution of mining—Proof of Useful Work." />
        <link rel="icon" href="/ico.png" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <CivicAuthWrapper>
          <ComingSoonOverlay />
          {children}
        </CivicAuthWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}