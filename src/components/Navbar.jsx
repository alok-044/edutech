import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Menu, X, ChevronDown, Calendar, Star, Users, ArrowRight,
  BookOpen, FileText, Video, Smartphone, Map, Bot, Mic // New Icons imported here
} from "lucide-react";
import { ExpandableTabs } from "./ui/ExpandableTabs";

// --- Configuration with Icons ---
const navLinks = [
  { name: "AI Course", href: "#", icon: BookOpen },
  { name: "AI Resume", href: "#", icon: FileText },
  { name: "AI Interview", href: "#", icon: Mic },
  { name: "AI Meeting", href: "#", icon: Video },
  { name: "AR Learning", href: "#", icon: Smartphone },
  { name: "AI Path", href: "#", icon: Map },
  { name: "AI Advisor", href: "#", icon: Bot },
];

const eventsData = [
  { title: "AI Summit 2025", desc: "Join the biggest AI conference.", icon: <Calendar className="w-4 h-4 text-blue-400" /> },
  { title: "Community Meetup", desc: "Network with other learners.", icon: <Users className="w-4 h-4 text-purple-400" /> },
  { title: "Hackathon V2", desc: "Build your dream project.", icon: <Star className="w-4 h-4 text-yellow-400" /> },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("AI Course"); // Tracks the active pill
  const [hoveredTab, setHoveredTab] = useState(null); // Used for the dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 1280 && setMobileMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LayoutGroup>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 h-20">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          
          {/* 1. Logo */}
          <div className="flex items-center gap-2 cursor-pointer z-50">
            <span className="text-2xl font-bold text-white tracking-wide">
              Ed X AI
            </span>
          </div>

          {/* 2. Desktop Tabs (New Expandable Component) */}
          <div className="hidden xl:flex items-center gap-4">
            
            {/* The Icon Tabs */}
            <ExpandableTabs 
                tabs={navLinks} 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* The Dropdown Tab (kept separate) */}
            <ExpandableDesktopTab 
              hoveredTab={hoveredTab} 
              setHoveredTab={setHoveredTab} 
            />
          </div>

          {/* 3. Auth Buttons */}
          <div className="hidden xl:flex items-center gap-4">
            <button className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
              Get Started
            </button>
          </div>

          {/* 4. Mobile Toggle */}
          <button 
            className="xl:hidden text-white/80 hover:text-white p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* 5. Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-black border-b border-white/10 overflow-hidden absolute top-20 left-0 right-0 shadow-2xl"
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="flex items-center gap-3 p-3 text-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </a>
                ))}
                
                {/* Mobile Accordion */}
                <MobileExpandableTab title="Upcoming Events" />

                <div className="h-px bg-white/10 my-4" />
                <div className="flex flex-col gap-3">
                    <button className="w-full py-3 text-center text-white/70 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors">
                        Sign In
                    </button>
                    <button className="w-full py-3 text-center text-white bg-blue-600 rounded-xl font-medium shadow-lg shadow-blue-900/20">
                        Get Started
                    </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </LayoutGroup>
  );
};

// --- Sub-Component: Expandable Desktop Tab (Mega Menu Logic) ---
const ExpandableDesktopTab = ({ hoveredTab, setHoveredTab }) => {
  const isHovered = hoveredTab === "events";

  return (
    <div
      onMouseEnter={() => setHoveredTab("events")}
      onMouseLeave={() => setHoveredTab(null)}
      className="relative h-10 flex items-center"
    >
      <button 
        className={`
            relative px-4 h-full text-sm font-medium transition-colors flex items-center gap-1 group rounded-full
            ${isHovered ? "text-white bg-white/10" : "text-gray-400 hover:text-white"}
        `}
      >
        <span>Events</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ translateX: "-50%" }}
            className="absolute top-full left-1/2 mt-4 w-80 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
          >
            {/* Bridge to keep hover active */}
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2 mb-1">
                 <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">This Month</span>
                 <a href="#" className="text-[10px] text-blue-400 hover:underline">View All</a>
              </div>
              
              <div className="flex flex-col gap-1">
                {eventsData.map((event, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="mt-0.5 p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                      {event.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{event.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-Component: Mobile Accordion ---
const MobileExpandableTab = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-white/0 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pr-2 pb-2 flex flex-col gap-2 border-l border-white/10 ml-4 mt-2">
              {eventsData.map((event, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="p-1.5 bg-white/5 rounded-md">
                      {event.icon}
                  </div>
                  <span className="text-sm text-gray-300">{event.title}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;