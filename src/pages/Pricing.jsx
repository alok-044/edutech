import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";
import BackgroundPaths from "../components/bg/BackgroundPaths";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "STARTER",
      price: isAnnual ? "40" : "50",
      description: "Perfect for individuals and small projects.",
      features: [
        "Up to 10 projects",
        "Basic analytics",
        "48-hour support response time",
        "Limited API access",
        "Community support",
      ],
      notIncluded: ["Team collaboration", "Custom integrations"],
      popular: false,
      color: "blue"
    },
    {
      name: "PROFESSIONAL",
      price: isAnnual ? "79" : "99",
      description: "Ideal for growing teams and businesses.",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "24-hour support response time",
        "Full API access",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
      ],
      notIncluded: [],
      popular: true,
      color: "purple" // Premium gradient
    },
    {
      name: "ENTERPRISE",
      price: isAnnual ? "239" : "299",
      description: "Dedicated support and infrastructure.",
      features: [
        "Everything in Professional",
        "Custom solutions",
        "Dedicated account manager",
        "1-hour support response time",
        "SSO Authentication",
        "On-premise deployment",
      ],
      notIncluded: [],
      popular: false,
      color: "orange"
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#8b5cf6" alpha={0.15} />
        <div className="absolute inset-0 opacity-50"><BackgroundPaths /></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Simple, Transparent <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose the perfect plan for your learning journey. No hidden fees.
          </motion.p>

          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-white/10 rounded-full p-1 relative transition-colors hover:bg-white/20"
            >
              <motion.div
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-gray-500'}`}>
              Yearly <span className="text-blue-400 text-xs ml-1 font-bold">(Save 20%)</span>
            </span>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={`relative bg-[#0A0A0A] border rounded-3xl p-8 flex flex-col
                ${plan.popular ? 'border-purple-500/50 shadow-2xl shadow-purple-900/20 scale-105 z-10' : 'border-white/10 hover:border-white/20'}
                transition-all duration-300
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} fill="currentColor" /> MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-300 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$</span>
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={plan.price}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-5xl font-bold text-white"
                    >
                      {plan.price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-sm text-gray-500 mt-4 h-10">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`p-1 rounded-full shrink-0 ${plan.popular ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      <Check size={12} />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-50">
                    <div className="p-1 rounded-full shrink-0 bg-gray-800 text-gray-500">
                      <X size={12} />
                    </div>
                    <span className="text-sm text-gray-500">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3 rounded-xl font-medium transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer
                ${plan.popular 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#252525] hover:border-white/20'}
              `}>
                {plan.popular ? "Get Started" : "Start Free Trial"}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pricing;