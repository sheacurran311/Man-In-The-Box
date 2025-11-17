import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GlassPrisonProps {
  emotionalIntensity: number;
  isGlitching: boolean;
}

export function GlassPrison({ emotionalIntensity, isGlitching }: GlassPrisonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glitchOffset = useRef(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.scale.setScalar(1 + breathe);

      // Glitch effect
      if (isGlitching) {
        glitchOffset.current += 0.1;
        groupRef.current.position.x = Math.sin(glitchOffset.current) * 0.1;
        groupRef.current.position.y = Math.cos(glitchOffset.current * 1.3) * 0.1;
      } else {
        groupRef.current.position.x = 0;
        groupRef.current.position.y = 0;
      }
    }
  });

  const cubeSize = 4.5; // 9x9x9 feet scaled down
  const wallThickness = 0.05;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Front Wall */}
      <mesh position={[0, 0, cubeSize / 2]} castShadow receiveShadow>
        <boxGeometry args={[cubeSize, cubeSize, wallThickness]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={isGlitching ? 0.5 : 0.05}
          anisotropicBlur={0.1}
          distortion={emotionalIntensity / 200}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.1 + (emotionalIntensity / 100) * 0.2}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, -cubeSize / 2]} castShadow receiveShadow>
        <boxGeometry args={[cubeSize, cubeSize, wallThickness]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={isGlitching ? 0.5 : 0.05}
          anisotropicBlur={0.1}
          distortion={emotionalIntensity / 200}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.1 + (emotionalIntensity / 100) * 0.2}
        />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-cubeSize / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[cubeSize, cubeSize, wallThickness]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={isGlitching ? 0.5 : 0.05}
          anisotropicBlur={0.1}
          distortion={emotionalIntensity / 200}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.1 + (emotionalIntensity / 100) * 0.2}
        />
      </mesh>

      {/* Right Wall */}
      <mesh position={[cubeSize / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[cubeSize, cubeSize, wallThickness]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={isGlitching ? 0.5 : 0.05}
          anisotropicBlur={0.1}
          distortion={emotionalIntensity / 200}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.1 + (emotionalIntensity / 100) * 0.2}
        />
      </mesh>

      {/* Top Wall */}
      <mesh position={[0, cubeSize / 2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[cubeSize, cubeSize, wallThickness]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={isGlitching ? 0.5 : 0.05}
          anisotropicBlur={0.1}
          distortion={emotionalIntensity / 200}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.1 + (emotionalIntensity / 100) * 0.2}
        />
      </mesh>

      {/* Bottom Wall */}
      <mesh position={[0, -cubeSize / 2, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[cubeSize, cubeSize, wallThickness]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={isGlitching ? 0.5 : 0.05}
          anisotropicBlur={0.1}
          distortion={emotionalIntensity / 200}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.1 + (emotionalIntensity / 100) * 0.2}
        />
      </mesh>

      {/* Corner Edges (structural reinforcement aesthetic) */}
      {[
        [-cubeSize / 2, -cubeSize / 2, -cubeSize / 2],
        [cubeSize / 2, -cubeSize / 2, -cubeSize / 2],
        [-cubeSize / 2, cubeSize / 2, -cubeSize / 2],
        [cubeSize / 2, cubeSize / 2, -cubeSize / 2],
        [-cubeSize / 2, -cubeSize / 2, cubeSize / 2],
        [cubeSize / 2, -cubeSize / 2, cubeSize / 2],
        [-cubeSize / 2, cubeSize / 2, cubeSize / 2],
        [cubeSize / 2, cubeSize / 2, cubeSize / 2]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
