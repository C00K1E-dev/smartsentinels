import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2025 Smart Sentinels. All rights reserved.</p>
        <div className={styles.footerMenu}>
          <a href="/terms" >Terms</a>
          <a href="/privacy" >Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;