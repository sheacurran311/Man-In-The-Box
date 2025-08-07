import { useState } from "react";
import { Volume2, VolumeX, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface AudioControlsProps {
  isEnabled: boolean;
  masterVolume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function AudioControls({ 
  isEnabled, 
  masterVolume, 
  onToggle, 
  onVolumeChange 
}: AudioControlsProps) {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setShowControls(!showControls)}
          variant="ghost"
          size="sm"
          className="glass-panel p-2 border-cyber-blue/30 hover:border-cyber-blue"
        >
          <Settings size={16} className="text-cyber-blue" />
        </Button>
        
        <Button
          onClick={onToggle}
          variant="ghost"
          size="sm"
          className={`glass-panel p-2 border-cyber-blue/30 hover:border-cyber-blue ${
            isEnabled ? '' : 'opacity-50'
          }`}
        >
          {isEnabled ? (
            <Volume2 size={16} className="text-cyber-blue" />
          ) : (
            <VolumeX size={16} className="text-gray-400" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-12 right-0 w-64"
          >
            <Card className="glass-panel p-4 border-cyber-blue/30">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-orbitron text-sm font-bold text-cyber-blue">
                    AUDIO SYSTEM
                  </h3>
                  <p className="text-xs text-gray-400 font-roboto-mono">
                    Immersive Soundscape Controls
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-roboto-mono text-gray-400">
                    MASTER VOLUME
                  </label>
                  <Slider
                    value={[masterVolume * 100]}
                    onValueChange={([value]) => onVolumeChange(value / 100)}
                    max={100}
                    step={1}
                    className="w-full"
                    disabled={!isEnabled}
                  />
                  <div className="text-xs text-cyber-blue font-roboto-mono text-center">
                    {Math.round(masterVolume * 100)}%
                  </div>
                </div>

                <div className="border-t border-cyber-blue/20 pt-3">
                  <div className="grid grid-cols-1 gap-2 text-xs font-roboto-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">AMBIENT LAYER</span>
                      <span className={isEnabled ? "text-neon-green" : "text-gray-500"}>
                        {isEnabled ? "ACTIVE" : "MUTED"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">UI SOUNDS</span>
                      <span className={isEnabled ? "text-neon-green" : "text-gray-500"}>
                        {isEnabled ? "ENABLED" : "DISABLED"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">EMOTIONAL CUES</span>
                      <span className={isEnabled ? "text-neon-green" : "text-gray-500"}>
                        {isEnabled ? "REACTIVE" : "SILENT"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500 font-roboto-mono">
                    Audio enhances the emotional AI experience
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}