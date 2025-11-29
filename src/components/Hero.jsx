import React from "react";
import { motion } from "framer-motion";
import BackgroundPaths from "./ui/BackgroundPaths";
import TextScramble from "./ui/TextScramble";
import Carousel3D from "./ui/Carousel3D"; // Import the new component
import ShaderBackground from "./ui/ShaderBackground";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 }, 
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* --- A. SHADER BACKGROUND --- */}
      <ShaderBackground color="red" alpha={1} />

      {/* --- B. BACKGROUND PATHS --- */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-50">
         <BackgroundPaths />
      </div>
      
      {/* --- C. MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pointer-events-auto">
          
          {/* LEFT COLUMN: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex mt-25 items-center text-sm font-medium text-blue-300 bg-blue-900/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-500/30">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                <span className="tracking-wide">AI-Powered Learning V2.0</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight"
            >
              Master your future with <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                Intelligent Education
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants} 
              className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0"
            >
              Unlock your potential with expert-led courses. 
              Our <span className="text-white font-semibold">AI Agents</span> analyze your learning style to build a custom curriculum.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center cursor-pointer"
              >
                <TextScramble className="font-mono font-bold tracking-tighter">
                  START LEARNING FREE
                </TextScramble>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer"
              >
                <TextScramble className="font-mono font-bold tracking-tighter">
                  EXPLORE MORE
                </TextScramble>
              </motion.a>
            </motion.div>

            {/* Trusted By */}
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-4">
                Trusted by top teams
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                 <span className="text-xl font-bold text-white">MICROSOFT</span>
                 <span className="text-xl font-bold text-white">GOOGLE</span>
                 <span className="text-xl font-bold text-white">AMAZON</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: 3D Carousel */}
          <div className="hidden lg:flex items-center justify-center h-[720px] w-full relative perspective-[2000px]">
            {/* Render the Carousel */}
            <Carousel3D />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;