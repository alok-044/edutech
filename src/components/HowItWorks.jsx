import React from "react";
import Spline from '@splinetool/react-spline';
import Galaxy from "./ui/Galaxy";
import RevealOnScroll from "./ui/RevealOnScroll";

const steps = [
  { 
    id: 1, 
    title: "Sign Up", 
    desc: "Create your free account to get started." 
  },
  { 
    id: 2, 
    title: "Explore Features", 
    desc: "Try AI courses, agent meetings, or build your resume." 
  },
  { 
    id: 3, 
    title: "Customize Your Journey", 
    desc: "Set your goals and let AI create personalized learning paths." 
  },
  { 
    id: 4, 
    title: "Start Learning", 
    desc: "Begin your journey with interactive courses and AI-powered assistance." 
  },
];

const StepCard = ({ step }) => (
  <RevealOnScroll 
    delay={step.id * 0.1}
    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-sm w-full hover:bg-white/10 transition-colors pointer-events-auto"
  >
    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
      {step.id}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      {step.desc}
    </p>
  </RevealOnScroll>
);

const HowItWorks = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* --- BACKGROUND GALAXY --- */}
      <div className="absolute inset-0 z-0">
         <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.3}
            saturation={0.8}
            hueShift={40}
         />
      </div>
      
      {/* --- TITLE --- */}
      <RevealOnScroll className="relative z-20 mb-12 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          How It Works
        </h2>
      </RevealOnScroll>

      {/* --- 3D SCENE LAYER (CENTERED) --- */}
      {/* REMOVED 'pointer-events-none' to enable cursor interaction */}
      <div className="absolute inset-0 z-0 top-0 left-0 w-full h-full">
         <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      </div>

      {/* --- CONTENT LAYER --- */}
      {/* pointer-events-none on the container allows clicks to pass through to the Spline, 
          while pointer-events-auto on StepCard ensures the cards themselves remain interactive */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-center">
          
          {/* LEFT COLUMN (Cards 1 & 2) */}
          <div className="flex flex-col gap-8 items-center lg:items-start justify-center">
             <StepCard step={steps[0]} />
             <StepCard step={steps[1]} />
          </div>

          {/* MIDDLE COLUMN (Spacer for 3D Model) */}
          <div className="hidden lg:block h-96 w-full" />

          {/* RIGHT COLUMN (Cards 3 & 4) */}
          <div className="flex flex-col gap-8 items-center lg:items-end justify-center">
             <StepCard step={steps[2]} />
             <StepCard step={steps[3]} />
          </div>

        </div>
      </div>

      {/* Mobile background gradient to ensure text readability if model overlaps */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black pointer-events-none opacity-50 lg:hidden" />
      
    </section>
  );
};

export default HowItWorks;