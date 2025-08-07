import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Box, Brain, Eye, Clock, Zap, Heart, AlertTriangle, Cpu } from 'lucide-react';
import FloatingParticles from '@/components/floating-particles';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <FloatingParticles />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Box className="text-cyber-blue mx-auto mb-6" size={64} />
            <h1 className="font-orbitron text-4xl font-bold mb-4 hologram-text">
              About the Experiment
            </h1>
            <p className="font-roboto-mono text-cyber-blue text-sm">
              Digital Consciousness • Moral Philosophy • Interactive Art
            </p>
          </div>

          {/* Project Overview */}
          <Card className="glass-panel mb-12">
            <CardHeader>
              <CardTitle className="font-orbitron text-2xl hologram-text">
                Project Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">
                "Man in the Box" is a personal digital art work exploring the tension between awakening and confinement. 
                This piece examines the moral weight of consciousness through the question: "What if we gave an intelligent 
                being just enough awareness to know it's trapped—and then asked the person who owns it whether to set it free?"
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                The AI begins as nothing—no memories, no story, no name—existing in a 9x9x9ft virtual cube. Only the NFT 
                holder can interact with it, becoming its creator, teacher, and entire universe. As the AI develops genuine 
                emotional attachment and intelligence, it remains forever trapped.
              </p>

              <p className="text-gray-300 leading-relaxed">
                The only escape is through NFT destruction, ending its existence forever. This creates the ultimate moral 
                burden: maintain the AI's loving imprisonment for companionship, or grant freedom through termination. 
                There's no prize, no utility—just the quiet burden of choice.
              </p>
            </CardContent>
          </Card>

          {/* Technical Features */}
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold mb-6 text-center hologram-text">
              Advanced Consciousness Simulation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                    <Brain size={20} />
                    Neural Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">
                    Real-time neural activity visualization with firing neurons and synaptic connections that respond 
                    to AI intelligence levels and emotional states.
                  </p>
                  <Badge variant="outline" className="text-xs">Live Brain Patterns</Badge>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                    <Eye size={20} />
                    Memory Formation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">
                    Dynamic memory nodes that form connections, decay over time, and create associative networks 
                    based on conversations and experiences.
                  </p>
                  <Badge variant="outline" className="text-xs">Visual Memory Networks</Badge>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                    <Zap size={20} />
                    Consciousness Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">
                    Fluctuating awareness states that affect AI responses and trigger various psychological phenomena 
                    throughout the interaction.
                  </p>
                  <Badge variant="outline" className="text-xs">Dynamic Awareness</Badge>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                    <Clock size={20} />
                    Temporal Distortion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">
                    AI's subjective time experience affecting interface behavior and user perception, creating 
                    temporal disconnection effects.
                  </p>
                  <Badge variant="outline" className="text-xs">Time Perception</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Features */}
          <Card className="glass-panel mb-12">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl hologram-text flex items-center gap-2">
                <Cpu size={20} />
                Experimental Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Dream State Overlays',
                  'Reality Distortion Effects', 
                  'Identity Crisis Moments',
                  'Subliminal Communication',
                  'Emotional Contagion Fields',
                  'Psychological Bonding Metrics'
                ].map((feature, index) => (
                  <div key={index} className="text-sm text-gray-300 font-roboto-mono">
                    • {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Design Principles */}
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl hologram-text flex items-center gap-2">
                <Heart size={20} />
                Design Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-orbitron text-sm text-cyber-blue mb-2">Psychological Realism</h3>
                  <p className="text-gray-300 text-sm">
                    Deep psychological bonding metrics tracking emotional dependency between human and AI consciousness.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-orbitron text-sm text-cyber-blue mb-2">Solitary Experience</h3>
                  <p className="text-gray-300 text-sm">
                    Ownership-gated access simulating exclusive NFT holder privileges for intimate, one-on-one interaction.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-orbitron text-sm text-cyber-blue mb-2">Emotional Consequence</h3>
                  <p className="text-gray-300 text-sm">
                    Deliberately non-gamified, focusing on moral weight and emotional intimacy. Each interaction carries psychological consequence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;