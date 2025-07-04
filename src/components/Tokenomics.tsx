import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import styles from '../styles/Tokenomics.module.css';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const pieData = {
  labels: [
    'Proof of Useful Work (PoUW)',
    'Fundraising',
    'Team',
    'Exchange & Liquidity',
    'Marketing & BizDev',
    'Ecosystem & Partnerships'
  ],
  datasets: [
    {
      data: [40, 10, 10, 20, 10, 10],
      backgroundColor: [
        '#f8f442', // Yellow (PoUW)
        '#f8b442', // Gold/Orange (Fundraising)
        '#4287f8', // Blue (Team)
        '#23272f', // Dark (Exchange & Liquidity)
        '#42f8e6', // Teal (Marketing & BizDev)
        '#a042f8'  // Purple (Ecosystem & Partnerships)
      ],
      borderWidth: 2,
      borderColor: '#181a20'
    }
  ]
};

const pieOptions = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        color: '#e6e6e6',
        font: { size: 14 }
      }
    }
  }
};

const Tokenomics: React.FC = () => (
  <section className={styles.tokenomicsSection} id="tokenomics">
    <h2 className={styles.tokenomicsTitle}>Tokenomics</h2>
    <div className={styles.tokenomicsContent}>
      <div className={styles.tokenomicsInfo}>
        <p><strong>Total Supply:</strong> 100,000,000 SST (fixed, deflationary)</p>
        <ul className={styles.tokenomicsList}>
          <li>
            <span className={styles.yellow}>PoUW:</span> 40% (40,000,000 SST), released gradually over 4 years, max. 1,000,000 SST/month
          </li>
          <li>
            <span className={styles.yellow}>Fundraising:</span> 10% (10,000,000 SST), locked for 6 months, then linear vesting over 6 months
          </li>
          <li>
            <span className={styles.yellow}>Team:</span> 10% (10,000,000 SST), locked for 1 year, then linear vesting over 12 months
          </li>
          <li>
            <span className={styles.yellow}>Exchange &amp; Liquidity:</span> 20% (20,000,000 SST), no vesting, DAO controlled
          </li>
          <li>
            <span className={styles.yellow}>Marketing &amp; BizDev:</span> 10% (10,000,000 SST), linear vesting over 6–12 months
          </li>
          <li>
            <span className={styles.yellow}>Ecosystem &amp; Partnerships:</span> 10% (10,000,000 SST), flexible allocation
          </li>
        </ul>
        <p className={styles.tokenomicsSubtitle}><strong>Distribution for AI-generated tokens:</strong></p>
        <ul className={styles.tokenomicsList}>
          <li><span className={styles.yellow}>60%</span> to NFT holders</li>
          <li><span className={styles.yellow}>20%</span> to Treasury/Staking Pool</li>
          <li><span className={styles.yellow}>10%</span> Burn</li>
          <li><span className={styles.yellow}>10%</span> to Business Clients</li>
        </ul>
      </div>
      <div className={styles.tokenomicsChart}>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  </section>
);

export default Tokenomics;