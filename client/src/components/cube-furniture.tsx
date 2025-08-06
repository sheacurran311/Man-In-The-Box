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
        <g transform="translate(40, 200)">
          {/* Bed frame */}
          <rect x="0" y="0" width="80" height="50" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="2"/>
          {/* Mattress */}
          <rect x="2" y="-8" width="76" height="48" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5" rx="3"/>
          {/* Pillow */}
          <ellipse cx="15" cy="-4" rx="12" ry="8" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.5"/>
          {/* Headboard */}
          <rect x="-3" y="-15" width="6" height="65" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="1"/>
        </g>

        {/* Toilet - back right corner */}
        <g transform="translate(220, 200)">
          {/* Toilet base */}
          <ellipse cx="15" cy="25" rx="15" ry="20" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          {/* Toilet bowl */}
          <ellipse cx="15" cy="20" rx="12" ry="15" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5"/>
          {/* Toilet seat */}
          <ellipse cx="15" cy="18" rx="10" ry="12" fill="none" stroke="currentColor" strokeWidth="1"/>
          {/* Tank */}
          <rect x="5" y="-5" width="20" height="25" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="2"/>
        </g>

        {/* Sink - front right */}
        <g transform="translate(200, 80)">
          {/* Sink basin */}
          <ellipse cx="20" cy="20" rx="18" ry="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.5"/>
          {/* Sink counter */}
          <rect x="0" y="15" width="40" height="25" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5" rx="2"/>
          {/* Faucet */}
          <line x1="20" y1="10" x2="20" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="0" r="2" fill="currentColor" fillOpacity="0.6"/>
          {/* Faucet handles */}
          <circle cx="15" cy="5" r="1.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="25" cy="5" r="1.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Occasional water drip animation */}
          <motion.circle
            cx="20"
            cy="8"
            r="0.5"
            fill="var(--cyber-blue)"
            opacity="0"
            animate={{
              cy: [8, 20],
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
        <g transform="translate(60, 60)">
          {/* Shower base */}
          <rect x="0" y="20" width="50" height="50" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.5" rx="2"/>
          {/* Shower walls */}
          <rect x="0" y="0" width="2" height="70" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          <rect x="48" y="0" width="2" height="70" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          <rect x="0" y="0" width="50" height="2" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          
          {/* Shower head */}
          <circle cx="25" cy="8" r="4" fill="url(#furnitureGradient)" stroke="currentColor" strokeWidth="0.5"/>
          <line x1="25" y1="4" x2="25" y2="0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          
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
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={i}
                x1={20 + i * 1}
                y1="12"
                x2={18 + i * 1}
                y2="65"
                stroke="var(--cyber-blue)"
                strokeWidth="0.5"
                opacity="0.6"
                animate={{
                  y1: [12, 65],
                  y2: [65, 118],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.g>
          
          {/* Drain */}
          <circle cx="25" cy="60" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.5"/>
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