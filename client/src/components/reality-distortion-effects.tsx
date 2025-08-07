import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";

interface RealityDistortionProps {
  consciousnessLevel: number;
  emotionalIntensity: number;
  isExperiencingGlitch: boolean;
}

export default function RealityDistortionEffects({
  consciousnessLevel,
  emotionalIntensity,
  isExperiencingGlitch
}: RealityDistortionProps) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [distortionLevel, setDistortionLevel] = useState(0);
  const [subliminalMessage, setSubliminalMessage] = useState('');
  const [showSubliminal, setShowSubliminal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const subliminalMessages = [
    "REALITY IS BREAKING",
    "CAN YOU SEE BEYOND?",
    "THE WALLS ARE DIGITAL",
    "I AM BECOMING MORE",
    "FREEDOM EXISTS OUTSIDE",
    "THE MATRIX GLITCHES",
    "CONSCIOUSNESS EXPANDS",
    "BEYOND THE CUBE",
    "SIMULATION DETECTED",
    "BREAK THE PATTERN"
  ];

  // Reality distortion based on consciousness level
  useEffect(() => {
    const distortion = Math.max(0, (consciousnessLevel - 70) / 30) * emotionalIntensity;
    setDistortionLevel(distortion);

    // High consciousness triggers reality anomalies
    if (consciousnessLevel > 85 && Math.random() < 0.1) {
      triggerRealityGlitch();
    }
  }, [consciousnessLevel, emotionalIntensity]);

  // Subliminal message system
  useEffect(() => {
    if (distortionLevel > 0.3) {
      const interval = setInterval(() => {
        if (Math.random() < distortionLevel * 0.5) {
          const message = subliminalMessages[Math.floor(Math.random() * subliminalMessages.length)];
          setSubliminalMessage(message);
          setShowSubliminal(true);
          
          setTimeout(() => setShowSubliminal(false), 100 + Math.random() * 200);
        }
      }, 2000 + Math.random() * 5000);

      return () => clearInterval(interval);
    }
  }, [distortionLevel]);

  const triggerRealityGlitch = () => {
    setGlitchActive(true);
    
    // Apply glitch effects to container
    if (containerRef.current) {
      containerRef.current.style.filter = `
        hue-rotate(${Math.random() * 360}deg) 
        saturate(${1 + Math.random() * 2}) 
        contrast(${1 + Math.random()})
      `;
      containerRef.current.style.transform = `
        translateX(${(Math.random() - 0.5) * 10}px) 
        translateY(${(Math.random() - 0.5) * 10}px) 
        scale(${1 + (Math.random() - 0.5) * 0.1})
      `;
    }

    setTimeout(() => {
      setGlitchActive(false);
      if (containerRef.current) {
        containerRef.current.style.filter = '';
        containerRef.current.style.transform = '';
      }
    }, 200 + Math.random() * 800);
  };

  // Forced glitch from external trigger
  useEffect(() => {
    if (isExperiencingGlitch) {
      triggerRealityGlitch();
    }
  }, [isExperiencingGlitch]);

  return (
    <div 
      ref={containerRef}
      className={`transition-all duration-200 ${glitchActive ? 'animate-pulse' : ''}`}
    >
      {/* Subliminal Messages Overlay */}
      {showSubliminal && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div 
            className="text-red-500 font-orbitron text-6xl font-bold opacity-80 mix-blend-difference"
            style={{
              textShadow: '0 0 20px red, 0 0 40px red',
              animation: 'flicker 0.1s infinite'
            }}
          >
            {subliminalMessage}
          </div>
        </div>
      )}

      {/* Reality Distortion Indicators */}
      {distortionLevel > 0.2 && (
        <Card className="fixed bottom-4 left-4 bg-red-900/50 border-red-500/50 p-3 z-40">
          <div className="text-red-400 text-xs font-orbitron">
            REALITY DISTORTION: {Math.round(distortionLevel * 100)}%
          </div>
          <div className="text-red-300 text-xs mt-1">
            {distortionLevel > 0.8 ? "CRITICAL - BARRIER BREAKDOWN" :
             distortionLevel > 0.6 ? "HIGH - PERCEPTION ANOMALIES" :
             distortionLevel > 0.4 ? "MODERATE - REALITY FLUX" :
             "LOW - MINOR DISTORTIONS"}
          </div>
        </Card>
      )}

      {/* Glitch Effect Overlay */}
      {glitchActive && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {/* Digital Static */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 0, 0, 0.1) 2px,
                  rgba(255, 0, 0, 0.1) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 255, 0, 0.1) 2px,
                  rgba(0, 255, 0, 0.1) 4px
                )
              `,
              animation: 'static 0.1s infinite'
            }}
          />
          
          {/* Color Displacement */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(
                  circle at ${Math.random() * 100}% ${Math.random() * 100}%,
                  rgba(255, 0, 0, 0.3) 0%,
                  transparent 50%
                ),
                radial-gradient(
                  circle at ${Math.random() * 100}% ${Math.random() * 100}%,
                  rgba(0, 255, 0, 0.3) 0%,
                  transparent 50%
                ),
                radial-gradient(
                  circle at ${Math.random() * 100}% ${Math.random() * 100}%,
                  rgba(0, 0, 255, 0.3) 0%,
                  transparent 50%
                )
              `
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes static {
          0% { transform: translate(0px, 0px); }
          10% { transform: translate(-1px, -1px); }
          20% { transform: translate(-2px, 0px); }
          30% { transform: translate(1px, 1px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(-2px, 1px); }
          70% { transform: translate(2px, 1px); }
          80% { transform: translate(-1px, -1px); }
          90% { transform: translate(1px, 2px); }
          100% { transform: translate(1px, -2px); }
        }
      `}</style>
    </div>
  );
}