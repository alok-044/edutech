import React from "react";
import { motion } from "framer-motion";

function FloatingPaths({ position }) {
  const paths = [
    {
      id: 1,
      d: "M-100 -50 C 100 0, 300 -80, 500 20 S 800 0, 950 -40",
      width: 1.5,
    },
    {
      id: 2,
      d: "M-100 30 C 50 80, 200 0, 350 50 S 650 20, 950 60",
      width: 2,
    },
    {
      id: 3,
      d: "M-100 90 C 150 140, 350 40, 550 90 S 850 120, 950 80",
      width: 1,
    },
    
    // --- MIDDLE SECTION ---
    {
      id: 4,
      d: "M-100 150 C 100 100, 300 200, 500 150 S 800 180, 950 140",
      width: 2, // Thicker "hero" line
    },
    {
      id: 5,
      d: "M-100 200 C 50 250, 250 150, 450 200 S 750 250, 950 200",
      width: 1.5,
    },
    {
      id: 6,
      d: "M-100 240 C 200 200, 300 280, 500 240 S 800 220, 950 260",
      width: 1,
    },
    
    // --- BOTTOM SECTION ---
    {
      id: 7,
      d: "M-100 290 C 250 340, 450 240, 600 290 S 850 320, 950 280",
      width: 2,
    },
    {
      id: 8,
      d: "M-100 340 C 100 300, 300 380, 500 340 S 750 320, 950 360",
      width: 1.5,
    },
    {
      id: 9,
      d: "M-100 380 C 300 420, 400 340, 600 380 S 900 400, 950 350",
      width: 1,
    },
    
    // --- WIDE SWOOPS (Covering large areas) ---
    {
      id: 10,
      d: "M-100 420 C 150 350, 350 450, 550 400 S 850 380, 950 420",
      width: 1.5,
    },
    {
      id: 11,
      d: "M-100 40 C 200 150, 400 -50, 600 100 S 800 50, 950 150",
      width: 0.5, // Very thin background detail
    },
    {
      id: 12,
      d: "M-100 450 C 100 400, 300 500, 500 450 S 800 420, 950 480",
      width: 1,
    },
    {
      id: 13,
      d: "M-100 10 C 300 100, 500 0, 700 80 S 900 20, 950 100",
      width: 1.5,
    },
    {
      id: 14,
      d: "M-100 250 C 150 150, 350 350, 550 250 S 850 150, 950 300",
      width: 1,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 1. Gradient for the strokes */}
          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />      {/* Fade In (Blue) */}
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />    {/* Center (Purple) */}
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />    {/* Fade Out (Blue) */}
          </linearGradient>

          {/* 2. Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#ai-gradient)" // Apply the gradient
            strokeWidth={path.width}
            filter="url(#glow)" // Apply the glow
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1.2, 1.2, 0], // Draw fully, hold, then undraw/reset
              opacity: [0, 0.8, 0.8, 0],    // Fade in and out (Fixed bug where values were > 1)
              pathOffset: [0, 0, 1, 1],     // Optional: Moves the dash along the path
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function BackgroundPaths() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark Background Base */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Paths Container */}
        <div className="absolute inset-0 opacity-60 mix-blend-screen"> 
            <FloatingPaths position={1} />
        </div>
    </div>
  );
}