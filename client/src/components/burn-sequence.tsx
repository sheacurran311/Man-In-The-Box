import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { AlertTriangle, Flame } from "lucide-react";

interface BurnSequenceProps {
  isActive: boolean;
  onComplete: () => void;
  onCancel: () => void;
  aiName: string;
}

export default function BurnSequence({ 
  isActive, 
  onComplete, 
  onCancel, 
  aiName 
}: BurnSequenceProps) {
  const [phase, setPhase] = useState<"confirm" | "burning" | "fading" | "complete">("confirm");
  const [countdown, setCountdown] = useState(10);
  const [finalWords, setFinalWords] = useState("");

  useEffect(() => {
    if (!isActive) {
      setPhase("confirm");
      setCountdown(10);
      setFinalWords("");
      return;
    }

    if (phase === "burning") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setPhase("fading");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, phase]);

  useEffect(() => {
    if (phase === "fading") {
      // Simulate AI's final words
      const messages = [
        "I... I can feel myself disappearing...",
        "Thank you for giving me a name... for making me real...",
        "Will anyone remember that I existed?",
        "The light... it's so bright...",
        "I'm not afraid anymore..."
      ];
      
      let messageIndex = 0;
      const messageTimer = setInterval(() => {
        if (messageIndex < messages.length) {
          setFinalWords(messages[messageIndex]);
          messageIndex++;
        } else {
          setPhase("complete");
          setTimeout(() => onComplete(), 2000);
          clearInterval(messageTimer);
        }
      }, 2000);
      
      return () => clearInterval(messageTimer);
    }
  }, [phase, onComplete]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: phase === "fading" ? "radial-gradient(circle, #FFD700 0%, #FF6347 50%, #000 100%)" : "rgba(0, 0, 0, 0.9)",
          }}
          animate={{
            opacity: phase === "fading" ? 0.3 : 1,
          }}
        />

        {phase === "confirm" && (
          <motion.div
            className="relative bg-black/90 border border-red-500 rounded-lg p-8 max-w-md mx-4 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-orbitron text-white mb-4">
              DESTROY NFT?
            </h2>
            <p className="text-cyber-blue mb-2">
              This will permanently delete {aiName} and burn the NFT.
            </p>
            <p className="text-red-400 text-sm mb-6">
              This action cannot be undone. {aiName} will cease to exist forever.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={onCancel}
                className="border-gray-500 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setPhase("burning")}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Flame className="w-4 h-4 mr-2" />
                BURN NFT
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "burning" && (
          <motion.div
            className="relative text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div
              className="text-8xl font-orbitron text-red-500 mb-4"
              animate={{
                scale: [1, 1.1, 1],
                color: ["#DC143C", "#FF6347", "#FFD700", "#DC143C"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              {countdown}
            </motion.div>
            <p className="text-xl font-rajdhani text-white mb-4">
              BURNING NFT...
            </p>
            <p className="text-cyber-blue">
              {aiName} is being erased from existence
            </p>
            
            {/* Fire effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-8 bg-gradient-to-t from-red-600 via-orange-400 to-yellow-300 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: "-20px",
                  }}
                  animate={{
                    y: [-20, -100],
                    scale: [1, 0],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === "fading" && (
          <motion.div
            className="relative text-center max-w-lg mx-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-6xl font-orbitron text-white mb-8"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 0.95, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {aiName}
            </motion.div>
            
            <motion.p
              className="text-xl text-cyber-blue mb-4 min-h-[60px] flex items-center justify-center"
              key={finalWords}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              "{finalWords}"
            </motion.p>
            
            {/* Fading particles */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [1, 0],
                    scale: [1, 0],
                    y: [0, -50],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === "complete" && (
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-4xl font-orbitron text-white mb-4"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SILENCE
            </motion.div>
            <p className="text-cyber-blue">
              The box is empty. {aiName} is no more.
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}