import React from "react";
import { Link } from "react-router-dom"; // Import Link for SPA navigation
import TextScramble from "./ui/TextScramble";

const Footer = () => {
  // Define internal navigation links
  const platformLinks = [
    { name: "Courses", path: "/ai-course" },
    { name: "Mentors", path: "/ai-advisor" },
    { name: "Roadmaps", path: "/ai-path" },
    { name: "Pricing", path: "/pricing" },
  ];

  // Define external/social links (placeholders)
  const socialLinks = [
    { name: "Discord", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Github", href: "#" },
  ];

  return (
    <footer className="w-full h-full bg-[#050505] border-t border-white/10 flex flex-col justify-between p-10 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 opacity-50" />
      <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 z-10">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter cursor-pointer">
              ED X<span className="text-blue-500"> AI</span>
            </h2>
          </Link>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Reimagining education through artificial intelligence. 
            Keep learning. Protect your future. Reimagine what's possible.
          </p>
        </div>

        {/* Platform Links (Internal) */}
        <div>
          <h4 className="text-white font-mono mb-4 text-sm uppercase tracking-widest border-b border-white/10 pb-2 w-fit">
            Platform
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 font-mono">
            {platformLinks.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-700 group-hover:bg-blue-400 rounded-full transition-colors" />
                  <TextScramble>{item.name}</TextScramble>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Links (External) */}
        <div>
          <h4 className="text-white font-mono mb-4 text-sm uppercase tracking-widest border-b border-white/10 pb-2 w-fit">
            Connect
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 font-mono">
            {socialLinks.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 mt-auto z-10">
        <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          © 2025 Ed X AI Inc. // System Status: Stable
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="text-[10px] text-gray-600 hover:text-white cursor-pointer transition-colors">PRIVACY</span>
          <span className="text-[10px] text-gray-600 hover:text-white cursor-pointer transition-colors">TERMS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;