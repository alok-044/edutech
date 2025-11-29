import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./ui/AnimatedTitle";
import BackgroundPaths from "./ui/BackgroundPaths";

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

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
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
              Edify AI stands as your personalized guide through the maze of education.
            </p>
            <p className="font-light text-slate-400">
              Whether you're a beginner or a professional, Edify AI is your partner in mastering new skills, 
              building networks, and stepping into the future.
            </p>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: Expanding Image (Clip Path) --- */}
      <div className="h-screen w-screen relative" id="clip">
        <div className="mask-clip-path about-image bg-gray-900">
          <img
            src="https://images.stockcake.com/public/4/7/c/47cbc193-20fa-41d7-8eb3-4dc9dbf9b184_large/digital-learning-revolution-stockcake.jpg"
            alt="Background"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default About;