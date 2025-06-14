import React from 'react';
import styles from '../styles/MintButton.module.css';

interface MintButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const MintButton: React.FC<MintButtonProps> = ({ onClick, disabled, children }) => (
  <button
    className={styles.mintButton}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children || 'Mint NFT'}
  </button>
);

export default MintButton;