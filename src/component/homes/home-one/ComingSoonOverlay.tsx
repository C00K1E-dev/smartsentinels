"use client"
import { useState } from 'react';
import styles from '@/styles/ComingSoonOverlay.module.css';
import Image from 'next/image';

export default function ComingSoonOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button
          className={styles.closeButton}
          onClick={() => setVisible(false)}
          aria-label="Close overlay"
        >
          ×
        </button>
        <Image
          src="/assets/img/update/ComingSoon/comingsoon.png"
          alt="Coming Soon"
          width={350}
          height={200}
          className={styles.comingSoonImage}
          priority
        />
        <h1 className={styles.text}>
          COMING SOON! AI Agents working on delivering the most rewarding experience.
        </h1>
      </div>
    </div>
  );
}