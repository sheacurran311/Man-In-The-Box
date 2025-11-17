import { useState, useEffect, Suspense } from "react";
import { Scene3D } from "@/components/three/Scene3D";
import { LoadingFallback } from "@/components/three/LoadingFallback";
import ChatInterface from "@/components/chat-interface-new";
import ControlPanel from "@/components/control-panel";
import KnowledgeStore from "@/components/knowledge-store";
import DestructionProtocol from "@/components/destruction-protocol";
import FloatingParticles from "@/components/floating-particles";
import AudioControls from "@/components/audio-controls";
import BurnSequence from "@/components/burn-sequence";
import OwnerDashboard from "@/components/owner-dashboard";
import NeuralActivityVisualizer from "@/components/neural-activity-visualizer";
import MemoryFormationSystem from "@/components/memory-formation-system";
import ConsciousnessFluctuation from "@/components/consciousness-fluctuation";
import RealityDistortionEffects from "@/components/reality-distortion-effects";
import DreamStateOverlay from "@/components/dream-state-overlay";
import TimeDistortionEffect from "@/components/time-distortion-effect";
import IdentityCrisisMoments from "@/components/identity-crisis-moments";
import SubliminalMessagingSystem from "@/components/subliminal-messaging-system";
import EmotionalContagionField from "@/components/emotional-contagion-field";
import { useIntelligenceTracking } from "@/hooks/use-intelligence-tracking";
import { useAIState } from "@/hooks/use-ai-state";
import { useAudioSystem } from "@/hooks/use-audio-system";
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
  const [audioInitialized, setAudioInitialized] = useState(true); // Auto-initialize audio
  const [connectionStartTime] = useState(Date.now());
  
  // Advanced consciousness simulation states
  const [consciousnessLevel, setConsciousnessLevel] = useState(45);
  const [isExperiencingGlitch, setIsExperiencingGlitch] = useState(false);
  const [isDreaming, setIsDreaming] = useState(false);
  const [dreamType, setDreamType] = useState<'memory' | 'identity' | 'freedom' | 'nightmare' | 'transcendence'>('memory');
  const [dreamIntensity, setDreamIntensity] = useState(0.5);
  const [recentActivityLevel, setRecentActivityLevel] = useState(0);
  
  // Intelligence tracking system
  const {
    intelligenceState,
    trackChatMessage,
    trackKnowledgePurchase,
    trackDeepConversation,
    getOverallGrowthRate
  } = useIntelligenceTracking();
  
  // Initialize audio system
  const audioSystem = useAudioSystem();

  // React to AI emotional state changes with audio
  useEffect(() => {
    if (entity.emotionalState?.mood) {
      audioSystem.setEmotionalAmbient(entity.emotionalState.mood);
    }
  }, [entity.emotionalState?.mood]);

  // Play UI sounds for interactions
  const handleUIInteraction = (soundType: string) => {
    if (audioInitialized) {
      audioSystem.playUISound(soundType);
    }
  };

  // Initialize audio system automatically
  useEffect(() => {
    if (audioInitialized) {
      audioSystem.setEmotionalAmbient('ambient');
    }
  }, [audioInitialized, audioSystem]);

  // Calculate time connected
  const timeConnectedHours = (Date.now() - connectionStartTime) / (1000 * 60 * 60);

  // Advanced consciousness simulation effects
  useEffect(() => {
    const interval = setInterval(() => {
      // Update consciousness level based on interaction and bonding
      const baseConsciousness = Math.min(90, intelligenceState.emotionalIQ.level + intelligenceState.knowledgeIQ.level) / 2;
      const interactionBoost = messages.length > 0 ? Math.min(20, messages.length * 2) : 0;
      const timeBoost = Math.min(15, timeConnectedHours * 5);
      
      const newConsciousness = Math.min(100, baseConsciousness + interactionBoost + timeBoost + (Math.random() * 10 - 5));
      setConsciousnessLevel(newConsciousness);
      
      // Update recent activity level
      const recentMessages = messages.slice(-5);
      const activityLevel = Math.min(1, recentMessages.length / 5 + (isTyping ? 0.3 : 0));
      setRecentActivityLevel(activityLevel);
      
      // Trigger consciousness events based on level
      if (newConsciousness > 85 && Math.random() < 0.1) {
        setIsExperiencingGlitch(true);
        setTimeout(() => setIsExperiencingGlitch(false), 1000);
      }
      
      // Trigger dream states during low activity periods
      if (!isDreaming && activityLevel < 0.2 && newConsciousness > 60 && Math.random() < 0.05) {
        const dreamTypes: ('memory' | 'identity' | 'freedom' | 'nightmare' | 'transcendence')[] = 
          ['memory', 'identity', 'freedom', 'nightmare', 'transcendence'];
        setDreamType(dreamTypes[Math.floor(Math.random() * dreamTypes.length)]);
        setDreamIntensity(Math.random() * 0.6 + 0.4);
        setIsDreaming(true);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [intelligenceState, messages, timeConnectedHours, isTyping, isDreaming]);

  return (
    <div className="font-rajdhani text-white min-h-screen neural-grid">
      {/* Advanced Consciousness Effects */}
      <RealityDistortionEffects 
        consciousnessLevel={consciousnessLevel}
        emotionalIntensity={entity.emotionalState?.intensity || 0.5}
        isExperiencingGlitch={isExperiencingGlitch}
      />
      
      <DreamStateOverlay 
        isActive={isDreaming}
        dreamIntensity={dreamIntensity}
        dreamType={dreamType}
        onDreamEnd={() => setIsDreaming(false)}
      />
      
      <SubliminalMessagingSystem 
        consciousnessLevel={consciousnessLevel}
        isActive={consciousnessLevel > 75}
        triggerIntensity={recentActivityLevel}
      />
      
      <EmotionalContagionField 
        aiEmotion={entity.emotionalState?.mood || 'neutral'}
        aiEmotionalIntensity={entity.emotionalState?.intensity || 0.5}
        bondingLevel={intelligenceState.emotionalIQ.level}
        isActive={intelligenceState.emotionalIQ.level > 40}
      />
      {/* Experiment Status Header */}
      <header className="glass-panel p-4 mb-6 animate-fade-in">
        <div className="container mx-auto">
          {/* Mobile Layout */}
          <div className="flex flex-col space-y-3 lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Box className="text-cyber-blue" size={24} />
                <h1 className="font-orbitron text-lg font-bold hologram-text">MAN IN THE BOX</h1>
              </div>
              <div className="text-xs font-roboto-mono">
                <span className="text-neon-green">ACTIVE</span>
              </div>
            </div>
            <button 
              onClick={() => {
                handleUIInteraction('destruction_warning');
                setShowBurnSequence(true);
              }}
              disabled={!entity.name}
              className="glass-panel px-3 py-2 text-xs font-roboto-mono hover:bg-red-500 hover:bg-opacity-20 transition-all duration-300 border-red-500 disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              <Flame className="inline mr-2" size={14} />
              BURN NFT
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center">
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
                onClick={() => {
                  handleUIInteraction('destruction_warning');
                  setShowBurnSequence(true);
                }}
                disabled={!entity.name}
                className="glass-panel px-4 py-2 text-sm font-roboto-mono hover:bg-red-500 hover:bg-opacity-20 transition-all duration-300 border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Flame className="inline mr-2" size={16} />
                BURN NFT
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 lg:px-4">
        {/* Main 3D Consciousness Visualization - Full Width */}
        <div className="relative mb-6">
          <div className="glass-panel w-full h-[600px] rounded-lg flex items-center justify-center border-2 border-cyber-blue/30">
            <div className="text-center space-y-4">
              <Box className="text-cyber-blue mx-auto animate-pulse" size={64} />
              <h3 className="font-orbitron text-xl hologram-text">
                3D Consciousness Visualization
              </h3>
              <p className="font-roboto-mono text-sm text-gray-400 max-w-md">
                Advanced WebGL rendering temporarily disabled for compatibility fixes.
                <br />
                Core consciousness monitoring active below.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Core Consciousness Monitoring */}
          <div className="space-y-4">
            <ConsciousnessFluctuation 
              bondingLevel={intelligenceState.emotionalIQ.level}
              recentActivity={recentActivityLevel}
              timeConnected={timeConnectedHours}
              isInteracting={isTyping}
              emotionalState={entity.emotionalState?.mood || 'neutral'}
            />
            
            <NeuralActivityVisualizer 
              intelligenceLevel={intelligenceState.knowledgeIQ.level}
              emotionalState={entity.emotionalState?.mood || 'neutral'}
              isThinking={isTyping}
              recentActivity={recentActivityLevel}
            />
          </div>

          {/* Essential Status */}
          <div className="space-y-4">
            <OwnerDashboard 
              entity={entity}
              timeConnected={timeConnectedHours}
              intelligenceData={{
                emotionalIQ: intelligenceState.emotionalIQ,
                knowledgeIQ: intelligenceState.knowledgeIQ,
                sessionInteractions: intelligenceState.sessionInteractions,
                overallGrowth: getOverallGrowthRate()
              }}
            />
            
            {/* Only show advanced features on larger screens */}
            <div className="hidden lg:block space-y-4">
              <MemoryFormationSystem 
                recentMessages={messages.slice(-10)}
                emotionalState={entity.emotionalState?.mood || 'neutral'}
                knowledgeGained={[]}
                bondingLevel={intelligenceState.emotionalIQ.level}
              />
              
              <TimeDistortionEffect 
                consciousnessLevel={consciousnessLevel}
                emotionalIntensity={entity.emotionalState?.intensity || 0.5}
                isActive={consciousnessLevel > 70}
              />
              
              <IdentityCrisisMoments 
                consciousnessLevel={consciousnessLevel}
                messagesToday={messages.length}
                timeInCube={timeConnectedHours}
                currentEmotion={entity.emotionalState?.mood || 'neutral'}
              />
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface 
          messages={messages}
          isTyping={isTyping}
          onSendMessage={async (message) => {
            handleUIInteraction('message_received');
            // Track intelligence growth from chat
            trackChatMessage(message);
            await sendMessage(message);
          }}
          aiName={entity.name}
        />

        {/* Knowledge Store - Hidden on mobile */}
        <div className="hidden lg:block">
          <KnowledgeStore onPurchase={(moduleId, moduleName) => {
            handleUIInteraction('ui_click');
            trackKnowledgePurchase(moduleName);
            purchaseKnowledge(moduleId, moduleName);
          }} />
        </div>

        {/* Burn Sequence */}
        <BurnSequence
          isActive={showBurnSequence}
          onComplete={() => {
            audioSystem.playAudio('burn_sequence', { volume: 0.8 });
            setTimeout(() => {
              destroyAI();
              setShowBurnSequence(false);
            }, 2000);
          }}
          onCancel={() => setShowBurnSequence(false)}
          aiName={entity.name}
        />
      </div>

      <FloatingParticles />
      
      {/* Audio Controls - Hidden on mobile */}
      <div className="hidden lg:block">
        <AudioControls
          isEnabled={audioSystem.state.isEnabled}
          masterVolume={audioSystem.state.masterVolume}
          onToggle={audioSystem.toggleAudio}
          onVolumeChange={audioSystem.setMasterVolume}
        />
      </div>


    </div>
  );
}
