import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Video, 
  Plus, 
  Settings, 
  User, 
  Sparkles,
  Calendar,
  Users
} from "lucide-react";
import ShaderBackground from "../components/ui/ShaderBackground";
import CreateAgentModal from "../components/ui/CreateAgentModal";
import NewMeetingModal from "../components/ui/NewMeetingModal";

const AIMeeting = () => {
  const [activeTab, setActiveTab] = useState("agent"); // 'agent' or 'normal'
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#3b82f6" alpha={0.15} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-10 mb-10 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Bot className="w-6 h-6 text-blue-400" />
                  </div>
                  Welcome, there! 👋
                </h1>
                <p className="text-gray-400 max-w-2xl">
                  Start intelligent video meetings with AI agents. Perfect for tutoring, interviews, practice sessions, and more.
                </p>
              </div>
              <button 
                onClick={() => setIsAgentModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Create AI Agent
              </button>
            </div>

            {/* Getting Started Box */}
            <div className="bg-[#151515] border border-white/5 rounded-xl p-6">
              <h3 className="text-orange-400 font-medium mb-4 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" /> Getting Started:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-mono">1.</span>
                  Select an AI agent from below to start a meeting
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-mono">2.</span>
                  Or create a new agent customized for your needs
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-mono">3.</span>
                  Your meetings are automatically recorded for review
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* --- Tabs --- */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#0A0A0A] border border-white/10 p-1 rounded-xl flex">
            <button 
              onClick={() => setActiveTab("agent")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "agent" 
                  ? "bg-[#1a1a1a] text-white shadow-sm border border-white/5" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Bot className="w-4 h-4" />
              AI Agent Meetings
            </button>
            <button 
              onClick={() => setActiveTab("normal")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "normal" 
                  ? "bg-[#1a1a1a] text-white shadow-sm border border-white/5" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <User className="w-4 h-4" />
              Normal Meetings
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "agent" ? (
            <motion.div
              key="agent-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* --- Agents Section --- */}
              <div className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Your AI Agents</h2>
                    <p className="text-sm text-gray-400">Choose an agent below to start a meeting, or create a new one</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsMeetingModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-lg text-sm text-gray-300 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      New Meeting
                    </button>
                    <button 
                      onClick={() => setIsAgentModalOpen(true)} // Reusing Agent modal for "Manage" as requested
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-lg text-sm text-gray-300 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      Manage Agents
                    </button>
                  </div>
                </div>

                {/* Info Banner */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 mb-8 flex gap-4 items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                    <Bot className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">What are AI Agent Meetings?</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      AI Agent Meetings let you have video conversations with intelligent AI assistants. Perfect for mock interviews, language practice, tutoring, or getting help with any topic.
                    </p>
                  </div>
                </div>

                {/* Empty State: No Agents */}
                <div className="flex flex-col items-center justify-center py-16 border-b border-white/5">
                  <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                    <Bot className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No Agents Available</h3>
                  <p className="text-sm text-gray-500 mb-6">Create your first AI agent to get started</p>
                  <button 
                    onClick={() => setIsAgentModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Create Agent
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="normal-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-16">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Your Scheduled Meetings</h2>
                    <p className="text-sm text-gray-400">Manage your upcoming video calls with other people</p>
                  </div>
                  <button 
                    onClick={() => setIsMeetingModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Schedule Meeting
                  </button>
                </div>

                {/* Empty State: Normal Meetings */}
                <div className="w-full h-64 rounded-2xl border border-dashed border-white/10 bg-white/2 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-gray-500" />
                  </div>
                  <h3 className="text-base font-medium text-white mb-1">No Scheduled Meetings</h3>
                  <p className="text-xs text-gray-500">
                    Your upcoming normal video meetings will appear here
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Upcoming Meetings Section (Shared) --- */}
        <div className="pt-8 border-t border-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h2>
          
          <div className="w-full h-40 rounded-2xl border border-dashed border-white/10 bg-white/2 flex flex-col items-center justify-center text-center p-6">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <h3 className="text-sm font-medium text-white mb-1">No Upcoming Sessions</h3>
            <p className="text-xs text-gray-500">
              Your scheduled meetings (AI or Normal) will appear here
            </p>
          </div>
        </div>

      </div>

      {/* --- Modals --- */}
      <CreateAgentModal 
        isOpen={isAgentModalOpen} 
        onClose={() => setIsAgentModalOpen(false)} 
      />
      <NewMeetingModal 
        isOpen={isMeetingModalOpen} 
        onClose={() => setIsMeetingModalOpen(false)}
        type={activeTab} 
      />

    </div>
  );
};

export default AIMeeting;