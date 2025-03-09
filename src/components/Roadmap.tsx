import React from 'react';
import styles from '../styles/Roadmap.module.css';

const Roadmap: React.FC = () => {
  return (
    <section className={styles.roadmap}>
      <h2 className={styles.roadmapTitle}>Roadmap</h2>
      <div className={styles.roadmapContent}>
        <div className={styles.roadmapItem}>
          <h3 className={styles.roadmapItemTitle}>Q1 2025</h3>
          <p className={styles.roadmapItemDescription}>Launch of the Smart Sentinels platform and initial token sale.</p>
        </div>
        <div className={styles.roadmapItem}>
          <h3 className={styles.roadmapItemTitle}>Q2 2025</h3>
          <p className={styles.roadmapItemDescription}>Integration of AI-driven call centers and tech support services.</p>
        </div>
        <div className={styles.roadmapItem}>
          <h3 className={styles.roadmapItemTitle}>Q3 2025</h3>
          <p className={styles.roadmapItemDescription}>Expansion of NFT staking platform and community rewards program.</p>
        </div>
        <div className={styles.roadmapItem}>
          <h3 className={styles.roadmapItemTitle}>Q4 2025</h3>
          <p className={styles.roadmapItemDescription}>Global marketing campaign and strategic partnerships.</p>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;