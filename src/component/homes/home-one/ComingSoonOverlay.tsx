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
        <p className={styles.notice} style={{ marginTop: 24, fontSize: 14, color: '#fff', textAlign: 'center' }}>
          By using this platform, you agree to our
          {' '}<a href="/assets/documents/terms-and-conditions.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#f8f442', textDecoration: 'underline' }}>Terms and Conditions</a>
          {' '}and
          {' '}<a href="/assets/documents/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#f8f442', textDecoration: 'underline' }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}