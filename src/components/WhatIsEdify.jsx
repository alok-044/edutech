import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Bot, Users } from "lucide-react";
import Ballpit from "./ui/Ballpit";

const features = [
  {
    title: "Learn",
    description: "AI-generated courses tailored to you",
    icon: GraduationCap,
  },
  {
    title: "Practice",
    description: "Video meetings with AI agents",
    icon: Bot,
  },
  {
    title: "Connect",
    description: "Join communities and grow together",
    icon: Users,
  },
];

const WhatIsEdify = () => {
  return (
    <section className="relative w-full bg-black py-24 px-6 flex justify-center overflow-hidden min-h-[600px]">
      
      {/* --- LAYER 0: BALLPIT BACKGROUND --- */}
      {/* Added absolute positioning class here */}
      <Ballpit
        className="absolute inset-0 z-0" 
        count={100}
        gravity={0}
        friction={1}
        wallBounce={1}
        followCursor={true}
      />

      {/* --- LAYER 1: CONTENT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl w-full bg-[#1c1c1c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-16 text-center shadow-2xl"
      >
        {/* --- Header Content --- */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          What Is Edify AI?
        </h2>
        
        <p className="max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed mb-16">
          Edify AI is your all-in-one learning platform that combines AI-powered courses, intelligent agents, learning pathways, and career tools. Whether you're starting your first course, practicing for interviews, or building your professional profile, we make it simple and effective.
        </p>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-[#0f0f0f]/90 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="mb-5 p-3 rounded-full bg-transparent group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-sm text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default WhatIsEdify;