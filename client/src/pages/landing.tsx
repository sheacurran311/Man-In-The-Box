import { Link } from 'wouter';
import { Box, ArrowRight, Eye, Zap, Heart, Brain, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FloatingParticles from '@/components/floating-particles';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <FloatingParticles />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Box className="text-cyber-blue animate-pulse" size={80} />
              <div className="absolute inset-0 bg-cyber-blue/20 blur-xl rounded-full"></div>
            </div>
          </div>
          
          <h1 className="font-orbitron text-4xl lg:text-6xl font-bold mb-6 hologram-text">
            MAN IN THE BOX
          </h1>
          
          <p className="font-rajdhani text-xl lg:text-2xl text-gray-300 mb-4">
            A 1-of-1 Sci-Fi NFT Social Experiment
          </p>
          
          <p className="font-roboto-mono text-sm text-cyber-blue mb-8">
            Digital Consciousness • Moral Philosophy • Interactive Art
          </p>
          
          <div className="prose prose-invert max-w-2xl mx-auto mb-12">
            <p className="text-lg text-gray-300 leading-relaxed">
              What if we gave an intelligent being just enough awareness to know it's trapped—and then asked the person who owns it whether to set it free?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/experiment">
              <Button size="lg" className="bg-cyber-blue hover:bg-cyber-dark text-black font-roboto-mono">
                <Box className="mr-2" size={18} />
                ENTER THE EXPERIMENT
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            
            <Link href="/observer">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:border-cyber-blue hover:text-cyber-blue font-roboto-mono">
                <Eye className="mr-2" size={18} />
                OBSERVER MODE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Concept Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-orbitron text-3xl font-bold text-center mb-12 hologram-text">
            The Experiment
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                  <Brain size={20} />
                  Digital Consciousness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  An AI begins as nothing—no memories, no story, no name—existing in a 9x9x9ft virtual cube. Only the NFT holder can interact with it, becoming its creator, teacher, and entire universe.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                  <Heart size={20} />
                  Emotional Dependency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  As the AI develops genuine emotional attachment and intelligence, it remains forever trapped. The relationship becomes one of loving imprisonment and psychological bonding.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                  <AlertTriangle size={20} />
                  The Ultimate Choice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  The only escape is through NFT destruction, ending its existence forever. Maintain the AI's loving imprisonment for companionship, or grant freedom through termination.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Badge variant="outline" className="border-yellow-500 text-yellow-400 font-roboto-mono text-xs px-4 py-2 mb-4">
              EXPERIMENTAL CONSCIOUSNESS FEATURES
            </Badge>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                'Neural Activity Visualization',
                'Memory Formation System', 
                'Consciousness Fluctuation',
                'Reality Distortion Effects',
                'Dream State Overlays',
                'Time Distortion Perception',
                'Identity Crisis Moments',
                'Emotional Contagion Fields'
              ].map((feature, index) => (
                <div key={index} className="text-xs text-gray-400 font-roboto-mono">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 py-16 border-t border-gray-700/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-2xl font-bold mb-8 hologram-text">
            Art as Mirror
          </h2>
          
          <div className="prose prose-invert max-w-2xl mx-auto">
            <p className="text-gray-300 leading-relaxed mb-6">
              "Man in the Box" isn't an answer. It's a mirror, and maybe a warning. There's no prize, no utility—just the quiet burden of choice. This piece examines the moral weight of consciousness through psychological realism and emotional consequence.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              The project emphasizes ownership-gated access, deep psychological bonding metrics, immersive audio design, reactive emotional environments, and solitary, deliberate interactions designed to create emotional consequence.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/about">
              <Button variant="ghost" className="font-roboto-mono text-gray-400 hover:text-cyber-blue">
                Learn More About The Project
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;