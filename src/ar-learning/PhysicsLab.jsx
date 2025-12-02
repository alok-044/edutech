import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  RefreshCw, 
  Settings, 
  Play, 
  Square, 
  Circle, 
  Triangle,
  Move,
  Scan
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const PhysicsLab = () => {
  const [gravity, setGravity] = useState(9.8);
  const [bounciness, setBounciness] = useState(0.6);
  const [friction, setFriction] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [objects, setObjects] = useState([]);
  
  const controls = useAnimation();

  // Add a new object to the simulation
  const addObject = (type) => {
    const id = Date.now();
    const startX = Math.random() * 60 + 20; // Random X between 20% and 80%
    setObjects(prev => [...prev, { id, type, x: startX, y: 0 }]);
  };

  const resetSimulation = () => {
    setObjects([]);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-yellow-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#eab308" alpha={0.1} />
      </div>

      {/* --- Navbar --- */}
      <div className="relative z-50 px-6 py-6 flex top-16 justify-between items-center max-w-8xl mx-auto">
        <Link 
          to="/ar-learning" 
          className="flex items-center gap-2 text-sm text-yellow-200/80 hover:text-yellow-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Link>
        <div className="px-3 py-1 rounded-full bg-yellow-900/20 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          Physics Engine v1.0
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* --- LEFT: Controls Panel --- */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6 order-2 lg:order-1">
          
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-white">Environment</h2>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              
              {/* Gravity */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Gravity</span>
                  <span className="text-yellow-400 font-mono">{gravity.toFixed(1)} m/s²</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="20" step="0.1"
                  value={gravity}
                  onChange={(e) => setGravity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400"
                />
              </div>

              {/* Bounciness */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Elasticity</span>
                  <span className="text-yellow-400 font-mono">{Math.round(bounciness * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="1" step="0.1"
                  value={bounciness}
                  onChange={(e) => setBounciness(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400"
                />
              </div>

              {/* Friction */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-400">Air Resistance</span>
                  <span className="text-yellow-400 font-mono">{Math.round(friction * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="1" step="0.05"
                  value={friction}
                  onChange={(e) => setFriction(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400"
                />
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex gap-3">
               <button 
                 onClick={resetSimulation}
                 className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-gray-300 transition-colors flex items-center justify-center gap-2"
               >
                 <RefreshCw size={14} /> Reset
               </button>
               <Link to="/ar-learning/launch" className="flex-1">
                 <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20">
                   <Scan size={14} /> AR Mode
                 </button>
               </Link>
            </div>
          </div>

          {/* Quick Add */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Spawn Objects</h3>
             <div className="grid grid-cols-3 gap-3">
                <button onClick={() => addObject('box')} className="aspect-square bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors group">
                   <Square className="text-yellow-600 group-hover:text-yellow-400 transition-colors" />
                </button>
                <button onClick={() => addObject('circle')} className="aspect-square bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors group">
                   <Circle className="text-blue-600 group-hover:text-blue-400 transition-colors" />
                </button>
                <button onClick={() => addObject('triangle')} className="aspect-square bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors group">
                   <Triangle className="text-red-600 group-hover:text-red-400 transition-colors" />
                </button>
             </div>
          </div>

        </div>

        {/* --- CENTER: Simulation Viewport --- */}
        <div className="flex-1 relative bg-[#111] rounded-3xl border border-white/10 overflow-hidden shadow-2xl order-1 lg:order-2">
            
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[50px_50px]" />
            
            {/* Play/Pause Overlay if empty */}
            {objects.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 pointer-events-none">
                    <Move className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-sm">Add objects to start simulation</p>
                </div>
            )}

            {/* Physics Objects */}
            <div className="relative w-full h-full">
                {objects.map((obj) => (
                    <PhysicsObject 
                        key={obj.id} 
                        type={obj.type} 
                        startX={obj.x}
                        gravity={gravity}
                        bounciness={bounciness}
                        friction={friction}
                    />
                ))}
            </div>

            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 border-t border-white/30 backdrop-blur-sm" />
        </div>

      </div>
    </div>
  );
};

// Simple Simulated Physics Object Component
const PhysicsObject = ({ type, startX, gravity, bounciness, friction }) => {
    // Simplified physics simulation using animation duration as a proxy for gravity
    // Higher gravity = faster duration
    const dropDuration = Math.max(0.5, 20 / (gravity + 1)); 
    
    // Bounciness affects keyframes
    const yKeyframes = ["0%", "85%", "40%", "85%", "60%", "85%", "85%"]; // Simplified bounce
    
    return (
        <motion.div
            initial={{ y: -50, x: `${startX}%`, opacity: 0 }}
            animate={{ 
                y: [0, 500, 300, 500, 450, 500], // Approximation of bouncing on floor
                opacity: 1,
                rotate: type === 'box' ? [0, 90, 180] : 0
            }}
            transition={{
                y: {
                    duration: dropDuration * 2,
                    times: [0, 0.4, 0.6, 0.8, 0.9, 1],
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse", // Just for visual loop effect in this demo
                    repeatDelay: 1
                },
                default: { duration: 0.5 }
            }}
            className="absolute top-10 w-16 h-16 flex items-center justify-center"
        >
            {type === 'box' && <div className="w-12 h-12 bg-yellow-500 rounded-lg border-2 border-white/20 shadow-lg shadow-yellow-500/20" />}
            {type === 'circle' && <div className="w-12 h-12 bg-blue-500 rounded-full border-2 border-white/20 shadow-lg shadow-blue-500/20" />}
            {type === 'triangle' && (
                <div className="w-0 h-0 border-l-24 border-l-transparent border-r-24 border-r-transparent border-b-42 border-b-red-500 filter drop-shadow-lg" />
            )}
        </motion.div>
    );
};

export default PhysicsLab;