import ClientHubWrapper from "../../component/homes/home-one/ClientHubWrapper";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmartSentinels Hub | AI Mining Platform',
  description: 'Access your SmartSentinels Hub for AI agents, NFTs, devices, and smart contract auditing.',
  keywords: 'SmartSentinels, AI Mining, Blockchain, NFT, Smart Contracts, BSC',
}

export default function HubPage() {
  return <ClientHubWrapper />;
}