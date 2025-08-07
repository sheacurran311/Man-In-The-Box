import { motion } from "framer-motion";

interface CubeFurnitureProps {
  className?: string;
}

export default function CubeFurniture({ className = "" }: CubeFurnitureProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        className="text-cyber-blue opacity-30"
        style={{
          filter: "drop-shadow(0 0 4px var(--cyber-blue))",
        }}
      >
        <defs>
          <linearGradient id="furnitureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
          </linearGradient>
        </defs>

        {/* Bed - back left corner */}
        <g transform="translate(20, 180)">
          {/* Bed frame */}
          <rect x="0" y="0" width="60" height="40" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="2"/>
          {/* Mattress */}
          <rect x="2" y="-6" width="56" height="36" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5" rx="3"/>
          {/* Pillow */}
          <ellipse cx="12" cy="-2" rx="8" ry="6" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.5"/>
          {/* Headboard */}
          <rect x="-3" y="-12" width="6" height="48" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="1"/>
        </g>

        {/* Toilet - back right corner */}
        <g transform="translate(240, 200)">
          {/* Toilet base */}
          <ellipse cx="12" cy="20" rx="12" ry="16" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          {/* Toilet bowl */}
          <ellipse cx="12" cy="16" rx="9" ry="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5"/>
          {/* Toilet seat */}
          <ellipse cx="12" cy="14" rx="7" ry="9" fill="none" stroke="currentColor" strokeWidth="1"/>
          {/* Tank */}
          <rect x="4" y="-4" width="16" height="20" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="2"/>
        </g>

        {/* Sink - front right */}
        <g transform="translate(200, 100)">
          {/* Sink basin */}
          <ellipse cx="16" cy="16" rx="14" ry="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5"/>
          {/* Sink counter */}
          <rect x="0" y="12" width="32" height="20" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="2"/>
          {/* Faucet */}
          <line x1="16" y1="8" x2="16" y2="0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="16" cy="0" r="1.5" fill="currentColor" fillOpacity="0.6"/>
          {/* Faucet handles */}
          <circle cx="12" cy="4" r="1" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="4" r="1" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Occasional water drip animation */}
          <motion.circle
            cx="16"
            cy="6"
            r="0.3"
            fill="var(--cyber-blue)"
            opacity="0"
            animate={{
              cy: [6, 16],
              opacity: [0, 0, 0, 0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.8, 0.9, 1],
            }}
          />
        </g>

        {/* Shower - front left */}
        <g transform="translate(40, 80)">
          {/* Shower base */}
          <rect x="0" y="16" width="40" height="40" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.5" rx="2"/>
          {/* Shower walls */}
          <rect x="0" y="0" width="2" height="56" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          <rect x="38" y="0" width="2" height="56" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          <rect x="0" y="0" width="40" height="2" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Shower head */}
          <circle cx="20" cy="6" r="3" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="20" y1="3" x2="20" y2="0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          
          {/* Water droplets animation */}
          <motion.g
            animate={{
              opacity: [0, 0, 0, 0, 0, 1, 0.8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1={16 + i * 1}
                y1="9"
                x2={14 + i * 1}
                y2="50"
                stroke="var(--cyber-blue)"
                strokeWidth="0.3"
                opacity="0.6"
                animate={{
                  y1: [9, 50],
                  y2: [50, 91],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.g>
          
          {/* Drain */}
          <circle cx="20" cy="48" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.5"/>
        </g>

        {/* Floor tiles pattern */}
        <g opacity="0.1">
          {[...Array(6)].map((_, i) => 
            [...Array(6)].map((_, j) => (
              <rect
                key={`${i}-${j}`}
                x={i * 50}
                y={j * 50}
                width="48"
                height="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
              />
            ))
          )}
        </g>

        {/* Ambient lighting effects */}
        <motion.circle
          cx="150"
          cy="50"
          r="100"
          fill="var(--cyber-blue)"
          opacity="0"
          animate={{
            opacity: [0, 0.02, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </svg>
    </div>
  );
}