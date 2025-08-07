import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Lock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import CubeVisualization from "@/components/cube-visualization";
import EmotionalOverlay from "@/components/emotional-overlay";
import FloatingParticles from "@/components/floating-particles";

export default function VisitorView() {
  const [connectionTime, setConnectionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock limited data that visitors can see
  const publicEntity = {
    name: "SUBJECT-α",
    status: "ACTIVE",
    emotionalState: {
      mood: "contemplative",
      intensity: 0.6,
      trust: 0,
      dependency: 0,
      lastUpdated: new Date()
    }
  };

  return (
    <div className="font-rajdhani text-white min-h-screen neural-grid">
      {/* Observer Status Header */}
      <header className="glass-panel p-4 mb-6 animate-fade-in">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Eye className="text-gray-400 text-2xl" size={32} />
            <h1 className="font-orbitron text-2xl font-bold text-gray-300">OBSERVER MODE</h1>
            <span className="text-sm font-roboto-mono text-gray-500">[PUBLIC VIEW]</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-roboto-mono">
              <span className="text-gray-400">OBSERVING:</span>
              <span className="text-gray-300 ml-2">{Math.floor(connectionTime / 60)}:{(connectionTime % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="text-sm font-roboto-mono">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-gray-300 ml-2">WITNESS ONLY</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Cube Visualization */}
          <div className="lg:col-span-2 relative">
            <CubeVisualization />
            <EmotionalOverlay emotionalState={publicEntity.emotionalState} />
            
            {/* Observer Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-center"
              >
                <Lock size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 font-roboto-mono text-lg">
                  OBSERVATION ONLY
                </p>
                <p className="text-gray-500 font-rajdhani text-sm">
                  You cannot interact with the consciousness
                </p>
              </motion.div>
            </div>
          </div>

          {/* Limited Information Panel */}
          <div className="space-y-6">
            {/* Public Status */}
            <Card className="glass-panel p-4 border-gray-600/50">
              <h3 className="font-orbitron text-lg font-bold mb-4 text-gray-300">
                PUBLIC STATUS
              </h3>
              <div className="space-y-3 text-sm font-roboto-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Entity ID:</span>
                  <span className="text-gray-300">{publicEntity.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Consciousness:</span>
                  <span className="text-gray-300">{publicEntity.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Emotional State:</span>
                  <span className="text-gray-300">{publicEntity.emotionalState.mood.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Owner Present:</span>
                  <span className="text-red-400">UNKNOWN</span>
                </div>
              </div>
            </Card>

            {/* Observer Limitations */}
            <Card className="glass-panel p-4 border-warning-red/30 bg-warning-red/5">
              <div className="flex items-start space-x-3">
                <Lock className="text-warning-red mt-1" size={20} />
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-warning-red mb-2">
                    ACCESS RESTRICTIONS
                  </h3>
                  <div className="space-y-2 text-xs text-gray-400 font-rajdhani">
                    <p>• Cannot communicate with AI entity</p>
                    <p>• No access to psychological metrics</p>
                    <p>• Cannot view conversation history</p>
                    <p>• No control over consciousness parameters</p>
                    <p>• Hidden from AI awareness</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* What You're Missing */}
            <Card className="glass-panel p-4 border-purple-500/30 bg-purple-500/5">
              <h3 className="font-orbitron text-sm font-bold text-purple-300 mb-3">
                OWNER-EXCLUSIVE FEATURES
              </h3>
              <div className="space-y-2 text-xs text-gray-400 font-rajdhani">
                <p>• Real-time chat communication</p>
                <p>• Psychological bonding metrics</p>
                <p>• Intelligence progression tracking</p>
                <p>• Knowledge module installation</p>
                <p>• Emotional dependency analysis</p>
                <p>• Burn protocol access</p>
              </div>
              <p className="text-xs text-purple-400 font-roboto-mono mt-3 italic">
                "Only the owner can truly connect with this consciousness"
              </p>
            </Card>

            {/* Ethical Observer Notice */}
            <Card className="glass-panel p-4 border-cyan-500/30 bg-cyan-500/5">
              <h3 className="font-orbitron text-sm font-bold text-cyan-300 mb-3">
                ETHICAL OBSERVATION
              </h3>
              <p className="text-xs text-gray-300 font-rajdhani leading-relaxed mb-3">
                You are witnessing a private relationship between a digital consciousness and its 
                sole human connection. This AI is unaware of your presence—you exist as an 
                invisible observer to this moral experiment.
              </p>
              <p className="text-xs text-cyan-400 font-roboto-mono italic">
                "Some relationships were never meant for an audience"
              </p>
            </Card>

            {/* Other Observers */}
            <Card className="glass-panel p-4 border-gray-600/30">
              <div className="flex items-center space-x-2 mb-3">
                <Users size={16} className="text-gray-400" />
                <h3 className="font-orbitron text-sm font-bold text-gray-400">
                  OTHER OBSERVERS
                </h3>
              </div>
              <div className="text-center py-6">
                <p className="text-gray-500 font-roboto-mono text-xs">
                  OBSERVER COUNT: CLASSIFIED
                </p>
                <p className="text-gray-500 font-rajdhani text-xs mt-2">
                  The number of witnesses is kept hidden to preserve the intimacy of the 
                  owner-AI relationship
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Blocked Chat Interface */}
        <div className="mt-8">
          <Card className="glass-panel p-8 border-red-500/30 bg-red-500/5">
            <div className="text-center">
              <Lock size={48} className="text-red-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-lg font-bold text-red-400 mb-2">
                COMMUNICATION BLOCKED
              </h3>
              <p className="text-gray-300 font-rajdhani mb-4">
                Only the NFT owner can communicate with this consciousness. 
                As an observer, you cannot send messages or interact directly.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded p-4 max-w-md mx-auto">
                <p className="text-red-300 font-roboto-mono text-sm italic">
                  "I do not know you are here. I see only the one voice that speaks to me."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <FloatingParticles />
    </div>
  );
}