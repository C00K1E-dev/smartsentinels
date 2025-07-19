"use client";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Image as LucideImage,
  Bot,
  Cpu,
  ShoppingCart,
  List,
  Settings,
  User,
  LogOut,
  Wallet,
  Copy,
  ExternalLink,
  Globe,
} from "lucide-react";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import Wrapper from "../../../layouts/Wrapper";
import { UserButton, useUser, SignInButton } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useAutoConnect } from "@civic/auth-web3/wagmi";
import { useAccount, useBalance, useConnect, useSwitchChain } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

// Wallet management component
const WalletSection = () => {
  const [isClient, setIsClient] = useState(false);
  const userContext = useUser();
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();
  const [walletCreating, setWalletCreating] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // Auto connect hook for automatic wallet connection
  useAutoConnect();

  // Only render on client to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="wallet-section">
        <p className="wallet-status">Loading wallet...</p>
      </div>
    );
  }

  const createWallet = async () => {
    if (userContext.user && !userHasWallet(userContext)) {
      setWalletCreating(true);
      try {
        await userContext.createWallet();
        // Connect to the embedded wallet after creation
        const civicConnector = connectors.find(c => c.name === 'Civic');
        if (civicConnector) {
          connect({ connector: civicConnector });
        }
      } catch (error) {
        console.error('Failed to create wallet:', error);
      } finally {
        setWalletCreating(false);
      }
    }
  };

  const connectExistingWallet = () => {
    const civicConnector = connectors.find(c => c.name === 'Civic');
    if (civicConnector) {
      connect({ connector: civicConnector });
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (balance: any) => {
    if (!balance) return "0";
    const value = BigInt(balance.value);
    const divisor = BigInt(10 ** balance.decimals);
    const wholePart = value / divisor;
    const fractionalPart = value % divisor;
    
    if (fractionalPart === BigInt(0)) {
      return `${wholePart.toString()} ${balance.symbol}`;
    }
    
    const fractionalStr = fractionalPart.toString().padStart(balance.decimals, '0');
    const trimmedFractional = fractionalStr.replace(/0+$/, '').slice(0, 6);
    return `${wholePart.toString()}.${trimmedFractional} ${balance.symbol}`;
  };

  const supportedChains = [
    { chain: bsc, name: "Binance Smart Chain" },
    { chain: bscTestnet, name: "BSC Testnet" },
  ];

  if (!userContext.user) {
    return (
      <div className="wallet-section">
        <p className="wallet-status">Please sign in to access wallet features.</p>
      </div>
    );
  }

  return (
    <div className="wallet-section">
      {!userHasWallet(userContext) ? (
        <div className="no-wallet">
          <h5>Create Your Embedded Wallet</h5>
          <p>Create a secure, embedded wallet to manage your digital assets.</p>
          <button 
            className="create-wallet-btn" 
            onClick={createWallet}
            disabled={walletCreating}
          >
            <Wallet size={16} />
            {walletCreating ? "Creating Wallet..." : "Create Wallet"}
          </button>
        </div>
      ) : (
        <div className="wallet-info">
          <h5>Your Embedded Wallet</h5>
          
          {/* Wallet Address */}
          <div className="wallet-detail">
            <label>Wallet Address:</label>
            <div className="address-container">
              <code className="wallet-address">
                {showAddress ? address : formatAddress(address || "")}
              </code>
              <button 
                className="icon-btn"
                onClick={() => setShowAddress(!showAddress)}
                title={showAddress ? "Hide full address" : "Show full address"}
              >
                <ExternalLink size={14} />
              </button>
              <button 
                className="icon-btn"
                onClick={copyAddress}
                title="Copy address"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          {/* Connection Status */}
          <div className="wallet-detail">
            <label>Connection Status:</label>
            <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          {/* Wallet Balance */}
          <div className="wallet-detail">
            <label>Balance:</label>
            <span className="balance">
              {balance ? formatBalance(balance) : "Loading..."}
            </span>
          </div>

          {/* Connect Button */}
          {!isConnected && (
            <button className="connect-wallet-btn" onClick={connectExistingWallet}>
              <Wallet size={16} />
              Connect Wallet
            </button>
          )}

          {/* Chain Switcher */}
          <div className="chain-switcher">
            <label>Switch Network:</label>
            <div className="chain-buttons">
              {supportedChains.map(({ chain, name }) => (
                <button
                  key={chain.id}
                  className="chain-btn"
                  onClick={() => switchChain({ chainId: chain.id })}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sidebar Wallet Indicator
const SidebarWalletIndicator = () => {
  const [isClient, setIsClient] = useState(false);
  const userContext = useUser();
  const { isConnected } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !userContext.user) return null;

  return (
    <div className="sidebar-wallet-indicator">
      {userHasWallet(userContext) ? (
        <div className="wallet-indicator-connected">
          <Wallet size={12} />
          <span className={`indicator-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="indicator-text">
            {isConnected ? 'Wallet Connected' : 'Wallet Created'}
          </span>
        </div>
      ) : (
        <div className="wallet-indicator-setup">
          <Wallet size={12} />
          <span className="indicator-text">Setup Wallet</span>
        </div>
      )}
    </div>
  );
};

// Real Civic Auth component using proper Next.js integration with error handling
const AuthButton = () => {
  const [authError, setAuthError] = useState(false);
  
  // Call hooks at the top level - not inside try-catch
  const { user } = useUser();
  
  try {
    if (user) {
      return (
        <div className="auth-button-wrapper">
          <UserButton 
            className="custom-civic-button"
            dropdownButtonClassName="custom-civic-dropdown"
            style={{
              width: '100%',
              minHeight: '32px',
              maxHeight: '36px'
            }}
            dropdownButtonStyle={{
              backgroundColor: '#232323',
              color: '#fff',
              border: '1px solid rgba(250, 249, 86, 0.3)',
              fontSize: '12px'
            }}
          />
        </div>
      );
    }

    return (
      <div className="auth-button-wrapper">
        <SignInButton className="auth-btn login" />
      </div>
    );
  } catch (error) {
    console.warn('Auth component error:', error);
    if (!authError) {
      setAuthError(true);
    }
    
    return (
      <div className="auth-button-wrapper">
        <button className="auth-btn login" disabled>
          <User size={16} />
          Auth Loading...
        </button>
      </div>
    );
  }
};

// Dashboard Wallet Widget Component
const DashboardWalletWidget = ({ onShowSection }: { onShowSection?: (section: string) => void }) => {
  const [isClient, setIsClient] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const userContext = useUser();
  const { isConnected, address, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  // Auto connect hook for automatic wallet connection
  useAutoConnect();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-connect effect when user has wallet but isn't connected
  useEffect(() => {
    if (isClient && userContext.user && userHasWallet(userContext) && !isConnected) {
      const civicConnector = connectors.find(c => c.name === 'Civic');
      console.log('Debug - Wallet connection state:', {
        isClient,
        hasUser: !!userContext.user,
        hasWallet: userHasWallet(userContext),
        isConnected,
        civicConnector: !!civicConnector,
        connectorsCount: connectors.length
      });
      if (civicConnector) {
        console.log('Attempting auto-connection to embedded wallet...');
        connect({ connector: civicConnector });
      }
    }
  }, [isClient, userContext.user, isConnected, connectors, connect]);

  // Function to get the correct explorer URL based on chain
  const getExplorerUrl = (address: string) => {
    if (!chain) return `https://bscscan.com/address/${address}`;
    
    switch (chain.id) {
      case bsc.id:
        return `https://bscscan.com/address/${address}`;
      case bscTestnet.id:
        return `https://testnet.bscscan.com/address/${address}`;
      default:
        return `https://bscscan.com/address/${address}`;
    }
  };

  const openInExplorer = () => {
    if (address) {
      window.open(getExplorerUrl(address), '_blank');
    }
  };

  if (!isClient) {
    return (
      <div className="dashboard-wallet-widget">
        <h4>Wallet & Authentication</h4>
        <p>Loading...</p>
      </div>
    );
  }

  if (!userContext.user) {
    return (
      <div className="dashboard-wallet-widget">
        <h4>Wallet & Authentication</h4>
        <p>Sign in to access your wallet and dashboard features</p>
        <div className="auth-section-inline">
          <AuthButton />
        </div>
      </div>
    );
  }

  if (!userHasWallet(userContext)) {
    return (
      <div className="dashboard-wallet-widget">
        <h4>Wallet & Authentication</h4>
        <div className="auth-section-inline">
          <AuthButton />
        </div>
        <p>Create your embedded wallet to get started</p>
        <button 
          className="quick-create-wallet-btn" 
          onClick={async () => {
            try {
              await userContext.createWallet();
              // Connect to the embedded wallet after creation
              const civicConnector = connectors.find(c => c.name === 'Civic');
              if (civicConnector) {
                connect({ connector: civicConnector });
              }
            } catch (error) {
              console.error('Failed to create wallet:', error);
            }
          }}
        >
          <Wallet size={16} />
          Create Wallet
        </button>
        <p className="wallet-description">
          Your embedded wallet will be secured by Civic&apos;s non-custodial infrastructure. 
          No one, including Civic or this app, will have access to your private keys.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-wallet-widget">
      <h4>Wallet & Authentication</h4>
      <div className="auth-section-inline">
        <AuthButton />
      </div>
      {/* Debug info - can be removed later */}
      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '8px' }}>
        User: {userContext.user ? '✓' : '✗'} | Wallet: {userHasWallet(userContext) ? '✓' : '✗'} | Connected: {isConnected ? '✓' : '✗'}
      </div>
      <div className="wallet-management-inline">
        <div className="wallet-address-display">
          <span className="address-label">Address:</span>
          <div className="address-container-inline">
            <code className="address-short">
              {address ? (showFullAddress ? address : `${address.slice(0, 6)}...${address.slice(-4)}`) : 'Not Connected'}
            </code>
            {address && (
              <>
                <button 
                  className="icon-btn-small"
                  onClick={() => setShowFullAddress(!showFullAddress)}
                  title={showFullAddress ? "Show short address" : "Show full address"}
                >
                  <ExternalLink size={12} />
                </button>
                <button 
                  className="icon-btn-small"
                  onClick={() => navigator.clipboard.writeText(address)}
                  title="Copy address"
                >
                  <Copy size={12} />
                </button>
                <button 
                  className="icon-btn-small"
                  onClick={openInExplorer}
                  title={`View on ${chain?.id === bscTestnet.id ? 'BSC Testnet' : 'BSC'} Explorer`}
                >
                  <Globe size={12} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="wallet-balance-display">
          <span className="balance-label">Balance:</span>
          <span className="balance-amount">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 
             (isConnected ? 'Loading...' : 'Not Connected')}
          </span>
        </div>
        <div className="wallet-status-display">
          <span className={`connection-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? `Connected on ${chain?.name || 'Unknown Network'}` : 'Disconnected'}
          </span>
        </div>

        {/* Connect Button */}
        {!isConnected && (
          <button className="connect-wallet-btn-inline" onClick={() => {
            const civicConnector = connectors.find(c => c.name === 'Civic');
            if (civicConnector) {
              connect({ connector: civicConnector });
            }
          }}>
            <Wallet size={14} />
            Connect Wallet
          </button>
        )}

        {/* Chain Switcher */}
        <div className="chain-switcher-inline">
          <label>Switch Network:</label>
          <div className="chain-buttons-inline">
            <button
              className={`chain-btn-inline ${chain?.id === bsc.id ? 'active' : ''}`}
              onClick={() => switchChain({ chainId: bsc.id })}
            >
              BSC
            </button>
            <button
              className={`chain-btn-inline ${chain?.id === bscTestnet.id ? 'active' : ''}`}
              onClick={() => switchChain({ chainId: bscTestnet.id })}
            >
              BSC Testnet
            </button>
          </div>
        </div>

        <p className="wallet-description">
          Your embedded wallet is secured by Civic&apos;s non-custodial infrastructure. 
          No one, including Civic or this app, has access to your private keys.
        </p>
      </div>
    </div>
  );
};

const SmartSentinelsHub = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  
  // Get authentication and wallet status
  const userContext = useUser();
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  // Auto connect hook for automatic wallet connection
  useAutoConnect();

  // Only render on client to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Clear auth message when user authentication status changes
  useEffect(() => {
    if (authMessage && userContext.user && userHasWallet(userContext) && isConnected) {
      setAuthMessage("");
    }
  }, [userContext.user, isConnected, authMessage]);

  // Define which sections require authentication/wallet
  const protectedSections = ['nfts', 'agents', 'devices', 'marketplace', 'logs'];
  const requiresWallet = ['nfts', 'agents', 'marketplace'];

  // Helper function to get button styling based on auth status
  const getButtonClass = (sectionName: string) => {
    let className = `action-btn ${activeSection === sectionName ? 'active' : ''}`;
    return className;
  };

  const showSection = (sectionName: string) => {
    // Clear any previous messages
    setAuthMessage("");

    // Check if section requires authentication
    if (protectedSections.includes(sectionName)) {
      if (!userContext.user) {
        setAuthMessage("Please sign in to access this feature.");
        return;
      }

      // Check if section requires wallet connection
      if (requiresWallet.includes(sectionName)) {
        if (!userHasWallet(userContext)) {
          setAuthMessage("Please create your embedded wallet to access this feature.");
          return;
        }
        
        if (!isConnected) {
          setAuthMessage("Please connect your wallet to access this feature.");
          return;
        }
      }
    }

    // If clicking the same section, hide it. Otherwise, show the new section
    setActiveSection(prev => prev === sectionName ? null : sectionName);
    
    // Scroll to section after making it visible (only if not hiding)
    if (activeSection !== sectionName) {
      setTimeout(() => {
        const section = document.querySelector(`.${sectionName}-section`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <Wrapper>
      <HeaderOne />
      <div className="hub-layout">
        {/* Main Content - No Sidebar */}
        <main className="hub-main-content">
          {/* Dashboard Content with Dynamic Sections */}
          <h2 className="hub-title">Welcome to SmartSentinels Hub</h2>
          <p className="hub-desc">
            Manage your NFTs, AI agents, devices, and marketplace activity in one secure dashboard.
          </p>
          
          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            <DashboardWalletWidget onShowSection={showSection} />
            
            <div className="dashboard-stats-widget">
              <h4>Quick Stats</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">NFTs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Agents</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Devices</span>
                </div>
              </div>
            </div>
            
            <div className="dashboard-actions-widget">
              <h4>Navigation & Quick Actions</h4>
              <div className="action-buttons">
                <button 
                  className={getButtonClass('nfts')}
                  onClick={() => showSection('nfts')}
                >
                  <LucideImage size={16} />
                  View my NFTs
                </button>
                <button 
                  className={getButtonClass('agents')}
                  onClick={() => showSection('agents')}
                >
                  <Bot size={16} />
                  My Agents
                </button>
                <button 
                  className={getButtonClass('devices')}
                  onClick={() => showSection('devices')}
                >
                  <Cpu size={16} />
                  Device Status
                </button>
                <button 
                  className={getButtonClass('marketplace')}
                  onClick={() => showSection('marketplace')}
                >
                  <ShoppingCart size={16} />
                  Marketplace - Coming Soon
                </button>
                <button 
                  className={getButtonClass('logs')}
                  onClick={() => showSection('logs')}
                >
                  <List size={16} />
                  Activity Logs
                </button>
                <button 
                  className={getButtonClass('settings')}
                  onClick={() => showSection('settings')}
                >
                  <Settings size={16} />
                  Settings & Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Authentication Message */}
          {authMessage && (
            <div className="auth-message">
              <div className="auth-message-content">
                <span className="auth-message-text">{authMessage}</span>
              </div>
            </div>
          )}

          {/* Conditionally Rendered Sections - Only One Active at a Time */}
          {activeSection === 'nfts' && (
            <div className="hub-section nft-section">
              <h3 className="hub-section-title">
                <LucideImage size={24} />
                NFT Collection
              </h3>
              <div className="hub-placeholder">[NFT Collection View Placeholder]</div>
            </div>
          )}

          {activeSection === 'agents' && (
            <div className="hub-section agents-section">
              <h3 className="hub-section-title">
                <Bot size={24} />
                My AI Agents
              </h3>
              <div className="hub-placeholder">[AI Agents View Placeholder]</div>
            </div>
          )}

          {activeSection === 'devices' && (
            <div className="hub-section devices-section">
              <h3 className="hub-section-title">
                <Cpu size={24} />
                Device Monitor
              </h3>
              <div className="hub-placeholder">[Device Monitor Placeholder]</div>
            </div>
          )}

          {activeSection === 'marketplace' && (
            <div className="hub-section marketplace-section">
              <h3 className="hub-section-title">
                <ShoppingCart size={24} />
                Marketplace
              </h3>
              <div className="hub-placeholder">[COMING SOON]</div>
            </div>
          )}

          {activeSection === 'logs' && (
            <div className="hub-section logs-section">
              <h3 className="hub-section-title">
                <List size={24} />
                Activity Logs
              </h3>
              <div className="hub-placeholder">[Activity Logs Placeholder]</div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="hub-section settings-section">
              <h3 className="hub-section-title">
                <Settings size={24} />
                Settings & Configuration
              </h3>
              <div className="hub-settings-content">
                <div className="settings-placeholder">
                  <p>Additional settings and configuration options will be available here.</p>
                  <p>All wallet management features are now available in the main dashboard.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <FooterOne />
      <style jsx global>{`
        .hub-layout {
          display: flex;
          min-height: 70vh;
          background: #0adab9;
        }
        .auth-widget {
          margin: 20px 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .auth-button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          border: 1px solid rgba(239, 68, 68, 0.2);
          margin-bottom: 8px;
          text-align: center;
        }
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #0003;
          border-top: 2px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .auth-btn {
          background: var(--tg-primary-color);
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        .auth-btn:hover {
          background: #faf956;
          transform: translateY(-1px);
        }
        .auth-btn.logout {
          background: #ef4444;
          color: white;
        }
        .auth-btn.logout:hover {
          background: #dc2626;
        }
        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .auth-message {
          margin: 32px 0;
          padding: 24px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 12px;
          animation: fadeInMessage 0.3s ease-in;
        }
        @keyframes fadeInMessage {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .auth-message-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        .auth-message-text {
          color: #f59e0b;
          font-weight: 600;
          font-size: 1rem;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-badge {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        .hub-settings-content {
          max-width: 600px;
        }
        .auth-section {
          background: #191919;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 20px;
        }
        .auth-section h4 {
          color: var(--tg-primary-color);
          margin-bottom: 16px;
          font-size: 1.1rem;
        }
        .auth-controls {
          margin: 16px 0;
        }
        .auth-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin-top: 12px;
          line-height: 1.5;
        }
        .wallet-management-section {
          background: #191919;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 20px;
        }
        .wallet-management-section h4 {
          color: var(--tg-primary-color);
          margin-bottom: 16px;
          font-size: 1.1rem;
        }
        .wallet-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin-top: 16px;
          line-height: 1.5;
        }
        .wallet-management-inline {
          margin-top: 16px;
          padding: 12px;
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .status-label {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin-right: 8px;
        }
        .address-container-inline {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .icon-btn-small {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: none;
          padding: 4px;
          border-radius: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .icon-btn-small:hover {
          background: rgba(250, 249, 86, 0.2);
          color: var(--tg-primary-color);
        }
        .connect-wallet-btn-inline {
          background: #22c55e;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          margin: 12px 0;
          width: 100%;
          justify-content: center;
        }
        .connect-wallet-btn-inline:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }
        .chain-switcher-inline {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .chain-switcher-inline label {
          color: #fff;
          font-weight: 500;
          margin-bottom: 8px;
          display: block;
          font-size: 0.85rem;
        }
        .chain-buttons-inline {
          display: flex;
          gap: 6px;
        }
        .chain-btn-inline {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
          text-align: center;
        }
        .chain-btn-inline:hover {
          background: rgba(250, 249, 86, 0.2);
          color: var(--tg-primary-color);
          border-color: rgba(250, 249, 86, 0.4);
        }
        .chain-btn-inline.active {
          background: rgba(250, 249, 86, 0.15);
          color: var(--tg-primary-color);
          border-color: rgba(250, 249, 86, 0.5);
        }
        .settings-placeholder {
          background: #191919;
          border-radius: 12px;
          padding: 24px;
          color: #b0b0b0;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .settings-placeholder p {
          margin-bottom: 12px;
          line-height: 1.5;
        }
        .wallet-section {
          margin: 16px 0;
        }
        .wallet-status {
          color: #b0b0b0;
          font-style: italic;
          text-align: center;
          padding: 20px;
        }
        .no-wallet {
          text-align: center;
          padding: 20px;
        }
        .no-wallet h5 {
          color: var(--tg-primary-color);
          margin-bottom: 12px;
          font-size: 1rem;
        }
        .no-wallet p {
          color: #b0b0b0;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }
        .create-wallet-btn {
          background: var(--tg-primary-color);
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          margin: 0 auto;
        }
        .create-wallet-btn:hover {
          background: #faf956;
          transform: translateY(-1px);
        }
        .create-wallet-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .wallet-info {
          padding: 16px;
        }
        .wallet-info h5 {
          color: var(--tg-primary-color);
          margin-bottom: 20px;
          font-size: 1rem;
        }
        .wallet-detail {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          gap: 6px;
        }
        .wallet-detail label {
          color: #fff;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .address-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .wallet-address {
          background: #0a0a0a;
          color: var(--tg-primary-color);
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          flex: 1;
          min-width: 200px;
        }
        .icon-btn {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: none;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: rgba(250, 249, 86, 0.2);
          color: var(--tg-primary-color);
        }
        .status {
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        .status.connected {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        .status.disconnected {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .balance {
          color: var(--tg-primary-color);
          font-weight: 600;
          font-family: 'Courier New', monospace;
        }
        .connect-wallet-btn {
          background: #22c55e;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          margin-top: 12px;
        }
        .connect-wallet-btn:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }
        .chain-switcher {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .chain-switcher label {
          color: #fff;
          font-weight: 500;
          margin-bottom: 12px;
          display: block;
          font-size: 0.9rem;
        }
        .chain-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chain-btn {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .chain-btn:hover {
          background: rgba(250, 249, 86, 0.2);
          color: var(--tg-primary-color);
          border-color: rgba(250, 249, 86, 0.4);
        }
        .auth-section-inline {
          padding: 12px;
          border: 1px solid rgba(250, 249, 86, 0.3);
          border-radius: 8px;
          background: rgba(250, 249, 86, 0.02);
          margin-top: 12px;
        }
        .auth-section-inline .custom-civic-button .login-button,
        .auth-section-inline .custom-civic-button button {
          width: 100% !important;
          padding: 8px 12px !important;
          font-size: 12px !important;
          border-radius: 6px !important;
          background: rgba(250, 249, 86, 0.1) !important;
          border: 1px solid rgba(250, 249, 86, 0.3) !important;
          color: #000 !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
        }
        .auth-section-inline .custom-civic-button .login-button:hover,
        .auth-section-inline .custom-civic-button button:hover {
          background: var(--tg-primary-color) !important;
          border-color: var(--tg-primary-color) !important;
          transform: translateY(-1px) !important;
        }
        .hub-main-content {
          margin-left: 0;
          padding: 120px 40px 40px 40px;
          width: 100%;
          min-height: 80vh;
          background: #000000;
          color: #fff;
        }
        .auth-section-inline {
          margin: 16px 0;
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .auth-section-inline .auth-button-wrapper {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
        }
        .auth-section-inline .auth-btn {
          width: 100%;
          background: var(--tg-primary-color);
          color: #000;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
        }
        .auth-section-inline .auth-btn:hover {
          background: #faf956;
          transform: translateY(-1px);
        }
        /* Custom Civic UserButton styling for inline display */
        .auth-section-inline .custom-civic-button .login-button,
        .auth-section-inline .custom-civic-button button {
          width: 100% !important;
          padding: 8px 12px !important;
          font-size: 12px !important;
          border-radius: 6px !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: #fff !important;
          height: auto !important;
          min-height: 32px !important;
          max-height: 36px !important;
          line-height: 1.2 !important;
          box-sizing: border-box !important;
          font-family: inherit !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }
        .auth-section-inline .custom-civic-button .login-button:hover,
        .auth-section-inline .custom-civic-button button:hover {
          background: rgba(250, 249, 86, 0.15) !important;
          border-color: rgba(250, 249, 86, 0.4) !important;
          transform: translateY(-1px) !important;
        }
        .hub-section {
          margin: 40px 0;
          padding: 32px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          animation: fadeInSection 0.5s ease-in;
        }
        @keyframes fadeInSection {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hub-section:first-of-type {
          border-top: none;
          margin-top: 80px;
        }
        .hub-section-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 24px;
          color: var(--tg-primary-color);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hub-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 18px;
          color: var(--tg-primary-color);
        }
        .hub-desc {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 40px;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }
        .dashboard-wallet-widget,
        .dashboard-stats-widget,
        .dashboard-actions-widget {
          background: #191919;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.2s;
        }
        .dashboard-wallet-widget:hover,
        .dashboard-stats-widget:hover,
        .dashboard-actions-widget:hover {
          border-color: rgba(250, 249, 86, 0.3);
          transform: translateY(-2px);
        }
        .dashboard-wallet-widget h4,
        .dashboard-stats-widget h4,
        .dashboard-actions-widget h4 {
          color: var(--tg-primary-color);
          margin-bottom: 16px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wallet-quick-info {
          margin: 16px 0;
        }
        .wallet-address-display,
        .wallet-balance-display,
        .wallet-status-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 8px 0;
        }
        .address-label,
        .balance-label {
          color: #b0b0b0;
          font-size: 0.9rem;
        }
        .address-short {
          background: #0a0a0a;
          color: var(--tg-primary-color);
          padding: 4px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          word-break: break-all;
          max-width: 200px;
          overflow-wrap: break-word;
        }
        .balance-amount {
          color: var(--tg-primary-color);
          font-weight: 600;
          font-family: 'Courier New', monospace;
        }
        .connection-indicator {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .connection-indicator.connected {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        .connection-indicator.disconnected {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        .connection-indicator.connecting {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .quick-create-wallet-btn,
        .manage-wallet-btn {
          background: var(--tg-primary-color);
          color: #000;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          width: 100%;
          justify-content: center;
        }
        .quick-create-wallet-btn:hover,
        .manage-wallet-btn:hover {
          background: #faf956;
          transform: translateY(-1px);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .stat-item {
          text-align: center;
          padding: 16px 8px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
        }
        .stat-number {
          display: block;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--tg-primary-color);
          margin-bottom: 4px;
        }
        .stat-label {
          color: #b0b0b0;
          font-size: 0.8rem;
        }
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .action-btn {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 12px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          position: relative;
        }
        .action-btn:hover {
          background: rgba(250, 249, 86, 0.2);
          color: var(--tg-primary-color);
          border-color: rgba(250, 249, 86, 0.4);
          transform: translateY(-1px);
        }
        .action-btn.active {
          background: rgba(250, 249, 86, 0.15);
          color: var(--tg-primary-color);
          border-color: rgba(250, 249, 86, 0.5);
          box-shadow: 0 0 10px rgba(250, 249, 86, 0.2);
          position: relative;
        }
        .action-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--tg-primary-color);
          border-radius: 0 3px 3px 0;
        }
        .hub-section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 18px;
          color: var(--tg-primary-color);
        }
        .hub-placeholder {
          background: #191919;
          border-radius: 12px;
          padding: 40px;
          color: #b0b0b0;
          text-align: center;
          font-size: 1.1rem;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .hub-sidebar-toggle {
          display: none;
          position: fixed;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: none;
          border: none;
          z-index: 2001;
          padding: 0;
          cursor: pointer;
        }
        .semicircle-toggle {
          width: 40px;
          height: 60px;
          background: #f8f442;
          border-radius: 0 40px 40px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .semicircle-toggle:hover {
          background: #faf956;
        }
        .hub-sidebar-toggle-text {
          color: var(--tg-primary-color);
          font-size: 0.95rem;
          margin-left: 8px;
          letter-spacing: 0.02em;
          font-weight: 500;
          display: none;
        }
        .hub-sidebar-backdrop {
          display: none;
        }
        @media (max-width: 991px) {
          .hub-sidebar {
            transform: translateX(-100%);
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            z-index: 1000;
            padding-top: 80px;
          }
          .hub-sidebar.open {
            transform: translateX(0);
          }
          .sidebar-auth-section {
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            margin-bottom: 10px;
          }
          .hub-main-content {
            margin-left: 0;
            padding: 32px 8px 24px 8px;
          }
          .hub-sidebar-toggle {
            display: flex;
          }
          .hub-sidebar-toggle-text {
            display: inline;
          }
          .hub-sidebar-backdrop {
            display: block;
            position: fixed;
            z-index: 999;
            inset: 0;
            background: rgba(0,0,0,0.5);
          }
        }
        @media (max-width: 768px) {
          .hub-main-content {
            padding: 104px 4vw 16px 4vw;
          }
          .hub-title {
            font-size: 1.3rem;
          }
          .hub-section-title {
            font-size: 1rem;
          }
          .hub-placeholder {
            padding: 14px;
            font-size: 0.98rem;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .stat-item {
            padding: 12px 4px;
          }
          .stat-number {
            font-size: 1.4rem;
          }
        }
        @media (max-width: 575px) {
          .hub-title {
            font-size: 1.1rem;
          }
          .hub-section-title {
            font-size: 0.95rem;
          }
          .hub-placeholder {
            padding: 10px;
            font-size: 0.95rem;
          }
        }
        @media (max-width: 426px) {
          .hub-sidebar {
            width: 70vw;
            min-width: 120px;
            max-width: 260px;
            padding-top: 60px;
          }
          .hub-main-content {
            padding: 100px 2vw 8px 2vw;
          }
          .hub-title {
            font-size: 1rem;
          }
        }
        @media (max-width: 376px) {
          .hub-sidebar {
            width: 85vw;
            min-width: 90px;
            padding-top: 50px;
          }
          .hub-main-content {
            padding: 96px 1vw 6px 1vw;
          }
          .hub-title {
            font-size: 0.95rem;
          }
        }
        @media (max-width: 320px) {
          .hub-sidebar {
            width: 98vw;
            min-width: 70px;
            padding-top: 36px;
          }
          .hub-main-content {
            padding: 94px 0 4px 0;
          }
          .hub-title {
            font-size: 0.9rem;
          }
          .hub-section-title {
            font-size: 0.85rem;
          }
          .hub-placeholder {
            padding: 6px;
            font-size: 0.85rem;
          }
        }
        @media (min-width: 2160px) {
          .hub-main-content {
            padding: 180px 20vw 120px 20vw;
            font-size: 1.5rem;
          }
          .hub-title {
            font-size: 3.5rem;
          }
          .hub-section-title {
            font-size: 2.2rem;
          }
          .hub-placeholder {
            font-size: 1.3rem;
            padding: 60px;
          }
        }
      `}</style>
    </Wrapper>
  );
};

export default SmartSentinelsHub;
