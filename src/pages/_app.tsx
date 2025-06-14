import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useEffect, useRef } from 'react';
import ComingSoonOverlay from '../components/ComingSoonOverlay';


declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef<any>(null);

  const loadVanta = () => {
    if (window.VANTA && window.VANTA.WAVES) {
      vantaEffectRef.current = window.VANTA.WAVES({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x1f1f1f,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1.0,
        zoom: 1.2,
      });
    }
  };

  useEffect(() => {
    loadVanta();
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#f8f442',
            accentColorForeground: '#1f1f1f',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          
          <div ref={vantaRef} style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}></div>
          <ComingSoonOverlay />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;