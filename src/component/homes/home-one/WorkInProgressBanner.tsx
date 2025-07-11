"use client"
import { useState } from "react";

const ACCENT = "text-yellow-400"; // Adjust to your theme accent if needed

const WorkInProgressBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full z-[1000] py-3 px-4 bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-700 shadow-lg"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Outfit', 'Inter', sans-serif",
        letterSpacing: "0.01em",
      }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="flex items-center text-white text-center text-sm md:text-base font-semibold">
          <span role="img" aria-label="tools" className={`${ACCENT} mr-2`}>🚧</span>
          This website is a <span className={`${ACCENT} mx-1`}>Work in Progress</span> — features may change or be temporarily unavailable.
        </span>
        <button
          className="mt-2 sm:mt-0 sm:ml-4 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-medium transition-colors btn"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Outfit', 'Inter', sans-serif",
          }}
          aria-label="Dismiss"
          onClick={() => setVisible(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default WorkInProgressBanner;