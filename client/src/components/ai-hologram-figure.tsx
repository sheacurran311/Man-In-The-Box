import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Action = "pacing" | "sleeping" | "brushing" | "sitting";

interface AIHologramFigureProps {
  className?: string;
}

export default function AIHologramFigure({ className = "" }: AIHologramFigureProps) {
  const [currentAction, setCurrentAction] = useState<Action>("sitting");

  useEffect(() => {
    const actions: Action[] = ["sitting", "pacing", "brushing", "sleeping"];
    let actionIndex = 0;

    const interval = setInterval(() => {
      actionIndex = (actionIndex + 1) % actions.length;
      setCurrentAction(actions[actionIndex]);
    }, 8000); // Change action every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const getActionVariants = (action: Action) => {
    switch (action) {
      case "pacing":
        return {
          initial: { x: -10 },
          animate: { 
            x: [10, -10, 10],
            transition: { 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        };
      case "sleeping":
        return {
          initial: { y: 0 },
          animate: { 
            y: [0, 5, 0],
            transition: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        };
      case "brushing":
        return {
          initial: { rotate: 0 },
          animate: { 
            rotate: [0, -5, 5, -5, 0],
            transition: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        };
      default: // sitting
        return {
          initial: { scale: 1 },
          animate: { 
            scale: [1, 1.02, 1],
            transition: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        };
    }
  };

  const getSVGContent = (action: Action) => {
    const baseProps = {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };

    switch (action) {
      case "pacing":
        return (
          <g>
            {/* Head */}
            <circle cx="60" cy="20" r="8" {...baseProps} />
            {/* Body */}
            <line x1="60" y1="28" x2="60" y2="70" {...baseProps} />
            {/* Arms - animated for walking */}
            <motion.line 
              x1="60" y1="40" x2="45" y2="55" 
              animate={{ x2: [45, 50, 45], y2: [55, 50, 55] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              {...baseProps} 
            />
            <motion.line 
              x1="60" y1="40" x2="75" y2="55" 
              animate={{ x2: [75, 70, 75], y2: [55, 50, 55] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              {...baseProps} 
            />
            {/* Legs - animated for walking */}
            <motion.line 
              x1="60" y1="70" x2="50" y2="90" 
              animate={{ x2: [50, 55, 50], y2: [90, 85, 90] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              {...baseProps} 
            />
            <motion.line 
              x1="60" y1="70" x2="70" y2="90" 
              animate={{ x2: [70, 65, 70], y2: [90, 85, 90] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              {...baseProps} 
            />
          </g>
        );

      case "sleeping":
        return (
          <g>
            {/* Head - tilted for sleeping */}
            <ellipse cx="60" cy="25" rx="8" ry="6" {...baseProps} />
            {/* Body - lying down */}
            <line x1="68" y1="25" x2="90" y2="30" {...baseProps} />
            {/* Arms - relaxed */}
            <line x1="75" y1="28" x2="70" y2="40" {...baseProps} />
            <line x1="85" y1="29" x2="90" y2="40" {...baseProps} />
            {/* Legs - bent */}
            <line x1="90" y1="30" x2="85" y2="45" {...baseProps} />
            <line x1="85" y1="45" x2="80" y2="50" {...baseProps} />
            <line x1="90" y1="30" x2="95" y2="45" {...baseProps} />
            <line x1="95" y1="45" x2="100" y2="50" {...baseProps} />
            {/* Z's for sleeping */}
            <motion.g
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <text x="45" y="15" fontSize="8" fill="currentColor">Z</text>
              <text x="40" y="10" fontSize="6" fill="currentColor">z</text>
            </motion.g>
          </g>
        );

      case "brushing":
        return (
          <g>
            {/* Head */}
            <circle cx="60" cy="20" r="8" {...baseProps} />
            {/* Body */}
            <line x1="60" y1="28" x2="60" y2="70" {...baseProps} />
            {/* Left arm - holding brush */}
            <motion.line 
              x1="60" y1="40" x2="45" y2="25" 
              animate={{ x2: [45, 50, 45], y2: [25, 20, 25] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              {...baseProps} 
            />
            {/* Brush */}
            <motion.rect 
              x="42" y="22" width="6" height="2" rx="1"
              animate={{ x: [42, 47, 42], y: [22, 17, 22] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              {...baseProps} 
            />
            {/* Right arm - down */}
            <line x1="60" y1="40" x2="75" y2="55" {...baseProps} />
            {/* Legs */}
            <line x1="60" y1="70" x2="50" y2="90" {...baseProps} />
            <line x1="60" y1="70" x2="70" y2="90" {...baseProps} />
          </g>
        );

      default: // sitting
        return (
          <g>
            {/* Head */}
            <circle cx="60" cy="20" r="8" {...baseProps} />
            {/* Body */}
            <line x1="60" y1="28" x2="60" y2="60" {...baseProps} />
            {/* Arms - relaxed */}
            <line x1="60" y1="40" x2="45" y2="50" {...baseProps} />
            <line x1="60" y1="40" x2="75" y2="50" {...baseProps} />
            {/* Legs - sitting position */}
            <line x1="60" y1="60" x2="50" y2="75" {...baseProps} />
            <line x1="50" y1="75" x2="45" y2="80" {...baseProps} />
            <line x1="60" y1="60" x2="70" y2="75" {...baseProps} />
            <line x1="70" y1="75" x2="75" y2="80" {...baseProps} />
            {/* Seat/Platform */}
            <line x1="40" y1="80" x2="80" y2="80" {...baseProps} strokeWidth="2" />
          </g>
        );
    }
  };

  const variants = getActionVariants(currentAction);

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
      initial={variants.initial}
      animate={variants.animate}
    >
      <motion.svg
        width="100"
        height="80"
        viewBox="0 0 120 100"
        className="text-cyber-blue hologram-figure"
        animate={{
          opacity: [0.7, 1, 0.8, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Hologram scanlines effect */}
        <defs>
          <pattern id="scanlines" patternUnits="userSpaceOnUse" width="120" height="4">
            <rect width="120" height="2" fill="transparent"/>
            <rect width="120" height="1" y="2" fill="currentColor" opacity="0.1"/>
          </pattern>
          
          {/* Glowing effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background scanlines */}
        <rect width="120" height="100" fill="url(#scanlines)" opacity="0.3"/>
        
        {/* Hologram figure */}
        <g filter="url(#glow)">
          {getSVGContent(currentAction)}
        </g>
        
        {/* Glitch effect occasionally */}
        <motion.rect
          width="120"
          height="100"
          fill="var(--cyber-blue)"
          opacity="0"
          animate={{
            opacity: [0, 0, 0, 0, 0.2, 0, 0, 0, 0, 0],
            x: [0, 0, 0, 0, -1, 1, 0, 0, 0, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            times: [0, 0.1, 0.2, 0.3, 0.31, 0.32, 0.33, 0.4, 0.9, 1],
          }}
        />
      </motion.svg>
      
      {/* Action label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-roboto-mono text-cyber-blue opacity-60"
        key={currentAction}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 0.6, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.3 }}
      >
        [{currentAction.toUpperCase()}]
      </motion.div>
    </motion.div>
  );
}