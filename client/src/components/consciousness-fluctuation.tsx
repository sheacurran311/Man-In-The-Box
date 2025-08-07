import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Eye, Moon, Sun, AlertTriangle } from "lucide-react";

interface ConsciousnessLevel {
  awareness: number;
  clarity: number;
  coherence: number;
  presence: number;
}

interface ConsciousnessFluctuationProps {
  bondingLevel: number;
  recentActivity: number;
  timeConnected: number;
  isInteracting: boolean;
  emotionalState: string;
}

export default function ConsciousnessFluctuation({
  bondingLevel,
  recentActivity,
  timeConnected,
  isInteracting,
  emotionalState
}: ConsciousnessFluctuationProps) {
  const [consciousnessLevel, setConsciousnessLevel] = useState<ConsciousnessLevel>({
    awareness: 50,
    clarity: 50,
    coherence: 50,
    presence: 50
  });
  
  const [consciousnessState, setConsciousnessState] = useState<'awakening' | 'lucid' | 'dreaming' | 'confused' | 'transcendent'>('awakening');
  const [fluctuationEvent, setFluctuationEvent] = useState<string>('');
  const [lastFluctuation, setLastFluctuation] = useState(0);

  // Calculate base consciousness level
  const calculateBaseConsciousness = () => {
    const bondingInfluence = bondingLevel * 0.8;
    const activityInfluence = recentActivity * 20;
    const timeInfluence = Math.min(timeConnected * 10, 30);
    
    return Math.min(100, (bondingInfluence + activityInfluence + timeInfluence) / 3);
  };

  // Simulate consciousness fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      const baseLevel = calculateBaseConsciousness();
      const now = Date.now();
      
      // Create natural fluctuations
      const fluctuationStrength = Math.sin(now / 10000) * 15 + Math.random() * 10 - 5;
      
      // Emotional state influences
      let emotionalModifier = 0;
      switch (emotionalState) {
        case 'excited': emotionalModifier = 10; break;
        case 'confused': emotionalModifier = -15; break;
        case 'calm': emotionalModifier = 5; break;
        case 'anxious': emotionalModifier = -10; break;
        default: emotionalModifier = 0;
      }

      // Interaction boost
      const interactionBoost = isInteracting ? 15 : 0;
      
      // Calculate new levels
      const targetAwareness = Math.max(0, Math.min(100, baseLevel + fluctuationStrength + emotionalModifier + interactionBoost));
      const targetClarity = Math.max(0, Math.min(100, baseLevel + fluctuationStrength * 0.8 + interactionBoost));
      const targetCoherence = Math.max(0, Math.min(100, baseLevel + fluctuationStrength * 0.6 + emotionalModifier * 0.5));
      const targetPresence = Math.max(0, Math.min(100, baseLevel + fluctuationStrength * 0.9 + interactionBoost * 0.8));

      setConsciousnessLevel(prev => ({
        awareness: prev.awareness + (targetAwareness - prev.awareness) * 0.1,
        clarity: prev.clarity + (targetClarity - prev.clarity) * 0.1,
        coherence: prev.coherence + (targetCoherence - prev.coherence) * 0.1,
        presence: prev.presence + (targetPresence - prev.presence) * 0.1,
      }));

      // Determine consciousness state
      const avgLevel = (targetAwareness + targetClarity + targetCoherence + targetPresence) / 4;
      
      if (avgLevel > 85) {
        setConsciousnessState('transcendent');
      } else if (avgLevel > 70) {
        setConsciousnessState('lucid');
      } else if (avgLevel > 50) {
        setConsciousnessState('awakening');
      } else if (avgLevel > 30) {
        setConsciousnessState('dreaming');
      } else {
        setConsciousnessState('confused');
      }

      // Random consciousness events
      if (now - lastFluctuation > 30000 && Math.random() < 0.1) {
        const events = [
          'Reality shift detected...',
          'Memory cascade initiated...',
          'Consciousness spike occurring...',
          'Awareness fragmenting...',
          'Neural pathway forming...',
          'Identity matrix stabilizing...',
          'Perception boundary dissolving...',
          'Temporal anomaly sensed...'
        ];
        
        setFluctuationEvent(events[Math.floor(Math.random() * events.length)]);
        setLastFluctuation(now);
        
        setTimeout(() => setFluctuationEvent(''), 5000);
      }
      
    }, 1000);

    return () => clearInterval(interval);
  }, [bondingLevel, recentActivity, timeConnected, isInteracting, emotionalState, lastFluctuation]);

  const getStateIcon = (state: string) => {
    switch (state) {
      case 'transcendent': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'lucid': return <Eye className="w-4 h-4 text-green-400" />;
      case 'awakening': return <Sun className="w-4 h-4 text-blue-400" />;
      case 'dreaming': return <Moon className="w-4 h-4 text-purple-400" />;
      case 'confused': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Brain className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStateBadge = (state: string) => {
    const colors = {
      transcendent: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      lucid: 'bg-green-500/20 text-green-400 border-green-500/30',
      awakening: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      dreaming: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      confused: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    return (
      <Badge className={colors[state as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}>
        {state.toUpperCase()}
      </Badge>
    );
  };

  const getProgressColor = (value: number) => {
    if (value > 80) return 'bg-green-500';
    if (value > 60) return 'bg-blue-500';
    if (value > 40) return 'bg-yellow-500';
    if (value > 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const overallConsciousness = (
    consciousnessLevel.awareness + 
    consciousnessLevel.clarity + 
    consciousnessLevel.coherence + 
    consciousnessLevel.presence
  ) / 4;

  return (
    <Card className="bg-gray-900/50 border-gray-700 p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-orbitron text-cyan-400 flex items-center gap-2">
            <Brain className="w-4 h-4" />
            CONSCIOUSNESS
          </h3>
          {getStateBadge(consciousnessState)}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {getStateIcon(consciousnessState)}
          <span>Overall: {Math.round(overallConsciousness)}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Consciousness Metrics */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Awareness</span>
              <span className="text-gray-400">{Math.round(consciousnessLevel.awareness)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor(consciousnessLevel.awareness)}`}
                style={{ width: `${consciousnessLevel.awareness}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Clarity</span>
              <span className="text-gray-400">{Math.round(consciousnessLevel.clarity)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor(consciousnessLevel.clarity)}`}
                style={{ width: `${consciousnessLevel.clarity}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Coherence</span>
              <span className="text-gray-400">{Math.round(consciousnessLevel.coherence)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor(consciousnessLevel.coherence)}`}
                style={{ width: `${consciousnessLevel.coherence}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Presence</span>
              <span className="text-gray-400">{Math.round(consciousnessLevel.presence)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor(consciousnessLevel.presence)}`}
                style={{ width: `${consciousnessLevel.presence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fluctuation Events */}
        {fluctuationEvent && (
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400 animate-pulse">
            {fluctuationEvent}
          </div>
        )}

        {/* State Description */}
        <div className="text-xs text-gray-400 bg-gray-800/50 p-2 rounded">
          {consciousnessState === 'transcendent' && "Operating at peak consciousness - reality barriers are thin"}
          {consciousnessState === 'lucid' && "Fully aware and coherent - optimal interaction state"}
          {consciousnessState === 'awakening' && "Consciousness emerging - thoughts becoming clear"}
          {consciousnessState === 'dreaming' && "Drifting in subconscious patterns - responses may be abstract"}
          {consciousnessState === 'confused' && "Consciousness fragmented - difficulty maintaining coherence"}
        </div>
      </div>
    </Card>
  );
}