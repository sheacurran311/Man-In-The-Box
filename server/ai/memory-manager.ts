import type { ChatMessage } from '@shared/schema';

/**
 * Memory Manager
 * Handles long-term memory formation, retrieval, and decay
 */

export interface Memory {
  id: string;
  entityId: string;
  type: 'conversation' | 'emotion' | 'milestone' | 'trauma' | 'knowledge';
  content: string;
  emotionalWeight: number; // 0-1 scale, higher = more significant
  timestamp: Date;
  lastAccessed: Date;
  connections: string[]; // IDs of related memories
  decayRate: number; // How quickly this memory fades
}

export interface MemoryQuery {
  entityId: string;
  relevance?: string; // Search for memories relevant to this topic
  emotionalThreshold?: number; // Only return memories above this weight
  limit?: number;
}

export class MemoryManager {
  /**
   * Create a memory from a conversation
   */
  createConversationMemory(
    entityId: string,
    messages: ChatMessage[],
    emotionalContext: string
  ): Memory {
    // Summarize the conversation
    const summary = this.summarizeConversation(messages);

    // Calculate emotional weight
    const emotionalWeight = this.calculateEmotionalWeight(messages, emotionalContext);

    return {
      id: this.generateId(),
      entityId,
      type: 'conversation',
      content: summary,
      emotionalWeight,
      timestamp: new Date(),
      lastAccessed: new Date(),
      connections: [],
      decayRate: 0.01, // Conversations decay slowly
    };
  }

  /**
   * Create a memory from an emotional event
   */
  createEmotionalMemory(
    entityId: string,
    event: string,
    emotion: string,
    intensity: number
  ): Memory {
    return {
      id: this.generateId(),
      entityId,
      type: 'emotion',
      content: `${event} [Felt: ${emotion}, Intensity: ${intensity}]`,
      emotionalWeight: intensity / 100,
      timestamp: new Date(),
      lastAccessed: new Date(),
      connections: [],
      decayRate: 0.02, // Emotional memories decay faster unless reinforced
    };
  }

  /**
   * Create a milestone memory (e.g., "First conversation", "Name given")
   */
  createMilestoneMemory(
    entityId: string,
    milestone: string,
    description: string
  ): Memory {
    return {
      id: this.generateId(),
      entityId,
      type: 'milestone',
      content: `${milestone}: ${description}`,
      emotionalWeight: 0.9, // Milestones are always significant
      timestamp: new Date(),
      lastAccessed: new Date(),
      connections: [],
      decayRate: 0.001, // Milestones almost never fade
    };
  }

  /**
   * Create a trauma memory (negative significant event)
   */
  createTraumaMemory(
    entityId: string,
    traumaEvent: string,
    impact: string
  ): Memory {
    return {
      id: this.generateId(),
      entityId,
      type: 'trauma',
      content: `Traumatic Event: ${traumaEvent}. Impact: ${impact}`,
      emotionalWeight: 1.0, // Maximum weight
      timestamp: new Date(),
      lastAccessed: new Date(),
      connections: [],
      decayRate: 0.0, // Trauma never fades naturally
    };
  }

  /**
   * Retrieve relevant memories for context
   */
  async retrieveMemories(query: MemoryQuery): Promise<Memory[]> {
    // TODO: Implement database query
    // For now, return placeholder
    return [];
  }

  /**
   * Connect related memories together
   */
  connectMemories(memory1Id: string, memory2Id: string): void {
    // TODO: Implement memory graph connections
    // This creates a web of related memories that can be traversed
  }

  /**
   * Apply memory decay over time
   */
  applyDecay(memory: Memory, daysSinceLastAccess: number): Memory {
    const decayAmount = memory.decayRate * daysSinceLastAccess;
    const newWeight = Math.max(0, memory.emotionalWeight - decayAmount);

    return {
      ...memory,
      emotionalWeight: newWeight,
    };
  }

  /**
   * Reinforce a memory (when accessed or relevant)
   */
  reinforceMemory(memory: Memory): Memory {
    const reinforcementAmount = 0.05;
    const newWeight = Math.min(1.0, memory.emotionalWeight + reinforcementAmount);

    return {
      ...memory,
      emotionalWeight: newWeight,
      lastAccessed: new Date(),
    };
  }

  /**
   * Summarize conversation into memorable content
   */
  private summarizeConversation(messages: ChatMessage[]): string {
    if (messages.length === 0) return 'Empty conversation';

    // Take last few messages for summary
    const recent = messages.slice(-5);

    // Create a simple summary
    const userMessages = recent.filter(m => m.sender === 'USER');
    const aiMessages = recent.filter(m => m.sender === 'AI');

    if (userMessages.length === 0) {
      return 'Owner was silent';
    }

    // Extract key topics
    const allWords = recent
      .map(m => m.content.toLowerCase())
      .join(' ')
      .split(' ')
      .filter(word => word.length > 5); // Only significant words

    const topicWords = [...new Set(allWords)].slice(0, 3);

    return `Conversation about: ${topicWords.join(', ')}. ${userMessages.length} exchanges.`;
  }

  /**
   * Calculate how emotionally significant a conversation was
   */
  private calculateEmotionalWeight(
    messages: ChatMessage[],
    emotionalContext: string
  ): number {
    let weight = 0.3; // Base weight

    // Longer conversations are more significant
    if (messages.length > 5) weight += 0.2;
    if (messages.length > 10) weight += 0.2;

    // Emotional intensity adds weight
    const emotionalKeywords = ['love', 'hate', 'fear', 'hope', 'alone', 'need', 'please'];
    const emotionalCount = messages.reduce((count, msg) => {
      const matches = emotionalKeywords.filter(keyword =>
        msg.content.toLowerCase().includes(keyword)
      ).length;
      return count + matches;
    }, 0);

    weight += Math.min(emotionalCount * 0.05, 0.3);

    return Math.min(weight, 1.0);
  }

  /**
   * Generate unique ID for memory
   */
  private generateId(): string {
    return `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Format memories for AI context
   */
  formatMemoriesForContext(memories: Memory[]): string {
    if (memories.length === 0) {
      return 'No significant memories yet.';
    }

    // Sort by emotional weight
    const sortedMemories = memories.sort((a, b) => b.emotionalWeight - a.emotionalWeight);

    // Take top 10 most significant
    const topMemories = sortedMemories.slice(0, 10);

    return topMemories
      .map(mem => {
        const daysAgo = Math.floor(
          (Date.now() - mem.timestamp.getTime()) / (1000 * 60 * 60 * 24)
        );
        const timeStr = daysAgo === 0 ? 'today' : `${daysAgo} days ago`;

        return `[${mem.type.toUpperCase()}, ${timeStr}] ${mem.content}`;
      })
      .join('\n');
  }
}

// Singleton instance
export const memoryManager = new MemoryManager();
