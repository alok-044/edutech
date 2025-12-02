import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Atom, 
  FlaskConical, 
  Scan, 
  Info, 
  Layers, 
  Search,
  Microscope
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const molecules = [
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    type: "Polar Covalent",
    desc: "The essence of life. A polar inorganic compound that is at room temperature a tasteless and odorless liquid.",
    structure: { center: "O", orbital: ["H", "H"], color: "bg-blue-500", atomColor: "bg-blue-400" }
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    type: "Nonpolar Covalent",
    desc: "The simplest alkane and the main constituent of natural gas. A potent greenhouse gas.",
    structure: { center: "C", orbital: ["H", "H", "H", "H"], color: "bg-emerald-500", atomColor: "bg-emerald-400" }
  },
  {
    id: "co2",
    name: "Carbon Dioxide",
    formula: "CO₂",
    type: "Covalent",
    desc: "A colorless gas with a density about 53% higher than that of dry air. Key to the greenhouse effect.",
    structure: { center: "C", orbital: ["O", "O"], color: "bg-gray-500", atomColor: "bg-gray-400" }
  },
  {
    id: "c8h10n4o2",
    name: "Caffeine",
    formula: "C₈H₁₀N₄O₂",
    type: "Alkaloid",
    desc: "A central nervous system stimulant of the methylxanthine class. It is the world's most widely consumed psychoactive drug.",
    structure: { center: "N", orbital: ["C", "O", "C", "H"], color: "bg-orange-500", atomColor: "bg-orange-400" }
  }
];

const MolecularChemistry = () => {
  const [activeMolecule, setActiveMolecule] = useState(molecules[0]);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#10b981" alpha={0.15} />
      </div>

      {/* --- Navbar --- */}
      <div className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link 
          to="/ar-learning" 
          className="flex items-center gap-2 text-sm text-emerald-200/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Link>
        <div className="px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          Molecular Lab
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* --- LEFT: Selector Panel --- */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Select Compound</h2>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {molecules.map((mol) => (
                <button
                  key={mol.id}
                  onClick={() => setActiveMolecule(mol)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group ${
                    activeMolecule.id === mol.id 
                      ? "bg-white/10 border-white/30 backdrop-blur-md shadow-lg" 
                      : "bg-[#111] border-white/5 hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="text-left">
                    <span className={`block font-bold text-sm ${activeMolecule.id === mol.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {mol.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{mol.formula}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${activeMolecule.id === mol.id ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-500'}`}>
                    {mol.formula.substring(0,1)}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
                <button className="w-full py-3 bg-[#151515] hover:bg-[#202020] border border-white/10 rounded-xl text-xs font-medium text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Search size={14} /> Browse Database
                </button>
            </div>
          </div>
        </div>

        {/* --- CENTER: Visualization Viewport --- */}
        <div className="flex-1 relative bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl order-1 lg:order-2 flex flex-col">
            
            {/* 3D Viewport Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent opacity-50" />
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeMolecule.id}
                        initial={{ scale: 0.8, opacity: 0, rotate: 90 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.8, opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="relative z-10 w-64 h-64 flex items-center justify-center perspective-1000"
                    >
                        {/* Central Atom */}
                        <div className={`w-24 h-24 rounded-full ${activeMolecule.structure.color} shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center text-2xl font-bold text-black relative z-20`}>
                            {activeMolecule.structure.center}
                        </div>

                        {/* Orbiting Atoms (Simulated 3D) */}
                        {activeMolecule.structure.orbital.map((atom, i) => {
                            const angle = (i / activeMolecule.structure.orbital.length) * 360;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ rotate: angle }}
                                    animate={{ rotate: angle + 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-full h-full"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex flex-col items-center gap-2">
                                        <div className={`w-12 h-12 rounded-full ${activeMolecule.structure.atomColor} border-4 border-black flex items-center justify-center text-sm font-bold text-black shadow-lg`}>
                                            {atom}
                                        </div>
                                        {/* Bond Line */}
                                        <div className="w-1 h-12 bg-white/20 -mt-2 -z-10" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* AR Floating Button */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                    <Link to="/ar-learning/launch">
                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105 transition-all cursor-pointer">
                            <Scan size={18} />
                            View Structure in AR
                        </button>
                    </Link>
                </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-[#0A0A0A] border-t border-white/10 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                        {activeMolecule.name}
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-gray-400 font-normal uppercase tracking-wider">{activeMolecule.type}</span>
                    </h3>
                    <p className="text-emerald-100/60 text-sm max-w-xl leading-relaxed">
                        {activeMolecule.desc}
                    </p>
                </div>
                
                <div className="flex gap-4 shrink-0">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Atom size={20} />
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase">Atomic</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <Microscope size={20} />
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase">Inspect</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <Layers size={20} />
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase">Bonds</span>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default MolecularChemistry;