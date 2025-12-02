import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Bot, FileText, Map, Video, Sparkles, Brain } from "lucide-react";

const cards = [
  { id: 1, title: "AI Interview", icon: Video, color: "from-blue-500 to-cyan-500", desc: "Real-time mock interviews" },
  { id: 2, title: "Smart Resume", icon: FileText, color: "from-purple-500 to-pink-500", desc: "ATS-optimized builder" },
  { id: 3, title: "Learning Paths", icon: Map, color: "from-emerald-500 to-teal-500", desc: "Personalized roadmaps" },
  { id: 4, title: "AI Assistant", icon: Bot, color: "from-orange-500 to-red-500", desc: "24/7 Career guidance" },
  { id: 5, title: "Skill Graph", icon: Brain, color: "from-indigo-500 to-violet-500", desc: "Visualize your growth" },
  { id: 6, title: "Auto-Apply", icon: Sparkles, color: "from-pink-500 to-rose-500", desc: "Smart job applications" },
];

const Carousel3D = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cylinderRef = useRef(null);
  const rotation = useMotionValue(0);
  const autoplayRef = useRef();

  const cardCount = cards.length;
  const cardWidth = 220; // Width of each card
  const radius = 320; // Distance from center
  const angleStep = 360 / cardCount;

  // Continuous Rotation Animation
  useEffect(() => {
    const animateRotation = () => {
      // Return the animation controls so we can stop it later
      return animate(rotation, rotation.get() - 360, {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
        onUpdate: (latest) => {
           if (!isHovered) {
             // Reset value to keep numbers small, but maintain visual continuity
             if (latest <= -360) rotation.set(0); 
           }
        }
      });
    };

    if (!isHovered) {
      // Store the controls in the ref
      autoplayRef.current = animateRotation();
    } else {
      // Stop the animation using the controls, NOT the MotionValue
      if (autoplayRef.current) autoplayRef.current.stop();
    }

    return () => {
      if (autoplayRef.current) autoplayRef.current.stop();
    };
  }, [isHovered, rotation]);

  // Handle Drag
  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * 0.5);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* 3D Cylinder Container */}
      <motion.div
        ref={cylinderRef}
        className="relative preserve-3d cursor-grab active:cursor-grabbing"
        style={{
          width: cardWidth,
          height: 300,
          rotateY: rotation,
          transformStyle: "preserve-3d",
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {cards.map((card, index) => {
          const angle = index * angleStep;
          
          return (
            <div
              key={card.id}
              className="absolute top-0 left-0 w-full h-full backface-visible"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              {/* Card Content */}
              <div className="w-full h-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 hover:border-white/30 hover:shadow-blue-500/20 group select-none">
                
                {/* Icon Bubble */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 font-medium">{card.desc}</p>

                {/* Decorative Bottom Bar */}
                <div className={`mt-auto w-12 h-1 rounded-full bg-linear-to-r ${card.color} opacity-50`} />
              </div>
            </div>
          );
        })}
      </motion.div>
      
      {/* Gradient Fade Overlay (Top/Bottom) for depth illusion */}
      <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black to-transparent pointer-events-none" />
      
    </div>
  );
};

export default Carousel3D;