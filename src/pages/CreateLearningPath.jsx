import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  X, 
  Sparkles, 
  Map, 
  BookOpen, 
  Zap, 
  ListOrdered 
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const CreateLearningPath = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#a855f7" alpha={0.15} /> {/* Purple tint */}
      </div>

      {/* --- Navigation Bar --- */}
      <div className="relative z-50 top-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <Link 
          to="/ai-path" 
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to learning paths
        </Link>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-3xl mx-auto top-10 px-6 pb-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Create Custom Learning Path
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Describe your desired career path and we'll generate a personalized learning journey for you.
          </p>
        </div>

        {/* --- Form Card --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl"
        >
          {/* Card Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Map className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Path Details</h2>
              <p className="text-xs text-gray-500">Provide details about your career goals to create a tailored experience.</p>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Career Title</label>
              <input 
                type="text" 
                placeholder="e.g., Machine Learning Engineer, Data Scientist, Frontend Developer" 
                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Career Description & Goals</label>
              <textarea 
                rows={5}
                placeholder="Describe your career goals, specific areas you'd like to focus on, current skill level, and any particular technologies or domains you're interested in..." 
                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm resize-none"
              />
            </div>

            <button className="w-full py-3.5 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer">
              <Sparkles className="w-4 h-4" />
              Generate Learning Path
            </button>
          </div>
        </motion.div>

        {/* --- Feature Cards (Bottom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard 
            icon={BookOpen} 
            title="Personalized Content" 
            desc="Tailored to your specific career goals"
          />
          <FeatureCard 
            icon={Zap} 
            title="AI-Powered" 
            desc="Generated using advanced AI technology"
          />
          <FeatureCard 
            icon={ListOrdered} 
            title="Step-by-Step" 
            desc="Clear progression with milestones"
          />
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 text-center hover:bg-white/2 transition-colors">
    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
      <Icon className="w-5 h-5 text-purple-400" />
    </div>
    <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
    <p className="text-[11px] text-gray-500">{desc}</p>
  </div>
);

export default CreateLearningPath;