import React, { useState } from 'react';
import styles from '../styles/Fundraise.module.css';
import Image from 'next/image';
import Tokenomics from './Tokenomics';

const Fundraise: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [amount, setAmount] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const handleJoinFundraiseClick = () => {
    setIsExpanded(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setTotalCost(Number(value) * 0.03);
  };

  const handlePurchase = () => {
    alert(`You have purchased ${amount} SSTL tokens for $${totalCost.toFixed(2)}`);
  };

  return (
    <>
      <h1 className={styles.tokenTitle}>Token</h1>
      <div className={styles.tokenImageWrapper}>
        <Image
          src="/token-image.png"
          alt="Token"
          width={320}
          height={320}
          className={styles.tokenImage}
        />
      </div>
      <div className={styles.tokenDescription}>
        <div className={styles.tokenDescription2}>
          <p><strong><span className={styles.yellow}>Token Name:</span></strong> SmartSentinels</p>
          <p><strong><span className={styles.yellow}>Symbol:</span></strong> SSTLL</p>
          <p><strong><span className={styles.yellow}>Total Supply:</span></strong> 100,000,000 SSTL (fixed, deflationary)</p>
          <p><strong><span className={styles.yellow}>Blockchain:</span></strong> BNB Chain</p>
        <p><strong><span className={styles.yellow}>Token Utility and Economy</span></strong></p>
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
        <Tokenomics />
      </div>
      <section id="fundraise" className={styles.fundraise}>
        <h2 className={styles.fundraiseTitle}>Join Our Fundraise</h2>
        <p className={styles.fundraiseDescription}>
          Support the Smart Sentinels vision. Join our fundraise and secure your share of our AI-powered ecosystem.
        </p>
        <div className={styles.fundraiseContent}>
          <div className={styles.fundraiseInfo}>
            <p className={styles.fundraiseInfoItem}><strong>Tokens for Sale:</strong> 10,000,000 SSTL</p>
            <p className={styles.fundraiseInfoItem}><strong>Token Price:</strong> $0.03 per SSTL</p>
            <p className={styles.fundraiseInfoItem}><strong>Minimum Purchase:</strong> 1,000 SSTL</p>
            <p className={styles.fundraiseInfoItem}><strong>Maximum Purchase:</strong> 1,000,000 SSTL</p>
            <p className={styles.fundraiseInfoItem}><strong>Token Distribution:</strong> Immediately after purchase</p>
          </div>
          <Image
            src="/4.png"
            alt="Fundraise"
            width={500}
            height={300}
            className={styles.fundraiseImage}
          />
        </div>
        {!isExpanded && (
          <button className={styles.fundraiseButton} onClick={handleJoinFundraiseClick}>Join Fundraise</button>
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
                min="1000"
                max="1000000"
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

export default Fundraise;