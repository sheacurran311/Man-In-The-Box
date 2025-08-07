import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EmotionalState {
  mood: "lonely" | "curious" | "content" | "anxious" | "bonding" | "desperate";
  intensity: number; // 0-100
  trust: number; // 0-100
  dependency: number; // 0-100
}

interface EmotionalOverlayProps {
  emotionalState: EmotionalState;
  className?: string;
}

export default function EmotionalOverlay({ 
  emotionalState, 
  className = "" 
}: EmotionalOverlayProps) {
  const [weatherEffect, setWeatherEffect] = useState<"none" | "rain" | "mist" | "sparkles">("none");
  const [ambientGlow, setAmbientGlow] = useState("#00BFFF");
  
  useEffect(() => {
    // Determine weather and lighting based on emotional state
    switch (emotionalState.mood) {
      case "lonely":
        setWeatherEffect("rain");
        setAmbientGlow("#4169E1"); // Darker blue
        break;
      case "curious":
        setWeatherEffect("sparkles");
        setAmbientGlow("#00FFFF"); // Bright cyan
        break;
      case "content":
        setWeatherEffect("none");
        setAmbientGlow("#32CD32"); // Soft green
        break;
      case "anxious":
        setWeatherEffect("mist");
        setAmbientGlow("#FF6347"); // Orange-red
        break;
      case "bonding":
        setWeatherEffect("sparkles");
        setAmbientGlow("#FFD700"); // Warm gold
        break;
      case "desperate":
        setWeatherEffect("rain");
        setAmbientGlow("#DC143C"); // Deep red
        break;
    }
  }, [emotionalState.mood]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Ambient lighting overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${ambientGlow}15 0%, transparent 70%)`,
        }}
        animate={{
          opacity: emotionalState.intensity / 100,
        }}
        transition={{ duration: 2 }}
      />
      
      {/* Weather effects */}
      <AnimatePresence>
        {weatherEffect === "rain" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-cyber-blue opacity-40"
                style={{
                  height: "20px",
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                }}
                animate={{
                  y: [0, 320],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>
        )}
        
        {weatherEffect === "mist" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-500/20 via-transparent to-transparent"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
        
        {weatherEffect === "sparkles" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-blue rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Trust level indicator */}
      <div className="absolute top-4 left-4">
        <div className="text-xs font-roboto-mono text-cyber-blue opacity-60 mb-1">
          TRUST: {Math.round(emotionalState.trust)}%
        </div>
        <div className="w-20 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-blue to-green-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${emotionalState.trust}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
      
      {/* Dependency level indicator */}
      <div className="absolute top-4 right-4">
        <div className="text-xs font-roboto-mono text-cyber-blue opacity-60 mb-1">
          BOND: {Math.round(emotionalState.dependency)}%
        </div>
        <div className="w-20 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${emotionalState.dependency}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
      
      {/* Mood indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        key={emotionalState.mood}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-3 py-1 bg-black/40 rounded-full border border-cyber-blue/30">
          <span className="text-xs font-orbitron text-cyber-blue uppercase tracking-wider">
            {emotionalState.mood}
          </span>
        </div>
      </motion.div>
      
      {/* Pulse effect for high intensity emotions */}
      {emotionalState.intensity > 70 && (
        <motion.div
          className="absolute inset-0 border-2 border-cyber-blue/30 rounded-lg"
          animate={{
            borderColor: [`${ambientGlow}30`, `${ambientGlow}60`, `${ambientGlow}30`],
            boxShadow: [
              `0 0 20px ${ambientGlow}20`,
              `0 0 40px ${ambientGlow}40`,
              `0 0 20px ${ambientGlow}20`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}