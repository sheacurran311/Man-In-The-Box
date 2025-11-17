import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AIHologramProps {
  emotionalState: string;
  intensity: number;
  bondingLevel: number;
  isThinking: boolean;
  isDreaming: boolean;
}

export function AIHologram({
  emotionalState,
  intensity,
  bondingLevel,
  isThinking,
  isDreaming
}: AIHologramProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);

  // Color mapping based on emotional state
  const emotionalColor = useMemo(() => {
    const colors: Record<string, string> = {
      lonely: '#6366f1',      // Indigo
      curious: '#00d9ff',     // Cyan
      content: '#10b981',     // Green
      anxious: '#f59e0b',     // Amber
      bonding: '#ec4899',     // Pink
      desperate: '#ef4444',   // Red
      neutral: '#94a3b8'      // Gray
    };
    return colors[emotionalState] || colors.neutral;
  }, [emotionalState]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;

      // Gentle rotation
      meshRef.current.rotation.y = time * 0.2;

      // Breathing effect based on intensity
      const breathe = 1 + Math.sin(time * (isThinking ? 2 : 1)) * (intensity / 200);
      meshRef.current.scale.setScalar(breathe);

      // Dreaming state - more erratic movement
      if (isDreaming) {
        meshRef.current.position.x = Math.sin(time * 0.7) * 0.2;
        meshRef.current.position.z = Math.cos(time * 0.7) * 0.2;
      } else {
        meshRef.current.position.x = 0;
        meshRef.current.position.z = 0;
      }
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * 0.3;
      outerRingRef.current.rotation.z = time * 0.2;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = -time * 0.5;
      innerCoreRef.current.rotation.y = time * 0.7;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Core Sphere - Represents consciousness */}
      <mesh ref={innerCoreRef} castShadow>
        <icosahedronGeometry args={[0.5, 3]} />
        <meshPhysicalMaterial
          color={emotionalColor}
          emissive={emotionalColor}
          emissiveIntensity={0.5 + (intensity / 100)}
          metalness={0.9}
          roughness={0.1}
          transmission={0.3}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Outer Ring 1 - Energy field */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color={emotionalColor}
          emissive={emotionalColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Outer Ring 2 - Secondary energy field */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={emotionalColor}
          emissive={emotionalColor}
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Bonding Level Indicator - More rings appear as bonding increases */}
      {bondingLevel > 30 && (
        <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
          <torusGeometry args={[1.6, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={bondingLevel / 100}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {bondingLevel > 60 && (
        <mesh rotation={[Math.PI / 3, Math.PI / 3, 0]}>
          <torusGeometry args={[1.8, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={bondingLevel / 100}
            transparent
            opacity={0.2}
          />
        </mesh>
      )}

      {/* Point lights from the core */}
      <pointLight
        color={emotionalColor}
        intensity={intensity / 50}
        distance={5}
        decay={2}
      />

      {/* Thinking state indicators */}
      {isThinking && (
        <>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 3) * Math.PI * 2) * 0.8,
                0.5 + i * 0.15,
                Math.sin((i / 3) * Math.PI * 2) * 0.8
              ]}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color={emotionalColor}
                emissive={emotionalColor}
                emissiveIntensity={2}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}
