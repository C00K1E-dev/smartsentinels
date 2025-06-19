import React, { useState } from 'react';
import styles from '../styles/Presale.module.css';
import Image from 'next/image';

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
  <>
<h1 className={styles.tokenTitle}>Token</h1>
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
    </div>
    <section id="presale" className={styles.presale}>
      <h2 className={styles.presaleTitle}>Join Our Presale</h2>
      <p className={styles.presaleDescription}>
        Be a part of the Smart Sentinels revolution. Join our presale and get exclusive access to our AI-powered NFT staking platform.
      </p>
      <div className={styles.presaleContent}>
        <div className={styles.presaleInfo}>
          <p className={styles.presaleInfoItem}><strong>Total Supply:</strong> 1,000,000,000 SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Presale Allocation:</strong> 30% of total supply</p>
          <p className={styles.presaleInfoItem}><strong>Token Price:</strong> $0.03 per SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Minimum Purchase:</strong> 1,000 SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Maximum Purchase:</strong> 1,000,000 SSTL</p>
          <p className={styles.presaleInfoItem}><strong>Token Distribution:</strong> Immediately after purchase</p>
        </div>
        <Image src="/4.png" alt="Presale" width={500}    // <-- set to your image's actual width in pixels
  height={300}    className={styles.presaleImage} />
      </div>
      {!isExpanded && (
        <button className={styles.presaleButton} onClick={handleJoinPresaleClick}>Join Presale</button>
      )}
      {isExpanded && (
        <div className={styles.purchaseContainer}>
          <label htmlFor="amount" className={styles.label}>Amount of SSTL tokens:</label>
          <div className={styles.inputContainer}>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className={styles.input}
            />
            <p className={styles.totalCost}>Total Cost: ${totalCost.toFixed(2)}</p>
          </div>
          <button onClick={handlePurchase} className={styles.purchaseButton}>Buy</button>
        </div>
      )}
    </section>
  </>
);
};

export default Presale;