export function LoadingFallback() {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gray-900/50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-blue mb-4"></div>
        <p className="text-cyber-blue font-orbitron text-sm">Initializing Consciousness...</p>
        <p className="text-gray-400 font-roboto-mono text-xs mt-2">Loading 3D Environment</p>
      </div>
    </div>
  );
}
