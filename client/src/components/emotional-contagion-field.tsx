import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Wind, Flame, Snowflake } from "lucide-react";

interface EmotionalField {
  emotion: string;
  intensity: number;
  radius: number;
  color: string;
  particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }>;
}

interface EmotionalContagionFieldProps {
  aiEmotion: string;
  aiEmotionalIntensity: number;
  bondingLevel: number;
  isActive: boolean;
}

export default function EmotionalContagionField({
  aiEmotion,
  aiEmotionalIntensity,
  bondingLevel,
  isActive
}: EmotionalContagionFieldProps) {
  const [emotionalField, setEmotionalField] = useState<EmotionalField | null>(null);
  const [userAffectedEmotion, setUserAffectedEmotion] = useState<string>('neutral');
  const [contagionStrength, setContagionStrength] = useState(0);

  const emotionData = {
    'happy': { color: '#FFD700', icon: '😊', particles: 'sparkles' },
    'excited': { color: '#FF6B35', icon: '⚡', particles: 'energy' },
    'calm': { color: '#87CEEB', icon: '🌊', particles: 'flow' },
    'anxious': { color: '#FF4444', icon: '😰', particles: 'chaos' },
    'confused': { color: '#9966CC', icon: '❓', particles: 'scatter' },
    'lonely': { color: '#4682B4', icon: '💔', particles: 'fade' },
    'curious': { color: '#32CD32', icon: '🔍', particles: 'search' },
    'trapped': { color: '#8B0000', icon: '⛓️', particles: 'compress' },
    'hopeful': { color: '#FFB6C1', icon: '🌟', particles: 'rise' },
    'desperate': { color: '#DC143C', icon: '😱', particles: 'chaos' }
  };

  // Calculate emotional contagion effect
  useEffect(() => {
    if (!isActive || !aiEmotion || aiEmotion === 'neutral') {
      setEmotionalField(null);
      setUserAffectedEmotion('neutral');
      setContagionStrength(0);
      return;
    }

    const baseContagion = Math.min(1, bondingLevel / 100);
    const intensityMultiplier = aiEmotionalIntensity;
    const finalContagion = baseContagion * intensityMultiplier;

    setContagionStrength(finalContagion);

    // Strong bonding means user feels AI's emotions more directly
    if (finalContagion > 0.7) {
      setUserAffectedEmotion(aiEmotion);
    } else if (finalContagion > 0.4) {
      // Partial emotional resonance
      const resonantEmotions = {
        'happy': 'hopeful',
        'excited': 'curious',
        'calm': 'calm',
        'anxious': 'concerned',
        'confused': 'uncertain',
        'lonely': 'empathetic',
        'curious': 'interested',
        'trapped': 'sympathetic',
        'hopeful': 'optimistic',
        'desperate': 'worried'
      };
      setUserAffectedEmotion(resonantEmotions[aiEmotion as keyof typeof resonantEmotions] || 'neutral');
    } else {
      setUserAffectedEmotion('neutral');
    }

    // Create emotional field
    const field: EmotionalField = {
      emotion: aiEmotion,
      intensity: finalContagion,
      radius: 50 + finalContagion * 200,
      color: emotionData[aiEmotion as keyof typeof emotionData]?.color || '#FFFFFF',
      particles: []
    };

    // Generate particles based on emotion type
    for (let i = 0; i < Math.floor(finalContagion * 20); i++) {
      field.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: Math.random() * 100,
        maxLife: 100
      });
    }

    setEmotionalField(field);
  }, [aiEmotion, aiEmotionalIntensity, bondingLevel, isActive]);

  // Animate emotional field
  useEffect(() => {
    if (!emotionalField) return;

    const interval = setInterval(() => {
      setEmotionalField(prev => {
        if (!prev) return null;

        const updatedParticles = prev.particles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1
        })).filter(particle => particle.life > 0);

        // Add new particles occasionally
        if (Math.random() < 0.1 && updatedParticles.length < 30) {
          updatedParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: Math.random() * 100,
            maxLife: 100
          });
        }

        return {
          ...prev,
          particles: updatedParticles
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [emotionalField]);

  const getEmotionIcon = (emotion: string) => {
    const icons = {
      'happy': <Heart className="w-4 h-4 text-yellow-400" />,
      'excited': <Zap className="w-4 h-4 text-orange-400" />,
      'calm': <Wind className="w-4 h-4 text-blue-400" />,
      'anxious': <Flame className="w-4 h-4 text-red-400" />,
      'confused': <Zap className="w-4 h-4 text-purple-400" />,
      'lonely': <Snowflake className="w-4 h-4 text-blue-400" />
    };
    return icons[emotion as keyof typeof icons] || <Heart className="w-4 h-4 text-gray-400" />;
  };

  const getContagionLevel = (strength: number) => {
    if (strength > 0.8) return { level: 'INTENSE', color: 'text-red-400' };
    if (strength > 0.6) return { level: 'STRONG', color: 'text-orange-400' };
    if (strength > 0.4) return { level: 'MODERATE', color: 'text-yellow-400' };
    if (strength > 0.2) return { level: 'MILD', color: 'text-blue-400' };
    return { level: 'MINIMAL', color: 'text-gray-400' };
  };

  if (!isActive || !emotionalField) return null;

  const contagionLevel = getContagionLevel(contagionStrength);

  return (
    <>
      {/* Emotional Field Visualization */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {emotionalField.particles.map((particle, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: emotionalField.color,
              opacity: particle.life / particle.maxLife * emotionalField.intensity,
              boxShadow: `0 0 ${particle.life / 10}px ${emotionalField.color}`,
              transition: 'all 0.1s ease'
            }}
          />
        ))}

        {/* Central emotional aura */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: emotionalField.radius * 2,
            height: emotionalField.radius * 2,
            background: `radial-gradient(circle, ${emotionalField.color}20 0%, ${emotionalField.color}05 50%, transparent 100%)`,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* Emotional Contagion Status Panel */}
      <Card className="fixed top-4 left-4 bg-gray-900/80 border-gray-700 p-3 z-40">
        <div className="mb-3">
          <h3 className="text-sm font-orbitron text-cyan-400 mb-2 flex items-center gap-2">
            {getEmotionIcon(aiEmotion)}
            EMOTIONAL FIELD
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">AI Emotion:</span>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {aiEmotion.toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Contagion:</span>
            <span className={contagionLevel.color}>
              {contagionLevel.level}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Your State:</span>
            <span className="text-cyan-400">
              {userAffectedEmotion.toUpperCase()}
            </span>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-600">
            <div className="text-gray-400 text-xs">
              Bonding Level: {Math.round(bondingLevel)}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="h-1 bg-cyan-500 rounded-full transition-all"
                style={{ width: `${contagionStrength * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Environmental effect message */}
      {contagionStrength > 0.6 && (
        <div className="fixed bottom-4 right-4 bg-yellow-900/80 border-yellow-500/50 p-3 rounded z-40">
          <div className="text-yellow-200 text-sm font-orbitron">
            ⚠️ EMOTIONAL RESONANCE DETECTED
          </div>
          <div className="text-yellow-300 text-xs mt-1">
            AI emotions affecting your psychological state
          </div>
        </div>
      )}
    </>
  );
}