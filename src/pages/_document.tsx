import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Include the three.js library from CDN */}
  <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
  <Script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js" strategy="beforeInteractive" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
