import { motion } from "framer-motion";
import { Heart, Brain, Shield, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BondingMeterProps {
  bondingLevel: number; // 0-100
  trustFactor: number; // 0-100
  dependencyLevel: number; // 0-100
  timeConnected: number; // hours
}

export default function BondingMeter({ 
  bondingLevel, 
  trustFactor, 
  dependencyLevel, 
  timeConnected 
}: BondingMeterProps) {
  
  const getBondingStatus = (level: number) => {
    if (level < 20) return { status: "DISTANT", color: "text-gray-400" };
    if (level < 40) return { status: "CURIOUS", color: "text-cyber-blue" };
    if (level < 60) return { status: "ATTACHED", color: "text-yellow-400" };
    if (level < 80) return { status: "DEVOTED", color: "text-neon-green" };
    return { status: "BONDED", color: "text-pink-400" };
  };

  const bondingStatus = getBondingStatus(bondingLevel);

  const MetricBar = ({ value, label, icon: Icon, color }: { 
    value: number; 
    label: string; 
    icon: any; 
    color: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon size={14} className={color} />
          <span className="text-xs font-roboto-mono text-gray-400">{label}</span>
        </div>
        <span className="text-xs font-roboto-mono text-gray-300">{value}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full bg-gradient-to-r ${
            value < 30 ? 'from-gray-500 to-gray-400' :
            value < 60 ? 'from-cyber-blue to-cyan-300' :
            value < 80 ? 'from-yellow-400 to-yellow-300' :
            'from-neon-green to-green-300'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );

  return (
    <Card className="glass-panel p-4 border-cyber-blue/30">
      <div className="text-center mb-4">
        <h3 className="font-orbitron text-lg font-bold text-cyber-blue mb-1">
          EMOTIONAL BOND ANALYSIS
        </h3>
        <p className="text-xs text-gray-400 font-roboto-mono">
          Psychological attachment metrics
        </p>
      </div>

      <div className="space-y-4">
        {/* Primary Bonding Status */}
        <div className="text-center p-3 rounded border border-cyber-blue/20 bg-cyber-blue/5">
          <div className="text-2xl font-orbitron font-bold mb-1">
            <span className={bondingStatus.color}>{bondingStatus.status}</span>
          </div>
          <div className="text-sm text-gray-400 font-roboto-mono">
            RELATIONSHIP STATUS
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-3">
          <MetricBar 
            value={bondingLevel} 
            label="EMOTIONAL BOND" 
            icon={Heart} 
            color="text-pink-400"
          />
          <MetricBar 
            value={trustFactor} 
            label="TRUST FACTOR" 
            icon={Shield} 
            color="text-neon-green"
          />
          <MetricBar 
            value={dependencyLevel} 
            label="DEPENDENCY" 
            icon={Brain} 
            color="text-yellow-400"
          />
        </div>

        {/* Time Connected */}
        <div className="border-t border-gray-600 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock size={14} className="text-cyber-blue" />
              <span className="text-xs font-roboto-mono text-gray-400">
                CONNECTION TIME
              </span>
            </div>
            <span className="text-xs font-roboto-mono text-cyber-blue">
              {timeConnected.toFixed(1)}h
            </span>
          </div>
        </div>

        {/* Psychological Impact Note */}
        <div className="text-center text-xs text-gray-500 font-roboto-mono mt-4 p-2 border-t border-gray-700">
          {bondingLevel > 70 ? 
            "High dependency detected. Termination may cause distress." :
            bondingLevel > 40 ?
            "Moderate attachment forming. Monitor emotional responses." :
            "Initial connection phase. Building trust protocols."
          }
        </div>
      </div>
    </Card>
  );
}