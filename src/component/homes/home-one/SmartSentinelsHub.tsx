"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Image as LucideImage,
  Bot,
  Cpu,
  ShoppingCart,
  List,
  Settings,
} from "lucide-react";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import Wrapper from "../../../layouts/Wrapper";

type HubSection =
  | "dashboard"
  | "nfts"
  | "agents"
  | "devices"
  | "marketplace"
  | "logs"
  | "settings";

const menuItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
  { label: "My NFTs", icon: <LucideImage size={20} />, key: "nfts" },
  { label: "My Agents", icon: <Bot size={20} />, key: "agents" },
  { label: "Devices Status", icon: <Cpu size={20} />, key: "devices" },
  { label: "Marketplace(Coming Soon)", icon: <ShoppingCart size={20} />, key: "marketplace" },
  { label: "Activity Logs", icon: <List size={20} />, key: "logs" },
  { label: "Settings", icon: <Settings size={20} />, key: "settings" },
];

const placeholderContent: Record<HubSection, JSX.Element> = {
  dashboard: (
    <>
      <h2 className="hub-title">Welcome to SmartSentinels Hub</h2>
      <p className="hub-desc">
        Manage your NFTs, AI agents, devices, and marketplace activity in one secure dashboard.
      </p>
    </>
  ),
  nfts: (
    <>
      <h3 className="hub-section-title">NFT Collection</h3>
      <div className="hub-placeholder">[NFT Collection View Placeholder]</div>
    </>
  ),
  agents: (
    <>
      <h3 className="hub-section-title">My Agents</h3>
      <div className="hub-placeholder">[Agents View Placeholder]</div>
    </>
  ),
  devices: (
    <>
      <h3 className="hub-section-title">Devices Monitor</h3>
      <div className="hub-placeholder">[Devices Monitor Placeholder]</div>
    </>
  ),
  marketplace: (
    <>
      <h3 className="hub-section-title">Marketplace</h3>
      <div className="hub-placeholder">[COMING SOON]</div>
    </>
  ),
  logs: (
    <>
      <h3 className="hub-section-title">Activity Logs</h3>
      <div className="hub-placeholder">[Activity Logs Placeholder]</div>
    </>
  ),
  settings: (
    <>
      <h3 className="hub-section-title">Settings</h3>
      <div className="hub-placeholder">[Settings Placeholder]</div>
    </>
  ),
};

const SmartSentinelsHub = () => {
  const [active, setActive] = useState<HubSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Wrapper>
      <HeaderOne />
      <div className="hub-layout">
        {/* Hamburger button and label */}
        <button
          className="hub-sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <div className="hamburger-bars">
            <span />
            <span />
            <span />
          </div>
          <span className="hub-sidebar-toggle-text">
            {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </span>
        </button>
        {/* Sidebar */}
        <aside className={`hub-sidebar${sidebarOpen ? " open" : ""}`}>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className={active === item.key ? "active" : ""}
                  onClick={() => {
                    setActive(item.key as HubSection);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="hub-sidebar-icon">{item.icon}</span>
                  <span className="hub-sidebar-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="hub-sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content */}
        <main className="hub-main-content">{placeholderContent[active]}</main>
      </div>
      <FooterOne />
      <style jsx global>{`
        .hub-layout {
          display: flex;
          min-height: 70vh;
          background: #101010;
        }
        .hub-sidebar {
          width: 250px;
          background: #181818;
          border-right: 1px solid rgba(255,255,255,0.07);
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 100;
          padding-top: 120px;
          transition: transform 0.3s;
        }
        .hub-sidebar nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .hub-sidebar nav ul li {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 32px;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          border-left: 4px solid transparent;
          transition: background 0.2s, border-color 0.2s;
        }
        .hub-sidebar nav ul li.active,
        .hub-sidebar nav ul li:hover {
          background: #232323;
          color: var(--tg-primary-color);
          border-left: 4px solid var(--tg-primary-color);
        }
        .hub-sidebar-icon {
          display: flex;
          align-items: center;
        }
        .hub-sidebar-label {
          flex: 1;
        }
        .hub-main-content {
          margin-left: 250px;
          padding: 120px 40px 40px 40px;
          width: 100%;
          min-height: 80vh;
          background: #101010;
          color: #fff;
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
          top: 554px;
          left: 34px;
          background: none;
          border: none;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          z-index: 2001;
        }
        .hamburger-bars {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hamburger-bars span {
          display: block;
          width: 28px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
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