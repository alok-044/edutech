import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  UploadCloud, 
  Sparkles, 
  FileText, 
  Briefcase, 
  Building2, 
  AlignLeft, 
  Tag 
} from "lucide-react";
import ShaderBackground from "../components/ui/ShaderBackground";

const ImproveATSScore = () => {
  const [activeTab, setActiveTab] = useState("build");

  // Mock Data for Templates
  const templates = [
    { id: 1, name: "Professional Modern", category: "General", color: "bg-blue-500" },
    { id: 2, name: "Tech Minimalist", category: "Engineering", color: "bg-emerald-500" },
    { id: 3, name: "Creative Portfolio", category: "Design", color: "bg-purple-500" },
    { id: 4, name: "Executive Brief", category: "Management", color: "bg-orange-500" },
    { id: 5, name: "Academic CV", category: "Research", color: "bg-pink-500" },
    { id: 6, name: "Startup Founder", category: "Business", color: "bg-cyan-500" },
  ];

  return (
    <div className="top-11 min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#3b82f6" alpha={0.15} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Improve ATS Score</h1>
            <p className="text-gray-400 text-sm">
              AI-powered resume intelligence to help you land your dream job
            </p>
          </div>
          <Link 
            to="/ai-resume" 
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab("build")}
            className={`pb-3 text-sm font-medium flex items-center gap-2 transition-all relative ${
              activeTab === "build" ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Build Resume (AI-Powered)
            {activeTab === "build" && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab("templates")}
            className={`pb-3 text-sm font-medium flex items-center gap-2 transition-all relative ${
              activeTab === "templates" ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            See Templates
            {activeTab === "templates" && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "build" ? (
              <motion.div 
                key="build"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                
                {/* LEFT COLUMN: Upload Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8">
                    <h2 className="text-lg font-semibold text-white mb-1">Upload Your Resume</h2>
                    <p className="text-xs text-gray-500 mb-6">
                      Get personalized recommendations based on your resume and job description
                    </p>

                    {/* Form Fields */}
                    <div className="space-y-5">
                      
                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Resume File (PDF or DOCX)
                        </label>
                        <div className="relative group cursor-pointer">
                          <div className="absolute inset-0 bg-blue-500/5 rounded-xl transition-colors group-hover:bg-blue-500/10" />
                          <div className="relative border border-dashed border-white/20 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors group-hover:border-blue-500/30">
                            <div className="p-2 bg-[#1a1a1a] rounded-lg border border-white/10">
                              <UploadCloud className="w-4 h-4 text-gray-400" />
                            </div>
                            <span className="text-sm text-gray-400 font-medium">Choose File</span>
                            <span className="text-xs text-gray-600 ml-auto">No file chosen</span>
                          </div>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.docx,.doc" />
                        </div>
                      </div>

                      {/* Job Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Job Title (Optional)
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="e.g., Software Engineering Intern"
                            className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company Name (Optional)
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="e.g., Google, Microsoft"
                            className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Job Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Job Description <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                          <textarea 
                            rows={6}
                            placeholder="Paste the complete job description here..."
                            className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Keywords */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Additional Keywords (Optional)
                        </label>
                        <div className="relative">
                          <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="e.g., Machine Learning, React, Python (comma-separated)"
                            className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button className="w-full py-3 bg-blue-700/80 hover:bg-blue-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 mt-4 cursor-pointer">
                        <Sparkles className="w-4 h-4" />
                        Analyze Resume
                      </button>

                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: How It Works */}
                <div className="lg:col-span-1">
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 sticky top-24">
                    <h3 className="text-base font-semibold text-white mb-6">How It Works</h3>
                    
                    <div className="space-y-8 relative">
                      {/* Vertical Line */}
                      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-white/10" />

                      {/* Steps */}
                      {[
                        { title: "Upload Your Resume", desc: "Upload your current resume in PDF or DOCX format" },
                        { title: "Provide Job Details", desc: "Share the job description and any specific requirements" },
                        { title: "AI Analysis", desc: "Our AI analyzes your resume against the job requirements" },
                        { title: "Get Personalized Report", desc: "Receive detailed recommendations and download a PDF report" }
                      ].map((step, idx) => (
                        <div key={idx} className="relative flex gap-4">
                          <div className="relative z-10 w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0 text-xs font-bold text-blue-400 shadow-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white mb-1">{step.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div 
                key="templates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {templates.map((template) => (
                  <div key={template.id} className="group bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
                    
                    {/* Template Preview (Placeholder) */}
                    <div className="aspect-3/4 bg-[#111] relative overflow-hidden p-4">
                      {/* Abstract Resume Design Placeholder */}
                      <div className="w-full h-full bg-white/5 rounded-lg flex flex-col gap-3 p-4 opacity-50 group-hover:opacity-80 transition-opacity duration-500">
                         {/* Header Mockup */}
                         <div className="flex gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-full ${template.color} opacity-20`} />
                            <div className="flex-1 space-y-2">
                               <div className="h-2 w-3/4 bg-white/20 rounded" />
                               <div className="h-1.5 w-1/2 bg-white/10 rounded" />
                            </div>
                         </div>
                         {/* Body Mockup */}
                         <div className="space-y-2 flex-1">
                            <div className="h-1.5 w-full bg-white/5 rounded" />
                            <div className="h-1.5 w-5/6 bg-white/5 rounded" />
                            <div className="h-1.5 w-full bg-white/5 rounded" />
                            
                            <div className="h-16 w-full bg-white/5 rounded mt-4" />
                            <div className="h-16 w-full bg-white/5 rounded" />
                         </div>
                      </div>

                      {/* Overlay & Button */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg cursor-pointer flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Use Template
                        </button>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="p-5 border-t border-white/5 flex justify-between items-center bg-[#0f0f0f]">
                      <div>
                        <h3 className="text-white font-medium text-sm mb-0.5">{template.name}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{template.category}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500/50" title="ATS Compatible" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ImproveATSScore;