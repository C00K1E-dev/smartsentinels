"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  Bot, 
  Monitor, 
  ShoppingCart, 
  Activity, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const SmartSentinelsHub = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      component: <DashboardView />
    },
    {
      id: 'nfts',
      label: 'My NFTs',
      icon: <Wallet size={20} />,
      component: <NFTCollectionView />
    },
    {
      id: 'agents',
      label: 'My Agents',
      icon: <Bot size={20} />,
      component: <AgentsView />
    },
    {
      id: 'devices',
      label: 'Devices Status',
      icon: <Monitor size={20} />,
      component: <DevicesMonitor />
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: <ShoppingCart size={20} />,
      component: <MarketplaceView />
    },
    {
      id: 'activity',
      label: 'Activity Logs',
      icon: <Activity size={20} />,
      component: <ActivityLogs />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      component: <SettingsView />
    }
  ];

  const activeComponent = sidebarItems.find(item => item.id === activeItem)?.component;

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-dark-surface border-r border-gray-700 transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h2 className="text-xl font-bold text-dark-primary">SmartSentinels</h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors lg:hidden"
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    activeItem === item.id
                      ? 'bg-dark-primary text-white'
                      : 'hover:bg-gray-700 text-dark-text-secondary hover:text-dark-text'
                  }`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {activeComponent}
        </motion.div>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

// Dashboard Component
const DashboardView = () => (
  <div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-dark-text mb-4">Welcome to SmartSentinels Hub</h1>
      <p className="text-dark-text-secondary text-lg max-w-3xl">
        Your central command center for managing AI agents, NFTs, devices, and marketplace activities. 
        Monitor your digital assets, track device performance, and explore new opportunities in the 
        decentralized AI ecosystem.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-dark-surface p-6 rounded-xl border border-gray-700"
      >
        <h3 className="text-xl font-semibold text-dark-text mb-2">Total NFTs</h3>
        <p className="text-3xl font-bold text-dark-primary">12</p>
        <p className="text-dark-text-secondary text-sm">Active collections</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-dark-surface p-6 rounded-xl border border-gray-700"
      >
        <h3 className="text-xl font-semibold text-dark-text mb-2">AI Agents</h3>
        <p className="text-3xl font-bold text-green-500">8</p>
        <p className="text-dark-text-secondary text-sm">Currently running</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-dark-surface p-6 rounded-xl border border-gray-700"
      >
        <h3 className="text-xl font-semibold text-dark-text mb-2">Devices Online</h3>
        <p className="text-3xl font-bold text-blue-500">15/18</p>
        <p className="text-dark-text-secondary text-sm">Device status</p>
      </motion.div>
    </div>
  </div>
);

// NFT Collection Component
const NFTCollectionView = () => (
  <div>
    <h1 className="text-3xl font-bold text-dark-text mb-6">My NFT Collection</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6].map((nft) => (
        <motion.div
          key={nft}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: nft * 0.1 }}
          className="bg-dark-surface p-4 rounded-xl border border-gray-700 hover:border-dark-primary transition-colors"
        >
          <div className="aspect-square bg-gradient-to-br from-dark-primary to-purple-600 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">#{nft}</span>
          </div>
          <h3 className="text-dark-text font-semibold mb-2">SmartSentinel #{nft}</h3>
          <p className="text-dark-text-secondary text-sm">AI Mining Agent</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-green-500 text-sm">Active</span>
            <span className="text-dark-text-secondary text-sm">0.5 ETH</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Agents View Component
const AgentsView = () => (
  <div>
    <h1 className="text-3xl font-bold text-dark-text mb-6">My AI Agents</h1>
    <div className="space-y-4">
      {['Data Analyzer', 'Market Predictor', 'Resource Optimizer', 'Security Monitor'].map((agent, index) => (
        <motion.div
          key={agent}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-dark-surface p-6 rounded-xl border border-gray-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-dark-primary rounded-full flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-dark-text font-semibold">{agent}</h3>
              <p className="text-dark-text-secondary text-sm">Running since 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">Active</span>
            <span className="text-dark-text-secondary">98% efficiency</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Devices Monitor Component
const DevicesMonitor = () => (
  <div>
    <h1 className="text-3xl font-bold text-dark-text mb-6">Device Status Monitor</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[
        { name: 'Mining Rig #1', status: 'Running', nft: 'SmartSentinel #1', hash: '125.5 MH/s' },
        { name: 'Mining Rig #2', status: 'Running', nft: 'SmartSentinel #2', hash: '118.3 MH/s' },
        { name: 'Mining Rig #3', status: 'Idle', nft: 'SmartSentinel #3', hash: '0 MH/s' },
        { name: 'AI Processor #1', status: 'Running', nft: 'SmartSentinel #4', hash: '2.3 TH/s' },
        { name: 'AI Processor #2', status: 'Offline', nft: 'SmartSentinel #5', hash: '0 TH/s' },
        { name: 'Storage Node #1', status: 'Running', nft: 'SmartSentinel #6', hash: '850 GB/h' },
      ].map((device, index) => (
        <motion.div
          key={device.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-dark-surface p-6 rounded-xl border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-dark-text font-semibold">{device.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              device.status === 'Running' ? 'bg-green-600 text-white' :
              device.status === 'Idle' ? 'bg-yellow-600 text-white' :
              'bg-red-600 text-white'
            }`}>
              {device.status}
            </span>
          </div>
          <p className="text-dark-text-secondary mb-2">Associated NFT: {device.nft}</p>
          <p className="text-dark-text">Hash Rate: {device.hash}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// Marketplace Component
const MarketplaceView = () => (
  <div>
    <h1 className="text-3xl font-bold text-dark-text mb-6">Marketplace</h1>
    <div className="bg-dark-surface p-8 rounded-xl border border-gray-700 text-center">
      <ShoppingCart size={64} className="mx-auto text-dark-text-secondary mb-4" />
      <h3 className="text-xl font-semibold text-dark-text mb-2">Marketplace Coming Soon</h3>
      <p className="text-dark-text-secondary max-w-2xl mx-auto">
        Discover and trade AI agents, rent computing resources, and explore new opportunities 
        in the decentralized AI ecosystem. Stay tuned for the official launch.
      </p>
    </div>
  </div>
);

// Activity Logs Component
const ActivityLogs = () => (
  <div>
    <h1 className="text-3xl font-bold text-dark-text mb-6">Activity Logs</h1>
    <div className="space-y-3">
      {[
        { action: 'Agent deployed', time: '2 minutes ago', type: 'success' },
        { action: 'NFT minted successfully', time: '1 hour ago', type: 'success' },
        { action: 'Device went offline', time: '2 hours ago', type: 'warning' },
        { action: 'Mining rewards claimed', time: '4 hours ago', type: 'success' },
        { action: 'New agent purchased', time: '1 day ago', type: 'info' },
        { action: 'Device maintenance completed', time: '2 days ago', type: 'success' },
      ].map((log, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-dark-surface p-4 rounded-lg border border-gray-700 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              log.type === 'success' ? 'bg-green-500' :
              log.type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`} />
            <span className="text-dark-text">{log.action}</span>
          </div>
          <span className="text-dark-text-secondary text-sm">{log.time}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

// Settings Component
const SettingsView = () => (
  <div>
    <h1 className="text-3xl font-bold text-dark-text mb-6">Settings</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-dark-surface p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-dark-text mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-dark-text-secondary mb-2">Email Notifications</label>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>
          <div>
            <label className="block text-dark-text-secondary mb-2">Auto-deploy Agents</label>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="bg-dark-surface p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-dark-text mb-4">Security</h3>
        <div className="space-y-4">
          <button className="w-full bg-dark-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Change Password
          </button>
          <button className="w-full border border-gray-600 text-dark-text py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SmartSentinelsHub;