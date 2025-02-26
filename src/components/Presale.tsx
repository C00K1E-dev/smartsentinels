import React from 'react';
import styles from '../styles/Presale.module.css';

const Presale: React.FC = () => {
  return (
    <section className={styles.presale}>
      <h2 className={styles.presaleTitle}>Join Our Presale</h2>
      <p className={styles.presaleDescription}>
        Be a part of the Smart Sentinels revolution. Join our presale and get exclusive access to our AI-powered NFT staking platform.
      </p>
      <div className={styles.presaleContent}>
        <div className={styles.presaleInfo}>
          <p className={styles.presaleInfoItem}><strong>Total Supply:</strong> 1,000,000,000 SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Presale Allocation:</strong> 30% of total supply</p>
          <p className={styles.presaleInfoItem}><strong>Token Price:</strong> $0.05 per SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Minimum Purchase:</strong> 1,000 SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Maximum Purchase:</strong> 1,000,000 SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Token Distribution:</strong> Immediately after purchase</p>
        </div>
        <img src="/4.png" alt="Presale" className={styles.presaleImage} />
      </div>
      <button className={styles.presaleButton}>Join Presale</button>
    </section>
  );
};

export default Presale;