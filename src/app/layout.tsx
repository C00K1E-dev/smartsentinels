import "../styles/index.css"
import ComingSoonOverlay from "@/component/homes/home-one/ComingSoonOverlay";
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>
        <ComingSoonOverlay />
        {children}</body>
    </html>
  );
}
