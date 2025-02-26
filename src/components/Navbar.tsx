import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <a href="index.tsx" className={styles.navbarBrand}>
          <Image src="/logo.png" alt="Logo" width={150} height={150} className={styles.brandLogo} />
        </a>
        <ul className={styles.navbarMenu}>
          <li><a href="index.html">Home</a></li>
          <li><a href="#">Presale</a></li>
          <li><a href="#">Audit</a></li>
          <li><a href="#">NFTs</a></li>
          <ConnectButton/>
        </ul>
        <div className={styles.burgerButton} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <ul className={`${styles.navbarMenuMobile} ${isOpen ? styles.active : ''}`}>
        <li><a href="index.tsx">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Audit</a></li>
        <li><a href="#">Contact</a></li>
        <ConnectButton/>
      </ul>
    </nav>
  );
};

export default Navbar;