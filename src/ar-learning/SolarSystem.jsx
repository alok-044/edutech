import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Maximize, 
  Scan, 
  Info,
  Globe,
  Orbit,
  Thermometer,
  Ruler
} from "lucide-react";
import Galaxy from "../components/bg/Galaxy";

const planets = [
  { 
    id: "sun", 
    name: "Sun", 
    type: "Star",
    desc: "The star at the center of our Solar System. It creates the energy that sustains life on Earth.",
    stats: { temp: "5,500°C", diameter: "1.39M km", orbit: "N/A" },
    color: "bg-yellow-500", 
    shadow: "shadow-yellow-500/50"
  },
  { 
    id: "mercury", 
    name: "Mercury", 
    type: "Terrestrial",
    desc: "The smallest planet in our solar system and closest to the Sun.",
    stats: { temp: "167°C", diameter: "4,880 km", orbit: "88 days" },
    color: "bg-gray-400", 
    shadow: "shadow-gray-400/50"
  },
  { 
    id: "venus", 
    name: "Venus", 
    type: "Terrestrial",
    desc: "Spinning in the opposite direction to most planets, Venus is the hottest planet.",
    stats: { temp: "464°C", diameter: "12,104 km", orbit: "225 days" },
    color: "bg-orange-300", 
    shadow: "shadow-orange-300/50"
  },
  { 
    id: "earth", 
    name: "Earth", 
    type: "Terrestrial",
    desc: "Our home planet, the only place we know of so far that's inhabited by living things.",
    stats: { temp: "15°C", diameter: "12,742 km", orbit: "365 days" },
    color: "bg-blue-500", 
    shadow: "shadow-blue-500/50"
  },
  { 
    id: "mars", 
    name: "Mars", 
    type: "Terrestrial",
    desc: "A dusty, cold, desert world with a very thin atmosphere.",
    stats: { temp: "-65°C", diameter: "6,779 km", orbit: "687 days" },
    color: "bg-red-500", 
    shadow: "shadow-red-500/50"
  },
  { 
    id: "jupiter", 
    name: "Jupiter", 
    type: "Gas Giant",
    desc: "More than twice as massive as all the other planets combined.",
    stats: { temp: "-110°C", diameter: "139,820 km", orbit: "12 years" },
    color: "bg-amber-700", 
    shadow: "shadow-amber-700/50"
  },
  { 
    id: "saturn", 
    name: "Saturn", 
    type: "Gas Giant",
    desc: "Adorned with a dazzling, complex system of icy rings.",
    stats: { temp: "-140°C", diameter: "116,460 km", orbit: "29 years" },
    color: "bg-yellow-200", 
    shadow: "shadow-yellow-200/50"
  },
];

const SolarSystem = () => {
  const [activePlanet, setActivePlanet] = useState(planets[3]); // Default to Earth

  return (
    <div className="min-h-screen w-full  bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Galaxy Background --- */}
      <div className="fixed inset-0 z-0">
        <Galaxy 
            starsSpeed={0.5} 
            density={1.5} 
            colors={[0.5, 0.7, 1.0]} // Cool blue tones
        />
      </div>

      {/* --- Navbar --- */}
      <div className="relative z-50 px-6 top-16 py-6 flex justify-between items-center max-w-8xl mx-auto">
        <Link 
          to="/ar-learning" 
          className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </Link>
        <div className="px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          Space Exploration
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* --- LEFT: Planet Selector --- */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4 order-2 lg:order-1 h-48 lg:h-auto overflow-y-auto lg:overflow-visible no-scrollbar">
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setActivePlanet(planet)}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group ${
                activePlanet.id === planet.id 
                  ? "bg-white/10 border-white/30 backdrop-blur-md" 
                  : "bg-black/40 border-white/5 hover:bg-white/5 hover:border-white/20"
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${planet.color} shadow-lg ${activePlanet.id === planet.id ? planet.shadow : ''} transition-all duration-500`} />
              <div className="text-left">
                <span className={`block font-bold ${activePlanet.id === planet.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {planet.name}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{planet.type}</span>
              </div>
            </button>
          ))}
        </div>

        {/* --- CENTER: Visualization --- */}
        <div className="flex-1 relative flex flex-col items-center justify-center order-1 lg:order-2">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={activePlanet.id}
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="relative"
                >
                    {/* Planet Glow */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[100px] opacity-30 ${activePlanet.color}`} />
                    
                    {/* The Planet (CSS representation) */}
                    <div className={`w-64 h-64 md:w-96 md:h-96 rounded-full ${activePlanet.color} shadow-[inset_-40px_-40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden`}>
                        {/* Texture overlay simulation */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 mix-blend-overlay" />
                        {activePlanet.id === 'saturn' && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] border-20 border-white/20 rounded-[50%] rotate-12 blur-sm" />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* AR Launch Button */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 z-20"
            >
                <Link to="/ar-learning/launch">
                    <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 cursor-pointer">
                        <Scan size={18} />
                        View {activePlanet.name} in Room
                    </button>
                </Link>
            </motion.div>
        </div>

        {/* --- RIGHT: Info Panel --- */}
        <div className="w-full lg:w-1/4 order-3 flex flex-col justify-center">
            <motion.div 
                key={activePlanet.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
            >
                <h2 className="text-4xl font-bold text-white mb-2">{activePlanet.name}</h2>
                <p className="text-blue-200 text-sm leading-relaxed mb-8">
                    {activePlanet.desc}
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                            <Thermometer size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Avg. Temp</p>
                            <p className="text-lg font-mono text-white">{activePlanet.stats.temp}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                            <Ruler size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Diameter</p>
                            <p className="text-lg font-mono text-white">{activePlanet.stats.diameter}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                            <Orbit size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Orbital Period</p>
                            <p className="text-lg font-mono text-white">{activePlanet.stats.orbit}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SolarSystem;