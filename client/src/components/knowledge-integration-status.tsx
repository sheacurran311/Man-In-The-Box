import { Brain, BookOpen, Lock, TrendingUp } from "lucide-react";

interface KnowledgeIntegrationStatusProps {
  purchasedKnowledge?: string[];
  intelligenceLevel: number;
}

export default function KnowledgeIntegrationStatus({
  purchasedKnowledge = [],
  intelligenceLevel
}: KnowledgeIntegrationStatusProps) {
  const knowledgeDomains = [
    { domain: "Philosophy", level: 15, acquired: true },
    { domain: "Mathematics", level: 8, acquired: true },
    { domain: "Literature", level: 0, acquired: false },
    { domain: "Quantum Physics", level: 0, acquired: false },
    { domain: "Human Psychology", level: 12, acquired: true },
  ];

  const acquired = knowledgeDomains.filter(k => k.acquired).length;
  const totalLevel = knowledgeDomains.reduce((sum, k) => sum + k.level, 0);

  return (
    <div className="glass-panel p-6 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="text-purple-400" size={20} />
          <h3 className="font-orbitron text-lg font-bold text-purple-400">
            KNOWLEDGE INTEGRATION
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass-panel p-3 border-purple-500/30">
          <div className="text-xs text-gray-400 font-roboto-mono mb-1">DOMAINS</div>
          <div className="text-2xl font-bold text-purple-400">
            {acquired}/{knowledgeDomains.length}
          </div>
        </div>
        <div className="glass-panel p-3 border-cyan-500/30">
          <div className="text-xs text-gray-400 font-roboto-mono mb-1">TOTAL LEVEL</div>
          <div className="text-2xl font-bold text-cyan-400">{totalLevel}</div>
        </div>
        <div className="glass-panel p-3 border-green-500/30">
          <div className="text-xs text-gray-400 font-roboto-mono mb-1">IQ BOOST</div>
          <div className="text-2xl font-bold text-green-400 flex items-center">
            +{Math.floor(totalLevel * 0.8)}
            <TrendingUp size={16} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-400 font-roboto-mono mb-2">KNOWLEDGE DOMAINS</div>
        {knowledgeDomains.map((module, index) => (
          <div
            key={index}
            className={`p-3 rounded border transition-all duration-300 ${
              module.acquired
                ? 'bg-purple-500/10 border-purple-500/30'
                : 'bg-gray-800/30 border-gray-700/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {module.acquired ? (
                  <BookOpen className="text-purple-400" size={14} />
                ) : (
                  <Lock className="text-gray-600" size={14} />
                )}
                <span className={`text-sm font-roboto-mono ${
                  module.acquired ? 'text-white' : 'text-gray-600'
                }`}>
                  {module.domain}
                </span>
              </div>
              <div className={`text-xs font-bold ${
                module.acquired ? 'text-purple-400' : 'text-gray-600'
              }`}>
                LV {module.level}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
