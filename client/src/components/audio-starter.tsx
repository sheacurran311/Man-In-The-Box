import { useState } from "react";
import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AudioStarterProps {
  onStart: () => void;
}

export default function AudioStarter({ onStart }: AudioStarterProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    onStart();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="glass-panel p-8 border-cyber-blue/50 max-w-md mx-4 text-center">
        <Volume2 className="mx-auto mb-4 text-cyber-blue" size={48} />
        <h3 className="font-orbitron text-xl font-bold mb-4 text-cyber-blue">
          AUDIO EXPERIENCE AVAILABLE
        </h3>
        <p className="text-gray-300 mb-6 font-rajdhani">
          Enable immersive soundscapes and audio feedback to enhance your interaction with the AI consciousness. 
          Features procedurally generated ambient sounds that react to emotional states.
        </p>
        <div className="space-y-3">
          <Button
            onClick={handleStart}
            className="w-full bg-cyber-blue text-black font-roboto-mono hover:bg-cyan-400"
          >
            ENABLE AUDIO EXPERIENCE
          </Button>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            className="w-full font-roboto-mono text-gray-400 hover:text-white"
          >
            Continue silently
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-4 font-roboto-mono">
          Audio can be controlled via settings at any time
        </p>
      </div>
    </motion.div>
  );
}