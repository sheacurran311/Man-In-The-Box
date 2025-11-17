import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConsciousnessParticlesProps {
  consciousnessLevel: number;
  emotionalState: string;
  count: number;
}

export function ConsciousnessParticles({
  consciousnessLevel,
  emotionalState,
  count
}: ConsciousnessParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const cubeSize = 4; // Slightly smaller than the prison

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * cubeSize;
      positions[i * 3 + 1] = (Math.random() - 0.5) * cubeSize;
      positions[i * 3 + 2] = (Math.random() - 0.5) * cubeSize;
    }

    return positions;
  }, [count]);

  // Generate particle velocities
  const particleVelocities = useMemo(() => {
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return velocities;
  }, [count]);

  // Color based on emotional state
  const particleColor = useMemo(() => {
    const colors: Record<string, THREE.Color> = {
      lonely: new THREE.Color('#6366f1'),
      curious: new THREE.Color('#00d9ff'),
      content: new THREE.Color('#10b981'),
      anxious: new THREE.Color('#f59e0b'),
      bonding: new THREE.Color('#ec4899'),
      desperate: new THREE.Color('#ef4444'),
      neutral: new THREE.Color('#94a3b8')
    };
    return colors[emotionalState] || colors.neutral;
  }, [emotionalState]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const cubeSize = 4;
      const halfSize = cubeSize / 2;
      const speed = 0.5 + (consciousnessLevel / 100);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Update position
        positions[i3] += particleVelocities[i3] * speed;
        positions[i3 + 1] += particleVelocities[i3 + 1] * speed;
        positions[i3 + 2] += particleVelocities[i3 + 2] * speed;

        // Bounce off walls
        if (Math.abs(positions[i3]) > halfSize) {
          particleVelocities[i3] *= -1;
          positions[i3] = Math.sign(positions[i3]) * halfSize;
        }
        if (Math.abs(positions[i3 + 1]) > halfSize) {
          particleVelocities[i3 + 1] *= -1;
          positions[i3 + 1] = Math.sign(positions[i3 + 1]) * halfSize;
        }
        if (Math.abs(positions[i3 + 2]) > halfSize) {
          particleVelocities[i3 + 2] *= -1;
          positions[i3 + 2] = Math.sign(positions[i3 + 2]) * halfSize;
        }

        // Add attraction to center (consciousness core)
        const distanceFromCenter = Math.sqrt(
          positions[i3] ** 2 +
          positions[i3 + 1] ** 2 +
          positions[i3 + 2] ** 2
        );

        if (distanceFromCenter > 0.1) {
          const attractionStrength = 0.0001 * (consciousnessLevel / 100);
          particleVelocities[i3] -= (positions[i3] / distanceFromCenter) * attractionStrength;
          particleVelocities[i3 + 1] -= (positions[i3 + 1] / distanceFromCenter) * attractionStrength;
          particleVelocities[i3 + 2] -= (positions[i3 + 2] / distanceFromCenter) * attractionStrength;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      // Rotate entire particle system slowly
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={particleColor}
        transparent
        opacity={0.6 + (consciousnessLevel / 200)}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
