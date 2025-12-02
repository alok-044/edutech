import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Layers, 
  Info, 
  Maximize, 
  Scan, 
  Activity,
  Heart,
  Brain,
  Zap,
  ChevronRight
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const systems = [
  { id: "skeletal", label: "Skeletal", icon: Activity, color: "text-slate-300", bg: "bg-slate-500/20" },
  { id: "muscular", label: "Muscular", icon: Zap, color: "text-red-400", bg: "bg-red-500/20" },
  { id: "circulatory", label: "Circulatory", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/20" },
  { id: "nervous", label: "Nervous", icon: Brain, color: "text-yellow-400", bg: "bg-yellow-500/20" },
];

const hotspots = [
  { id: 1, x: "30%", y: "25%", label: "Cranium", desc: "Protects the brain and supports facial structures." },
  { id: 2, x: "45%", y: "40%", label: "Rib Cage", desc: "Encloses and protects the heart and lungs." },
  { id: 3, x: "60%", y: "65%", label: "Femur", desc: "The longest and strongest bone in the body." },
];

const HumanAnatomy = () => {
  const [activeSystem, setActiveSystem] = useState("skeletal");
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  return (
    <div className="min-h-screen w-full bg-black text-white relative top-16 overflow-hidden font-sans selection:bg-red-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#ef4444" alpha={1} />
      </div>

      {/* --- Navbar (simplified) --- */}
      <div className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/ar-learning" 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Link>
        <div className="px-3 py-1 rounded-full bg-red-900/20 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">
          Live Simulation
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* --- LEFT: Controls & Info --- */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2">Human Anatomy</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Interactive 3D study of human biological systems. Select a layer to visualize specific structures.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {systems.map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => setActiveSystem(sys.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    activeSystem === sys.id 
                      ? "bg-white/10 border-white/30 shadow-lg shadow-white/5" 
                      : "bg-[#111] border-white/5 hover:border-white/20 text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${sys.bg} ${sys.color}`}>
                    <sys.icon size={18} />
                  </div>
                  <span className="text-sm font-medium">{sys.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Stats & Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total Bones</span>
                  <span className="font-mono text-white">206</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-red-500/50 rounded-full" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Muscle Groups</span>
                  <span className="font-mono text-white">600+</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-blue-500/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Context Info Box */}
          <AnimatePresence mode="wait">
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 backdrop-blur-md"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{selectedHotspot.label}</h4>
                    <p className="text-red-100/70 text-xs leading-relaxed">
                      {selectedHotspot.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* --- RIGHT: 3D Visualization Area --- */}
        <div className="flex-1 relative bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group">
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
          
          {/* Central Model Placeholder (Interactive) */}
          <div className="relative w-full h-full max-w-lg mx-auto flex items-center justify-center">
            
            {/* The "Model" - Using an Image for stability, simulating 3D */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-64 md:w-80 h-[500px]"
            >
               {/* Glowing Core */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[80px] rounded-full transition-colors duration-500 ${
                 activeSystem === 'muscular' ? 'bg-red-600/20' : 
                 activeSystem === 'nervous' ? 'bg-yellow-500/10' : 
                 'bg-blue-500/10'
               }`} />

               {/* Silhouette Image (Placeholder for real 3D) */}
               <img 
                 src="https://cdn-icons-png.flaticon.com/512/2867/2867570.png" // Abstract anatomy icon or real transparent PNG
                 alt="Anatomy Model"
                 className="w-full h-full object-contain relative z-10 drop-shadow-2xl opacity-80 invert"
                 style={{ filter: "invert(1) brightness(2) drop-shadow(0 0 20px rgba(255,255,255,0.2))" }} 
               />

               {/* Hotspots Layer */}
               <div className="absolute inset-0 z-20">
                 {hotspots.map((spot) => (
                   <button
                     key={spot.id}
                     onClick={() => setSelectedHotspot(spot)}
                     className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center group/spot cursor-pointer"
                     style={{ left: spot.x, top: spot.y }}
                   >
                     <span className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75" />
                     <span className="relative w-3 h-3 bg-white rounded-full border-2 border-red-500 shadow-lg group-hover/spot:scale-125 transition-transform" />
                     
                     {/* Tooltip */}
                     <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 opacity-0 group-hover/spot:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                       {spot.label}
                     </div>
                   </button>
                 ))}
               </div>
            </motion.div>

          </div>

          {/* Viewer Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
             <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
               <Layers size={20} />
             </button>
             <div className="w-px h-4 bg-white/20" />
             <Link to="/ar-learning/launch">
                <button className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-full shadow-lg shadow-red-900/30 transition-all hover:scale-105 cursor-pointer">
                  <Scan size={14} />
                  View in AR
                </button>
             </Link>
             <div className="w-px h-4 bg-white/20" />
             <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
               <Maximize size={20} />
             </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HumanAnatomy;