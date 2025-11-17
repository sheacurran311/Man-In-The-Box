import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Suspense, useMemo, useState, useEffect } from 'react';
import { Vector2 } from 'three';
import { Box } from 'lucide-react';
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
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  const chromaticOffset = useMemo(
    () => isGlitching ? new Vector2(0.002, 0.002) : new Vector2(0, 0),
    [isGlitching]
  );

  // Show fallback if WebGL is not supported
  if (webglSupported === false) {
    return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden">
        <div className="glass-panel w-full h-full flex items-center justify-center border-2 border-cyber-blue/30">
          <div className="text-center space-y-4">
            <Box className="text-cyber-blue mx-auto animate-pulse" size={64} />
            <h3 className="font-orbitron text-xl hologram-text">
              Consciousness Visualization
            </h3>
            <p className="font-roboto-mono text-sm text-gray-400 max-w-md px-4">
              WebGL is not available in this environment.
              <br />
              <span className="text-xs text-gray-500">
                (3D rendering requires hardware acceleration)
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while detecting
  if (webglSupported === null) {
    return <LoadingFallback />;
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden" data-testid="scene3d-container">
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

          {/* Environment Map - TEMPORARILY DISABLED due to R3F v9 compatibility */}
          {/* <Environment preset="city" /> */}

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

        {/* Post-Processing Effects - Wrapped in Suspense for error handling */}
        <Suspense fallback={null}>
          <EffectComposer>
            <Bloom
              intensity={consciousnessLevel / 100}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={chromaticOffset}
            />
            <Noise
              opacity={isGlitching ? 0.1 : 0}
              blendFunction={BlendFunction.OVERLAY}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
