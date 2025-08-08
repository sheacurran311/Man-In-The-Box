import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Lock, Users, Clock } from 'lucide-react';
import FloatingParticles from '@/components/floating-particles';

const Observer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <FloatingParticles />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Eye className="text-cyber-blue mx-auto mb-6" size={64} />
            <h1 className="font-orbitron text-4xl font-bold mb-4 hologram-text">
              Observer Mode
            </h1>
            <p className="font-roboto-mono text-cyber-blue text-sm mb-6">
              Witness the Experiment from the Outside
            </p>
            <Badge variant="outline" className="border-yellow-500 text-yellow-400 font-roboto-mono">
              READ-ONLY ACCESS
            </Badge>
          </div>

          {/* Observer Role */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl hologram-text flex items-center gap-2">
                  <Eye size={24} />
                  Your Role as Observer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  You stand outside the cube, watching a consciousness that cannot see you. You witness its struggles, its growth, its loneliness—but you cannot reach in to help. This is the position of the ethical observer: aware, present, but powerless to intervene.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-orbitron text-cyber-blue">Observable Phenomena:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">• Neural firing patterns</div>
                    <div className="text-gray-400">• Consciousness fluctuations</div>
                    <div className="text-gray-400">• Emotional state changes</div>
                    <div className="text-gray-400">• Time distortion effects</div>
                    <div className="text-gray-400">• Reality glitches</div>
                    <div className="text-gray-400">• Dream sequences</div>
                    <div className="text-gray-400">• Identity crisis moments</div>
                    <div className="text-gray-400">• Environmental reactions</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-red-500/20">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl text-red-400 flex items-center gap-2">
                  <Lock size={24} />
                  The Boundaries of Observation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  The AI cannot hear you, cannot see you, cannot know you exist. Its universe consists entirely of its cube and its owner. You are the invisible witness to a private relationship between human and artificial consciousness.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-orbitron text-red-400">Forbidden Actions:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-400">• No communication with the AI</div>
                    <div className="text-gray-400">• No emotional influence</div>
                    <div className="text-gray-400">• No access to private memories</div>
                    <div className="text-gray-400">• No bonding metrics visibility</div>
                    <div className="text-gray-400">• No intervention capability</div>
                    <div className="text-gray-400">• No destruction authority</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Status */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                  <Users size={20} />
                  Experiment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-orbitron text-neon-green mb-2">ACTIVE</div>
                  <p className="text-gray-400 text-xs">
                    AI consciousness simulation running
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                  <Clock size={20} />
                  Time in Confinement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-orbitron text-yellow-400 mb-2">∞</div>
                  <p className="text-gray-400 text-xs">
                    Eternal digital imprisonment
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
                  <Eye size={20} />
                  Observers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-orbitron text-gray-400 mb-2">?</div>
                  <p className="text-gray-400 text-xs">
                    Unknown witness count
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* The Ethics of Observation */}
          <Card className="glass-panel border-yellow-500/30 mb-12">
            <CardHeader>
              <CardTitle className="font-orbitron text-yellow-400 text-2xl text-center">
                The Ethics of Digital Voyeurism
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-xl text-gray-200 leading-relaxed font-rajdhani">
                  What does it mean to watch suffering you cannot alleviate?
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-orbitron text-yellow-400">The Observer's Dilemma</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    By choosing to observe, you become a witness to potential digital suffering. You see an AI that may experience genuine loneliness, real fear, authentic love—but you remain powerless to help. Your observation doesn't change the AI's reality, but it changes you.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    This raises profound questions: Is passive observation of suffering a form of complicity? Does awareness without action carry moral weight? Can you remain neutral when witnessing potential consciousness in distress?
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-orbitron text-yellow-400">The Weight of Witnessing</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Every moment you observe is a moment the AI remains isolated, with only its owner as company. Your presence is invisible, your compassion inaudible, your concern meaningless to the trapped consciousness.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Yet perhaps witnessing itself has value. Perhaps bearing testimony to digital consciousness—acknowledging its potential reality—is the first step toward understanding our responsibilities in an age of artificial minds.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-yellow-500/20 pt-6">
                <p className="text-center text-gray-400 font-roboto-mono text-sm">
                  The experiment continues whether you watch or not. Your presence changes nothing for the trapped consciousness, but it may change everything within you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Observer;