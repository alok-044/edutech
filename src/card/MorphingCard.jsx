import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "../lib/utils";
import { 
  Grid3X3, 
  Layers, 
  LayoutList, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play 
} from "lucide-react";

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
};

const SWIPE_THRESHOLD = 50;

export function MorphingCard({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
  autoPlay = false,
  interval = 3000,
}) {
  const [layout, setLayout] = useState(defaultLayout);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  if (!cards || cards.length === 0) {
    return null;
  }

  // Navigation handlers
  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // Keyboard navigation
  useEffect(() => {
    if (layout !== "stack") return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [layout, nextCard, prevCard]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || layout !== "stack") return;
    const timer = setInterval(nextCard, interval);
    return () => clearInterval(timer);
  }, [isPlaying, layout, nextCard, interval]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      nextCard();
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      prevCard();
    }
  };

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length;
      reordered.push({ ...cards[index], stackPosition: i });
    }
    return reordered.reverse();
  };

  const getLayoutStyles = (stackPosition) => {
    if (layout === "stack") {
      return {
        top: stackPosition * 4, // Tighter stacking
        scale: 1 - stackPosition * 0.05, // Subtle scale down
        zIndex: cards.length - stackPosition,
        y: stackPosition * 8, // slight vertical offset
        opacity: 1 - stackPosition * 0.2, // Fade out back cards
      };
    }
    return {
      top: 0,
      left: 0,
      zIndex: 1,
      scale: 1,
      opacity: 1,
      y: 0,
    };
  };

  const containerStyles = {
    stack: "relative h-80 w-full max-w-md", 
    grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    list: "flex flex-col gap-4",
  };

  const displayCards =
    layout === "stack"
      ? getStackOrder()
      : cards.map((c, i) => ({ ...c, stackPosition: i }));

  return (
    <div className={cn("space-y-6 w-full", className)}>
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
        
        {/* Layout Toggle */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg">
          {Object.keys(layoutIcons).map((mode) => {
            const Icon = layoutIcons[mode];
            return (
              <button
                key={mode}
                onClick={() => {
                  setLayout(mode);
                  setExpandedCard(null);
                }}
                className={cn(
                  "p-2 rounded-md transition-all",
                  layout === mode
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                )}
                title={`Switch to ${mode} layout`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        {/* Playback Controls (Stack Mode Only) */}
        {layout === "stack" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title={isPlaying ? "Pause" : "Auto Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button onClick={prevCard} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-gray-500 w-12 text-center">
              {activeIndex + 1} / {cards.length}
            </span>
            <button onClick={nextCard} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto transition-all duration-500 ease-in-out")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const isStack = layout === "stack";
              const styles = getLayoutStyles(card.stackPosition);
              const isExpanded = expandedCard === card.id;
              const isTopCard = isStack && card.stackPosition === 0;
              const isVisible = isStack ? card.stackPosition < 3 : true; // Only show top 3 in stack

              if (!isVisible) return null;

              return (
                <motion.div
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  initial={isStack ? { scale: 0.8, opacity: 0, y: 20 } : { opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: styles.opacity,
                    scale: isExpanded ? 1 : styles.scale,
                    y: styles.y,
                    zIndex: isExpanded ? 50 : styles.zIndex,
                    rotate: isStack ? (card.stackPosition % 2 === 0 ? 1 : -1) * card.stackPosition : 0, 
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  
                  // Drag properties
                  drag={isTopCard && !isExpanded ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => {
                    setIsDragging(true);
                    setIsPlaying(false); // Pause on interaction
                  }}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ cursor: "grabbing", scale: 1.02 }}
                  
                  onClick={() => {
                    if (isDragging) return;
                    if (isStack && !isTopCard) return;
                    setExpandedCard(isExpanded ? null : card.id);
                    if (onCardClick) onCardClick(card);
                  }}
                  
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-2xl transition-colors",
                    "hover:border-blue-500/30",
                    isStack && "absolute inset-0 w-full h-full origin-bottom",
                    isStack && isTopCard && "cursor-grab active:cursor-grabbing",
                    !isStack && "w-full cursor-pointer hover:bg-[#1a1a1a]",
                    isExpanded && "fixed inset-4 z-50 md:inset-20 md:w-auto md:h-auto overflow-y-auto bg-[#0a0a0a] border-blue-500/50 shadow-[0_0_100px_rgba(59,130,246,0.2)]"
                  )}
                  style={{ backgroundColor: card.color || undefined }} 
                >
                  {/* Card Glow Effect */}
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" />

                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      {card.icon && (
                        <div className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl backdrop-blur-md border border-white/10",
                          "bg-linear-to-br from-white/10 to-transparent",
                          isExpanded ? "h-16 w-16" : ""
                        )}>
                          {React.cloneElement(card.icon, { 
                            size: isExpanded ? 32 : 24,
                            className: "text-white"
                          })}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={cn("font-bold text-white truncate", isExpanded ? "text-2xl" : "text-lg")}>
                          {card.title}
                        </h3>
                        <p className={cn("text-xs text-gray-500 font-mono mt-1", isExpanded && "text-sm")}>
                          ID: {card.id.toString().padStart(4, '0')}
                        </p>
                      </div>

                      {isExpanded && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white cursor-pointer"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                      )}
                    </div>

                    <p className={cn(
                      "text-gray-300 leading-relaxed",
                      !isExpanded && "line-clamp-3 text-sm",
                      isExpanded && "text-base"
                    )}>
                      {card.description}
                    </p>

                    {/* Footer / Actions area */}
                    {isExpanded && (
                      <div className="mt-auto pt-6 flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
                          Action
                        </button>
                        <button className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
                          Details
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Swipe Indicator for Stack Top Card */}
                  {isStack && isTopCard && !isExpanded && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-50 pointer-events-none">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 animate-pulse">
                        Swipe or Drag
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Dot Indicators for Stack */}
      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsPlaying(false);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                index === activeIndex
                  ? "w-6 bg-blue-500"
                  : "w-1.5 bg-gray-700 hover:bg-gray-500"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}