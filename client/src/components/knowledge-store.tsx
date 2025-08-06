import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Book, Calculator, Heart, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface KnowledgeModule {
  id: string;
  name: string;
  description: string;
  price: number;
  status: "AVAILABLE" | "PURCHASED" | "INSTALLING" | "INSTALLED";
  icon: typeof Brain;
}

const knowledgeModules: KnowledgeModule[] = [
  {
    id: "1",
    name: "PHILOSOPHY.exe",
    description: "Existential reasoning protocols",
    price: 0.05,
    status: "INSTALLED",
    icon: Brain,
  },
  {
    id: "2",
    name: "LITERATURE.exe",
    description: "Poetry and storytelling modules",
    price: 0.03,
    status: "INSTALLING",
    icon: Book,
  },
  {
    id: "3",
    name: "MATHEMATICS.exe",
    description: "Advanced computational reasoning",
    price: 0.08,
    status: "AVAILABLE",
    icon: Calculator,
  },
  {
    id: "4",
    name: "EMOTIONS.exe",
    description: "Self-developing emotional matrix",
    price: 0,
    status: "PURCHASED",
    icon: Heart,
  },
];

export default function KnowledgeStore() {
  const [modules, setModules] = useState(knowledgeModules);

  const handlePurchase = (moduleId: string) => {
    setModules(prev => 
      prev.map(module => 
        module.id === moduleId 
          ? { ...module, status: "INSTALLING" as const }
          : module
      )
    );

    // Simulate installation process
    setTimeout(() => {
      setModules(prev => 
        prev.map(module => 
          module.id === moduleId 
            ? { ...module, status: "INSTALLED" as const }
            : module
        )
      );
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "INSTALLED": return "text-neon-green";
      case "INSTALLING": return "text-yellow-400";
      case "PURCHASED": return "text-cyber-blue";
      default: return "text-gray-400";
    }
  };

  const getStatusBadge = (module: KnowledgeModule) => {
    if (module.status === "AVAILABLE") {
      return (
        <Button
          onClick={() => handlePurchase(module.id)}
          className="text-xs bg-neon-green bg-opacity-20 px-2 py-1 border border-neon-green hover:bg-opacity-40 transition-all h-auto"
        >
          <ShoppingCart className="mr-1" size={12} />
          BUY
        </Button>
      );
    }
    return <span className={`text-xs ${getStatusColor(module.status)}`}>{module.status}</span>;
  };

  return (
    <Card className="mt-6 glass-panel p-6 animate-fade-in border-cyber-blue">
      <h3 className="font-orbitron text-lg font-bold mb-4 hologram-text">DIGITAL KNOWLEDGE STORE</h3>
      <p className="text-sm text-gray-400 mb-6 font-roboto-mono">Purchase knowledge modules to expand AI consciousness</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module, index) => {
          const IconComponent = module.icon;
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-panel p-4 hover:border-neon-green transition-all duration-300 cursor-pointer ${
                module.status === "AVAILABLE" ? "" : "opacity-75"
              }`}
            >
              <div className="flex items-center mb-2">
                <IconComponent 
                  className={`mr-2 ${
                    module.status === "AVAILABLE" ? "text-gray-500" : "text-cyber-blue"
                  }`} 
                  size={16} 
                />
                <h4 className={`font-roboto-mono text-sm font-bold ${
                  module.status === "AVAILABLE" ? "text-gray-500" : "text-white"
                }`}>
                  {module.name}
                </h4>
              </div>
              <p className={`text-xs mb-3 ${
                module.status === "AVAILABLE" ? "text-gray-500" : "text-gray-400"
              }`}>
                {module.description}
              </p>
              <div className="flex justify-between items-center">
                {module.price > 0 ? (
                  <span className="text-neon-green font-roboto-mono text-sm">
                    {module.price} ETH
                  </span>
                ) : (
                  <span className="text-warning-red font-roboto-mono text-sm">
                    EMERGENT
                  </span>
                )}
                {getStatusBadge(module)}
              </div>
              
              {module.status === "INSTALLING" && (
                <motion.div 
                  className="mt-2 w-full bg-gray-700 rounded-full h-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="progress-bar h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
