// Multi-chain API utility functions (Ethereum & BSC)
export interface TransactionData {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

export interface TokenTransferData {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface APIResponse<T> {
  status: string;
  message: string;
  result: T[];
}

export type NetworkType = 'bsc-mainnet' | 'bsc-testnet';

// API endpoints for BSC networks using Etherscan V2 API
const API_ENDPOINTS = {
  'bsc-mainnet': 'https://api.etherscan.io/v2/api',
  'bsc-testnet': 'https://api.etherscan.io/v2/api'
};

// Chain IDs for BSC networks
const CHAIN_IDS = {
  'bsc-mainnet': 56,
  'bsc-testnet': 97
};

// Use your Etherscan API key for both BSC networks
const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || 'YourAPIKeyHere';

/**
 * Get the correct API endpoint for a network
 */
function getNetworkConfig(network: NetworkType) {
  return {
    apiBase: API_ENDPOINTS[network],
    chainId: CHAIN_IDS[network],
    apiKey: API_KEY
  };
}

/**
 * Fetch normal transactions for a wallet address
 */
export async function fetchWalletTransactions(
  address: string,
  network: NetworkType = 'bsc-testnet',
  page: number = 1,
  offset: number = 100
): Promise<TransactionData[]> {
  try {
    const { apiBase, chainId, apiKey } = getNetworkConfig(network);
    const url = `${apiBase}?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=${apiKey}`;
    
    console.log(`🚀 Fetching transactions for ${address} on ${network} (Chain ID: ${chainId})`);
    console.log(`📡 API URL: ${url}`);
    
    const response = await fetch(url);
    const data: APIResponse<TransactionData> = await response.json();
    
    console.log(`📊 API Response Status: ${data.status}`);
    console.log(`📈 Number of transactions received: ${data.result?.length || 0}`);
    console.log(`🔍 Full API Response:`, data);
    
    // Handle both successful responses and cases where data exists despite status
    if (data.status === '1' || (Array.isArray(data.result) && data.result.length > 0)) {
      // Log the first few transactions with timestamps for debugging
      if (data.result && data.result.length > 0) {
        console.log(`📋 First 3 transactions:`, data.result.slice(0, 3).map(tx => ({
          hash: tx.hash.substring(0, 10) + '...',
          value: tx.value,
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
          from: tx.from.substring(0, 6) + '...',
          to: tx.to.substring(0, 6) + '...'
        })));
      }
      
      return data.result || [];
    } else {
      console.error('❌ API error:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

/**
 * Fetch BEP-20 token transfers for a wallet address
 */
export async function fetchTokenTransfers(
  address: string,
  network: NetworkType = 'bsc-testnet',
  page: number = 1,
  offset: number = 100
): Promise<TokenTransferData[]> {
  try {
    const { apiBase, chainId, apiKey } = getNetworkConfig(network);
    const url = `${apiBase}?chainid=${chainId}&module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=desc&apikey=${apiKey}`;
    
    console.log(`🎯 Fetching token transfers for ${address} on ${network} (Chain ID: ${chainId})`);
    console.log(`📡 Token API URL: ${url}`);
    
    const response = await fetch(url);
    const data: APIResponse<TokenTransferData> = await response.json();
    
    console.log(`🪙 Token API Response Status: ${data.status}`);
    console.log(`💰 Number of token transfers received: ${data.result?.length || 0}`);
    console.log(`🔍 Full Token API Response:`, data);
    
    // Handle both successful responses and cases where data exists despite status
    if (data.status === '1' || (Array.isArray(data.result) && data.result.length > 0)) {
      // Log the first few token transfers for debugging
      if (data.result && data.result.length > 0) {
        console.log(`🎫 First 3 token transfers:`, data.result.slice(0, 3).map(tx => ({
          hash: tx.hash.substring(0, 10) + '...',
          value: tx.value,
          tokenSymbol: tx.tokenSymbol,
          timestamp: new Date(parseInt(tx.timeStamp) * 1000).toLocaleString(),
          from: tx.from.substring(0, 6) + '...',
          to: tx.to.substring(0, 6) + '...'
        })));
      }
      
      return data.result || [];
    } else {
      console.error('❌ Token API error:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    return [];
  }
}

/**
 * Fetch wallet balance
 */
export async function fetchWalletBalance(
  address: string, 
  network: NetworkType = 'bsc-testnet'
): Promise<string> {
  try {
    const { apiBase, chainId, apiKey } = getNetworkConfig(network);
    const url = `${apiBase}?chainid=${chainId}&module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === '1') {
      // Convert from wei to BNB
      const balanceInBNB = parseFloat(data.result) / Math.pow(10, 18);
      return balanceInBNB.toFixed(6);
    } else {
      console.error('API error:', data.message);
      return '0';
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

/**
 * Format address to show first and last characters
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format value from wei to BNB
 */
export function formatValue(value: string): string {
  const bnbValue = parseFloat(value) / Math.pow(10, 18);
  return bnbValue.toFixed(6);
}

/**
 * Get transaction type
 */
export function getTransactionType(tx: TransactionData, userAddress: string): string {
  if (tx.from.toLowerCase() === userAddress.toLowerCase()) {
    return 'Sent';
  } else if (tx.to.toLowerCase() === userAddress.toLowerCase()) {
    return 'Received';
  }
  return 'Contract';
}

/**
 * Get explorer URL for different networks
 */
export function getExplorerUrl(network: NetworkType): string {
  switch (network) {
    case 'bsc-mainnet':
      return 'https://bscscan.com';
    case 'bsc-testnet':
      return 'https://testnet.bscscan.com';
    default:
      return 'https://bscscan.com';
  }
}

/**
 * Get network currency symbol
 */
export function getNetworkCurrency(network: NetworkType): string {
  return 'BNB'; // Both mainnet and testnet use BNB
}

/**
 * Debug function to check recent transactions in a specific time window
 */
export async function debugRecentTransactions(
  address: string,
  network: NetworkType = 'bsc-testnet',
  hoursBack: number = 12
): Promise<void> {
  try {
    console.log(`🔍 DEBUG: Checking last ${hoursBack} hours of transactions for ${address}`);
    
    const now = Date.now();
    const cutoffTime = now - (hoursBack * 60 * 60 * 1000);
    
    // Fetch more transactions to ensure we don't miss any
    const transactions = await fetchWalletTransactions(address, network, 1, 200);
    const tokenTransfers = await fetchTokenTransfers(address, network, 1, 200);
    
    // Filter recent transactions
    const recentTxs = transactions.filter(tx => {
      const txTime = parseInt(tx.timeStamp) * 1000;
      return txTime >= cutoffTime;
    });
    
    const recentTokens = tokenTransfers.filter(tx => {
      const txTime = parseInt(tx.timeStamp) * 1000;
      return txTime >= cutoffTime;
    });
    
    console.log(`📅 Found ${recentTxs.length} regular transactions in last ${hoursBack} hours`);
    console.log(`🪙 Found ${recentTokens.length} token transfers in last ${hoursBack} hours`);
    
    // Log recent transactions with details
    recentTxs.forEach((tx, index) => {
      const value = formatValue(tx.value);
      const time = new Date(parseInt(tx.timeStamp) * 1000);
      console.log(`🔸 Recent TX ${index + 1}: ${value} BNB at ${time.toLocaleString()}`);
      console.log(`   Hash: ${tx.hash}`);
      console.log(`   From: ${tx.from} To: ${tx.to}`);
    });
    
    recentTokens.forEach((tx, index) => {
      const value = parseFloat(tx.value) / Math.pow(10, parseInt(tx.tokenDecimal));
      const time = new Date(parseInt(tx.timeStamp) * 1000);
      console.log(`🔹 Recent Token ${index + 1}: ${value} ${tx.tokenSymbol} at ${time.toLocaleString()}`);
      console.log(`   Hash: ${tx.hash}`);
    });
    
  } catch (error) {
    console.error('🚨 Debug function error:', error);
  }
}
