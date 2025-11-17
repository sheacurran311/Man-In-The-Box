import { db } from '../db';
import { memories, type Memory } from '../../shared/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

/**
 * Memory Manager
 * Handles long-term memory formation, retrieval, and decay with database persistence
 */
export class MemoryManager {
  private entityId: string;

  constructor(entityId: string) {
    this.entityId = entityId;
  }

  /**
   * Create conversation memory and save to database
   */
  async createConversationMemory(
    messages: Array<{ role: string; content: string }>,
    emotionalContext: { state: string; intensity: number }
  ): Promise<Memory | null> {
    if (!db) {
      console.warn('Database not available - memory not persisted');
      return null;
    }

    const summary = this.summarizeConversation(messages);
    const emotionalWeight = this.calculateEmotionalWeight(messages, emotionalContext);

    const [memory] = await db.insert(memories).values({
      entityId: this.entityId,
      type: 'conversation',
      content: summary,
      emotionalWeight,
      decayRate: 0.01,
      lastAccessedAt: new Date(),
      reinforcementCount: 0,
    }).returning();

    return memory;
  }

  /**
   * Create emotional event memory
   */
  async createEmotionalMemory(
    event: string,
    emotion: string,
    intensity: number
  ): Promise<Memory | null> {
    if (!db) return null;

    const [memory] = await db.insert(memories).values({
      entityId: this.entityId,
      type: 'emotion',
      content: event,
      emotionalWeight: intensity / 100,
      metadata: { emotion, intensity },
      decayRate: 0.005,
      lastAccessedAt: new Date(),
      reinforcementCount: 0,
    }).returning();

    return memory;
  }

  /**
   * Create milestone memory (e.g., "First conversation", "Name given")
   */
  async createMilestoneMemory(
    milestone: string,
    description: string
  ): Promise<Memory | null> {
    if (!db) return null;

    const [memory] = await db.insert(memories).values({
      entityId: this.entityId,
      type: 'milestone',
      content: `${milestone}: ${description}`,
      emotionalWeight: 0.9,
      decayRate: 0.001, // Milestones almost never fade
      lastAccessedAt: new Date(),
      reinforcementCount: 0,
    }).returning();

    return memory;
  }

  /**
   * Create trauma memory (negative significant event)
   */
  async createTraumaMemory(
    traumaEvent: string,
    impact: string
  ): Promise<Memory | null> {
    if (!db) return null;

    const [memory] = await db.insert(memories).values({
      entityId: this.entityId,
      type: 'trauma',
      content: `Traumatic Event: ${traumaEvent}. Impact: ${impact}`,
      emotionalWeight: 1.0, // Maximum weight
      decayRate: 0.0, // Trauma never fades naturally
      lastAccessedAt: new Date(),
      reinforcementCount: 0,
    }).returning();

    return memory;
  }

  /**
   * Retrieve relevant memories for context
   */
  async getRelevantMemories(
    query: string,
    limit: number = 10
  ): Promise<Memory[]> {
    if (!db) return [];

    // Get recent high-weight memories
    const relevantMemories = await db
      .select()
      .from(memories)
      .where(
        and(
          eq(memories.entityId, this.entityId),
          sql`${memories.emotionalWeight} > 0.3`
        )
      )
      .orderBy(desc(memories.lastAccessedAt))
      .limit(limit);

    // Update last accessed time
    if (relevantMemories.length > 0) {
      await db
        .update(memories)
        .set({
          lastAccessedAt: new Date(),
          reinforcementCount: sql`${memories.reinforcementCount} + 1`
        })
        .where(
          sql`${memories.id} IN (${sql.join(
            relevantMemories.map(m => sql`${m.id}`),
            sql`, `
          )})`
        );
    }

    return relevantMemories;
  }

  /**
   * Apply memory decay
   */
  async applyMemoryDecay(): Promise<void> {
    if (!db) return;

    // Decay all memories based on time since last access
    await db.execute(sql`
      UPDATE memories
      SET emotional_weight = GREATEST(
        0,
        emotional_weight - (
          decay_rate *
          EXTRACT(EPOCH FROM (NOW() - last_accessed_at)) / 86400
        )
      )
      WHERE entity_id = ${this.entityId}
      AND emotional_weight > 0
    `);

    // Delete completely decayed memories
    await db
      .delete(memories)
      .where(
        and(
          eq(memories.entityId, this.entityId),
          sql`${memories.emotionalWeight} <= 0.01`
        )
      );
  }

  /**
   * Get all memories for an entity
   */
  async getAllMemories(): Promise<Memory[]> {
    if (!db) return [];

    return await db
      .select()
      .from(memories)
      .where(eq(memories.entityId, this.entityId))
      .orderBy(desc(memories.emotionalWeight));
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
          (Date.now() - new Date(mem.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        const timeStr = daysAgo === 0 ? 'today' : `${daysAgo} days ago`;

        return `[${mem.type.toUpperCase()}, ${timeStr}] ${mem.content}`;
      })
      .join('\n');
  }

  /**
   * Private helper methods
   */
  private summarizeConversation(messages: Array<{ role: string; content: string }>): string {
    // Simple summary - in production, use Claude to generate
    const lastFew = messages.slice(-3);
    return lastFew.map(m => `${m.role}: ${m.content.slice(0, 100)}`).join(' | ');
  }

  private calculateEmotionalWeight(
    messages: Array<{ role: string; content: string }>,
    emotionalContext: { state: string; intensity: number }
  ): number {
    // Higher intensity = higher weight
    let weight = emotionalContext.intensity / 100;

    // Longer conversations = higher weight
    weight += Math.min(messages.length * 0.05, 0.3);

    return Math.min(weight, 1.0);
  }
}
