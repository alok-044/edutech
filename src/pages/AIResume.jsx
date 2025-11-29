import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FileText,
    MessageSquare,
    Sparkles,
    Trash2,
    Plus,
    RefreshCw
} from "lucide-react";
import ShaderBackground from "../components/ui/ShaderBackground";
import ChatAssistant from "../components/ui/ChatAssistant";

const AIResume = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">

            {/* --- Background --- */}
            <div className="fixed inset-0 z-0">
                <ShaderBackground color="#8b5cf6" alpha={0.2} />
            </div>

            {/* --- Main Content --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">

                {/* --- Header Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-10 mb-16 relative overflow-hidden"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                        {/* Text Content */}
                        <div className="space-y-4 max-w-2xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <FileText className="w-6 h-6 text-blue-400" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">
                                    Welcome back, Professional!
                                </h1>
                            </div>

                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Create stunning, AI-powered resumes that help you stand out from the crowd.
                            </p>

                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AI-Enhanced Content
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Professional Templates
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Export Ready
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Chat Assistant
                            </button>

                            <Link to="/ai-resume/ats-score">
                                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 transition-all cursor-pointer w-full h-14 sm:w-auto">
                                    <Sparkles className="w-4 h-4" />
                                    Improve ATS Score
                                </button>
                            </Link>

                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-xl text-xs text-gray-400 transition-colors cursor-pointer sm:w-auto w-full lg:mt-4 lg:self-end">
                                <Trash2 className="w-3.5 h-3.5" />
                                All Trash
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* --- Your Resumes Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16"
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">Your Resumes</h2>
                        <p className="text-sm text-gray-400 mt-1">Create and manage your professional resumes</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Card 1: Create New - Fixed: Removed wrapping button */}
                        <Link 
                            to="/ai-resume/create" 
                            className="group h-80 rounded-2xl border border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                                <Plus className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-center px-4">
                                <span className="block text-white font-semibold mb-1">Create New Resume</span>
                                <span className="text-xs text-gray-500 block">Start with a blank template and build your professional resume</span>
                            </div>
                        </Link>

                        {/* Skeleton Loaders */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-80 bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 flex flex-col">
                                <div className="flex-1 bg-white/5 rounded-xl w-full mb-4 animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                                    <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* --- Your ATS Reports Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">Your ATS Reports</h2>
                        <p className="text-sm text-gray-400 mt-1">View and manage your resume analysis reports</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Card 1: New Analysis */}
                        <Link to="/ai-resume/ats-score" className="group h-64 rounded-2xl border border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-center px-6">
                                <span className="block text-white font-semibold mb-1">New ATS Analysis</span>
                                <span className="text-xs text-gray-500 block">Analyze your resume and improve your ATS score</span>
                            </div>
                        </Link>

                        {/* Card 2: Error State */}
                        <div className="h-64 bg-[#0f0f0f] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3">
                                <RefreshCw className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-white font-medium mb-1">Failed to load</h3>
                            <p className="text-xs text-gray-500 mb-4 max-w-[150px]">
                                There was an error loading your ATS reports
                            </p>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                                <RefreshCw className="w-3 h-3" />
                                Try Again
                            </button>
                        </div>

                    </div>
                </motion.div>

                {/* --- Chat Assistant Widget --- */}
                <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            </div>
        </div>
    );
};

export default AIResume;