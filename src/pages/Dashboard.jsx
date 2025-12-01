import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Map, 
  FileText, 
  Mic, 
  Video, 
  Bot, 
  MessageSquare, 
  Calendar, 
  Plus, 
  Flame, 
  Clock, 
  Award,
  ArrowRight
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const quickActions = [
    { label: "Create Course", icon: Plus, href: "/ai-course" },
    { label: "New Pathway", icon: Map, href: "/ai-path/create" },
    { label: "Create Resume", icon: FileText, href: "/ai-resume/create" },
    { label: "Start Meeting", icon: Video, href: "/ai-meeting" },
    { label: "Chat Assistant", icon: MessageSquare, href: "/ai-advisor" },
  ];

  const stats = [
    { label: "Streak", value: "7", unit: "days in a row", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Hours", value: "0", unit: "learning time", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Completion", value: "0%", unit: "courses finished", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const workspaceItems = [
    {
      title: "AI Courses",
      subtitle: "Continue your learning journey",
      icon: BookOpen,
      emptyTitle: "No Courses Yet",
      emptyDesc: "Start learning by creating your first course",
      cta: "Create Course",
      link: "/ai-course",
      headerAction: "Create"
    },
    {
      title: "Learning Pathways",
      subtitle: "Track your structured learning",
      icon: Map,
      emptyTitle: "No Pathways Started",
      emptyDesc: "Begin your structured learning journey",
      cta: "Create Pathway",
      link: "/ai-path",
      headerAction: "Create"
    },
    {
      title: "Resumes & Documents",
      subtitle: "Manage your professional documents",
      icon: FileText,
      emptyTitle: "No Resumes Yet",
      emptyDesc: "Create your first professional resume",
      cta: "Create Resume",
      link: "/ai-resume",
      headerAction: "Create"
    },
    {
      title: "Mock Interviews",
      subtitle: "Practice and improve your skills",
      icon: Mic,
      emptyTitle: "No Interviews Yet",
      emptyDesc: "Start practicing with AI-powered mock interviews",
      cta: "Start Interview",
      link: "/ai-interview",
      headerAction: "Start"
    },
    {
      title: "Agentic Meetings",
      subtitle: "Schedule and manage your meetings",
      icon: Video,
      emptyTitle: "No Meetings Yet",
      emptyDesc: "Schedule your first agentic meeting",
      cta: "Schedule Meeting",
      link: "/ai-meeting",
      headerAction: "New"
    },
    {
      title: "AI Agents",
      subtitle: "Your intelligent assistants",
      icon: Bot,
      emptyTitle: "No Agents Yet",
      emptyDesc: "Create your first AI agent",
      cta: "Create Agent",
      link: "/ai-meeting", // Assuming agents are managed here based on previous context
      headerAction: "Create"
    },
    {
      title: "AI Tutor",
      subtitle: "Get instant help with any question",
      icon: MessageSquare,
      emptyTitle: "Ask Anything",
      emptyDesc: "Get instant answers to your questions with our AI-powered tutor",
      cta: "Chat with Tutor",
      link: "/ai-advisor",
      isSpecial: true // For the chat icon look
    },
    {
      title: "Events & Opportunities",
      subtitle: "Discover hackathons, meetups, and internships",
      icon: Calendar,
      emptyTitle: "No Upcoming Events",
      emptyDesc: "Explore hackathons, meetups, and internships",
      cta: "Browse Events",
      link: "#",
      headerAction: "Browse"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#ee0943" alpha={1} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-28">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                Good afternoon, Learner! <span className="animate-wave origin-bottom-right inline-block">👋</span>
              </h1>
              <p className="text-gray-400">
                Welcome to your learning hub. Continue your journey and explore new opportunities.
              </p>
            </div>
            <Link to="/ai-course">
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 cursor-pointer">
                 Get Started
               </button>
            </Link>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap gap-3 mb-12">
            {quickActions.map((action, idx) => (
              <Link key={idx} to={action.href}>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all cursor-pointer">
                  <action.icon size={16} />
                  {action.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm font-medium text-gray-400">{stat.label}</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.unit}</div>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Workspace Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Your Workspace</h2>
            <p className="text-gray-400 text-sm">Manage all your learning, career, and collaboration tools</p>
          </div>

          {/* Workspace Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {workspaceItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col h-72 hover:border-white/20 transition-all group relative overflow-hidden"
              >
                {/* Header inside card */}
                <div className="flex justify-between items-start mb-4 z-10 relative">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-[10px] text-gray-500">{item.subtitle}</p>
                    </div>
                  </div>
                  {item.headerAction && (
                    <button className="flex items-center gap-1 px-2.5 py-1 bg-[#151515] border border-white/10 rounded-lg text-[10px] font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <Plus size={10} />
                      {item.headerAction}
                    </button>
                  )}
                </div>

                {/* Empty State / Content Center */}
                <div className="flex-1 flex flex-col items-center justify-center text-center z-10 relative">
                  {item.isSpecial ? (
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                      <MessageSquare className="w-8 h-8 text-white fill-white" />
                    </div>
                  ) : (
                    <item.icon className="w-10 h-10 text-gray-700 mb-3 opacity-50" strokeWidth={1.5} />
                  )}
                  
                  <h4 className="text-sm font-medium text-white mb-1">{item.emptyTitle}</h4>
                  <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                    {item.emptyDesc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-4 z-10 relative">
                  <Link to={item.link}>
                    <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2">
                       {item.cta.includes("Chat") ? <MessageSquare size={14} /> : <Plus size={14} />}
                       {item.cta}
                    </button>
                  </Link>
                </div>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;