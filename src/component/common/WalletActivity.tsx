import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Clock, Hash, Globe } from 'lucide-react';
import {
  fetchWalletTransactions,
  fetchTokenTransfers,
  formatTimestamp,
  formatAddress,
  formatValue,
  getTransactionType,
  getExplorerUrl,
  getNetworkCurrency,
  debugRecentTransactions,
  TransactionData,
  TokenTransferData,
  NetworkType
} from '../../utils/bscScanApi';

interface WalletActivityProps {
  walletAddress: string;
}

const WalletActivity: React.FC<WalletActivityProps> = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [tokenTransfers, setTokenTransfers] = useState<TokenTransferData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'transactions' | 'tokens'>('transactions');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('bsc-testnet');

  const networkOptions = [
    { value: 'bsc-mainnet' as NetworkType, label: 'BSC Mainnet', currency: 'BNB' },
    { value: 'bsc-testnet' as NetworkType, label: 'BSC Testnet', currency: 'tBNB' }
  ];

  useEffect(() => {
    if (walletAddress) {
      fetchActivityData();
    }
  }, [walletAddress, selectedNetwork]);

  const fetchActivityData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Run debug function to check recent transactions
      await debugRecentTransactions(walletAddress, selectedNetwork, 12);
      
      const [txData, tokenData] = await Promise.all([
        fetchWalletTransactions(walletAddress, selectedNetwork, 1, 50),
        fetchTokenTransfers(walletAddress, selectedNetwork, 1, 50)
      ]);
      
      setTransactions(txData);
      setTokenTransfers(tokenData);
    } catch (err) {
      setError('Failed to fetch wallet activity');
      console.error('Error fetching wallet activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const openInExplorer = (hash: string) => {
    const explorerUrl = getExplorerUrl(selectedNetwork);
    window.open(`${explorerUrl}/tx/${hash}`, '_blank');
  };

  const currentCurrency = getNetworkCurrency(selectedNetwork);

  if (!walletAddress) {
    return (
      <div className="wallet-activity-container">
        <div className="no-wallet-message">
          <p>Connect your wallet to view transaction history</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wallet-activity-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading wallet activity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wallet-activity-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchActivityData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-activity-container">
      {/* Wallet Address Header */}
      <div className="wallet-header">
        <h4>Wallet Activity for</h4>
        <div className="address-display">
          <span className="address-text">{formatAddress(walletAddress)}</span>
          <button 
            onClick={() => window.open(`${getExplorerUrl(selectedNetwork)}/address/${walletAddress}`, '_blank')}
            className="explorer-link"
          >
            <ExternalLink size={16} />
            View on BSCScan
          </button>
        </div>
      </div>

      {/* Network Selector */}
      <div className="network-selector">
        <h5>Select Network:</h5>
        <div className="network-buttons">
          {networkOptions.map((network) => (
            <button
              key={network.value}
              className={`network-btn ${selectedNetwork === network.value ? 'active' : ''}`}
              onClick={() => setSelectedNetwork(network.value)}
            >
              <Globe size={14} />
              {network.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions ({transactions.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tokens' ? 'active' : ''}`}
          onClick={() => setActiveTab('tokens')}
        >
          Token Transfers ({tokenTransfers.length})
        </button>
      </div>

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="transactions-list">
          {transactions.length === 0 ? (
            <div className="no-transactions">
              <p>No transactions found for this wallet</p>
            </div>
          ) : (
            transactions.map((tx, index) => {
              const txType = getTransactionType(tx, walletAddress);
              const isOutgoing = txType === 'Sent';
              
              return (
                <div key={tx.hash + index} className="transaction-item">
                  <div className="tx-icon">
                    {isOutgoing ? (
                      <ArrowUpRight className="tx-arrow outgoing" size={20} />
                    ) : (
                      <ArrowDownLeft className="tx-arrow incoming" size={20} />
                    )}
                  </div>
                  
                  <div className="tx-details">
                    <div className="tx-main">
                      <span className={`tx-type ${isOutgoing ? 'outgoing' : 'incoming'}`}>
                        {txType}
                      </span>
                      <span className="tx-amount">
                        {formatValue(tx.value)} {currentCurrency}
                      </span>
                    </div>
                    
                    <div className="tx-secondary">
                      <div className="tx-address">
                        <span className="label">
                          {isOutgoing ? 'To:' : 'From:'} 
                        </span>
                        <span className="address">
                          {formatAddress(isOutgoing ? tx.to : tx.from)}
                        </span>
                      </div>
                      
                      <div className="tx-time">
                        <Clock size={12} />
                        {formatTimestamp(tx.timeStamp)}
                      </div>
                    </div>
                    
                    <div className="tx-hash">
                      <Hash size={12} />
                      <span>{formatAddress(tx.hash)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openInExplorer(tx.hash)}
                    className="view-tx-btn"
                    title="View on Blockchain Explorer"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Token Transfers Tab */}
      {activeTab === 'tokens' && (
        <div className="token-transfers-list">
          {tokenTransfers.length === 0 ? (
            <div className="no-transactions">
              <p>No token transfers found for this wallet</p>
            </div>
          ) : (
            tokenTransfers.map((transfer, index) => {
              const isOutgoing = transfer.from.toLowerCase() === walletAddress.toLowerCase();
              const tokenValue = parseFloat(transfer.value) / Math.pow(10, parseInt(transfer.tokenDecimal));
              
              return (
                <div key={transfer.hash + index} className="transaction-item">
                  <div className="tx-icon">
                    {isOutgoing ? (
                      <ArrowUpRight className="tx-arrow outgoing" size={20} />
                    ) : (
                      <ArrowDownLeft className="tx-arrow incoming" size={20} />
                    )}
                  </div>
                  
                  <div className="tx-details">
                    <div className="tx-main">
                      <span className={`tx-type ${isOutgoing ? 'outgoing' : 'incoming'}`}>
                        {isOutgoing ? 'Sent' : 'Received'}
                      </span>
                      <span className="tx-amount">
                        {tokenValue.toFixed(6)} {transfer.tokenSymbol}
                      </span>
                    </div>
                    
                    <div className="tx-secondary">
                      <div className="tx-address">
                        <span className="label">
                          {isOutgoing ? 'To:' : 'From:'} 
                        </span>
                        <span className="address">
                          {formatAddress(isOutgoing ? transfer.to : transfer.from)}
                        </span>
                      </div>
                      
                      <div className="tx-time">
                        <Clock size={12} />
                        {formatTimestamp(transfer.timeStamp)}
                      </div>
                    </div>
                    
                    <div className="tx-hash">
                      <Hash size={12} />
                      <span>{formatAddress(transfer.hash)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openInExplorer(transfer.hash)}
                    className="view-tx-btn"
                    title="View on Blockchain Explorer"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      <style jsx>{`
        .wallet-activity-container {
          background: #191919;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .wallet-header {
          margin-bottom: 24px;
        }

        .wallet-header h4 {
          color: var(--tg-primary-color);
          margin-bottom: 8px;
          font-size: 1.1rem;
        }

        .address-display {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .address-text {
          background: #0a0a0a;
          color: var(--tg-primary-color);
          padding: 8px 12px;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }

        .bscscan-link {
          background: rgba(250, 249, 86, 0.1);
          color: var(--tg-primary-color);
          border: 1px solid rgba(250, 249, 86, 0.3);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
        }

        .bscscan-link:hover,
        .explorer-link:hover {
          background: rgba(250, 249, 86, 0.2);
          border-color: rgba(250, 249, 86, 0.5);
        }

        .explorer-link {
          background: rgba(250, 249, 86, 0.1);
          color: var(--tg-primary-color);
          border: 1px solid rgba(250, 249, 86, 0.3);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
        }

        .network-selector {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .network-selector h5 {
          color: var(--tg-primary-color);
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .network-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 8px;
        }

        .network-btn {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          justify-content: center;
        }

        .network-btn:hover {
          background: rgba(250, 249, 86, 0.1);
          border-color: rgba(250, 249, 86, 0.3);
        }

        .network-btn.active {
          background: rgba(250, 249, 86, 0.15);
          color: var(--tg-primary-color);
          border-color: rgba(250, 249, 86, 0.5);
        }

        .tab-navigation {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .tab-btn {
          background: none;
          border: none;
          color: #b0b0b0;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
          font-size: 0.9rem;
        }

        .tab-btn.active {
          color: var(--tg-primary-color);
          border-bottom-color: var(--tg-primary-color);
        }

        .tab-btn:hover {
          color: #fff;
        }

        .loading-state,
        .error-state,
        .no-wallet-message,
        .no-transactions {
          text-align: center;
          padding: 40px 20px;
          color: #b0b0b0;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid #333;
          border-top: 2px solid var(--tg-primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .retry-btn {
          background: var(--tg-primary-color);
          color: #000;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 12px;
        }

        .transactions-list,
        .token-transfers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.2s;
        }

        .transaction-item:hover {
          border-color: rgba(250, 249, 86, 0.3);
          background: rgba(250, 249, 86, 0.02);
        }

        .tx-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .tx-arrow.outgoing {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .tx-arrow.incoming {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
        }

        .tx-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tx-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tx-type {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .tx-type.outgoing {
          color: #ef4444;
        }

        .tx-type.incoming {
          color: #22c55e;
        }

        .tx-amount {
          color: var(--tg-primary-color);
          font-weight: 600;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }

        .tx-secondary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #b0b0b0;
        }

        .tx-address,
        .tx-time,
        .tx-hash {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .tx-hash {
          font-size: 0.75rem;
          color: #888;
        }

        .label {
          font-weight: 500;
        }

        .address {
          font-family: 'Courier New', monospace;
        }

        .view-tx-btn {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-tx-btn:hover {
          background: rgba(250, 249, 86, 0.2);
          color: var(--tg-primary-color);
        }

        @media (max-width: 768px) {
          .wallet-activity-container {
            padding: 16px;
          }

          .address-display {
            flex-direction: column;
            align-items: flex-start;
          }

          .transaction-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .tx-main {
            width: 100%;
          }

          .tx-secondary {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default WalletActivity;
