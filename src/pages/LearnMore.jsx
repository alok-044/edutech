import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  Globe,
  Zap,
  Users,
  Target,
  Lightbulb,
  Rocket
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import Spline from '@splinetool/react-spline'; // Added Spline import

// --- 3D Components ---
function StarsField({ count = 1200 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = (Math.sin(phi) * Math.cos(theta)) * r;
      arr[i * 3 + 1] = (Math.sin(phi) * Math.sin(theta)) * r * 0.7;
      arr[i * 3 + 2] = (Math.cos(phi)) * r * 0.6;
    }
    return arr;
  }, [count]);

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial size={0.05} transparent opacity={0.8} color="#ffffff" sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

// Replaced FloatingModel with Spline Scene
const FloatingModel = () => {
  return (
    <div className="w-full h-[500px] relative">
      <div className="absolute inset-0 z-0 top-0 left-0 w-full h-full">
         <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      </div>
    </div>
  );
};

// --- UI Components ---
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, delay } }
});

const ParallaxTilt = ({ className = "", children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-40, 40], [10, -10]);
  const rotateY = useTransform(x, [-40, 40], [-10, 10]);
  const shadowIntensity = useTransform(y, [-40, 40], [0.2, 0.5]);

  const boxShadow = useTransform(shadowIntensity, (s) => {
    const yOffset = Math.abs(s * 30);
    const blur = Math.abs(s * 60);
    const opacity = 0.18 + s * 0.2;
    return `0 ${yOffset}px ${blur}px rgba(10,15,30,${opacity})`;
  });

  function handleMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX / 12);
    y.set(offsetY / 12);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        boxShadow,
        transformStyle: "preserve-3d"
      }}
      className={`${className} transform-gpu`}
    >
      {children}
    </motion.div>
  );
};

const TextMorph = ({ className = "" }) => {
  const words = ["Learn", "Build", "Explore", "Transform"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 1400);
    return () => clearInterval(id);
  }, []);
  
  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.45 }}
          className="inline-block bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400 font-extrabold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const SplitHero = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 50% 0 50%)" }}
      animate={{ clipPath: "inset(0 0% 0 0%)" }}
      transition={{ duration: 1.05, ease: "easeInOut" }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
        {title}{" "}
        <span className="block md:inline text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
          {subtitle}
        </span>
      </h1>
    </motion.div>
  );
};

// --- Main Page Component ---
const LearnMore = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden selection:bg-blue-500/30 font-sans">
      
      {/* Background visual canvas */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#00111a,rgba(0,0,0,0))] opacity-60" />
        
        {/* R3F particle layer */}
        <div className="absolute inset-0 -z-10">
          <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 50] }}>
            <StarsField count={1400} />
          </Canvas>
        </div>
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      </div>

      {/* Navbar */}
      <div className="relative z-40 top-18 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-blue-200/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          About The Platform
        </div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <SplitHero title="Redefining How the" subtitle="World Learns" />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            We’re building the operating system for the future of education — where AI, AR, and human mentorship combine
            to create learning experiences that are immersive and transformative.
          </p>
          <div className="mt-6">
            <TextMorph className="text-3xl md:text-4xl" />
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Large Card */}
          <ParallaxTilt className="md:col-span-2 row-span-2 min-h-96 rounded-3xl border border-white/10 bg-linear-to-br from-blue-900/5 to-purple-900/5 overflow-hidden relative p-0 group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 p-10 flex flex-col justify-end h-full">
              <div className="mb-6 p-3 bg-blue-500/20 w-fit rounded-xl border border-blue-500/30 backdrop-blur">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Adaptive Intelligence</h3>
              <p className="text-gray-300 max-w-md">
                Our AI analyzes learning patterns, predicts gaps, and adapts the curriculum to ensure mastery faster.
              </p>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/30 blur-[80px] rounded-full pointer-events-none" />
          </ParallaxTilt>

          {/* Side Card 1 */}
          <ParallaxTilt className="min-h-48 rounded-3xl border border-white/10 bg-linear-to-br from-purple-500/5 to-indigo-500/5 overflow-hidden p-6 group">
            <div className="relative z-10 flex flex-col justify-end h-full">
              <div className="mb-6 p-3 bg-purple-500/20 w-fit rounded-xl border border-purple-500/30 backdrop-blur">
                <Globe className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Global Campus</h3>
              <p className="text-gray-300 text-sm">Connect with learners across the globe in our persistent metaverse.</p>
            </div>
          </ParallaxTilt>

          {/* Side Card 2 */}
          <ParallaxTilt className="min-h-48 rounded-3xl border border-white/10 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 overflow-hidden p-6 group">
            <div className="relative z-10 flex flex-col justify-end h-full">
              <div className="mb-6 p-3 bg-emerald-500/20 w-fit rounded-xl border border-emerald-500/30 backdrop-blur">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Instant Feedback</h3>
              <p className="text-gray-300 text-sm">Get actionable feedback — code, essays, and pronunciation — in seconds.</p>
            </div>
          </ParallaxTilt>
        </div>

        {/* Methodology */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Our Methodology</h2>
            <p className="text-gray-400">The 4-step pipeline to mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 -z-10" />
            {[
              { title: "Assess", icon: Target, text: "AI evaluates your level." },
              { title: "Learn", icon: Lightbulb, text: "Personalized lesson flow." },
              { title: "Apply", icon: Rocket, text: "Build projects and practice." },
              { title: "Connect", icon: Users, text: "Peer review & mentorship." }
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-[#06060A] border border-white/10 flex items-center justify-center mb-4 shadow-lg group-hover:border-blue-500/40 transition-all">
                  <step.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm px-4">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3D + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
          {/* Modified Container for Spline Scene - Removed Padding */}
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
            <FloatingModel />
          </div>

          <div className="rounded-3xl p-8 bg-linear-to-br from-blue-900/30 to-purple-900/30 border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-3 text-white">Ready to start your journey?</h3>
            <p className="text-gray-300 mb-6">
              Join thousands of students who transformed their careers with Ed X AI. Start free — no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer">
                  Create Free Account
                </button>
              </Link>
              <Link to="/ai-course">
                <button className="px-6 py-3 bg-transparent border border-white/10 text-white rounded-lg hover:bg-white/10 transition cursor-pointer">
                  Browse Courses
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LearnMore;