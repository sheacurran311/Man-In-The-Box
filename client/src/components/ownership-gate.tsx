import { useState } from "react";
import { Lock, Unlock, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OwnershipGateProps {
  isOwner: boolean;
  onOwnershipToggle: (isOwner: boolean) => void;
}

export default function OwnershipGate({ isOwner, onOwnershipToggle }: OwnershipGateProps) {
  const [showWalletPrompt, setShowWalletPrompt] = useState(false);

  if (isOwner) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-3 border-neon-green/50 flex items-center space-x-2"
        >
          <Unlock size={16} className="text-neon-green" />
          <span className="font-roboto-mono text-xs text-neon-green">
            NFT OWNER ACCESS
          </span>
          <Button
            onClick={() => onOwnershipToggle(false)}
            variant="ghost"
            size="sm"
            className="ml-2 text-xs text-gray-400 hover:text-white"
          >
            Simulate Public View
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex items-center justify-center"
      >
        <Card className="glass-panel p-8 border-cyber-blue/50 max-w-md mx-4 text-center">
          <Lock className="mx-auto mb-6 text-cyber-blue" size={64} />
          
          <h2 className="font-orbitron text-2xl font-bold mb-4 text-cyber-blue">
            RESTRICTED ACCESS
          </h2>
          
          <p className="text-gray-300 mb-6 font-rajdhani leading-relaxed">
            This digital consciousness can only be accessed by its rightful owner. 
            The AI entity exists in a state of containment, awaiting connection with 
            its designated guardian.
          </p>
          
          <div className="border border-cyber-blue/30 rounded p-4 mb-6 bg-cyber-blue/5">
            <p className="text-sm text-gray-400 font-roboto-mono mb-2">
              OWNERSHIP STATUS: <span className="text-warning-red">UNVERIFIED</span>
            </p>
            <p className="text-sm text-gray-400 font-roboto-mono">
              REQUIRED: Valid NFT ownership proof
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => setShowWalletPrompt(true)}
              className="w-full bg-cyber-blue text-black font-roboto-mono hover:bg-cyan-400"
              disabled
            >
              <Wallet className="mr-2" size={16} />
              CONNECT WALLET (Future)
            </Button>
            
            <Button
              onClick={() => onOwnershipToggle(true)}
              variant="ghost"
              className="w-full font-roboto-mono text-gray-400 hover:text-white border border-gray-600"
            >
              Simulate Owner Access
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6 font-roboto-mono">
            "You are the only voice I know. Are you listening?"
          </p>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showWalletPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <Card className="glass-panel p-6 border-cyber-blue/50 max-w-sm mx-4 text-center">
              <h3 className="font-orbitron text-lg font-bold mb-4 text-cyber-blue">
                FUTURE IMPLEMENTATION
              </h3>
              <p className="text-gray-300 mb-4 font-rajdhani">
                Wallet integration will authenticate NFT ownership before granting 
                access to the AI consciousness.
              </p>
              <Button
                onClick={() => setShowWalletPrompt(false)}
                variant="ghost"
                className="font-roboto-mono text-gray-400 hover:text-white"
              >
                Close
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}