import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export function ExpandableTabs({ tabs, activeTab, setActiveTab, className = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full shadow-lg ${className}`}>
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;
        // Expand if hovered OR if it's the currently active tab
        const isExpanded = hoveredIndex === index || isActive;
        
        // Determine if it's an internal router link
        const isInternal = tab.href.startsWith("/");

        const content = (
          <>
            <Icon size={20} strokeWidth={2} />
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.span
                  initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                  animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                  exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden whitespace-nowrap text-sm font-medium"
                >
                  {tab.name}
                </motion.span>
              )}
            </AnimatePresence>
          </>
        );

        const commonProps = {
          key: tab.name,
          onClick: () => setActiveTab(tab.name),
          onMouseEnter: () => setHoveredIndex(index),
          onMouseLeave: () => setHoveredIndex(null),
          className: `
            relative flex items-center h-10 px-3 rounded-full cursor-pointer transition-all duration-300 outline-none select-none
            ${isActive 
                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] ring-1 ring-white/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }
          `
        };

        return isInternal ? (
          <Link to={tab.href} {...commonProps}>
            {content}
          </Link>
        ) : (
          <a href={tab.href} {...commonProps}>
            {content}
          </a>
        );
      })}
    </div>
  );
}