import React, { useState } from 'react';
import styles from '../styles/Presale.module.css';
import Image from 'next/image';
import Tokenomics from './Tokenomics';

const Presale: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [amount, setAmount] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const handleJoinPresaleClick = () => {
    setIsExpanded(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setTotalCost(Number(value) * 0.03);
  };

  const handlePurchase = () => {
    // Implement the purchase logic here
    alert(`You have purchased ${amount} SSTL tokens for $${totalCost.toFixed(2)}`);
  };

return (
  <div className={styles.container}>
    {/* Token Section */}
    <div className={styles.tokenSection}>
      <h1 className={styles.tokenTitle}>Token</h1>
      <div className={styles.tokenImageWrapper}>
        <Image
          src="/token-image.png"
          alt="Token"
          width={320}
          height={320}
          className={styles.tokenImage}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className={styles.tokenDescription}>
        <p><strong>Token Utility and Economy</strong></p>
        <p>
          The SmartSentinels token is designed with a scarcity-driven and revenue-backed model:
        </p>
        <ul className={styles.tokenList}>
          <li>💎 <strong><span className={styles.yellow}>Scarcity:</span></strong> Limited token emission tied to real-world completed tasks</li>
          <li>💎 <strong><span className={styles.yellow}>Utility:</span></strong> Used to pay for services provided by the AI agents</li>
          <li>💎 <strong><span className={styles.yellow}>Revenue Sharing:</span></strong> NFT holders are rewarded from service fees</li>
          <li>💎 <strong><span className={styles.yellow}>Growth Loop:</span></strong> More devices → More tasks → More rewards → Larger ecosystem</li>
        </ul>
        <Tokenomics/>
      </div>
    </div>

    {/* Presale Section */}
    <section id="fundraise" className={styles.fundraise}>
  <div className={styles.fundraiseHeader}>
    <h2 className={styles.fundraiseTitle}>Join Our Fundraise</h2>
    <p className={styles.fundraiseDescription}>
      Support the Smart Sentinels vision. Join our fundraise and secure your share of our AI-powered ecosystem.
    </p>
  </div>
  
  <div className={styles.fundraiseContent}>
    <div className={styles.fundraiseInfo}>
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Tokens for Sale</span>
          <span className={styles.infoValue}>10,000,000 SSTL</span>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Token Price</span>
          <span className={styles.infoValue}>$0.03 per SSTL</span>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Minimum Purchase</span>
          <span className={styles.infoValue}>1,000 SSTL</span>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Maximum Purchase</span>
          <span className={styles.infoValue}>1,000,000 SSTL</span>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Token Distribution</span>
          <span className={styles.infoValue}>Immediately after purchase</span>
        </div>
      </div>
    </div>
    
    <div className={styles.fundraiseImageContainer}>
      <Image 
        src="/4.png" 
        alt="Fundraise" 
        width={500}
        height={300} 
        className={styles.fundraiseImage}
        style={{ objectFit: 'cover' }}
      />
    </div>
  </div>
  
  {!isExpanded && (
    <div className={styles.buttonContainer}>
      <button className={styles.fundraiseButton} onClick={handleJoinPresaleClick}>
        <span>Join Fundraise</span>
        <div className={styles.buttonGlow}></div>
      </button>
    </div>
  )}
  
  {isExpanded && (
    <div className={styles.purchaseContainer}>
      <div className={styles.purchaseForm}>
        <label htmlFor="amount" className={styles.label}>Amount of SSTL tokens:</label>
        <div className={styles.inputContainer}>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className={styles.input}
            placeholder="Enter amount..."
            min="1000"
            max="1000000"
          />
          <div className={styles.totalCostDisplay}>
            <span className={styles.totalCostLabel}>Total Cost:</span>
            <span className={styles.totalCost}>${totalCost.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={handlePurchase} className={styles.purchaseButton}>
          <span>Buy Tokens</span>
          <div className={styles.buttonGlow}></div>
        </button>
      </div>
    </div>
  )}
</section>
  </div>
);
};

export default Presale;