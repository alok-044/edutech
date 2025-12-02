import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Maximize, 
  Scan, 
  Landmark, 
  Hourglass, 
  Map, 
  Scroll,
  Compass
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const sites = [
  {
    id: "colosseum",
    name: "The Colosseum",
    location: "Rome, Italy",
    year: "80 AD",
    desc: "The largest amphitheatre ever built. Walk through the gladiator gates and see the arena as it stood during the height of the Roman Empire.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    accent: "#fb923c" // orange-400
  },
  {
    id: "pyramids",
    name: "Great Pyramid",
    location: "Giza, Egypt",
    year: "2560 BC",
    desc: "The oldest of the Seven Wonders of the Ancient World. Explore the internal chambers and decipher hieroglyphics on the walls.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    accent: "#facc15" // yellow-400
  },
  {
    id: "parthenon",
    name: "The Parthenon",
    location: "Athens, Greece",
    year: "432 BC",
    desc: "A temple dedicated to the goddess Athena. Observe the intricate friezes and the massive gold and ivory statue within.",
    color: "text-blue-300",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    accent: "#93c5fd" // blue-300
  },
  {
    id: "petra",
    name: "The Treasury",
    location: "Ma'an, Jordan",
    year: "1st Century AD",
    desc: "Al-Khazneh, carved directly into the sandstone rock face. Discover the engineering marvels of the Nabataeans.",
    color: "text-red-300",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    accent: "#fca5a5" // red-300
  }
];

const AncientHistory = () => {
  const [activeSite, setActiveSite] = useState(sites[0]);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-orange-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#c2410c" alpha={0.15} /> {/* Dark Orange/Rust */}
      </div>

      {/* --- Navbar --- */}
      <div className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/ar-learning" 
          className="flex items-center gap-2 text-sm text-orange-200/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Link>
        <div className="px-3 py-1 rounded-full bg-orange-900/20 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          Chrono-Visor v2.4
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* --- LEFT: Site Selector --- */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4 order-2 lg:order-1">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-sm h-full">
            <div className="flex items-center gap-3 mb-6">
              <Scroll className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-bold text-white">Select Era</h2>
            </div>

            <div className="space-y-3">
              {sites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setActiveSite(site)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${
                    activeSite.id === site.id 
                      ? `bg-white/10 ${site.border} shadow-lg` 
                      : "bg-[#111] border-white/5 hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold text-sm ${activeSite.id === site.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {site.name}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded bg-black/30 ${site.color}`}>
                        {site.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <Map size={10} />
                    {site.location}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- CENTER: Portal Visualization --- */}
        <div className="flex-1 relative bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl order-1 lg:order-2 flex flex-col items-center justify-center">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
            <div className={`absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80`} />

            {/* Portal Effect */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                
                {/* Rotating Rings */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-0 border border-dashed rounded-full opacity-30 ${activeSite.color.replace('text-', 'border-')}`}
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-8 border border-dotted rounded-full opacity-40 ${activeSite.color.replace('text-', 'border-')}`}
                />
                
                {/* Portal Window (Inner) */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSite.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    >
                        {/* Placeholder for 3D View/Image */}
                        <div className={`w-full h-full ${activeSite.bg} flex items-center justify-center relative`}>
                            <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent" />
                            <Landmark size={64} className={`${activeSite.color} drop-shadow-lg`} strokeWidth={1} />
                            
                            {/* Scanning Line Effect */}
                            <motion.div 
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className={`absolute left-0 right-0 h-1 bg-white/20 shadow-[0_0_10px_white]`}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Particles/Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl opacity-20 pointer-events-none rounded-full ${activeSite.bg.replace('/10', '/50')}`} />
            </div>

            {/* AR Launch Button */}
            <div className="absolute bottom-10 z-20">
                <Link to="/ar-learning/launch">
                    <button className={`flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 cursor-pointer`}>
                        <Scan size={18} />
                        Step Through Portal
                    </button>
                </Link>
            </div>
        </div>

        {/* --- RIGHT: Info Panel --- */}
        <div className="w-full lg:w-1/4 order-3 flex flex-col">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 h-full flex flex-col justify-center relative overflow-hidden">
                {/* Decorative BG Icon */}
                <Hourglass className="absolute -right-6 -bottom-6 w-40 h-40 text-white/5 rotate-12" />

                <motion.div 
                    key={activeSite.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Compass className={`w-4 h-4 ${activeSite.color}`} />
                        <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Historical Data</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                        {activeSite.name}
                    </h1>
                    
                    <div className="w-12 h-1 bg-white/20 rounded-full mb-6" />

                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        {activeSite.desc}
                    </p>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <h3 className="text-xs font-bold text-white mb-2 uppercase">Artifacts to find:</h3>
                        <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                            <li>Structural Ruins</li>
                            <li>Pottery Shards</li>
                            <li>Hidden Inscriptions</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AncientHistory;