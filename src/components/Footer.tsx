import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerBrand}>
              <h3 className={styles.footerTitle}>Smart Sentinels</h3>
              <p className={styles.footerDescription}>
                Revolutionizing AI-powered services with blockchain technology
              </p>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <div className={styles.footerLinks}>
              <a href="/" className={styles.footerLink}>Home</a>
              <a href="/nfts" className={styles.footerLink}>NFTs</a>
              <a href="/audit" className={styles.footerLink}>Audit</a>
              <a href="#presale" className={styles.footerLink}>Presale</a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Legal</h4>
            <div className={styles.footerLinks}>
              <a href="/terms" className={styles.footerLink}>Terms</a>
              <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Connect</h4>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <span className={styles.socialIcon}>𝕏</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">
                <span className={styles.socialIcon}>📱</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Discord">
                <span className={styles.socialIcon}>🎮</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.footerDivider}></div>
          <div className={styles.copyrightSection}>
            <p className={styles.copyright}>&copy; 2025 Smart Sentinels. All rights reserved.</p>
            <div className={styles.footerMenu}>
              <a href="/terms" className={styles.bottomLink}>Terms</a>
              <a href="/privacy" className={styles.bottomLink}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;