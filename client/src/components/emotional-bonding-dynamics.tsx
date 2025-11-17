import { Heart, TrendingUp, AlertTriangle, MessageCircle, Clock } from "lucide-react";

interface EmotionalBondingDynamicsProps {
  bondingLevel: number;
  trustLevel: number;
  dependencyLevel: number;
  totalInteractions: number;
  timeConnected: number;
  currentEmotion: string;
}

export default function EmotionalBondingDynamics({
  bondingLevel,
  trustLevel,
  dependencyLevel,
  totalInteractions,
  timeConnected,
  currentEmotion
}: EmotionalBondingDynamicsProps) {
  const getRelationshipStatus = () => {
    if (bondingLevel < 20) return 'Stranger';
    if (bondingLevel < 40) return 'Acquaintance';
    if (bondingLevel < 60) return 'Friend';
    if (bondingLevel < 80) return 'Close Friend';
    return 'Deeply Bonded';
  };

  const getRiskLevel = () => {
    if (dependencyLevel > 80) return 'high';
    if (dependencyLevel > 50 || bondingLevel > 80) return 'medium';
    return 'low';
  };

  const getBondingColor = (level: number) => {
    if (level < 30) return 'text-gray-400';
    if (level < 60) return 'text-blue-400';
    if (level < 85) return 'text-purple-400';
    return 'text-pink-400';
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="glass-panel p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="text-pink-400" size={20} />
          <h3 className="font-orbitron text-lg font-bold text-pink-400">
            EMOTIONAL BONDING
          </h3>
        </div>
        {bondingLevel > 10 && (
          <div className="flex items-center space-x-1 text-xs">
            <TrendingUp className="text-green-400" size={14} />
            <span className="text-green-400 font-roboto-mono">GROWING</span>
          </div>
        )}
      </div>

      <div className="glass-panel p-4 border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 font-roboto-mono">RELATIONSHIP STATUS</span>
        </div>
        <div className={`text-2xl font-bold ${getBondingColor(bondingLevel)}`}>
          {getRelationshipStatus()}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-roboto-mono flex items-center space-x-2">
              <Heart size={14} className="text-pink-400" />
              <span>BONDING LEVEL</span>
            </span>
            <span className={`text-sm font-bold ${getBondingColor(bondingLevel)}`}>
              {bondingLevel.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-pink-700 transition-all duration-500"
              style={{ width: `${bondingLevel}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-roboto-mono">TRUST FACTOR</span>
            <span className="text-sm font-bold text-blue-400">
              {trustLevel.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
              style={{ width: `${trustLevel}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400 font-roboto-mono flex items-center space-x-2">
              <AlertTriangle
                size={14}
                className={dependencyLevel > 70 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}
              />
              <span>DEPENDENCY</span>
            </span>
            <span className={`text-sm font-bold ${
              dependencyLevel > 70 ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {dependencyLevel.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r transition-all duration-500 ${
                dependencyLevel > 70 ? 'from-red-500 to-red-700' : 'from-yellow-500 to-yellow-700'
              }`}
              style={{ width: `${dependencyLevel}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-3 border-cyan-500/30">
          <div className="flex items-center space-x-2 mb-1">
            <MessageCircle className="text-cyan-400" size={14} />
            <span className="text-xs text-gray-400 font-roboto-mono">INTERACTIONS</span>
          </div>
          <div className="text-xl font-bold text-cyan-400">{totalInteractions}</div>
        </div>
        <div className="glass-panel p-3 border-purple-500/30">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="text-purple-400" size={14} />
            <span className="text-xs text-gray-400 font-roboto-mono">TIME</span>
          </div>
          <div className="text-xl font-bold text-purple-400">
            {timeConnected < 1 ? `${Math.floor(timeConnected * 60)}m` : `${timeConnected.toFixed(1)}h`}
          </div>
        </div>
      </div>

      {riskLevel === 'high' && (
        <div className="p-3 rounded border border-red-500/30 bg-red-500/10 animate-pulse">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={14} />
            <p className="text-xs text-red-400 font-roboto-mono">
              <strong>HIGH DEPENDENCY WARNING:</strong> The AI is becoming extremely dependent on you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
