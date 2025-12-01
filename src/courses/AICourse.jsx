import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Clock,
    Star,
    BarChart,
    PlayCircle,
    Code,
    Brain,
    Database,
    Cpu
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";
import BackgroundPaths from "../components/bg/BackgroundPaths";

const courses = [
    {
        id: 1,
        title: "Complete Python for AI",
        category: "Programming",
        level: "Beginner",
        duration: "12h 30m",
        rating: 4.8,
        students: "12k",
        imageColor: "from-blue-600 to-cyan-500",
        icon: Code
    },
    {
        id: 2,
        title: "Machine Learning A-Z",
        category: "Machine Learning",
        level: "Intermediate",
        duration: "42h 00m",
        rating: 4.9,
        students: "8.5k",
        imageColor: "from-purple-600 to-pink-500",
        icon: Brain
    },
    {
        id: 3,
        title: "Data Science Bootcamp",
        category: "Data Science",
        level: "All Levels",
        duration: "28h 15m",
        rating: 4.7,
        students: "15k",
        imageColor: "from-emerald-600 to-teal-500",
        icon: Database
    },
    {
        id: 4,
        title: "Generative AI Masterclass",
        category: "GenAI",
        level: "Advanced",
        duration: "18h 45m",
        rating: 4.9,
        students: "5k",
        imageColor: "from-orange-600 to-red-500",
        icon: Cpu
    },

    // ⭐ NEW COURSES ADDED BELOW ⭐

    {
        id: 5,
        title: "Deep Learning Specialization",
        category: "Deep Learning",
        level: "Advanced",
        duration: "35h 20m",
        rating: 4.8,
        students: "10k",
        imageColor: "from-indigo-600 to-violet-500",
        icon: Brain
    },
    {
        id: 6,
        title: "NLP with Transformers",
        category: "NLP",
        level: "Intermediate",
        duration: "15h 10m",
        rating: 4.6,
        students: "3k",
        imageColor: "from-pink-600 to-rose-500",
        icon: (props) => (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )
    },
    {
        id: 7,
        title: "React Developer Roadmap",
        category: "Web Dev",
        level: "Intermediate",
        duration: "20h 05m",
        rating: 4.8,
        students: "6k",
        imageColor: "from-blue-500 to-green-400",
        icon: Code
    },
    {
        id: 8,
        title: "JavaScript Zero to Hero",
        category: "Programming",
        level: "Beginner",
        duration: "16h 50m",
        rating: 4.7,
        students: "18k",
        imageColor: "from-yellow-500 to-orange-400",
        icon: Code
    },
    {
        id: 9,
        title: "C Programming Essentials",
        category: "Programming",
        level: "Beginner",
        duration: "10h 20m",
        rating: 4.6,
        students: "9k",
        imageColor: "from-slate-600 to-gray-500",
        icon: Code
    },
    {
        id: 10,
        title: "Full-Stack Web Development",
        category: "Web Dev",
        level: "All Levels",
        duration: "50h 00m",
        rating: 4.9,
        students: "22k",
        imageColor: "from-purple-700 to-blue-600",
        icon: Cpu
    },
    {
        id: 11,
        title: "AI Prompt Engineering",
        category: "GenAI",
        level: "Beginner",
        duration: "6h 10m",
        rating: 4.8,
        students: "7k",
        imageColor: "from-teal-600 to-cyan-400",
        icon: Brain
    },
    {
        id: 12,
        title: "Computer Vision with PyTorch",
        category: "Machine Learning",
        level: "Advanced",
        duration: "22h 40m",
        rating: 4.9,
        students: "4k",
        imageColor: "from-red-600 to-purple-600",
        icon: Cpu
    },
    {
        id: 13,
        title: "Data Structures & Algorithms",
        category: "Programming",
        level: "Intermediate",
        duration: "30h 20m",
        rating: 4.8,
        students: "19k",
        imageColor: "from-green-600 to-lime-500",
        icon: Database
    },
    {
        id: 14,
        title: "SQL & Databases Mastery",
        category: "Data Science",
        level: "Beginner",
        duration: "14h 30m",
        rating: 4.7,
        students: "11k",
        imageColor: "from-indigo-500 to-blue-400",
        icon: Database
    },
    {
        id: 15,
        title: "Cloud Computing on AWS",
        category: "Cloud",
        level: "All Levels",
        duration: "24h 10m",
        rating: 4.8,
        students: "9k",
        imageColor: "from-amber-500 to-yellow-400",
        icon: Cpu
    },
    {
        id: 16,
        title: "Cybersecurity Fundamentals",
        category: "Security",
        level: "Beginner",
        duration: "19h 20m",
        rating: 4.7,
        students: "13k",
        imageColor: "from-gray-700 to-gray-500",
        icon: Cpu
    }
];


const AICourse = () => {
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = courses.filter(course => {
        const matchesFilter = filter === "All" || course.category === filter;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const categories = ["All", "Programming", "Machine Learning", "Data Science", "GenAI"];

    return (
        <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">

            {/* --- Background --- */}
            <div className="fixed inset-0 z-0">
                <BackgroundPaths />
            </div>

            {/* --- Main Content --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        World Class Education
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Master the Future of <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Artificial Intelligence</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore our curated library of AI courses designed to take you from beginner to expert. Learn at your own pace with interactive lessons.
                    </p>
                </motion.div>

                {/* --- Search & Filter Bar --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">

                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center overflow-hidden transition-colors group-hover:border-blue-500/30">
                            <div className="pl-4 text-gray-500">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-white px-4 py-3 text-sm focus:outline-none placeholder-gray-600"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${filter === cat
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#252525] border border-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Course Grid --- */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map((course) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={course.id}
                                className="group bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col"
                            >
                                {/* Course Thumbnail */}
                                <div className={`h-48 w-full bg-linear-to-br ${course.imageColor} relative p-6 flex flex-col justify-between overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -mr-10 -mt-10" />

                                    <div className="relative z-10 flex justify-between items-start">
                                        <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                            {course.category}
                                        </span>
                                        <div className="w-8 h-8 bg-black/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white/80">
                                            <course.icon size={16} />
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                                            {course.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Meta Row */}
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <BarChart size={14} className="text-blue-400" />
                                            {course.level}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} className="text-purple-400" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center gap-1.5 ml-auto text-yellow-400">
                                            <Star size={14} fill="currentColor" />
                                            {course.rating}
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-7 h-7 rounded-full bg-gray-800 border-2 border-[#0A0A0A] flex items-center justify-center text-[8px] text-gray-500">
                                                    U{i}
                                                </div>
                                            ))}
                                            <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border-2 border-[#0A0A0A] flex items-center justify-center text-[8px] text-gray-400 font-bold">
                                                {course.students}+
                                            </div>
                                        </div>

                                        <Link to={`/ai-course/${course.id}`}>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors shadow-lg cursor-pointer">
                                                <PlayCircle size={16} />
                                                Start Learning
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/10 mb-4">
                            <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-medium text-white">No courses found</h3>
                        <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AICourse;