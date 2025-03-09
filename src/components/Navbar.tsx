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
        <Link href="/" className={styles.navbarBrand}>
          <Image src="/logo.png" alt="Logo" width={150} height={150} className={styles.brandLogo} />
        </Link>
        <ul className={styles.navbarMenu}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/presale">Presale</Link></li>
          <li><Link href="/audit">Audit</Link></li>
          <li><Link href="/nfts">NFTs</Link></li>
          <ConnectButton />
        </ul>
        <div className={styles.burgerButton} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <ul className={`${styles.navbarMenuMobile} ${isOpen ? styles.active : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/presale">Presale</Link></li>
        <li><Link href="/audit">Audit</Link></li>
        <li><Link href="/nfts">NFTs</Link></li>
        <ConnectButton />
      </ul>
    </nav>
  );
};

export default Navbar;