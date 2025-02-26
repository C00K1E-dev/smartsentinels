declare module 'vanta/dist/vanta.waves.min.js' {
  import * as THREE from 'three';

  interface VantaWavesConfig {
    el: HTMLElement | string;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
  }

  interface VantaWavesEffect {
    destroy: () => void;
  }

  const VANTA: {
    WAVES: (config: VantaWavesConfig) => VantaWavesEffect;
  };

  export = VANTA;
}
