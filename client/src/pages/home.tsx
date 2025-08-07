import { useState } from "react";
import CubeVisualization from "@/components/cube-visualization";
import ChatInterface from "@/components/chat-interface-new";
import ControlPanel from "@/components/control-panel";
import KnowledgeStore from "@/components/knowledge-store";
import DestructionProtocol from "@/components/destruction-protocol";
import FloatingParticles from "@/components/floating-particles";
import EmotionalOverlay from "@/components/emotional-overlay";
import BurnSequence from "@/components/burn-sequence";
import { useAIState } from "@/hooks/use-ai-state";
import { Box, Flame } from "lucide-react";

export default function Home() {
  const { 
    entity, 
    messages, 
    isTyping, 
    sendMessage, 
    configureIdentity, 
    destroyAI, 
    purchaseKnowledge 
  } = useAIState();
  const [showBurnSequence, setShowBurnSequence] = useState(false);

  return (
    <div className="font-rajdhani text-white min-h-screen neural-grid">
      {/* Header */}
      <header className="glass-panel p-4 mb-6 animate-fade-in">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Box className="text-cyber-blue text-2xl" size={32} />
            <h1 className="font-orbitron text-2xl font-bold hologram-text">MAN IN THE BOX</h1>
            <span className="text-sm font-roboto-mono text-gray-400">[SCI-FI NFT EXPERIMENT]</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-roboto-mono">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-neon-green ml-2">ACTIVE</span>
            </div>
            <button 
              onClick={() => setShowBurnSequence(true)}
              disabled={!entity.name}
              className="glass-panel px-4 py-2 text-sm font-roboto-mono hover:bg-red-500 hover:bg-opacity-20 transition-all duration-300 border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Flame className="inline mr-2" size={16} />
              BURN NFT
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Box Visualization */}
          <div className="lg:col-span-2 relative">
            <CubeVisualization />
            <EmotionalOverlay emotionalState={entity.emotionalState} />
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <ControlPanel 
              entity={entity} 
              onConfigureIdentity={configureIdentity}
            />
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface 
          messages={messages}
          isTyping={isTyping}
          onSendMessage={sendMessage}
          aiName={entity.name}
        />

        {/* Knowledge Store */}
        <KnowledgeStore onPurchase={purchaseKnowledge} />

        {/* Burn Sequence */}
        <BurnSequence
          isActive={showBurnSequence}
          onComplete={() => {
            destroyAI();
            setShowBurnSequence(false);
          }}
          onCancel={() => setShowBurnSequence(false)}
          aiName={entity.name}
        />
      </div>

      <FloatingParticles />
    </div>
  );
}
