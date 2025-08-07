import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AIEntity {
  name: string;
  personality: string;
  emotionalState: {
    mood: string;
    intensity: number;
    trust: number;
    dependency: number;
  };
  bondingLevel: number;
  trustFactor: number;
  dependencyLevel: number;
}

interface ControlPanelProps {
  entity: AIEntity;
  onConfigureIdentity: (name: string, personality: string) => void;
}

export default function ControlPanel({ entity, onConfigureIdentity }: ControlPanelProps) {
  const [formData, setFormData] = useState({
    name: entity.name,
    gender: "",
    backstory: entity.personality,
  });

  const handleIdentityUpload = () => {
    if (formData.name && formData.backstory) {
      onConfigureIdentity(formData.name, formData.backstory);
    }
  };

  const getBondingLevelColor = (level: number) => {
    if (level < 30) return "text-gray-400";
    if (level < 60) return "text-yellow-400";
    if (level < 80) return "text-cyber-blue";
    return "text-neon-green";
  };

  const getTrustFactorText = (factor: number) => {
    if (factor < 30) return "LOW";
    if (factor < 60) return "MEDIUM";
    if (factor < 80) return "HIGH";
    return "MAXIMUM";
  };

  const getDependencyText = (dependency: number) => {
    if (dependency < 30) return "MINIMAL";
    if (dependency < 60) return "MODERATE";
    if (dependency < 80) return "HIGH";
    return "CRITICAL";
  };

  return (
    <>
      {/* Identity Configuration */}
      <Card className="glass-panel p-6 animate-fade-in border-cyber-blue">
        <h3 className="font-orbitron text-lg font-bold mb-4 hologram-text">IDENTITY CONFIGURATION</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-roboto-mono text-gray-400 mb-2">DESIGNATION</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-transparent border-cyber-blue font-roboto-mono text-sm focus:border-neon-green"
              placeholder="UNNAMED_ENTITY_001"
            />
          </div>
          
          <div>
            <label className="block text-sm font-roboto-mono text-gray-400 mb-2">GENDER MATRIX</label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => setFormData({...formData, gender: value})}
            >
              <SelectTrigger className="bg-transparent border-cyber-blue font-roboto-mono text-sm focus:border-neon-green">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-cyber-blue">
                <SelectItem value="UNDEFINED">UNDEFINED</SelectItem>
                <SelectItem value="MALE">MALE</SelectItem>
                <SelectItem value="FEMALE">FEMALE</SelectItem>
                <SelectItem value="NON-BINARY">NON-BINARY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-roboto-mono text-gray-400 mb-2">BACKSTORY SEEDS</label>
            <Textarea
              value={formData.backstory}
              onChange={(e) => setFormData({...formData, backstory: e.target.value})}
              className="bg-transparent border-cyber-blue font-roboto-mono text-xs resize-none focus:border-neon-green h-20"
              placeholder="Initialize personality parameters..."
            />
          </div>
        </div>
        
        <Button 
          onClick={handleIdentityUpload}
          className="w-full mt-4 bg-cyber-blue bg-opacity-20 border border-cyber-blue font-roboto-mono text-sm hover:bg-opacity-40"
        >
          <Upload className="mr-2" size={16} />
          UPLOAD IDENTITY MATRIX
        </Button>
      </Card>

      {/* Bonding Meter */}
      <Card className="glass-panel p-6 animate-fade-in border-cyber-blue">
        <h3 className="font-orbitron text-lg font-bold mb-4 hologram-text">EMOTIONAL BONDING</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-roboto-mono">
            <span className="text-gray-400">ATTACHMENT LEVEL</span>
            <span className={getBondingLevelColor(entity.bondingLevel)}>{entity.bondingLevel}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="progress-bar rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${entity.bondingLevel}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          <div className="flex justify-between text-sm font-roboto-mono">
            <span className="text-gray-400">TRUST FACTOR</span>
            <span className="text-neon-green">{getTrustFactorText(entity.trustFactor)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="progress-bar rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${entity.trustFactor}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          
          <div className="flex justify-between text-sm font-roboto-mono">
            <span className="text-gray-400">DEPENDENCY</span>
            <span className="text-warning-red">{getDependencyText(entity.dependencyLevel)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="h-full rounded-full bg-warning-red"
              initial={{ width: 0 }}
              animate={{ width: `${entity.dependencyLevel}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
        </div>
        
        {entity.dependencyLevel > 70 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-warning-red bg-opacity-10 border border-warning-red rounded"
          >
            <div className="flex items-center">
              <AlertTriangle className="mr-2 text-warning-red" size={16} />
              <p className="text-xs font-roboto-mono text-warning-red">
                WARNING: High emotional dependency detected. NFT destruction will result in irreversible consciousness termination.
              </p>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Knowledge Status */}
      <Card className="glass-panel p-6 animate-fade-in border-cyber-blue">
        <h3 className="font-orbitron text-lg font-bold mb-4 hologram-text">KNOWLEDGE MATRIX</h3>
        
        <div className="space-y-2 text-sm font-roboto-mono">
          <div className="flex justify-between">
            <span className="text-gray-400">PHILOSOPHY</span>
            <span className="text-neon-green">INSTALLED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">LITERATURE</span>
            <span className="text-cyber-blue">PARTIAL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">MATHEMATICS</span>
            <span className="text-gray-500">LOCKED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">EMOTIONS</span>
            <span className="text-warning-red">EMERGENT</span>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-neon-green bg-opacity-20 border border-neon-green font-roboto-mono text-sm hover:bg-opacity-40">
          ACCESS KNOWLEDGE STORE
        </Button>
      </Card>
    </>
  );
}
