interface DataType {
  id: number;
  sub_title: string;
  title: string;
  desc: string;
}

const road_map_data: DataType[] = [
  {
    id: 1,
    sub_title: "Q2–Q3 2025 (NOW)",
    title: "MVP Launch & Fundraising Engine",
    desc: "Deployed the SSTL smart contract, built and launched the bonding curve fundraising system, activated the PDF Audit AI MVP, and opened the private seed round to early contributors.",
  },
  {
    id: 2,
    sub_title: "Q3 2025",
    title: "AI Agent Expansion & VC Engagement",
    desc: "Scaling the number of deployed AI agents on Jetson Orin and UM790 Pro devices. Engaging strategic investors including Binance Labs, SunDAO, and other venture funds. Pitch deck, tokenomics, and MVP are now live.",
  },
  {
    id: 3,
    sub_title: "Q4 2025",
    title: "Strategic Round & Business Onboarding",
    desc: "Initiate the Series A round. Target real-world clients in verticals like legal, medical, and fintech. Deploy 50+ agents and integrate the first subscription-based SaaS dashboard for agent output tracking.",
  },
  {
    id: 4,
    sub_title: "Q1 2026",
    title: "Launchpad Raise & Token Distribution",
    desc: "Begin public fundraising via launchpads (e.g., ThenaPad, ChainGPT, Poolz). Enable claim dashboard, vesting portal, and live token metrics for transparency. Begin token liquidity activation.",
  },
  {
    id: 5,
    sub_title: "Q2–Q3 2026",
    title: "Multi-Agent PoUW Marketplace",
    desc: "Launch a decentralized marketplace of AI agents capable of working across industries. Allow users and businesses to deploy and interact with agents, using SSTL as the core utility token.",
  },
  {
    id: 6,
    sub_title: "Late 2026 and Beyond",
    title: "DAO Governance & Global Scaling",
    desc: "Transition to a DAO-based treasury and community-led governance. Expand into multiple regions with localized AI agents. Target Tier 1 exchange listings and full decentralization of the SmartSentinels grid.",
  },
];

export default road_map_data;
