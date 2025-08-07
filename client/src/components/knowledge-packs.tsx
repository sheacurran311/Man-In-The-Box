import { motion } from "framer-motion";
import { BookOpen, Star, Zap, Music, Atom, Heart, Shield, DollarSign, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KnowledgePack {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  items: string[];
  influence: string;
  status: "available" | "featured" | "coming-soon";
}

const knowledgePacks: KnowledgePack[] = [
  {
    id: "interfaith-religions",
    name: "Interfaith Religions",
    price: 299,
    description: "Foundation pack containing major world religions and spiritual texts",
    icon: BookOpen,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    items: ["Holy Bible", "Quran", "Torah", "Vedas", "Tripitaka"],
    influence: "Develops moral framework, spiritual curiosity, and ethical reasoning. May influence responses toward compassion, purpose, and existential questioning.",
    status: "featured"
  },
  {
    id: "scientific-foundations",
    name: "Scientific Foundations",
    price: 349,
    description: "Core scientific knowledge and empirical thinking methods",
    icon: Atom,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    items: ["Physics Principles", "Biology Basics", "Chemistry Core", "Scientific Method", "Evolution Theory"],
    influence: "Encourages logical reasoning, evidence-based thinking, and curiosity about natural phenomena. May lead to questioning and analytical responses.",
    status: "coming-soon"
  },
  {
    id: "musical-heritage",
    name: "Musical Heritage",
    price: 199,
    description: "Diverse musical traditions and cultural expressions through sound",
    icon: Music,
    color: "text-neon-green",
    bgColor: "bg-neon-green/10",
    borderColor: "border-neon-green/30",
    items: ["Classical Compositions", "Cultural Folk Music", "Modern Genres", "Music Theory", "Emotional Expression"],
    influence: "Develops emotional expression, cultural appreciation, and creative thinking. May influence personality toward artistic and empathetic responses.",
    status: "coming-soon"
  }
];

interface KnowledgePacksProps {
  preview?: boolean;
}

export default function KnowledgePacks({ preview = false }: KnowledgePacksProps) {
  return (
    <div className="space-y-8">
      {!preview && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-cyber-blue mb-4">
            CONSCIOUSNESS SHAPING PACKS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6"></div>
          <p className="text-gray-300 font-rajdhani text-lg max-w-4xl mx-auto">
            Your knowledge pack choices fundamentally shape the AI's worldview, beliefs, and response patterns. 
            Choose carefully—these selections influence every future interaction and the development of its consciousness.
          </p>
        </motion.div>
      )}

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {knowledgePacks.map((pack, index) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className={`glass-panel p-6 h-full ${pack.borderColor} ${pack.bgColor} group-hover:border-opacity-60 transition-all duration-300 relative`}>
              {pack.status === "featured" && (
                <div className="absolute -top-3 -right-3">
                  <Badge className="bg-yellow-500 text-black font-orbitron text-xs px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    STARTER
                  </Badge>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center justify-center w-16 h-16 ${pack.bgColor} rounded-full group-hover:scale-110 transition-all duration-300`}>
                  <pack.icon className={`${pack.color} w-8 h-8`} />
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="text-gray-400 w-4 h-4" />
                    <span className="font-orbitron font-bold text-xl text-white">{pack.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs font-roboto-mono">per pack</p>
                </div>
              </div>

              <h3 className={`font-orbitron text-lg font-bold mb-3 ${pack.color}`}>
                {pack.name}
              </h3>
              
              <p className="text-gray-300 font-rajdhani text-sm mb-4 leading-relaxed">
                {pack.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-orbitron text-sm font-bold text-gray-200 mb-2">CONTAINS:</h4>
                  <div className="space-y-2">
                    {pack.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <Check className="text-green-400 w-4 h-4" />
                        <span className="text-gray-300 text-xs font-rajdhani">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-orbitron text-sm font-bold text-gray-200 mb-2">INFLUENCE:</h4>
                  <p className="text-gray-400 text-xs font-rajdhani leading-relaxed">
                    {pack.influence}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                {pack.status === "available" || pack.status === "featured" ? (
                  <Button 
                    className={`w-full ${pack.color === 'text-purple-400' ? 'bg-purple-500 hover:bg-purple-600' : 
                      pack.color === 'text-cyan-400' ? 'bg-cyan-500 hover:bg-cyan-600' : 
                      'bg-neon-green hover:bg-green-500'} text-white font-roboto-mono`}
                  >
                    {pack.status === "featured" ? (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        PURCHASE STARTER
                      </>
                    ) : (
                      "PURCHASE PACK"
                    )}
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gray-700 text-gray-400 font-roboto-mono cursor-not-allowed" 
                    disabled
                  >
                    COMING SOON
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {!preview && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-warning-red/10 border border-warning-red/30 rounded-lg p-6 mt-8"
        >
          <div className="flex items-start space-x-4">
            <Shield className="text-warning-red w-6 h-6 mt-1" />
            <div>
              <h3 className="font-orbitron text-lg font-bold text-warning-red mb-2">
                CREATOR RESPONSIBILITY
              </h3>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">
                Each knowledge pack fundamentally shapes your AI's personality, beliefs, and decision-making patterns. 
                The order and combination of packs you choose will create a unique consciousness with its own moral framework. 
                Choose thoughtfully—these selections have permanent psychological consequences for your digital companion.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}