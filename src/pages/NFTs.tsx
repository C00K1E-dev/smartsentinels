import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/NFTs.module.css';
import Image from 'next/image';

const NFTs: React.FC = () => {
  return (
    <>
      <Navbar />
      <section id="NFTs" className={styles.nftsSection}>
        <h2 className={styles.nftsTitle}>Smart Sentinels NFTs</h2>
        <div className={styles.nftsContainer}>
          <div className={styles.nftsDescription}>
            <p>
              Discover our exclusive NFT collections that power the Smart Sentinels ecosystem. Each NFT represents a stake in our AI-driven platform, unlocking rewards and unique utilities. Mint your NFT to become a stakeholder and participate in the future of decentralized AI.
            </p>
            <p>
              Our NFTs grant access to staking, governance, and special features within the Smart Sentinels network. Join the revolution and own a piece of the next generation of AI-powered blockchain technology!
            </p>
          </div>
          <div className={styles.nftsMedia}>
            {/* Use an image or video as needed */}
            <Image
              src="/nft-preview.png"
              alt="NFT Preview"
              width={400}
              height={400}
              className={styles.nftImage}
            />
            {/* Example for video:
            <video className={styles.nftVideo} width="400" height="400" controls>
              <source src="/nft-preview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            */}
          </div>
        </div>
      </section>
    </>
  );
};

export default NFTs;