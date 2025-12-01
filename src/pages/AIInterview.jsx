import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Target, 
  Play 
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";
import MockInterviewModal from "../components/models/MockInterviewModal"; // Import the modal

const AIInterview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#2563eb" alpha={1} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Interview Preparation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            AI <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Mock Interviews</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Master your communication skills with real-time feedback. Our AI simulates real-world scenarios to help you land your dream job.
          </p>
        </motion.div>

        {/* --- Hero Card --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group"
        >
          {/* Subtle Glow Effect inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-500" />

          <div className="flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center relative z-10">
            
            {/* Left Side: Content */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Target className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Interview Prep, Candidate!
                </h2>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-xl">
                Practice with AI-powered mock interviews and boost your confidence for real interviews. Customizable by role, difficulty, and company.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  AI-Generated Questions
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Real-time Feedback
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Performance Analytics
                </div>
              </div>
            </div>

            {/* Right Side: CTA Button */}
            <div className="w-full lg:w-auto">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full lg:w-64 h-32 rounded-2xl border border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 flex flex-col items-center justify-center gap-3 group/btn cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <span className="block text-white font-semibold">Start New Interview</span>
                  <span className="text-xs text-gray-500">Create personalized mock interview</span>
                </div>
              </button>
            </div>

          </div>
        </motion.div>

        {/* --- History Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Your Interview History</h2>
            <p className="text-sm text-gray-400">Review your past interviews and track your progress.</p>
          </div>

          {/* Empty State Container */}
          <div className="w-full h-80 rounded-3xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
            <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No interviews yet</h3>
            <p className="text-gray-500 max-w-xs mb-6">
              Start your first mock interview to begin practicing and tracking your improvements.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Start Practice
            </button>
          </div>

        </motion.div>
      </div>

      {/* --- Modal --- */}
      <MockInterviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
};

export default AIInterview;