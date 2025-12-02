import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Cpu, 
  Zap, 
  Battery, 
  Lightbulb, 
  Scan, 
  Play, 
  RotateCcw, 
  Settings,
  Plus,
  Minus
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const components = [
  { id: "resistor", name: "Resistor", icon: Minus, color: "text-blue-400", bg: "bg-blue-500/20" },
  { id: "led", name: "LED Light", icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/20" },
  { id: "battery", name: "9V Battery", icon: Battery, color: "text-green-400", bg: "bg-green-500/20" },
  { id: "chip", name: "Microchip", icon: Cpu, color: "text-purple-400", bg: "bg-purple-500/20" },
  { id: "switch", name: "Switch", icon: Zap, color: "text-red-400", bg: "bg-red-500/20" },
];

const CircuitBuilder = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [voltage, setVoltage] = useState(5.0);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#a855f7" alpha={0.15} />
      </div>

      {/* --- Navbar --- */}
      <div className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/ar-learning" 
          className="flex items-center gap-2 text-sm text-purple-200/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Link>
        <div className="px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          Virtual Breadboard
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* --- LEFT: Component Toolbox --- */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Toolbox</h2>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {components.map((comp) => (
                <button
                  key={comp.id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-[#111] hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className={`p-2 rounded-lg ${comp.bg} ${comp.color} group-hover:scale-110 transition-transform`}>
                    <comp.icon size={20} />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">{comp.name}</span>
                  <div className="ml-auto">
                    <Plus size={16} className="text-gray-600 group-hover:text-purple-400" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
               <div className="flex justify-between items-center text-xs text-gray-400 font-medium uppercase tracking-wider">
                  <span>Input Voltage</span>
                  <span className="text-purple-400">{voltage.toFixed(1)}V</span>
               </div>
               <input 
                  type="range" 
                  min="0" max="12" step="0.5"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
               />
            </div>
          </div>
        </div>

        {/* --- CENTER: Breadboard Workspace --- */}
        <div className="flex-1 relative bg-[#151515] rounded-3xl border border-white/10 overflow-hidden shadow-2xl order-1 lg:order-2 flex flex-col">
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[20px_20px] opacity-20 pointer-events-none" />
            
            {/* Simulation Area (Mock Visual) */}
            <div className="flex-1 relative flex items-center justify-center">
                
                {/* Board */}
                <div className="relative w-3/4 aspect-video bg-[#222] rounded-xl border-4 border-[#333] shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Circuit Traces */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Animated Current Path */}
                        {isSimulating && (
                            <motion.path 
                                d="M 100 200 L 200 200 L 200 100 L 400 100 L 400 300 L 100 300 Z"
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        )}
                    </svg>

                    {/* Components placed on board (Static representation) */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                        <Battery size={48} className={`text-green-500 ${isSimulating ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] text-gray-500 mt-2">Power Source</span>
                    </div>

                    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
                        <Lightbulb size={48} className={`${isSimulating ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]' : 'text-gray-600'}`} />
                        <span className="text-[10px] text-gray-500 mt-2">Output</span>
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md">
                        <span className={`font-mono text-xl font-bold ${isSimulating ? 'text-purple-400' : 'text-gray-500'}`}>
                            {isSimulating ? `${voltage.toFixed(1)}V` : "OFF"}
                        </span>
                    </div>
                </div>

                {/* AR Launch Overlay Button */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <Link to="/ar-learning/launch">
                        <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all cursor-pointer">
                            <Scan size={18} />
                            Project Circuit in AR
                        </button>
                    </Link>
                </div>

            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-[#111] border-t border-white/10 p-4 flex justify-center gap-4">
                <button 
                    onClick={() => setIsSimulating(!isSimulating)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                        isSimulating 
                            ? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30" 
                            : "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20"
                    }`}
                >
                    {isSimulating ? "Stop Simulation" : "Power On"} 
                    {isSimulating ? <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> : <Play size={16} fill="currentColor" />}
                </button>

                <button 
                    onClick={() => { setIsSimulating(false); setVoltage(5.0); }}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

        </div>

      </div>
    </div>
  );
};

export default CircuitBuilder;