import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30 flex items-center justify-center">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#2563eb" alpha={0.6} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        <div className="bg-[#0A0A0A] border  border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Header */}
          <div className="text-center top-5 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to continue your learning journey</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
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
          </form>

          <div className="relative mt-8  mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0A0A0A] px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid mt-2 grid-cols-3 gap-4 mb-8">
            <SocialButton icon={GoogleIcon} label="Google" />
            <SocialButton icon={FacebookIcon} label="Facebook" />
            <SocialButton icon={LinkedInIcon} label="LinkedIn" />
          </div>

          

          {/* Form */}
          
<button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer group">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign up
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

const SocialButton = ({ icon: Icon, label }) => (
  <button className="flex items-center justify-center p-3 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-xl transition-all hover:scale-105 cursor-pointer group">
    <Icon className="w-5 h-5 group-hover:opacity-80 transition-opacity" />
  </button>
);

// Inline SVGs for authenticity
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

export default SignIn;