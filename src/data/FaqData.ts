interface DataType {
   id: number;
   page: string;
   title: string;
   desc: string;
}

const faq_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      title: "How can I buy SSTL tokens?",
      desc: "To purchase SSTL tokens, visit the fundraising section on our website. Connect your Web3 wallet (like MetaMask) and contribute BNB to receive SSTL tokens directly into your wallet.",
   },
   {
      id: 2,
      page: "home_1",
      title: "What is the value of SSTL tokens?",
      desc: "SSTL tokens have a dynamic market value. In Phase 1 of our fundraising, the price is set based on contribution demand. Future price will depend on usage, agent output, and exchange activity.",
   },
   {
      id: 3,
      page: "home_1",
      title: "What is Proof of Useful Work (PoUW)?",
      desc: "PoUW is our innovative mining mechanism where AI agents perform real-world tasks, such as smart contract auditing. When agents work, they generate SSTL tokens based on their output.",
   },
   {
      id: 4,
      page: "home_1",
      title: "How are SSTL tokens distributed?",
      desc: "40% of SSTL tokens are distributed through PoUW by agents over 4 years, with halving every 12 months. 10% are sold in fundraising, and the rest are allocated to the team, advisors, and ecosystem.",
   },
   {
      id: 5,
      page: "home_1",
      title: "What is an AI agent in SmartSentinels?",
      desc: "An AI agent is a specialized module that performs useful tasks like smart contract audits. These agents run on physical devices like UM790 Pro or Jetson Orin, and generate SSTL tokens while working.",
   },
   {
      id: 6,
      page: "home_1",
      title: "Can I contribute my own device to the network?",
      desc: "Yes! You can onboard your own compatible hardware and run approved AI agents. Once connected, your device will start generating SSTL tokens whenever an agent completes a task.",
   },
   {
      id: 7,
      page: "home_1",
      title: "What do I get by minting a SmartSentinels NFT?",
      desc: "Minting an NFT gives you a stake in a specific device running AI agents. As that device completes tasks, a portion of the SSTL tokens generated is distributed to NFT holders.",
   },
   {
      id: 1,
      page: "home_2",
      title: "What is SmartSentinels?",
      desc: "SmartSentinels is a decentralized AI network powered by Proof of Useful Work. It allows users to stake in real devices and earn tokens as AI agents perform tasks like smart contract audits.",
   },
   {
      id: 2,
      page: "home_2",
      title: "What can AI agents do on the network?",
      desc: "Currently, our first AI agent audits smart contracts and generates detailed PDF reports. Future agents will serve other industries like healthcare, customer support, and logistics.",
   },
   {
      id: 3,
      page: "home_2",
      title: "Do I need technical skills to participate?",
      desc: "Not at all. You can participate by minting NFTs, buying SSTL tokens, or referring others. Advanced users can contribute hardware or deploy their own agents in the future.",
   },
   {
      id: 4,
      page: "home_2",
      title: "Is the SSTL token on BNB Chain?",
      desc: "Yes. SSTL is a BEP-20 token deployed on the BNB Chain. You can view the contract address on our website once it goes live and add the token to your wallet.",
   },
   {
      id: 5,
      page: "home_2",
      title: "What happens when agents are idle?",
      desc: "If an agent is idle, no tokens are generated. Tokens are only minted when agents are actively performing useful work. This ensures that every SSTL token has real computational value behind it.",
   },
];

export default faq_data;
