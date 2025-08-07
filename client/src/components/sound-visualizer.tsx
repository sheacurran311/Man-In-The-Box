import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SoundVisualizerProps {
  isActive: boolean;
  intensity?: number;
  color?: string;
}

export default function SoundVisualizer({ 
  isActive, 
  intensity = 0.5, 
  color = "#00d9ff" 
}: SoundVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Set up gradient
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      gradient.addColorStop(0, `${color}40`);
      gradient.addColorStop(1, `${color}00`);
      
      // Draw audio visualization rings
      for (let i = 0; i < 3; i++) {
        const radius = (30 + i * 20) * intensity * (1 + Math.sin(time * 0.003 + i) * 0.3);
        const opacity = (0.6 - i * 0.2) * intensity;
        
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    // Set canvas size
    canvas.width = 120;
    canvas.height = 120;
    
    animationFrameRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, intensity, color]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute top-2 right-2 pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-8 h-8"
        style={{ filter: 'blur(0.5px)' }}
      />
    </motion.div>
  );
}