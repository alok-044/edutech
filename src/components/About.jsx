import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Brain, Rocket, Globe, Code } from "lucide-react"; // Import icons

import AnimatedTitle from "./ui/AnimatedTitle";
import BackgroundPaths from "./bg/BackgroundPaths";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // 1. Expand the image to full screen
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // 2. Fade in the text on the sides as it expands
    clipAnimation.to(".about-feature-text", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.2"); // Start slightly before expansion finishes
  });

  return (
    <div id="about" className="min-h-screen w-screen relative bg-black overflow-x-hidden">
      
      {/* --- SECTION 1: Text Content --- */}
      <div className="relative min-h-screen flex flex-col items-center justify-center py-20 z-10">
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
            <BackgroundPaths />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

        <div className="relative z-10 flex flex-col items-center gap-5 px-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">
              Welcome to Ed X AI
            </p>
          </div>

          <AnimatedTitle
            title="Pe<b>r</b>son<b>a</b>lize<b>d</b> Le<b>a</b>r<b>n</b>i<b>n</b>g, <br /> E<b>m</b>po<b>w</b>ere<b>d</b> Careers, <br /> Co<b>n</b><b>n</b>ecte<b>d</b> Co<b>m</b>mu<b>n</b>i<b>t</b>ies."
            containerClass="mt-5 !text-white text-center text-4xl md:text-7xl font-black uppercase leading-[0.9] drop-shadow-2xl"
          />

          <div className="about-subtext text-lg md:text-xl max-w-2xl mx-auto text-center mt-8 text-slate-300 leading-relaxed mix-blend-plus-lighter">
            <p className="font-medium text-white mb-4">
              Ed X AI stands as your personalized guide through the maze of education.
            </p>
            <p className="font-light text-slate-400">
              Whether you're a beginner or a professional, Edify AI is your partner in mastering new skills, 
              building networks, and stepping into the future.
            </p>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: Expanding Image with Side Text --- */}
      <div className="h-screen w-screen relative" id="clip">
        <div className="mask-clip-path about-image bg-gray-900 relative z-20 overflow-hidden">
          
          {/* Background Image */}
          <img
            src="https://images.stockcake.com/public/4/7/c/47cbc193-20fa-41d7-8eb3-4dc9dbf9b184_large/digital-learning-revolution-stockcake.jpg"
            alt="Background"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          
          {/* Content Overlay Grid */}
          <div className="absolute inset-0 z-30 flex items-center justify-center px-6 md:px-20 w-full h-full">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl items-center">
                
                {/* --- Left Side Text --- */}
                <div className="flex flex-col gap-12 text-right items-end">
                    <div className="about-feature-text opacity-0 translate-y-10">
                        <div className="flex items-center justify-end gap-3 mb-2 text-blue-400">
                            <h3 className="text-3xl font-bold uppercase tracking-wider">The Mission</h3>
                            <Brain size={24} />
                        </div>
                        <p className="text-gray-300 text-xl leading-relaxed max-w-xs">
                            Bridging the gap between traditional education and the AI revolution. 
                            Build with intelligence, not just consume it.
                        </p>
                    </div>
                    <div className="about-feature-text opacity-0 translate-y-10">
                        <div className="flex items-center justify-end gap-3 mb-2 text-purple-400">
                            <h3 className="text-3xl font-bold uppercase tracking-wider">Why Now?</h3>
                            <Globe size={24} />
                        </div>
                        <p className="text-gray-300 text-xl leading-relaxed max-w-xs">
                            AI is reshaping every industry. We provide the velocity you need to adapt 
                            and lead in the algorithmic economy.
                        </p>
                    </div>
                </div>

                {/* --- Center Spacer (Image Visible Here) --- */}
                <div className="hidden md:block h-full"></div>

                {/* --- Right Side Text --- */}
                <div className="flex flex-col gap-12 text-left items-start">
                    <div className="about-feature-text opacity-0 translate-y-10">
                        <div className="flex items-center justify-start gap-3 mb-2 text-yellow-400">
                            <Rocket size={24} />
                            <h3 className="text-3xl font-bold uppercase tracking-wider">Our Approach</h3>
                        </div>
                        <p className="text-gray-300 text-xl leading-relaxed max-w-xs">
                            Hyper-practical, project-based learning. Deploy real models, 
                            fine-tune LLMs, and build autonomous agents.
                        </p>
                    </div>
                    <div className="about-feature-text opacity-0 translate-y-10">
                        <div className="flex items-center justify-start gap-3 mb-2 text-emerald-400">
                            <Code size={24} />
                            <h3 className="text-3xl font-bold uppercase tracking-wider">The Outcome</h3>
                        </div>
                        <p className="text-gray-300 text-xl leading-relaxed max-w-xs">
                            Become a future-proof engineer ready to tackle the world's 
                            most complex challenges.
                        </p>
                    </div>
                </div>

             </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default About;