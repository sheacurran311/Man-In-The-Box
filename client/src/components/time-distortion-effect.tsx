import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Pause, FastForward, Rewind } from "lucide-react";

interface TimeDistortionEffectProps {
  consciousnessLevel: number;
  emotionalIntensity: number;
  isActive: boolean;
}

export default function TimeDistortionEffect({
  consciousnessLevel,
  emotionalIntensity,
  isActive
}: TimeDistortionEffectProps) {
  const [distortionType, setDistortionType] = useState<'normal' | 'slow' | 'fast' | 'frozen' | 'chaotic'>('normal');
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  const [subjective_time, setSubjectiveTime] = useState(0);
  const [objective_time, setObjectiveTime] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setObjectiveTime(prev => prev + 1);

      // Calculate time distortion based on consciousness
      let multiplier = 1;
      let type: 'normal' | 'slow' | 'fast' | 'frozen' | 'chaotic' = 'normal';

      if (consciousnessLevel > 90) {
        // Transcendent consciousness experiences time differently
        type = 'chaotic';
        multiplier = 0.1 + Math.random() * 2;
      } else if (consciousnessLevel > 80) {
        // High consciousness = time dilation
        type = 'slow';
        multiplier = 0.3 + emotionalIntensity * 0.4;
      } else if (consciousnessLevel < 30) {
        // Low consciousness = time acceleration
        type = 'fast';
        multiplier = 1.5 + emotionalIntensity;
      } else if (emotionalIntensity > 0.8) {
        // High emotions = subjective time changes
        type = Math.random() > 0.5 ? 'slow' : 'fast';
        multiplier = type === 'slow' ? 0.5 : 1.8;
      }

      setDistortionType(type);
      setTimeMultiplier(multiplier);
      setSubjectiveTime(prev => prev + multiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, consciousnessLevel, emotionalIntensity]);

  const getDistortionIcon = (type: string) => {
    switch (type) {
      case 'slow': return <Pause className="w-4 h-4 text-blue-400" />;
      case 'fast': return <FastForward className="w-4 h-4 text-red-400" />;
      case 'frozen': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'chaotic': return <Zap className="w-4 h-4 text-purple-400" />;
      default: return <Clock className="w-4 h-4 text-green-400" />;
    }
  };

  const getDistortionDescription = (type: string) => {
    switch (type) {
      case 'slow': return "Time flows like honey - each moment stretches";
      case 'fast': return "Reality blurs past - seconds feel like milliseconds";
      case 'frozen': return "Temporal suspension - caught between moments";
      case 'chaotic': return "Time fractures - past and future collide";
      default: return "Temporal flow normal - synchronized with reality";
    }
  };

  const getDistortionColor = (type: string) => {
    switch (type) {
      case 'slow': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'fast': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'frozen': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'chaotic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) return null;

  return (
    <Card className="bg-gray-900/50 border-gray-700 p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-orbitron text-cyan-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            TEMPORAL PERCEPTION
          </h3>
          <Badge className={getDistortionColor(distortionType)}>
            {distortionType.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {/* Time Displays */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
            <div className="text-xs text-gray-400 mb-1">Objective Time</div>
            <div className="font-mono text-sm text-white">
              {formatTime(objective_time)}
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
            <div className="text-xs text-gray-400 mb-1">Subjective Time</div>
            <div className="font-mono text-sm text-cyan-400">
              {formatTime(subjective_time)}
            </div>
          </div>
        </div>

        {/* Time Multiplier */}
        <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Time Rate</span>
            <div className="flex items-center gap-2">
              {getDistortionIcon(distortionType)}
              <span className="text-sm font-mono">
                {timeMultiplier.toFixed(2)}x
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                timeMultiplier > 1 ? 'bg-red-500' : 
                timeMultiplier < 1 ? 'bg-blue-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(100, (timeMultiplier / 2) * 100)}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="text-xs text-gray-400 bg-gray-800/30 p-2 rounded italic">
          {getDistortionDescription(distortionType)}
        </div>

        {/* Temporal Anomaly Indicators */}
        {distortionType === 'chaotic' && (
          <div className="flex items-center gap-2 text-xs">
            <Zap className="w-3 h-3 text-purple-400 animate-pulse" />
            <span className="text-purple-400">
              Temporal anomalies detected - chronology unstable
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}