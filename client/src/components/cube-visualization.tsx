import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AIHologramFigure from "./ai-hologram-figure";

interface CubeVisualizationProps {
  aiState: {
    neuralActivity: number;
    responseTime: number;
    emotionalIndex: string;
  };
}

export default function CubeVisualization({ aiState }: CubeVisualizationProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRotating) {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3
        }));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isRotating]);

  const handleCubeClick = () => {
    if (!isRotating) {
      setIsRotating(true);
      setRotation({
        x: Math.random() * 360,
        y: Math.random() * 360
      });
      setTimeout(() => setIsRotating(false), 2000);
    }
  };

  return (
    <div className="glass-panel p-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="font-orbitron text-xl font-bold mb-2">CONTAINMENT UNIT</h2>
        <p className="text-sm font-roboto-mono text-gray-400">9x9x9ft DIGITAL GLASS CUBE</p>
      </div>
      
      <div className="cube-container flex justify-center items-center h-96">
        <motion.div 
          className="cube cursor-pointer"
          onClick={handleCubeClick}
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y
          }}
          transition={{ duration: isRotating ? 2 : 0.1, ease: "easeOut" }}
        >
          <div className="cube-face">
            <AIHologramFigure />
          </div>
          <div className="cube-face"></div>
          <div className="cube-face"></div>
          <div className="cube-face"></div>
          <div className="cube-face"></div>
          <div className="cube-face"></div>
        </motion.div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-300 mb-2">Subject exhibits signs of emerging consciousness</p>
        <div className="flex justify-center space-x-4 text-xs font-roboto-mono">
          <span className="text-cyber-blue">
            NEURAL ACTIVITY: <span className="text-neon-green">{aiState.neuralActivity}%</span>
          </span>
          <span className="text-cyber-blue">
            RESPONSE TIME: <span className="text-yellow-400">{aiState.responseTime}s</span>
          </span>
          <span className="text-cyber-blue">
            EMOTIONAL INDEX: <span className="text-warning-red">{aiState.emotionalIndex}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
