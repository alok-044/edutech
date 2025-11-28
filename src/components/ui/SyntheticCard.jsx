import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SyntheticCard = () => {
  const ref = useRef(null);

  // Mouse position state for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Calculate rotation based on mouse position
  // The card will rotate slightly (max 20 degrees)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex items-center justify-center w-full h-full perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[500px] aspect-4/5 md:aspect-square bg-slate-900/50 rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] backdrop-blur-md"
      >
        {/* --- Inner Glow --- */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

        {/* --- Card Content (Mock AI Dashboard) --- */}
        <div 
            className="absolute inset-4 bg-slate-950/80 rounded-xl border border-white/5 flex flex-col overflow-hidden"
            style={{ transform: "translateZ(50px)" }} // Pushes content forward in 3D
        >
          {/* Header */}
          <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="text-[10px] text-slate-500 font-mono">AI_AGENT_V2.exe</div>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col gap-4 relative">
             {/* Abstract Grid Background */}
             <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px]" />

             {/* User Profile */}
             <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  AK
                </div>
                <div>
                    <div className="h-2 w-24 bg-slate-700 rounded mb-1.5" />
                    <div className="h-2 w-16 bg-slate-800 rounded" />
                </div>
             </div>

             {/* Stats Graph Mockup */}
             <div className="mt-4 p-3 rounded-lg bg-slate-900/50 border border-white/5 relative z-10">
                <div className="flex justify-between items-end h-24 gap-2">
                    {[40, 65, 30, 85, 50, 95].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 1 + i * 0.1, duration: 1 }}
                            className="w-full bg-blue-500/30 rounded-t-sm hover:bg-blue-500/60 transition-colors"
                        />
                    ))}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex justify-between">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
             </div>

             {/* Active Course */}
             <div className="mt-auto bg-blue-900/20 p-3 rounded-lg border border-blue-500/20 relative z-10">
                <div className="text-xs text-blue-400 font-semibold mb-1">CURRENT LEARNING</div>
                <div className="text-sm text-white">Advanced Neural Networks</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ delay: 2, duration: 1.5 }}
                        className="h-full bg-blue-500" 
                    />
                </div>
             </div>

          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default SyntheticCard;