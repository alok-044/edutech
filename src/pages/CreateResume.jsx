import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  Save,
  CheckCircle2
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Experience", icon: Briefcase },
  { id: 3, title: "Education", icon: GraduationCap },
  { id: 4, title: "Skills", icon: Award },
  { id: 5, title: "Summary", icon: Sparkles },
];

const CreateResume = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", linkedin: "",
    jobTitle: "", company: "", expDuration: "", expDesc: "",
    degree: "", school: "", gradYear: "",
    skills: "", summary: ""
  });

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <input type="email" placeholder="john.doe@example.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">LinkedIn URL</label>
                <input type="url" placeholder="linkedin.com/in/johndoe" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Most Recent Job Title</label>
              <input type="text" placeholder="Senior Software Engineer" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Company</label>
                <input type="text" placeholder="Tech Corp Inc." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Duration</label>
                <input type="text" placeholder="Jan 2020 - Present" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Description</label>
                <button className="text-xs text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors">
                  <Sparkles size={12} /> Auto-Generate
                </button>
              </div>
              <textarea rows={5} placeholder="Describe your responsibilities and achievements..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Degree / Certification</label>
              <input type="text" placeholder="Bachelor of Science in Computer Science" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">School / University</label>
                <input type="text" placeholder="University of Technology" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Graduation Year</label>
                <input type="text" placeholder="2019" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Technical Skills</label>
                <span className="text-xs text-gray-500">Comma separated</span>
              </div>
              <input type="text" placeholder="React, Node.js, Python, AWS..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Sparkles size={14} /> AI Suggested Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'Tailwind CSS', 'GraphQL', 'Docker', 'Agile'].map(skill => (
                  <button key={skill} className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs rounded-full transition-colors border border-blue-500/30">
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Professional Summary</label>
              <p className="text-xs text-gray-500 mb-2">
                Let our AI write a compelling summary based on the details you've provided.
              </p>
              <textarea rows={6} placeholder="Experienced Software Engineer with a proven track record..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
            </div>
            <button className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2">
              <Sparkles size={16} /> Generate with AI
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen top-12 w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#2563eb" alpha={0.5} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/ai-resume" 
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="text-right">
            <h1 className="text-xl font-bold text-white">Create Resume</h1>
            <p className="text-xs text-gray-400">Step {currentStep} of {steps.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Form Container */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Sidebar / Topbar for Steps */}
          <div className="bg-[#111] border-b border-white/10 p-4 md:p-6 overflow-x-auto">
            <div className="flex md:justify-between items-center gap-4 min-w-max">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                      ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                        isCompleted ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                        'bg-white/5 text-gray-500 border border-white/10'}
                    `}>
                      {isCompleted ? <CheckCircle2 size={14} /> : <step.icon size={14} />}
                    </div>
                    <span className={`text-sm font-medium hidden md:block ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                    {step.id !== steps.length && (
                      <div className="w-8 h-px bg-white/10 hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="p-6 md:p-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  {React.createElement(steps[currentStep-1].icon, { className: "text-blue-500" })}
                  {steps[currentStep-1].title}
                </h2>
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-[#111] border-t border-white/10 flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-colors
                ${currentStep === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-white/5'}
              `}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {currentStep === steps.length ? (
              <button className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-green-500/20 transition-all cursor-pointer">
                <Save size={16} /> Save & Finish
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                Next Step <ChevronRight size={16} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateResume;