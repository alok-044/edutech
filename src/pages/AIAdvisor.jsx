import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  DollarSign, 
  Briefcase, 
  ArrowRight,
  MessageSquare
} from "lucide-react";
import ShaderBackground from "../components/ui/ShaderBackground";

const AIAdvisor = () => {
  const [query, setQuery] = useState("");

  const suggestions = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      desc: "Identify the next best step for your career path.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      icon: FileText,
      title: "Resume Review",
      desc: "Get instant feedback on your current resume.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      icon: DollarSign,
      title: "Salary Negotiation",
      desc: "Learn strategies to negotiate your offer.",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    },
    {
      icon: Briefcase,
      title: "Job Search Strategy",
      desc: "Optimize your job hunt with AI insights.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#06b6d4" alpha={0.15} /> {/* Cyan tint */}
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-xl mb-6 group">
            <Bot className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            AI Career <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Advisor</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your personal strategist for career growth, skill development, and professional success. Ask me anything.
          </p>
        </motion.div>

        {/* --- Chat Input Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative max-w-3xl mx-auto mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#0A0A0A] rounded-2xl border border-white/10 flex items-center p-2 shadow-2xl">
              <div className="p-3">
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask for advice, e.g., 'How do I transition to Product Management?'"
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-base px-2 py-3 focus:outline-none"
              />
              <button className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/20 cursor-pointer">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- Suggestions Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-16">
          {suggestions.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`group flex items-start gap-4 p-6 rounded-2xl border ${item.border} bg-[#0A0A0A] hover:bg-[#111] transition-all text-left relative overflow-hidden cursor-pointer`}
            >
              <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
              <ArrowRight className="absolute top-6 right-6 w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>

        {/* --- Recent History (Mock) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" /> Recent Conversations
          </div>
          
          <div className="space-y-3">
            {[
              "How to improve leadership skills for a senior role?",
              "What are the top certifications for Cloud Architecture in 2025?",
              "Draft a follow-up email for a job interview at Google."
            ].map((topic, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0A0A0A]/50 hover:bg-[#0A0A0A] hover:border-white/10 transition-colors cursor-pointer group">
                <span className="text-gray-300 group-hover:text-white transition-colors">{topic}</span>
                <span className="text-xs text-gray-600 group-hover:text-gray-400">2 days ago</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AIAdvisor;