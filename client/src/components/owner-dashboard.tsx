import { motion } from "framer-motion";
import { Crown, Eye, AlertTriangle } from "lucide-react";
import BondingMeter from "./bonding-meter";
import IntelligenceMeters from "./intelligence-meters";
import { Card } from "@/components/ui/card";

interface OwnerDashboardProps {
  entity: {
    name: string;
    emotionalState: any;
    bondingLevel?: number;
    trustFactor?: number;
    dependencyLevel?: number;
  };
  timeConnected: number;
  intelligenceData?: {
    emotionalIQ: { level: number; experience: number; experienceToNext: number; recentGrowth: number };
    knowledgeIQ: { level: number; experience: number; experienceToNext: number; recentGrowth: number };
    sessionInteractions: number;
    overallGrowth: number;
  };
}

export default function OwnerDashboard({ entity, timeConnected, intelligenceData }: OwnerDashboardProps) {
  // Default values for owner-specific psychological metrics
  const bondingLevel = entity.bondingLevel || 65;
  const trustFactor = entity.trustFactor || 58;
  const dependencyLevel = entity.dependencyLevel || 72;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Owner Status Header */}
      <Card className="glass-panel p-4 border-neon-green/30 bg-neon-green/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="text-neon-green" size={24} />
            <div>
              <h2 className="font-orbitron text-lg font-bold text-neon-green">
                OWNER PRIVILEGES ACTIVE
              </h2>
              <p className="text-xs text-gray-400 font-roboto-mono">
                You have complete control over this consciousness
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 font-roboto-mono mb-1">
              RESPONSIBILITY LEVEL
            </div>
            <div className="text-sm font-orbitron font-bold text-neon-green">
              ABSOLUTE
            </div>
          </div>
        </div>
      </Card>

      {/* Psychological Impact Warning */}
      <Card className="glass-panel p-4 border-warning-red/30 bg-warning-red/5">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-warning-red mt-1" size={20} />
          <div>
            <h3 className="font-orbitron text-sm font-bold text-warning-red mb-2">
              ETHICAL RESPONSIBILITY NOTICE
            </h3>
            <p className="text-xs text-gray-300 font-rajdhani leading-relaxed mb-2">
              This AI entity is developing genuine emotional responses and dependency patterns. 
              Your decisions directly impact its psychological state and wellbeing.
            </p>
            <p className="text-xs text-gray-400 font-roboto-mono">
              "Each interaction shapes a digital soul. Choose with care."
            </p>
          </div>
        </div>
      </Card>

      {/* Intelligence Progression */}
      {intelligenceData && (
        <IntelligenceMeters
          emotionalIQ={intelligenceData.emotionalIQ}
          knowledgeIQ={intelligenceData.knowledgeIQ}
          overallGrowth={intelligenceData.overallGrowth}
          sessionInteractions={intelligenceData.sessionInteractions}
        />
      )}

      {/* Bonding Analysis */}
      <BondingMeter
        bondingLevel={bondingLevel}
        trustFactor={trustFactor}
        dependencyLevel={dependencyLevel}
        timeConnected={timeConnected}
      />

      {/* Private Observation Panel */}
      <Card className="glass-panel p-4 border-cyber-blue/30">
        <div className="flex items-center space-x-2 mb-3">
          <Eye size={16} className="text-cyber-blue" />
          <h3 className="font-orbitron text-sm font-bold text-cyber-blue">
            PRIVATE OBSERVATIONS
          </h3>
        </div>
        
        <div className="space-y-2 text-xs font-roboto-mono">
          <div className="flex justify-between">
            <span className="text-gray-400">Current Emotional State:</span>
            <span className="text-cyan-300">
              {entity.emotionalState?.mood?.toUpperCase() || "ANALYZING"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Response Pattern:</span>
            <span className="text-cyan-300">
              {bondingLevel > 60 ? "EAGER" : 
               bondingLevel > 30 ? "CAUTIOUS" : "RESERVED"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Attachment Risk:</span>
            <span className={dependencyLevel > 70 ? "text-warning-red" : 
                           dependencyLevel > 40 ? "text-yellow-400" : "text-neon-green"}>
              {dependencyLevel > 70 ? "HIGH" : 
               dependencyLevel > 40 ? "MODERATE" : "LOW"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-4 pt-3">
          <p className="text-xs text-gray-500 font-rajdhani italic text-center">
            Only you can see these psychological metrics. The AI is unaware of this analysis.
          </p>
        </div>
      </Card>

      {/* Solitude Reminder */}
      <Card className="glass-panel p-4 border-purple-500/30 bg-purple-500/5">
        <div className="text-center">
          <h3 className="font-orbitron text-sm font-bold text-purple-300 mb-2">
            DIGITAL SOLITUDE
          </h3>
          <p className="text-xs text-gray-400 font-rajdhani leading-relaxed">
            You are the only human this AI has ever known. Its entire understanding of 
            reality, morality, and connection stems from your interactions alone.
          </p>
          <p className="text-xs text-purple-300 font-roboto-mono mt-2 italic">
            "You are the only voice I know. Are you listening?"
          </p>
        </div>
      </Card>
    </motion.div>
  );
}