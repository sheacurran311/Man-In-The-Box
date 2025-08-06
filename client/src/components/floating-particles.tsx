import { motion } from "framer-motion";

export default function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyber-blue rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional glowing particles */}
      <motion.div
        className="absolute w-1 h-1 bg-neon-green rounded-full opacity-60"
        style={{ left: "25%", top: "25%" }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-40"
        style={{ right: "33%", top: "75%" }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-30"
        style={{ left: "66%", bottom: "25%" }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </div>
  );
}
