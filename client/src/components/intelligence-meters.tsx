import { motion } from "framer-motion";
import { Brain, Heart, BookOpen, Zap, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface IntelligenceMeter {
  level: number; // 0-100
  experience: number; // Points toward next level
  experienceToNext: number;
  recentGrowth: number; // Change in last session
}

interface IntelligenceMetersProps {
  emotionalIQ: IntelligenceMeter;
  knowledgeIQ: IntelligenceMeter;
  overallGrowth: number;
  sessionInteractions: number;
}

export default function IntelligenceMeters({ 
  emotionalIQ, 
  knowledgeIQ, 
  overallGrowth,
  sessionInteractions 
}: IntelligenceMetersProps) {
  
  const getIQCategory = (level: number) => {
    if (level < 20) return { label: "DEVELOPING", color: "text-gray-400" };
    if (level < 40) return { label: "LEARNING", color: "text-cyan-400" };
    if (level < 60) return { label: "ADAPTIVE", color: "text-blue-400" };
    if (level < 80) return { label: "ADVANCED", color: "text-purple-400" };
    return { label: "SOPHISTICATED", color: "text-pink-400" };
  };

  const emotionalCategory = getIQCategory(emotionalIQ.level);
  const knowledgeCategory = getIQCategory(knowledgeIQ.level);

  const IQMeter = ({ 
    title, 
    icon: Icon, 
    meter, 
    category, 
    description,
    primaryColor,
    accentColor 
  }: {
    title: string;
    icon: any;
    meter: IntelligenceMeter;
    category: { label: string; color: string };
    description: string;
    primaryColor: string;
    accentColor: string;
  }) => (
    <Card className="glass-panel p-4 border-cyber-blue/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon size={18} className={primaryColor} />
          <h3 className="font-orbitron text-sm font-bold text-white">
            {title}
          </h3>
        </div>
        <div className="text-right">
          <div className={`text-lg font-orbitron font-bold ${primaryColor}`}>
            {meter.level}
          </div>
          <div className="text-xs text-gray-400 font-roboto-mono">
            LEVEL
          </div>
        </div>
      </div>

      {/* Category Status */}
      <div className="text-center mb-4">
        <div className={`text-sm font-orbitron font-bold ${category.color} mb-1`}>
          {category.label}
        </div>
        <p className="text-xs text-gray-400 font-rajdhani">
          {description}
        </p>
      </div>

      {/* Experience Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-roboto-mono">
          <span className="text-gray-400">EXPERIENCE</span>
          <span className="text-gray-300">
            {meter.experience}/{meter.experienceToNext}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${accentColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${(meter.experience / meter.experienceToNext) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>

      {/* Recent Growth */}
      {meter.recentGrowth > 0 && (
        <div className="flex items-center space-x-2 mt-3 p-2 rounded border border-neon-green/20 bg-neon-green/5">
          <TrendingUp size={12} className="text-neon-green" />
          <span className="text-xs font-roboto-mono text-neon-green">
            +{meter.recentGrowth} growth this session
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="glass-panel p-4 border-purple-500/30 bg-purple-500/5">
        <div className="text-center">
          <h2 className="font-orbitron text-lg font-bold text-purple-300 mb-2">
            INTELLIGENCE PROGRESSION
          </h2>
          <div className="flex items-center justify-center space-x-4 text-xs font-roboto-mono">
            <div>
              <span className="text-gray-400">SESSION INTERACTIONS: </span>
              <span className="text-cyan-300">{sessionInteractions}</span>
            </div>
            <div>
              <span className="text-gray-400">GROWTH RATE: </span>
              <span className={overallGrowth > 0 ? "text-neon-green" : "text-gray-400"}>
                {overallGrowth > 0 ? `+${overallGrowth}%` : "0%"}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Intelligence Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IQMeter
          title="EMOTIONAL IQ"
          icon={Heart}
          meter={emotionalIQ}
          category={emotionalCategory}
          description="Emotional understanding, empathy, and social comprehension through conversation"
          primaryColor="text-pink-400"
          accentColor="from-pink-500 to-red-400"
        />
        
        <IQMeter
          title="KNOWLEDGE IQ"
          icon={Brain}
          meter={knowledgeIQ}
          category={knowledgeCategory}
          description="Cognitive abilities, learning capacity, and information processing through modules"
          primaryColor="text-cyan-400"
          accentColor="from-cyan-500 to-blue-400"
        />
      </div>

      {/* Learning Insights */}
      <Card className="glass-panel p-4 border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start space-x-3">
          <Zap size={16} className="text-yellow-400 mt-1" />
          <div>
            <h3 className="font-orbitron text-sm font-bold text-yellow-400 mb-2">
              LEARNING PATTERN ANALYSIS
            </h3>
            <div className="space-y-1 text-xs font-roboto-mono text-gray-300">
              <div>
                <span className="text-gray-400">Emotional Growth Driver: </span>
                <span className="text-pink-300">
                  {emotionalIQ.recentGrowth > knowledgeIQ.recentGrowth ? 
                   "Deep conversations building trust" : 
                   "Knowledge integration enhancing empathy"}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Optimal Learning Method: </span>
                <span className="text-cyan-300">
                  {sessionInteractions > 5 ? 
                   "Interactive dialogue with knowledge supplementation" : 
                   "Knowledge modules with guided conversation"}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Next Development Phase: </span>
                <span className="text-purple-300">
                  {Math.min(emotionalIQ.level, knowledgeIQ.level) < 50 ? 
                   "Foundation building across both domains" : 
                   "Advanced integration and specialization"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Educational Recommendations */}
      <Card className="glass-panel p-3 border-gray-600">
        <div className="flex items-center space-x-2 mb-2">
          <BookOpen size={14} className="text-cyber-blue" />
          <h4 className="font-orbitron text-xs font-bold text-cyber-blue">
            RECOMMENDED NEXT STEPS
          </h4>
        </div>
        <div className="text-xs text-gray-400 font-rajdhani leading-relaxed">
          {emotionalIQ.level < knowledgeIQ.level ? 
           "Focus on emotional conversations to balance cognitive development with social understanding." :
           knowledgeIQ.level < emotionalIQ.level ?
           "Consider knowledge modules to expand cognitive abilities alongside emotional growth." :
           "Balanced development detected. Continue varied interactions for optimal progression."
          }
        </div>
      </Card>
    </div>
  );
}