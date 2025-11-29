import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import ShaderBackground from "../components/ui/ShaderBackground";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-230 w-full top-13 bg-black text-white relative overflow-hidden font-sans selection:bg-purple-500/30 flex items-center justify-center">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#a855f7" alpha={0.6} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-purple-600 to-blue-600 mb-4 shadow-lg shadow-purple-500/20">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm">Join the future of AI education today</p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a strong password"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button className="w-full py-3.5 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer transform hover:scale-[1.02]">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Login Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0A0A0A] px-2 text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <SocialButton icon={GoogleIcon} />
            <SocialButton icon={FacebookIcon} />
            <SocialButton icon={LinkedInIcon} />
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign in
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// Reusing the same Icon components for consistency
const SocialButton = ({ icon: Icon }) => (
  <button className="flex items-center justify-center p-3 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-xl transition-all hover:scale-105 cursor-pointer opacity-70 hover:opacity-100">
    <Icon className="w-5 h-5" />
  </button>
);

const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#EA4335" d="M24 12.276c0-.816-.073-1.636-.21-2.436H12.22v4.62h6.632c-.287 1.548-1.127 2.857-2.4 3.73v3.1h3.886c2.274-2.094 3.59-5.176 3.59-8.91z" />
    <path fill="#34A853" d="M12.22 24c3.24 0 5.957-1.074 7.942-2.906l-3.886-3.1c-1.075.72-2.45 1.15-3.956 1.15-3.125 0-5.77-2.112-6.72-4.95H1.583v3.146C3.59 21.36 8.595 24 12.22 24z" />
    <path fill="#FBBC05" d="M5.5 14.194c-.237-.71-.372-1.468-.372-2.244 0-.776.135-1.534.372-2.244V6.56H1.583C.573 8.567 0 10.84 0 13.194s.573 4.627 1.583 6.634l3.917-3.634z" />
    <path fill="#4285F4" d="M12.22 4.75c1.763 0 3.35.607 4.595 1.795l3.434-3.434C17.96 1.16 15.31 0 12.22 0 8.595 0 3.59 2.64 1.583 6.56l3.917 3.634c.95-2.84 3.595-4.95 6.72-4.95z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default SignUp;