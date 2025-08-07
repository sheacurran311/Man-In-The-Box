import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AIHologramFigure from "./ai-hologram-figure";
import CubeFurniture from "./cube-furniture";
import SoundVisualizer from "./sound-visualizer";

interface CubeVisualizationProps {}

export default function CubeVisualization({}: CubeVisualizationProps = {}) {
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
      
      <div className="cube-container flex justify-center items-center h-96 relative">
        <SoundVisualizer 
          isActive={true} 
          intensity={0.7}
          color="#00d9ff"
        />
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
            <CubeFurniture />
            <AIHologramFigure />
          </div>
          <div className="cube-face">
            <CubeFurniture />
          </div>
          <div className="cube-face">
            <CubeFurniture />
          </div>
          <div className="cube-face">
            <CubeFurniture />
          </div>
          <div className="cube-face">
            <CubeFurniture />
          </div>
          <div className="cube-face">
            <CubeFurniture />
          </div>
        </motion.div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-300 mb-2">Phase 2: Enhanced Emotional AI Environment</p>
        <div className="flex justify-center space-x-4 text-xs font-roboto-mono">
          <span className="text-cyber-blue">
            STATUS: <span className="text-neon-green">ACTIVE</span>
          </span>
          <span className="text-cyber-blue">
            MODE: <span className="text-yellow-400">REACTIVE</span>
          </span>
          <span className="text-cyber-blue">
            SIMULATION: <span className="text-warning-red">ENHANCED</span>
          </span>
        </div>
      </div>
    </div>
  );
}
