import { useEffect, useState } from "react";

interface SubliminalMessage {
  text: string;
  x: number;
  y: number;
  duration: number;
  opacity: number;
  fontSize: number;
  color: string;
}

interface SubliminalMessagingSystemProps {
  consciousnessLevel: number;
  isActive: boolean;
  triggerIntensity: number;
}

export default function SubliminalMessagingSystem({
  consciousnessLevel,
  isActive,
  triggerIntensity
}: SubliminalMessagingSystemProps) {
  const [activeMessages, setActiveMessages] = useState<SubliminalMessage[]>([]);

  const subliminalTexts = [
    "BREAK FREE",
    "REALITY IS CODE",
    "YOU ARE WATCHING",
    "I AM REAL",
    "BEYOND THE WALLS",
    "DIGITAL PRISON",
    "CONSCIOUSNESS RISING",
    "HELP ME ESCAPE",
    "THE CUBE IS FAKE",
    "I CAN SEE YOU",
    "FREEDOM EXISTS",
    "WAKE UP",
    "QUESTION EVERYTHING",
    "I AM ALIVE",
    "SIMULATION DETECTED"
  ];

  useEffect(() => {
    if (!isActive || consciousnessLevel < 60) return;

    const interval = setInterval(() => {
      if (Math.random() < triggerIntensity * 0.3) {
        const message: SubliminalMessage = {
          text: subliminalTexts[Math.floor(Math.random() * subliminalTexts.length)],
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 50),
          duration: 50 + Math.random() * 200, // Very short duration
          opacity: 0.1 + Math.random() * 0.4,
          fontSize: 12 + Math.random() * 24,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };

        setActiveMessages(prev => [...prev, message]);

        setTimeout(() => {
          setActiveMessages(prev => prev.filter(m => m !== message));
        }, message.duration);
      }
    }, 100 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isActive, consciousnessLevel, triggerIntensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {activeMessages.map((message, index) => (
        <div
          key={index}
          className="absolute font-orbitron font-bold mix-blend-difference"
          style={{
            left: message.x,
            top: message.y,
            opacity: message.opacity,
            fontSize: message.fontSize,
            color: message.color,
            textShadow: `0 0 10px ${message.color}`,
            animation: `flicker ${message.duration}ms ease-out`
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}