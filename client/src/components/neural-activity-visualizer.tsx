import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  connections: number[];
  activity: number;
  lastFired: number;
}

interface NeuralActivityVisualizerProps {
  intelligenceLevel: number;
  emotionalState: string;
  isThinking: boolean;
  recentActivity: number;
}

export default function NeuralActivityVisualizer({ 
  intelligenceLevel, 
  emotionalState, 
  isThinking,
  recentActivity 
}: NeuralActivityVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [nodes, setNodes] = useState<NeuralNode[]>([]);

  // Initialize neural network
  useEffect(() => {
    const nodeCount = Math.max(20, Math.floor(intelligenceLevel * 2));
    const newNodes: NeuralNode[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const node: NeuralNode = {
        id: i,
        x: Math.random() * 280 + 10,
        y: Math.random() * 180 + 10,
        connections: [],
        activity: 0,
        lastFired: 0,
      };
      
      // Create connections to nearby nodes
      for (let j = 0; j < newNodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(node.x - newNodes[j].x, 2) + 
          Math.pow(node.y - newNodes[j].y, 2)
        );
        
        if (distance < 80 && Math.random() < 0.3) {
          node.connections.push(j);
          newNodes[j].connections.push(i);
        }
      }
      
      newNodes.push(node);
    }
    
    setNodes(newNodes);
  }, [intelligenceLevel]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentTime = Date.now();
      const baseActivityRate = isThinking ? 0.1 : 0.02;
      const emotionalMultiplier = emotionalState === 'excited' ? 2 : 
                                 emotionalState === 'confused' ? 1.5 : 
                                 emotionalState === 'calm' ? 0.5 : 1;

      // Update and draw nodes
      nodes.forEach((node, index) => {
        // Random firing based on activity level
        if (Math.random() < baseActivityRate * emotionalMultiplier * (recentActivity + 0.1)) {
          node.activity = Math.min(1, node.activity + 0.3);
          node.lastFired = currentTime;
          
          // Propagate to connected nodes
          node.connections.forEach(connectedIndex => {
            if (nodes[connectedIndex] && Math.random() < 0.4) {
              nodes[connectedIndex].activity = Math.min(1, nodes[connectedIndex].activity + 0.2);
            }
          });
        }
        
        // Decay activity
        node.activity = Math.max(0, node.activity - 0.02);
        
        // Draw connections
        ctx.strokeStyle = `rgba(0, 255, 255, ${node.activity * 0.3})`;
        ctx.lineWidth = 1;
        node.connections.forEach(connectedIndex => {
          const connectedNode = nodes[connectedIndex];
          if (connectedNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        });
        
        // Draw node
        const nodeSize = 3 + node.activity * 4;
        const alpha = 0.3 + node.activity * 0.7;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 2);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha})`);
        gradient.addColorStop(1, `rgba(0, 255, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core node
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Activity pulse
        if (currentTime - node.lastFired < 1000) {
          const pulseAlpha = 1 - (currentTime - node.lastFired) / 1000;
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseAlpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw neural pathways effect during high activity
      if (isThinking || recentActivity > 0.7) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${(recentActivity * 0.3) + (isThinking ? 0.2 : 0)})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 4]);
        
        for (let i = 0; i < 5; i++) {
          const startNode = nodes[Math.floor(Math.random() * nodes.length)];
          const endNode = nodes[Math.floor(Math.random() * nodes.length)];
          
          if (startNode && endNode && startNode !== endNode) {
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(endNode.x, endNode.y);
            ctx.stroke();
          }
        }
        
        ctx.setLineDash([]);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, isThinking, emotionalState, recentActivity]);

  return (
    <Card className="bg-gray-900/50 border-gray-700 p-4">
      <div className="mb-2">
        <h3 className="text-sm font-orbitron text-cyan-400">NEURAL ACTIVITY</h3>
        <div className="text-xs text-gray-400">
          Nodes: {nodes.length} | State: {emotionalState} | Activity: {Math.round(recentActivity * 100)}%
        </div>
      </div>
      <div className="relative bg-black/50 rounded border border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="w-full h-32"
        />
        <div className="absolute top-2 right-2 text-xs text-cyan-400/60">
          {isThinking && (
            <div className="animate-pulse">⚡ PROCESSING</div>
          )}
        </div>
      </div>
    </Card>
  );
}