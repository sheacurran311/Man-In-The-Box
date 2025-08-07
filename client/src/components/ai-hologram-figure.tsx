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
      fill: "currentColor",
      fillOpacity: "0.6",
      stroke: "currentColor",
      strokeWidth: "1",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };

    switch (action) {
      case "pacing":
        return (
          <g>
            {/* Head */}
            <ellipse cx="60" cy="18" rx="6" ry="7" {...baseProps} />
            {/* Neck */}
            <rect x="58" y="25" width="4" height="3" rx="2" {...baseProps} />
            {/* Torso */}
            <ellipse cx="60" cy="45" rx="12" ry="18" {...baseProps} />
            {/* Pelvis */}
            <ellipse cx="60" cy="65" rx="8" ry="6" {...baseProps} />
            
            {/* Arms - animated for walking */}
            <motion.g
              animate={{ 
                rotate: [0, 15, -15, 0],
                transformOrigin: "60px 35px"
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Left arm */}
              <ellipse cx="48" cy="38" rx="4" ry="12" {...baseProps} />
              <ellipse cx="45" cy="55" rx="3" ry="8" {...baseProps} />
            </motion.g>
            
            <motion.g
              animate={{ 
                rotate: [0, -15, 15, 0],
                transformOrigin: "72px 35px"
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Right arm */}
              <ellipse cx="72" cy="38" rx="4" ry="12" {...baseProps} />
              <ellipse cx="75" cy="55" rx="3" ry="8" {...baseProps} />
            </motion.g>
            
            {/* Legs - animated for walking */}
            <motion.g
              animate={{ 
                rotate: [0, -10, 10, 0],
                transformOrigin: "55px 65px"
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Left thigh */}
              <ellipse cx="55" cy="75" rx="5" ry="12" {...baseProps} />
              {/* Left calf */}
              <ellipse cx="52" cy="90" rx="4" ry="10" {...baseProps} />
            </motion.g>
            
            <motion.g
              animate={{ 
                rotate: [0, 10, -10, 0],
                transformOrigin: "65px 65px"
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Right thigh */}
              <ellipse cx="65" cy="75" rx="5" ry="12" {...baseProps} />
              {/* Right calf */}
              <ellipse cx="68" cy="90" rx="4" ry="10" {...baseProps} />
            </motion.g>
          </g>
        );

      case "sleeping":
        return (
          <g transform="translate(20, 50)">
            {/* Sleeping on the bed - positioned to match bed location */}
            {/* Head - lying down on pillow */}
            <ellipse cx="25" cy="20" rx="5" ry="4" transform="rotate(-10 25 20)" {...baseProps} />
            {/* Neck */}
            <rect x="30" y="18" width="2" height="3" rx="1" {...baseProps} />
            {/* Torso - horizontal on mattress */}
            <ellipse cx="40" cy="20" rx="12" ry="6" {...baseProps} />
            {/* Pelvis - horizontal */}
            <ellipse cx="50" cy="22" rx="5" ry="4" {...baseProps} />
            
            {/* Arms - one under pillow, one relaxed */}
            <ellipse cx="36" cy="15" rx="6" ry="2" {...baseProps} />
            <ellipse cx="36" cy="25" rx="6" ry="2" {...baseProps} />
            
            {/* Legs - bent naturally on bed */}
            <ellipse cx="56" cy="17" rx="8" ry="3" {...baseProps} />
            <ellipse cx="56" cy="27" rx="8" ry="3" {...baseProps} />
            <ellipse cx="62" cy="14" rx="4" ry="2" {...baseProps} />
            <ellipse cx="62" cy="30" rx="4" ry="2" {...baseProps} />
            
            {/* Breathing animation */}
            <motion.ellipse 
              cx="40" cy="20" rx="12" ry="6"
              animate={{ 
                ry: [6, 7, 6],
                fillOpacity: [0.6, 0.7, 0.6]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              {...baseProps} 
            />
            
            {/* Z's for sleeping */}
            <motion.g
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <text x="10" y="10" fontSize="5" fill="currentColor" opacity="0.8">Z</text>
              <text x="8" y="6" fontSize="3" fill="currentColor" opacity="0.6">z</text>
              <text x="13" y="4" fontSize="2" fill="currentColor" opacity="0.4">z</text>
            </motion.g>
          </g>
        );

      case "brushing":
        return (
          <g transform="translate(180, 40)">
            {/* Standing at the sink - positioned to match sink location */}
            {/* Head */}
            <ellipse cx="20" cy="8" rx="4" ry="5" {...baseProps} />
            {/* Neck */}
            <rect x="18" y="13" width="4" height="3" rx="2" {...baseProps} />
            {/* Torso */}
            <ellipse cx="20" cy="28" rx="8" ry="12" {...baseProps} />
            {/* Pelvis */}
            <ellipse cx="20" cy="42" rx="6" ry="4" {...baseProps} />
            
            {/* Left arm - animated brushing motion */}
            <motion.g
              animate={{ 
                rotate: [0, -15, 5, -15, 0],
                transformOrigin: "12px 20px"
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="12" cy="20" rx="2" ry="6" {...baseProps} />
              <ellipse cx="8" cy="12" rx="1.5" ry="4" {...baseProps} />
              {/* Toothbrush */}
              <motion.rect 
                x="6" y="8" width="1" height="4" rx="0.5"
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  transformOrigin: "6.5px 10px"
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                {...baseProps}
                fillOpacity="0.8"
              />
            </motion.g>
            
            {/* Right arm - resting on sink counter */}
            <ellipse cx="28" cy="22" rx="2" ry="6" {...baseProps} />
            <ellipse cx="30" cy="30" rx="1.5" ry="4" {...baseProps} />
            
            {/* Legs - standing at sink */}
            <ellipse cx="17" cy="52" rx="3" ry="10" {...baseProps} />
            <ellipse cx="23" cy="52" rx="3" ry="10" {...baseProps} />
            <ellipse cx="16" cy="63" rx="2" ry="3" {...baseProps} />
            <ellipse cx="24" cy="63" rx="2" ry="3" {...baseProps} />
          </g>
        );

      default: // sitting
        return (
          <g transform="translate(90, 20)">
            {/* Sitting in center area */}
            {/* Head */}
            <ellipse cx="60" cy="18" rx="5" ry="6" {...baseProps} />
            {/* Neck */}
            <rect x="58" y="24" width="4" height="3" rx="2" {...baseProps} />
            {/* Torso */}
            <ellipse cx="60" cy="40" rx="10" ry="14" {...baseProps} />
            {/* Pelvis - sitting */}
            <ellipse cx="60" cy="56" rx="8" ry="5" {...baseProps} />
            
            {/* Arms - relaxed sitting */}
            <ellipse cx="50" cy="33" rx="3" ry="8" {...baseProps} />
            <ellipse cx="46" cy="46" rx="2" ry="6" {...baseProps} />
            <ellipse cx="70" cy="33" rx="3" ry="8" {...baseProps} />
            <ellipse cx="74" cy="46" rx="2" ry="6" {...baseProps} />
            
            {/* Thighs - sitting position */}
            <ellipse cx="56" cy="64" rx="3" ry="10" {...baseProps} />
            <ellipse cx="64" cy="64" rx="3" ry="10" {...baseProps} />
            
            {/* Calves - hanging down */}
            <ellipse cx="54" cy="76" rx="2" ry="8" {...baseProps} />
            <ellipse cx="66" cy="76" rx="2" ry="8" {...baseProps} />
            
            {/* Feet */}
            <ellipse cx="53" cy="85" rx="1.5" ry="3" {...baseProps} />
            <ellipse cx="67" cy="85" rx="1.5" ry="3" {...baseProps} />
            
            {/* Simple sitting surface */}
            <rect x="48" y="70" width="24" height="3" rx="1" {...baseProps} strokeWidth="0" fillOpacity="0.3" />
            
            {/* Gentle breathing/idle animation */}
            <motion.ellipse 
              cx="60" cy="40" rx="10" ry="14"
              animate={{ 
                ry: [14, 15, 14],
                fillOpacity: [0.6, 0.65, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              {...baseProps} 
            />
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