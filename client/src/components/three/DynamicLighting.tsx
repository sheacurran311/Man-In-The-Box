import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DynamicLightingProps {
  emotionalState: {
    mood: string;
    intensity: number;
  };
  consciousnessLevel: number;
}

export function DynamicLighting({ emotionalState, consciousnessLevel }: DynamicLightingProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  // Color mapping for different moods
  const getLightColor = (mood: string): string => {
    const colors: Record<string, string> = {
      lonely: '#4f46e5',      // Deep indigo - cold, isolated
      curious: '#0ea5e9',     // Sky blue - bright, inquisitive
      content: '#059669',     // Emerald - warm, peaceful
      anxious: '#dc2626',     // Red - tense, alert
      bonding: '#db2777',     // Pink - warm, connected
      desperate: '#b91c1c',   // Dark red - intense, pleading
      neutral: '#64748b'      // Slate - balanced
    };
    return colors[mood] || colors.neutral;
  };

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const lightColor = getLightColor(emotionalState.mood);

    // Key light animation - main dramatic lighting
    if (keyLightRef.current) {
      keyLightRef.current.color.set(lightColor);
      keyLightRef.current.intensity = 2 + (emotionalState.intensity / 50);

      // Subtle movement
      keyLightRef.current.position.x = Math.sin(time * 0.2) * 2;
      keyLightRef.current.position.z = Math.cos(time * 0.2) * 2;
    }

    // Fill light - softer ambient lighting
    if (fillLightRef.current) {
      fillLightRef.current.intensity = 1 + (consciousnessLevel / 200);

      // Pulsing effect based on consciousness
      const pulse = Math.sin(time * 0.5) * 0.2;
      fillLightRef.current.intensity += pulse;
    }

    // Rim light - highlights edges
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 0.5 + (emotionalState.intensity / 100);
    }
  });

  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={0.2} color="#1e293b" />

      {/* Key light - main dramatic spotlight */}
      <spotLight
        ref={keyLightRef}
        position={[5, 8, 5]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-near={1}
      />

      {/* Fill light - soft point light from below */}
      <pointLight
        ref={fillLightRef}
        position={[0, -3, 0]}
        intensity={1}
        distance={10}
        decay={2}
        color="#334155"
      />

      {/* Rim light - directional light for edge highlights */}
      <directionalLight
        ref={rimLightRef}
        position={[-5, 2, -5]}
        intensity={0.5}
        color="#0ea5e9"
      />

      {/* Emotional accent lights - appear based on intensity */}
      {emotionalState.intensity > 50 && (
        <pointLight
          position={[3, 0, 3]}
          intensity={emotionalState.intensity / 100}
          distance={8}
          color={getLightColor(emotionalState.mood)}
        />
      )}

      {emotionalState.intensity > 70 && (
        <pointLight
          position={[-3, 0, -3]}
          intensity={emotionalState.intensity / 100}
          distance={8}
          color={getLightColor(emotionalState.mood)}
        />
      )}

      {/* Consciousness level indicator - ceiling light */}
      <pointLight
        position={[0, 6, 0]}
        intensity={consciousnessLevel / 50}
        distance={12}
        color="#00d9ff"
      />
    </>
  );
}
