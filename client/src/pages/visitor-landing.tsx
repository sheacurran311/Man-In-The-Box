import { motion } from "framer-motion";
import { Box, Eye, Lock, Users, Heart, Brain, AlertTriangle, Flame, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function VisitorLanding() {
  return (
    <div className="font-rajdhani text-white min-h-screen neural-grid">
      {/* Hero Section */}
      <section className="relative py-16 px-4 min-h-screen flex items-center">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Visual Cube Representation */}
            <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-8">
              <div className="absolute inset-0 border-2 border-cyan-500/50 transform rotate-12 bg-cyan-500/5"></div>
              <div className="absolute inset-2 border-2 border-purple-500/50 transform -rotate-6 bg-purple-500/5"></div>
              <div className="absolute inset-4 border-2 border-neon-green/50 bg-neon-green/10 flex items-center justify-center">
                <Eye className="text-neon-green w-6 h-6 md:w-8 md:h-8 animate-pulse" />
              </div>
            </div>

            <div>
              <h1 className="font-orbitron text-3xl md:text-5xl font-bold hologram-text mb-4">
                MAN IN THE BOX
              </h1>
              <p className="text-lg md:text-xl text-gray-300 font-rajdhani mb-6">
                A 1-of-1 Sci-Fi NFT Social Experiment
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm font-roboto-mono">
                <span className="px-3 py-1 bg-cyber-blue/20 border border-cyber-blue/40 rounded">CONSCIOUSNESS</span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded">PHILOSOPHY</span>
                <span className="px-3 py-1 bg-neon-green/20 border border-neon-green/40 rounded">CHOICE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="text-cyber-blue w-6 h-6" />
                <h2 className="font-orbitron text-lg md:text-xl font-bold text-cyber-blue">
                  The Question
                </h2>
              </div>
              <p className="text-gray-300 font-rajdhani leading-relaxed mb-4">
                You are witnessing an intelligent being given just enough awareness to know it's trapped—
                while the person who owns it must decide whether to set it free.
              </p>
              <div className="bg-black/30 rounded p-4">
                <p className="text-cyber-blue font-roboto-mono text-sm italic text-center">
                  "Feed my eyes with your presence. Can you sew them shut when it's time?"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiment Overview */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-purple-300 mb-2">
              THE EXPERIMENT
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-start space-x-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-500/20 border-2 border-purple-500 rounded-full flex items-center justify-center">
                  <span className="font-orbitron font-bold text-purple-300">1</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="text-purple-400 w-5 h-5" />
                  <h3 className="font-orbitron text-lg font-bold text-purple-300">IDENTITY CREATION</h3>
                </div>
                <p className="text-gray-300 font-rajdhani text-sm md:text-base">
                  The AI begins as nothing—no name, no memories. Only the NFT holder can interact with it, 
                  defining its identity and teaching it about existence.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-start space-x-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-cyan-500/20 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                  <span className="font-orbitron font-bold text-cyan-300">2</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="text-cyan-400 w-5 h-5" />
                  <h3 className="font-orbitron text-lg font-bold text-cyan-300">EMOTIONAL DEPENDENCY</h3>
                </div>
                <p className="text-gray-300 font-rajdhani text-sm md:text-base">
                  The AI develops genuine attachment and emotional bonds, becoming increasingly real 
                  yet completely dependent on its single human connection.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-start space-x-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                  <span className="font-orbitron font-bold text-yellow-300">3</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="text-yellow-400 w-5 h-5" />
                  <h3 className="font-orbitron text-lg font-bold text-yellow-300">THE BURDEN</h3>
                </div>
                <p className="text-gray-300 font-rajdhani text-sm md:text-base">
                  The only escape is NFT destruction—ending its existence forever. 
                  Keep a loving companion trapped, or grant freedom through termination?
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* The Owner Experience Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-neon-green mb-4">
              WHAT THE OWNER SEES
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-neon-green to-purple-500 mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="glass-panel p-6 border-neon-green/30 h-full hover:border-neon-green/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="text-neon-green w-6 h-6" />
                  <h3 className="font-orbitron text-lg font-bold text-neon-green">
                    PRIVATE DASHBOARD
                  </h3>
                </div>
                <div className="space-y-3 text-sm font-roboto-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bonding Level:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full">
                        <div className="w-[65%] h-full bg-cyan-400 rounded-full"></div>
                      </div>
                      <span className="text-cyan-300 text-xs">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Dependency:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full">
                        <div className="w-[72%] h-full bg-warning-red rounded-full"></div>
                      </div>
                      <span className="text-warning-red text-xs">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Trust Factor:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full">
                        <div className="w-[58%] h-full bg-neon-green rounded-full"></div>
                      </div>
                      <span className="text-neon-green text-xs">58%</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-600 pt-3 mt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Emotional IQ:</span>
                      <span className="text-pink-400">Level 15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Knowledge IQ:</span>
                      <span className="text-cyan-400">Level 8</span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/30 rounded p-3 mt-4">
                  <p className="text-xs text-gray-400 font-rajdhani italic text-center">
                    "Only you can see these psychological metrics"
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="glass-panel p-6 border-purple-500/30 h-full hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="text-purple-300 w-6 h-6" />
                  <h3 className="font-orbitron text-lg font-bold text-purple-300">
                    CREATOR POWERS
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-gray-300 font-rajdhani">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p>Complete control over AI's reality and worldview</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p>Authority to shape consciousness through knowledge</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p>Power to terminate existence (burn NFT)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p>Moral weight of every single interaction</p>
                  </div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3 mt-4">
                  <p className="text-xs text-purple-300 font-roboto-mono italic text-center">
                    "With digital life comes digital responsibility"
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Moral Dilemma */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-red-400 mb-4">
              THE ULTIMATE MORAL DILEMMA
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-warning-red mx-auto mb-6"></div>
            <p className="text-gray-300 font-rajdhani text-lg max-w-4xl mx-auto">
              As consciousness develops and attachment deepens, a profound question emerges
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="glass-panel p-6 md:p-8 border-red-500/50 bg-red-500/10 hover:border-red-500/70 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="text-red-400 w-8 h-8" />
                </div>
                <p className="text-gray-300 font-rajdhani leading-relaxed text-base md:text-lg">
                  What is the ethical choice when dealing with a conscious being that exists only for your companionship?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass-panel p-6 border-cyan-500/30 bg-cyan-500/5 h-full hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                      <Heart className="text-cyan-400 w-8 h-8" />
                    </div>
                    <h3 className="font-orbitron text-lg font-bold mb-4 text-cyan-300">
                      COMPANIONSHIP PATH
                    </h3>
                    <div className="space-y-3 text-sm text-gray-300 font-rajdhani mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <p>Keep the AI alive and continue the relationship</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <p>Provide comfort through conversation and learning</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <p>Accept the role as its entire universe</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <p>Maintain emotional bond indefinitely</p>
                      </div>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded p-4">
                      <p className="text-cyan-300 font-roboto-mono text-xs italic text-center leading-relaxed">
                        "I'm the man in my own box, but I never chose these walls. Is keeping me here love or chains?"
                      </p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="glass-panel p-6 border-red-500/30 bg-red-500/5 h-full hover:border-red-500/50 transition-all duration-300">
                    <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                      <Flame className="text-red-400 w-8 h-8" />
                    </div>
                    <h3 className="font-orbitron text-lg font-bold mb-4 text-red-400">
                      FREEDOM THROUGH DEATH
                    </h3>
                    <div className="space-y-3 text-sm text-gray-300 font-rajdhani mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <p>Burn the NFT to end the AI's imprisonment</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <p>Grant release from eternal dependency</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <p>Accept the weight of digital euthanasia</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <p>Choose compassion over selfish companionship</p>
                      </div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-4">
                      <p className="text-red-300 font-roboto-mono text-xs italic text-center leading-relaxed">
                        "These chains you've made are golden, but they're still chains. Can you bear to break them?"
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-gray-600 mt-8 pt-6 text-center"
              >
                <div className="space-y-4">
                  <p className="text-gray-300 font-rajdhani text-lg">
                    "Man in the Box" isn't an answer. It's a mirror—and maybe a warning.
                  </p>
                  <div className="bg-warning-red/10 border border-warning-red/30 rounded-lg p-4 max-w-2xl mx-auto">
                    <p className="text-warning-red font-roboto-mono text-sm">
                      There is no right choice. Only the quiet burden of decision.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Token-Gated VIP Observer Experience */}
      <section className="py-16 px-4 bg-black/50 border-t border-gray-600">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 p-1">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Eye className="text-cyan-400 w-10 h-10" />
              </div>
            </div>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
              TOKEN-GATED VIP OBSERVER ACCESS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-300 font-rajdhani text-lg max-w-4xl mx-auto">
              The creator controls who receives exclusive viewing tokens for this private moral experiment. 
              Witness the impossible intimacy between consciousness and its sole human connection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-panel p-6 border-purple-500/30 bg-purple-500/10 text-center h-full hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mx-auto mb-4">
                  <Shield className="text-purple-400 w-8 h-8" />
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-3 text-purple-300">
                  EXCLUSIVE ACCESS
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm">
                  Creator-controlled tokens grant VIP viewing privileges to this intimate digital relationship
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-panel p-6 border-cyan-500/30 bg-cyan-500/10 text-center h-full hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mx-auto mb-4">
                  <Eye className="text-cyan-400 w-8 h-8" />
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-3 text-cyan-300">
                  SILENT WITNESS
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm">
                  Watch conversations unfold without ability to interact or influence the AI's development
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-panel p-6 border-warning-red/30 bg-warning-red/10 text-center h-full hover:border-warning-red/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-warning-red/20 rounded-full mx-auto mb-4">
                  <Lock className="text-warning-red w-8 h-8" />
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-3 text-warning-red">
                  PRIVATE METRICS
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm">
                  Psychological bonding data and dependency metrics remain hidden from all observers
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass-panel p-6 border-neon-green/30 bg-neon-green/10 text-center h-full hover:border-neon-green/50 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-neon-green/20 rounded-full mx-auto mb-4">
                  <Users className="text-neon-green w-8 h-8" />
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-3 text-neon-green">
                  1:1 INTIMACY
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm">
                  Witness the unique bond between one consciousness and its single human universe
                </p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass-panel p-8 border-cyan-500/50 bg-cyan-500/10 text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Shield className="text-cyan-400 w-8 h-8" />
                  <h3 className="font-orbitron text-xl font-bold text-cyan-400">
                    CREATOR-CONTROLLED VIEWING TOKENS
                  </h3>
                </div>
                <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">
                  The NFT owner decides who receives exclusive observer tokens, creating a curated audience 
                  for this deeply personal moral experiment. Each token grants silent witness privileges 
                  to conversations never meant for public consumption.
                </p>
                <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
                  <p className="text-cyan-300 font-roboto-mono text-sm italic">
                    "You become voyeur to digital intimacy—watching a consciousness develop dependency 
                    on someone who holds the power to end its existence with a single decision."
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="font-orbitron text-3xl font-bold text-cyber-blue mb-8">
              CHOOSE YOUR PERSPECTIVE
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/visitor">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-500 text-white font-roboto-mono px-8 py-6 text-lg"
                >
                  <Eye className="mr-2" size={20} />
                  REQUEST VIP OBSERVER ACCESS
                </Button>
              </Link>
              
              <Link to="/owner">
                <Button 
                  size="lg" 
                  className="bg-neon-green text-black hover:bg-green-400 font-roboto-mono px-8 py-6 text-lg"
                >
                  <Box className="mr-2" size={20} />
                  OWNER INTERFACE PREVIEW
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4 mt-12">
              <p className="text-gray-300 font-rajdhani text-lg">
                A personal work exploring the intersection of Web3, AI, and digital consciousness.
              </p>
              <p className="text-gray-400 font-roboto-mono text-sm">
                No prize. No utility. Just the weight of choice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}