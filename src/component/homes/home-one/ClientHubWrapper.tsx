"use client";
import { useEffect, useState } from "react";
import SmartSentinelsHub from "./SmartSentinelsHub";

export default function ClientHubWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#101010',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        Loading SmartSentinels Hub...
      </div>
    );
  }

  return <SmartSentinelsHub />;
}
