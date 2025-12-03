import React from "react";
import { MorphingCard } from "./MorphingCard";
import { Brain, Cpu, Map, Zap, Award, ChevronRight } from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const DEMO_CARDS = [
  {
    id: "1",
    title: "AI Fundamentals",
    description: "Master the core concepts of Artificial Intelligence, from neural networks to decision trees.",
    icon: <Brain className="w-6 h-6" />,
    color: "#312e81", // Indigo 900
  },
  {
    id: "2",
    title: "Machine Learning",
    description: "Build predictive models and train intelligent systems using Python and TensorFlow.",
    icon: <Cpu className="w-6 h-6" />,
    color: "#4338ca", // Indigo 700
  },
  {
    id: "3",
    title: "Generative AI",
    description: "Explore the cutting edge of GenAI, LLMs, and prompt engineering strategies.",
    icon: <Zap className="w-6 h-6" />,
    color: "#4f46e5", // Indigo 600
  },
  {
    id: "4",
    title: "Career Roadmaps",
    description: "Follow structured, industry-vetted paths to go from beginner to hired professional.",
    icon: <Map className="w-6 h-6" />,
    color: "#6366f1", // Indigo 500
  },
  {
    id: "5",
    title: "Certifications",
    description: "Earn recognized credentials to validate your skills and boost your LinkedIn profile.",
    icon: <Award className="w-6 h-6" />,
    color: "#818cf8", // Indigo 400
  },
];

export default function MorphingDemo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 sm:p-12 relative overflow-hidden font-sans">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShaderBackground color="#4f46e5" alpha={0.2} />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Side */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Featured Courses
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Explore <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              Future Skills
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Swipe through our most popular learning tracks. From foundational AI to advanced neural architectures, find the perfect path for your career.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
             <button className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer">
               View All Courses <ChevronRight size={18} />
             </button>
             <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer">
               Start Free Trial
             </button>
          </div>
        </div>

        {/* Demo Side */}
        <div className="flex-1 w-full max-w-lg lg:max-w-full flex justify-center perspective-[1000px]">
           <div className="relative w-full max-w-[480px]">
             {/* Decorative blob behind cards */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
             
             <MorphingCard 
               cards={DEMO_CARDS} 
               autoPlay={true}
               interval={3500}
               className="relative z-10"
             />
           </div>
        </div>

      </div>
    </div>
  );
}