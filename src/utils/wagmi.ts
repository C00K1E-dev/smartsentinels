import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { embeddedWallet } from '@civic/auth-web3/wagmi';

// Create wagmi configuration with Civic embedded wallet for BSC networks
export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http('https://bsc-dataseed.binance.org/'),
    [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.bnbchain.org:8545'),
  },
  connectors: [
    embeddedWallet(),
  ],
});
