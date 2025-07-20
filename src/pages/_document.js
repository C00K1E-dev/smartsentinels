import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical resources for better LCP */}
        <link rel="preload" href="/assets/img/hub/smartsentinels-hero.png" as="image" type="image/png" />
        <link rel="preload" href="/assets/css/style.css" as="style" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://bscscan.com" />
        <link rel="dns-prefetch" href="https://testnet.bscscan.com" />
        
        {/* Font optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="/assets/fonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
