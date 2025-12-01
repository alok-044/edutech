import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import {
    BookOpen,
    Search,
    Brain,
    Plus,
    TrendingUp,
    User,
    Star,
    Target
} from 'lucide-react';
import ShaderBackground from '../components/bg/ShaderBackground';


const AIPath = () => {
    return (
        <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* --- Background --- */}
            <div className="fixed inset-0 z-0">
                <ShaderBackground color="#1e1b4b" alpha={0.2} /> {/* Dark Indigo tint */}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">

                {/* --- Header Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-[#050A1F] border border-white/10 rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden shadow-2xl shadow-blue-900/10"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[20px_20px] opacity-30 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-4 max-w-2xl">
                            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Discover Your Learning Path</h1>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                                Choose from curated learning paths or create your own custom journey to achieve your career goals.
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Badge icon={BookOpen} text="Personalized Learning" />
                                <Badge icon={Star} text="Expert Curated" />
                                <Badge icon={Target} text="Goal-Oriented" />
                            </div>
                        </div>

                        {/* Header Icon */}
                        <div className="hidden md:flex bg-[#0A1029] border border-white/10 p-6 rounded-2xl shadow-xl">
                            <BookOpen className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
                        </div>
                    </div>
                </motion.div>

                {/* --- Search Bar --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative max-w-xl mx-auto mb-16"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by learning path name..."
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all text-sm"
                    />
                </motion.div>

                {/* --- Cards Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* 1. Market-Aware Roadmap Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all cursor-pointer overflow-hidden"
                    >
                        {/* Background Gradient Hover */}
                        <div className="absolute inset-0 bg-linear-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* AI Tag */}
                        <div className="absolute top-6 right-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2D1B4E] text-purple-300 text-[10px] font-semibold uppercase tracking-wider rounded-lg border border-purple-500/30">
                                <SparklesIcon className="w-3 h-3" /> AI-Powered
                            </span>
                        </div>

                        <div className="flex flex-col items-center text-center mt-6 relative z-10">
                            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                                <Brain className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">Market-Aware Roadmap</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-xs">
                                Get a personalized path based on your profile & real-time job market trends for 2025-2030
                            </p>

                            <div className="flex gap-5 text-xs font-medium text-gray-500">
                                <span className="flex items-center gap-1.5 group-hover:text-purple-400 transition-colors">
                                    <TrendingUp className="w-3.5 h-3.5" /> Market Data
                                </span>
                                <span className="flex items-center gap-1.5 group-hover:text-blue-400 transition-colors">
                                    <User className="w-3.5 h-3.5" /> Personalized
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Create Custom Path Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group border border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/2 hover:border-white/20 transition-all cursor-pointer min-h-80"
                    >
                        <Link to="/ai-path/create" className="group border border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/2 hover:border-white/20 transition-all cursor-pointer min-h-80">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20 group-hover:bg-blue-500">
                                <Plus className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Create Custom Path</h3>
                            <p className="text-sm text-gray-500">Build your personalized learning journey</p>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const Badge = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1629] border border-blue-800/30 rounded-lg text-xs font-medium text-blue-200">
        <Icon className="w-3.5 h-3.5 text-blue-400" />
        {text}
    </div>
);

const SparklesIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export default AIPath;