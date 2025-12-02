import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Search, 
  Users, 
  Star, 
  Video,
  Filter
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const eventsData = [
  {
    id: 1,
    title: "AI Summit 2025",
    description: "Join the biggest AI conference of the year. Keynotes from industry leaders, workshops on LLMs, and networking opportunities.",
    date: "15",
    month: "MAR",
    time: "09:00 AM - 05:00 PM",
    location: "San Francisco / Hybrid",
    category: "Conference",
    icon: Calendar,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Community Meetup",
    description: "Network with other learners, share your projects, and find potential collaborators for your next big idea.",
    date: "22",
    month: "MAR",
    time: "06:00 PM - 08:00 PM",
    location: "Discord Voice / Virtual",
    category: "Networking",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Hackathon V2",
    description: "Build your dream project in 48 hours. Categories include GenAI, Computer Vision, and EdTech. $10k in prizes.",
    date: "05",
    month: "APR",
    time: "48 Hours",
    location: "Global / Remote",
    category: "Competition",
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855463?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Prompt Engineering Workshop",
    description: "A hands-on masterclass on advanced prompting techniques for GPT-4 and Claude 3.",
    date: "12",
    month: "APR",
    time: "02:00 PM - 04:00 PM",
    location: "Live Stream",
    category: "Workshop",
    icon: Video,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Career Fair 2025",
    description: "Meet recruiters from top tech companies looking for AI talent. Resume reviews included.",
    date: "20",
    month: "APR",
    time: "10:00 AM - 03:00 PM",
    location: "Virtual Expo",
    category: "Career",
    icon: Users,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    image: "https://images.unsplash.com/photo-1560439514-e960a3ef5019?q=80&w=2070&auto=format&fit=crop"
  }
];

const EventsPage = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Conference", "Networking", "Competition", "Workshop", "Career"];

  const filteredEvents = filter === "All" 
    ? eventsData 
    : eventsData.filter(e => e.category === filter);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#8b5cf6" alpha={0.15} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Upcoming Community Events
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Connect, Compete, & <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Grow Together</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover hackathons, workshops, and meetups designed to accelerate your AI learning journey.
          </p>
        </motion.div>

        {/* --- Filter Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                            filter === cat
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#252525] border border-white/5"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
            </div>
        </div>

        {/* --- Events Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col md:flex-row"
                >
                    {/* Image Section */}
                    <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10" />
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Date Badge Overlay */}
                        <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center min-w-[60px]">
                            <span className="block text-xl font-bold text-white">{event.date}</span>
                            <span className="block text-[10px] font-medium text-gray-400 tracking-wider">{event.month}</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${event.bg} ${event.color} ${event.border}`}>
                                {event.category}
                            </span>
                            <div className={`p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors ${event.color}`}>
                                <event.icon size={16} />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                            {event.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                            {event.description}
                        </p>

                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                                <Clock size={14} className="text-gray-500" />
                                {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                                <MapPin size={14} className="text-gray-500" />
                                {event.location}
                            </div>
                        </div>

                        <button className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2 group/btn cursor-pointer">
                            Register Now
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* --- Empty State --- */}
        {filteredEvents.length === 0 && (
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/10 mb-4">
                    <Filter className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-white">No events found</h3>
                <p className="text-gray-500 text-sm mt-1">Try changing the category filter</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default EventsPage;