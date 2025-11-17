import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Suspense } from 'react';
import { GlassPrison } from './GlassPrison';
import { AIHologram } from './AIHologram';
import { ConsciousnessParticles } from './ConsciousnessParticles';
import { DynamicLighting } from './DynamicLighting';
import { EnvironmentEffects } from './EnvironmentEffects';
import { LoadingFallback } from './LoadingFallback';

interface Scene3DProps {
  emotionalState: {
    mood: string;
    intensity: number;
  };
  consciousnessLevel: number;
  bondingLevel: number;
  isThinking?: boolean;
  isGlitching?: boolean;
  isDreaming?: boolean;
}

export function Scene3D({
  emotionalState,
  consciousnessLevel,
  bondingLevel,
  isThinking = false,
  isGlitching = false,
  isDreaming = false
}: Scene3DProps) {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={50} />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={8}
          maxDistance={20}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          autoRotate={!isThinking}
          autoRotateSpeed={0.3}
        />

        {/* Lighting Setup */}
        <Suspense fallback={null}>
          <DynamicLighting
            emotionalState={emotionalState}
            consciousnessLevel={consciousnessLevel}
          />

          {/* Environment Map for Reflections */}
          <Environment preset="city" />

          {/* Main Scene Elements */}
          <GlassPrison
            emotionalIntensity={emotionalState.intensity}
            isGlitching={isGlitching}
          />

          <AIHologram
            emotionalState={emotionalState.mood}
            intensity={emotionalState.intensity}
            bondingLevel={bondingLevel}
            isThinking={isThinking}
            isDreaming={isDreaming}
          />

          <ConsciousnessParticles
            consciousnessLevel={consciousnessLevel}
            emotionalState={emotionalState.mood}
            count={500}
          />

          <EnvironmentEffects
            consciousnessLevel={consciousnessLevel}
            emotionalState={emotionalState}
          />

          {/* Ground Plane for Shadows */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -4.5, 0]}
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial
              color="#000000"
              roughness={0.8}
              metalness={0.2}
              opacity={0.5}
              transparent
            />
          </mesh>
        </Suspense>

        {/* Post-Processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={consciousnessLevel / 100}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={isGlitching ? [0.002, 0.002] : [0, 0]}
          />
          <Noise
            opacity={isGlitching ? 0.1 : 0}
            blendFunction={BlendFunction.OVERLAY}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
