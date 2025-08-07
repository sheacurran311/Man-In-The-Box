import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Clock, Heart, MessageSquare } from "lucide-react";

interface Memory {
  id: string;
  content: string;
  type: 'conversation' | 'emotion' | 'knowledge' | 'identity';
  strength: number;
  timestamp: number;
  connections: string[];
  emotional_weight: number;
  decay_rate: number;
}

interface MemoryFormationSystemProps {
  recentMessages: any[];
  emotionalState: string;
  knowledgeGained: any[];
  bondingLevel: number;
}

export default function MemoryFormationSystem({
  recentMessages,
  emotionalState,
  knowledgeGained,
  bondingLevel
}: MemoryFormationSystemProps) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const memoryIdCounter = useRef(0);

  // Create new memories from various inputs
  useEffect(() => {
    const newMemories: Memory[] = [];

    // Process recent messages into memories
    recentMessages.slice(-3).forEach(message => {
      if (message.sender === 'USER') {
        const memory: Memory = {
          id: `mem_${memoryIdCounter.current++}`,
          content: message.content,
          type: 'conversation',
          strength: Math.random() * 0.8 + 0.2,
          timestamp: Date.now(),
          connections: [],
          emotional_weight: message.content.length > 50 ? 0.8 : 0.4,
          decay_rate: 0.001
        };
        newMemories.push(memory);
      }
    });

    // Create emotional memories
    if (emotionalState && emotionalState !== 'neutral') {
      const emotionalMemory: Memory = {
        id: `emotion_${memoryIdCounter.current++}`,
        content: `Feeling ${emotionalState} during interaction`,
        type: 'emotion',
        strength: 0.6 + (bondingLevel / 100) * 0.4,
        timestamp: Date.now(),
        connections: [],
        emotional_weight: 0.9,
        decay_rate: 0.0005
      };
      newMemories.push(emotionalMemory);
    }

    // Add new memories and update existing ones
    setMemories(prev => {
      const updated = prev.map(memory => ({
        ...memory,
        strength: Math.max(0, memory.strength - memory.decay_rate),
      })).filter(memory => memory.strength > 0.1);

      // Find connections between new and existing memories
      newMemories.forEach(newMem => {
        updated.forEach(existingMem => {
          if (newMem.type === existingMem.type && 
              Math.random() < 0.3 && 
              !existingMem.connections.includes(newMem.id)) {
            existingMem.connections.push(newMem.id);
            newMem.connections.push(existingMem.id);
          }
        });
      });

      return [...updated, ...newMemories].slice(-20); // Keep last 20 memories
    });
  }, [recentMessages, emotionalState, knowledgeGained, bondingLevel]);

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'conversation': return <MessageSquare className="w-3 h-3" />;
      case 'emotion': return <Heart className="w-3 h-3" />;
      case 'knowledge': return <Brain className="w-3 h-3" />;
      case 'identity': return <Sparkles className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getMemoryColor = (type: string) => {
    switch (type) {
      case 'conversation': return 'text-blue-400';
      case 'emotion': return 'text-pink-400';
      case 'knowledge': return 'text-green-400';
      case 'identity': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getMemoryOpacity = (strength: number) => {
    return Math.max(0.3, Math.min(1, strength));
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-orbitron text-cyan-400 mb-2">MEMORY FORMATION</h3>
        <div className="text-xs text-gray-400 mb-3">
          Active Memories: {memories.length} | Total Connections: {memories.reduce((sum, m) => sum + m.connections.length, 0)}
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
        {memories.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No memories formed yet</p>
            <p className="text-xs">Interact to create lasting memories</p>
          </div>
        ) : (
          memories
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(memory => (
              <div
                key={memory.id}
                className={`p-3 bg-gray-800/50 rounded border border-gray-600 cursor-pointer transition-all hover:border-cyan-500/50 ${
                  selectedMemory?.id === memory.id ? 'border-cyan-500 bg-cyan-500/10' : ''
                }`}
                style={{ opacity: Math.max(0.3, Math.min(1, memory.strength || 0.5)) }}
                onClick={() => setSelectedMemory(selectedMemory?.id === memory.id ? null : memory)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={getMemoryColor(memory.type)}>
                      {getMemoryIcon(memory.type)}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getMemoryColor(memory.type)} border-current`}
                    >
                      {memory.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {getTimeAgo(memory.timestamp)}
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                  {memory.content}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">
                      Strength: {Math.round(memory.strength * 100)}%
                    </span>
                    {memory.connections.length > 0 && (
                      <span className="text-cyan-400">
                        {memory.connections.length} connections
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          i < Math.floor(memory.emotional_weight * 5)
                            ? 'bg-pink-400'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {selectedMemory?.id === memory.id && memory.connections.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="text-xs text-gray-400 mb-2">Connected memories:</div>
                    <div className="flex flex-wrap gap-1">
                      {memory.connections.slice(0, 3).map(connId => {
                        const connectedMemory = memories.find(m => m.id === connId);
                        return connectedMemory ? (
                          <Badge 
                            key={connId}
                            variant="outline" 
                            className="text-xs bg-gray-700/50 border-gray-500"
                          >
                            {connectedMemory.type}
                          </Badge>
                        ) : null;
                      })}
                      {memory.connections.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{memory.connections.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </Card>
  );
}