# SmartSentinels Wallet Integration

This project now includes Civic Auth Web3 wallet integration, enabling users to authenticate and manage embedded wallets seamlessly.

## Features

- **Civic Authentication**: Secure identity verification using Civic Pass
- **Embedded Wallets**: Non-custodial wallets created and managed automatically
- **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, and Sepolia testnets
- **Wagmi Integration**: Full Web3 capabilities using Wagmi hooks
- **Automatic Connection**: Wallets auto-connect after user authentication

## Setup

1. **Environment Variables**: The project uses the following environment variables:
   ```
   NEXT_PUBLIC_CIVIC_AUTH_CLIENT_ID=your-civic-client-id
   ```

2. **Dependencies Installed**:
   - `@civic/auth-web3`: Civic Web3 authentication
   - `wagmi`: Ethereum library for React
   - `viem`: TypeScript Interface for Ethereum
   - `@tanstack/react-query`: Data fetching (required by Wagmi)

## Usage

### Basic Wallet Integration

The wallet is automatically integrated into the SmartSentinels Hub settings section. Users can:

1. **Sign In**: Use Civic Auth to authenticate
2. **Create Wallet**: Generate an embedded wallet automatically
3. **View Wallet Info**: See address, balance, and connection status
4. **Switch Networks**: Change between supported blockchain networks
5. **Copy Address**: Easily copy wallet address to clipboard

### Using Wallet in Components

```tsx
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { useAccount, useBalance } from "wagmi";

export const YourComponent = () => {
  const userContext = useUser();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (userContext.user && userHasWallet(userContext)) {
    return (
      <div>
        <p>Address: {userContext.ethereum.address}</p>
        <p>Balance: {balance?.formatted} {balance?.symbol}</p>
        <p>Connected: {isConnected ? "Yes" : "No"}</p>
      </div>
    );
  }

  return <p>Please connect your wallet</p>;
};
```

### Sending Transactions

```tsx
import { useSendTransaction } from "wagmi";

const { sendTransaction } = useSendTransaction();

const handleSend = () => {
  sendTransaction({
    to: "0x...",
    value: BigInt(1000000000000000), // 0.001 ETH in wei
  });
};
```

### Signing Messages

```tsx
import { useSignMessage } from "wagmi";

const { signMessage } = useSignMessage();

const handleSign = () => {
  signMessage({ message: "Hello, Web3!" });
};
```

## Supported Networks

- **Binance Smart Chain (BSC) Mainnet**: Full production environment with BNB as native currency
- **BSC Testnet**: Binance Smart Chain test network with tBNB for testing

### Network Details

**BSC Mainnet:**
- Network Name: Binance Smart Chain
- RPC URL: https://bsc-dataseed.binance.org/
- Chain ID: 56
- Currency Symbol: BNB
- Block Explorer: https://bscscan.com

**BSC Testnet:**
- Network Name: BSC Testnet
- RPC URL: https://data-seed-prebsc-1-s1.bnbchain.org:8545
- Chain ID: 97
- Currency Symbol: tBNB
- Block Explorer: https://testnet.bscscan.com

## Security

- **Non-Custodial**: Neither Civic nor the app has access to private keys
- **Embedded Wallets**: Secure wallet generation handled by Civic's infrastructure
- **Identity Verification**: Civic Pass provides robust identity verification

## Development

The wallet integration is configured in:
- `/src/component/common/CivicAuthWrapper.tsx`: Main provider setup
- `/src/utils/wagmi.ts`: Wagmi configuration
- `/src/component/homes/home-one/SmartSentinelsHub.tsx`: Hub interface with wallet management

## Production Notes

Make sure to:
1. Replace the Civic Client ID with your production credentials
2. Configure proper RPC endpoints for production (currently using Binance's official endpoints)
3. Test thoroughly on BSC testnet before mainnet deployment
4. Ensure your smart contracts are deployed on BSC mainnet
5. Consider adding backup RPC endpoints for better reliability

## Example Component

See `/src/component/examples/WalletExample.tsx` for a complete example of wallet usage patterns.
