export default function Head() {
  return (
    <>
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/assets/img/hub/smartsentinels-hero.png"
        as="image"
        type="image/png"
      />
      <link
        rel="preload"
        href="/assets/css/style.css"
        as="style"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://bscscan.com" />
      <link rel="dns-prefetch" href="https://testnet.bscscan.com" />
      
      {/* Optimize font loading */}
      <link
        rel="preload"
        href="/assets/fonts/fa-solid-900.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  )
}
