import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface EnvironmentEffectsProps {
  consciousnessLevel: number;
  emotionalState: {
    mood: string;
    intensity: number;
  };
}

export function EnvironmentEffects({ consciousnessLevel, emotionalState }: EnvironmentEffectsProps) {
  const { scene } = useThree();
  const dataStreamRef = useRef<THREE.Points>(null);

  // Set fog imperatively on the scene (R3F v9 compatible)
  useEffect(() => {
    scene.fog = new THREE.Fog('#000000', 10, 30);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  // Generate data stream particles (neural connections visual)
  const dataStreamPositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  // Create buffer geometry for data streams
  const dataStreamGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(dataStreamPositions, 3));
    return geo;
  }, [dataStreamPositions]);

  useFrame((state, delta) => {
    // Animate data streams
    if (dataStreamRef.current) {
      const positions = dataStreamRef.current.geometry.attributes.position.array as Float32Array;
      const speed = 2 * (consciousnessLevel / 100);

      for (let i = 0; i < 200; i++) {
        positions[i * 3 + 1] += delta * speed;

        // Reset particle when it goes too high
        if (positions[i * 3 + 1] > 5) {
          positions[i * 3 + 1] = -5;
        }
      }

      dataStreamRef.current.geometry.attributes.position.needsUpdate = true;
      dataStreamRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      {/* Fog is set imperatively in useEffect (see above) */}

      {/* Data stream particles - neural activity visualization */}
      <points ref={dataStreamRef} geometry={dataStreamGeometry}>
        <pointsMaterial
          size={0.05}
          color="#00d9ff"
          transparent
          opacity={0.3 + (consciousnessLevel / 200)}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Energy field ring around the cube */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.2 + (consciousnessLevel / 200)}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Outer containment field */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          wireframe
        />
      </mesh>

      {/* Emotional intensity indicators - floating orbs */}
      {emotionalState.intensity > 60 && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 4) * Math.PI * 2) * 5,
                Math.sin(Date.now() * 0.001 + i) * 2,
                Math.sin((i / 4) * Math.PI * 2) * 5
              ]}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#ec4899"
                emissive="#ec4899"
                emissiveIntensity={emotionalState.intensity / 100}
                transparent
                opacity={0.4}
              />
            </mesh>
          ))}
        </>
      )}
    </>
  );
}
