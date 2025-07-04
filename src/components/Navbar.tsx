import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        >
            <div className={styles.navbarContainer}>
                <Link
                    href="/"
                    className={styles.navbarBrand}
                    onClick={closeMenu}
                >
                    <div className={styles.brandWrapper}>
                        <Image
                            src="/logo.png"
                            alt="Smart Sentinels Logo"
                            width={250}
                            height={250}
                            className={styles.brandLogo}
                        />
                        {/* <span className={styles.brandText}>
                            Smart Sentinels
                        </span> */}
                    </div>
                </Link>

                <div className={styles.navbarMenu}>
                    <div className={styles.navLinks}>
                        <Link href="/" className={styles.navLink}>
                            <span className={styles.linkText}>Home</span>
                            <div className={styles.linkUnderline}></div>
                        </Link>
                        <Link
                            href={{ pathname: "/", hash: "fundraise" }}
                            scroll={true}
                            className={styles.navLink}
                        >
                            <span className={styles.linkText}>Fundraise</span>
                            <div className={styles.linkUnderline}></div>
                        </Link>
                        <Link href="/audit" className={styles.navLink}>
                            <span className={styles.linkText}>Audit</span>
                            <div className={styles.linkUnderline}></div>
                        </Link>
                        <Link href="/nfts" className={styles.navLink}>
                            <span className={styles.linkText}>NFTs</span>
                            <div className={styles.linkUnderline}></div>
                        </Link>
                    </div>

                    <div className={styles.connectButtonWrapper}>
                        <ConnectButton />
                    </div>
                </div>

                <div
                    className={`${styles.burgerButton} ${
                        isOpen ? styles.active : ""
                    }`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <div className={styles.burgerLine}></div>
                    <div className={styles.burgerLine}></div>
                    <div className={styles.burgerLine}></div>
                </div>
            </div>

            <div
                className={`${styles.mobileMenu} ${
                    isOpen ? styles.active : ""
                }`}
            >
                <div className={styles.mobileMenuContent}>
                    <div className={styles.mobileNavLinks}>
                        <Link
                            href="/"
                            className={styles.mobileNavLink}
                            onClick={closeMenu}
                        >
                            <span className={styles.mobileLinkText}>Home</span>
                            <div className={styles.mobileLinkIcon}>🏠</div>
                        </Link>
                        <Link
                            href={{ pathname: "/", hash: "fundraise" }}
                            scroll={true}
                            className={styles.mobileNavLink}
                            onClick={closeMenu}
                        >
                            <span className={styles.mobileLinkText}>
                                fundraise
                            </span>
                            <div className={styles.mobileLinkIcon}>🚀</div>
                        </Link>
                        <Link
                            href="/audit"
                            className={styles.mobileNavLink}
                            onClick={closeMenu}
                        >
                            <span className={styles.mobileLinkText}>Audit</span>
                            <div className={styles.mobileLinkIcon}>🔍</div>
                        </Link>
                        <Link
                            href="/nfts"
                            className={styles.mobileNavLink}
                            onClick={closeMenu}
                        >
                            <span className={styles.mobileLinkText}>NFTs</span>
                            <div className={styles.mobileLinkIcon}>🎨</div>
                        </Link>
                    </div>

                    <div className={styles.mobileConnectWrapper}>
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
