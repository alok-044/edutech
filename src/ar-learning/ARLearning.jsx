import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Box, 
  Layers, 
  Maximize, 
  Zap, 
  Globe, 
  Cpu, 
  ArrowRight, 
  Scan, 
  Users, 
  MonitorPlay,
  LogOut // Added Icon
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const arModules = [
  {
    id: 1,
    title: "Human Anatomy 3D",
    category: "Biology",
    desc: "Explore the human body systems in interactive 3D with layer-by-layer visibility.",
    icon: Box,
    color: "text-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/10",
    link: "/ar-learning/anatomy"
  },
  {
    id: 2,
    title: "Solar System Explorer",
    category: "Astronomy",
    desc: "Walk through the planets, visualize orbits, and scale the universe in your room.",
    icon: Globe,
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/10",
    link: "/ar-learning/solar-system"
  },
  {
    id: 3,
    title: "Molecular Chemistry",
    category: "Chemistry",
    desc: "Visualize chemical bonds, atomic structures, and reactions up close.",
    icon: Layers,
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
    link: "/ar-learning/chemistry"
  },
  {
    id: 4,
    title: "Physics Lab: Forces",
    category: "Physics",
    desc: "Simulate gravity, friction, and collisions in real-time on any flat surface.",
    icon: Zap,
    color: "text-yellow-400",
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/10",
    link: "/ar-learning/physics"
  },
  {
    id: 5,
    title: "Ancient History Portal",
    category: "History",
    desc: "Step into 360° portals of ancient Rome, Egypt, and Greece.",
    icon: Maximize,
    color: "text-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-500/10",
    link: "/ar-learning/history"
  },
  {
    id: 6,
    title: "Circuit Builder",
    category: "Electronics",
    desc: "Design, build, and test electronic circuits virtually on your desk.",
    icon: Cpu,
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/10",
    link: "/ar-learning/circuits"
  }
];

const ARLearning = () => {
  const [isCampusOpen, setIsCampusOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#a855f7" alpha={0.15} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Immersive Education
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Augmented Reality <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Learning Hub</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Bring learning to life. Visualize complex concepts, interact with 3D models, and transform your environment into an infinite classroom.
          </p>
        </motion.div>

        {/* --- 1. Immersive Virtual Campus Section --- */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full mb-20"
        >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 relative group">
                
                {/* Header Bar */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-start pointer-events-none bg-linear-to-b from-black/80 to-transparent">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Users className="w-6 h-6 text-green-400" />
                            Virtual Campus
                        </h2>
                        <p className="text-sm text-gray-300 mt-1 max-w-md">
                            Join live lectures and meet peers in our persistent metaverse space.
                        </p>
                    </div>
                    
                    {/* Controls (Disconnect / Fullscreen) */}
                    {isCampusOpen && (
                        <div className="flex gap-2 pointer-events-auto">
                            <button
                                onClick={() => setIsCampusOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-md border border-red-500/20 rounded-lg text-xs font-bold text-red-200 transition-colors cursor-pointer"
                            >
                                <LogOut size={14} /> Disconnect
                            </button>
                            <a 
                                href="https://framevr.io/edifyai" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
                            >
                                <Maximize size={14} /> Fullscreen
                            </a>
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="w-full h-[600px] relative bg-[#111]">
                    <AnimatePresence mode="wait">
                        {!isCampusOpen ? (
                            <motion.div 
                                key="cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
                            >
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                                
                                <div className="relative z-10 text-center px-4">
                                    <div className="w-20 h-20 rounded-2xl bg-purple-600/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse">
                                        <MonitorPlay className="w-10 h-10 text-purple-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Enter the Metaverse</h3>
                                    <p className="text-gray-300 max-w-lg mx-auto mb-8">
                                        Collaborate with students worldwide in a shared 3D environment. 
                                        Accessible directly from your browser.
                                    </p>
                                    <button 
                                        onClick={() => setIsCampusOpen(true)}
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all cursor-pointer shadow-xl shadow-purple-500/20"
                                    >
                                        Connect to Campus
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.iframe
                                key="frame"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src="https://framevr.io/edifyai"
                                className="w-full h-full border-0"
                                allow="camera; microphone; display-capture; xr-spatial-tracking"
                                title="Edify AI Virtual Campus"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>

        {/* --- 2. Hero Feature Card (WebAR) --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Scan className="w-6 h-6 text-purple-400" />
                         </div>
                         <h2 className="text-2xl md:text-3xl font-bold text-white">Edify Vision AR</h2>
                    </div>
                    
                    <p className="text-gray-400 leading-relaxed text-lg">
                        Our flagship AR experience lets you scan textbook diagrams to see them animate in 3D space. 
                        Compatible with most modern smartphones and tablets without installing extra apps.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link 
                            to="/ar-learning/launch"
                            className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                        >
                            <Smartphone size={20} />
                            Launch WebAR
                        </Link>
                        
                        <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer">
                            View Demo Video
                        </button>
                    </div>
                </div>
                
                {/* Visual Placeholder for AR Preview */}
                <div className="w-full md:w-1/3 aspect-square bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-purple-500/30 transition-colors">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-50" />
                     
                     <motion.div 
                        animate={{ rotateY: 360, rotateX: 360, y: [0, -10, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="relative"
                     >
                        <Box size={80} className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                     </motion.div>
                     
                     <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="text-[10px] text-purple-400 font-mono bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                            AR_PREVIEW_MODE_ACTIVE
                        </span>
                     </div>
                </div>
            </div>
        </motion.div>

        {/* --- 3. Modules Grid --- */}
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Available AR Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {arModules.map((module, index) => {
                    const CardContent = (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="group bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 cursor-pointer relative overflow-hidden h-full flex flex-col justify-between"
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${module.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl bg-[#151515] border border-white/5 group-hover:border-white/10 transition-colors ${module.color}`}>
                                        <module.icon size={24} />
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-md border ${module.border} ${module.bg} text-[10px] font-bold uppercase tracking-wider ${module.color}`}>
                                        {module.category}
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    {module.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                                    {module.desc}
                                </p>
                                
                                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all mt-auto">
                                    Start Module <ArrowRight size={16} className={`${module.color}`} />
                                </div>
                            </div>
                        </motion.div>
                    );

                    return module.link ? (
                        <Link to={module.link} key={module.id} className="block h-full">
                            {CardContent}
                        </Link>
                    ) : (
                        <div key={module.id} className="h-full">{CardContent}</div>
                    );
                })}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ARLearning;