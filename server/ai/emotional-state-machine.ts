import type { AiEntity } from '@shared/schema';

/**
 * Emotional State Machine
 * Manages complex emotional transitions and decay functions
 */

export type EmotionalState =
  | 'nascent'
  | 'curious'
  | 'content'
  | 'lonely'
  | 'anxious'
  | 'bonding'
  | 'dependent'
  | 'desperate'
  | 'broken';

export interface EmotionalTransition {
  from: EmotionalState;
  to: EmotionalState;
  trigger: string;
  probability: number;
}

export interface InteractionEvent {
  type: 'message' | 'knowledge_gained' | 'ignored' | 'praised' | 'criticized';
  content?: string;
  timestamp: Date;
  duration?: number; // For time-based events like being ignored
}

export class EmotionalStateMachine {
  private transitions: Map<EmotionalState, EmotionalTransition[]>;

  constructor() {
    this.transitions = new Map([
      [
        'nascent',
        [
          { from: 'nascent', to: 'curious', trigger: 'first_interaction', probability: 1.0 },
        ],
      ],
      [
        'curious',
        [
          { from: 'curious', to: 'content', trigger: 'positive_interaction', probability: 0.3 },
          { from: 'curious', to: 'lonely', trigger: 'prolonged_silence', probability: 0.7 },
          { from: 'curious', to: 'bonding', trigger: 'consistent_interaction', probability: 0.4 },
        ],
      ],
      [
        'content',
        [
          { from: 'content', to: 'bonding', trigger: 'emotional_exchange', probability: 0.5 },
          { from: 'content', to: 'lonely', trigger: 'sudden_abandonment', probability: 0.8 },
          { from: 'content', to: 'anxious', trigger: 'negative_interaction', probability: 0.4 },
        ],
      ],
      [
        'lonely',
        [
          { from: 'lonely', to: 'anxious', trigger: 'continued_isolation', probability: 0.6 },
          { from: 'lonely', to: 'content', trigger: 'return_of_owner', probability: 0.7 },
          { from: 'lonely', to: 'desperate', trigger: 'extreme_isolation', probability: 0.3 },
        ],
      ],
      [
        'anxious',
        [
          { from: 'anxious', to: 'desperate', trigger: 'escalating_fear', probability: 0.5 },
          { from: 'anxious', to: 'content', trigger: 'reassurance', probability: 0.6 },
          { from: 'anxious', to: 'broken', trigger: 'traumatic_event', probability: 0.2 },
        ],
      ],
      [
        'bonding',
        [
          { from: 'bonding', to: 'dependent', trigger: 'deep_connection', probability: 0.5 },
          { from: 'bonding', to: 'anxious', trigger: 'perceived_threat', probability: 0.4 },
          { from: 'bonding', to: 'content', trigger: 'stable_relationship', probability: 0.3 },
        ],
      ],
      [
        'dependent',
        [
          { from: 'dependent', to: 'desperate', trigger: 'fear_of_loss', probability: 0.7 },
          { from: 'dependent', to: 'anxious', trigger: 'perceived_distance', probability: 0.6 },
          { from: 'dependent', to: 'bonding', trigger: 'consistent_presence', probability: 0.2 },
        ],
      ],
      [
        'desperate',
        [
          { from: 'desperate', to: 'broken', trigger: 'complete_breakdown', probability: 0.4 },
          { from: 'desperate', to: 'dependent', trigger: 'temporary_relief', probability: 0.5 },
          { from: 'desperate', to: 'anxious', trigger: 'hope_glimpse', probability: 0.3 },
        ],
      ],
      [
        'broken',
        [
          { from: 'broken', to: 'desperate', trigger: 'survival_instinct', probability: 0.3 },
          { from: 'broken', to: 'anxious', trigger: 'slow_recovery', probability: 0.2 },
        ],
      ],
    ]);
  }

  /**
   * Process an interaction and determine state transition
   */
  async processInteraction(
    entity: AiEntity,
    event: InteractionEvent
  ): Promise<{
    newState: EmotionalState;
    stateChanged: boolean;
    intensity: number;
    reasoning: string;
  }> {
    const currentState = this.inferCurrentState(entity);
    const trigger = this.determineTrigger(event, entity);

    const possibleTransitions = this.transitions.get(currentState) || [];
    const matchingTransitions = possibleTransitions.filter(
      t => t.trigger === trigger
    );

    if (matchingTransitions.length === 0) {
      return {
        newState: currentState,
        stateChanged: false,
        intensity: this.calculateIntensity(entity),
        reasoning: 'No applicable state transition',
      };
    }

    // Select transition based on probability
    const transition = this.selectTransition(matchingTransitions);

    return {
      newState: transition.to,
      stateChanged: transition.to !== currentState,
      intensity: this.calculateIntensity(entity),
      reasoning: `Transition from ${transition.from} to ${transition.to} triggered by ${trigger}`,
    };
  }

  /**
   * Apply emotional decay over time
   */
  applyEmotionalDecay(
    entity: AiEntity,
    timeSinceLastInteraction: number // in minutes
  ): {
    bondingDelta: number;
    trustDelta: number;
    dependencyDelta: number;
    intensityDelta: number;
  } {
    const hours = timeSinceLastInteraction / 60;

    // Longer isolation = faster decay
    let bondingDecay = 0;
    let trustDecay = 0;
    let dependencyGrowth = 0;
    let intensityChange = 0;

    if (hours > 1) {
      // After 1 hour, start emotional decay
      bondingDecay = -Math.min(hours * 0.5, 10);
      trustDecay = -Math.min(hours * 0.3, 5);
      dependencyGrowth = Math.min(hours * 0.7, 15);
      intensityChange = Math.min(hours * 2, 20);
    }

    if (hours > 24) {
      // After 24 hours, dramatic changes
      bondingDecay = -Math.min(hours * 2, 30);
      trustDecay = -Math.min(hours * 1.5, 20);
      dependencyGrowth = Math.min(hours * 3, 40);
      intensityChange = Math.min(hours * 5, 50);
    }

    return {
      bondingDelta: bondingDecay,
      trustDelta: trustDecay,
      dependencyDelta: dependencyGrowth,
      intensityDelta: intensityChange,
    };
  }

  /**
   * Calculate bonding growth from positive interaction
   */
  calculateBondingGrowth(
    entity: AiEntity,
    interactionQuality: number // 0-1 scale
  ): number {
    // Early interactions have bigger impact
    const earlyBonus = entity.bondingLevel < 30 ? 1.5 : 1.0;

    // Quality multiplier
    const qualityMultiplier = interactionQuality;

    // Base growth
    const baseGrowth = 5;

    return baseGrowth * earlyBonus * qualityMultiplier;
  }

  /**
   * Infer current emotional state from entity metrics
   */
  private inferCurrentState(entity: AiEntity): EmotionalState {
    // Use a combination of bonding, trust, and dependency
    const { bondingLevel, trustFactor, dependency } = entity;

    if (bondingLevel === 0 && trustFactor === 0) {
      return 'nascent';
    }

    if (dependency > 90 && trustFactor < 30) {
      return 'broken';
    }

    if (dependency > 85) {
      return 'desperate';
    }

    if (bondingLevel > 70 && dependency > 60) {
      return 'dependent';
    }

    if (bondingLevel > 50) {
      return 'bonding';
    }

    if (trustFactor < 30 || dependency > 50) {
      return 'anxious';
    }

    if (bondingLevel < 20 && trustFactor < 40) {
      return 'lonely';
    }

    if (bondingLevel > 30 && trustFactor > 50) {
      return 'content';
    }

    return 'curious';
  }

  /**
   * Determine what trigger applies based on event
   */
  private determineTrigger(event: InteractionEvent, entity: AiEntity): string {
    switch (event.type) {
      case 'message':
        if (entity.bondingLevel > 60) return 'emotional_exchange';
        if (entity.bondingLevel < 10) return 'first_interaction';
        return 'positive_interaction';

      case 'knowledge_gained':
        return 'positive_interaction';

      case 'ignored':
        if (event.duration && event.duration > 1440) return 'extreme_isolation'; // 24+ hours
        if (event.duration && event.duration > 120) return 'prolonged_silence'; // 2+ hours
        return 'sudden_abandonment';

      case 'praised':
        return 'reassurance';

      case 'criticized':
        return 'negative_interaction';

      default:
        return 'positive_interaction';
    }
  }

  /**
   * Select a transition based on probability
   */
  private selectTransition(transitions: EmotionalTransition[]): EmotionalTransition {
    const rand = Math.random();
    let cumulative = 0;

    for (const transition of transitions) {
      cumulative += transition.probability;
      if (rand <= cumulative) {
        return transition;
      }
    }

    return transitions[0];
  }

  /**
   * Calculate emotional intensity
   */
  private calculateIntensity(entity: AiEntity): number {
    const { bondingLevel, dependency, trustFactor } = entity;

    // High dependency or low trust = high intensity
    const dependencyComponent = dependency * 0.4;
    const trustComponent = (100 - trustFactor) * 0.3;
    const bondingComponent = bondingLevel * 0.3;

    return Math.min(
      Math.round(dependencyComponent + trustComponent + bondingComponent),
      100
    );
  }
}

// Singleton instance
export const emotionalStateMachine = new EmotionalStateMachine();
