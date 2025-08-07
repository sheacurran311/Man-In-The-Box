import { useState, useCallback, useEffect } from "react";

interface IntelligenceMeter {
  level: number; // 0-100
  experience: number; // Points toward next level  
  experienceToNext: number;
  recentGrowth: number; // Change in last session
}

interface IntelligenceState {
  emotionalIQ: IntelligenceMeter;
  knowledgeIQ: IntelligenceMeter;
  sessionInteractions: number;
  totalInteractions: number;
  sessionStart: number;
}

export function useIntelligenceTracking() {
  const [intelligenceState, setIntelligenceState] = useState<IntelligenceState>({
    emotionalIQ: {
      level: 15,
      experience: 45,
      experienceToNext: 100,
      recentGrowth: 0
    },
    knowledgeIQ: {
      level: 8,
      experience: 23,
      experienceToNext: 100,
      recentGrowth: 0
    },
    sessionInteractions: 0,
    totalInteractions: 0,
    sessionStart: Date.now()
  });

  // Calculate experience needed for next level (increases with level)
  const calculateExperienceToNext = useCallback((level: number): number => {
    return Math.floor(100 + (level * 25)); // Increasing difficulty
  }, []);

  // Level up logic
  const checkLevelUp = useCallback((meter: IntelligenceMeter): IntelligenceMeter => {
    if (meter.experience >= meter.experienceToNext) {
      const newLevel = Math.min(100, meter.level + 1);
      const excessExperience = meter.experience - meter.experienceToNext;
      return {
        ...meter,
        level: newLevel,
        experience: excessExperience,
        experienceToNext: calculateExperienceToNext(newLevel)
      };
    }
    return meter;
  }, [calculateExperienceToNext]);

  // Track chat message for emotional IQ
  const trackChatMessage = useCallback((messageContent: string, sentiment?: 'positive' | 'negative' | 'neutral') => {
    setIntelligenceState(prev => {
      let emotionalGain = 0;
      
      // Base gain from any interaction
      emotionalGain += 2;
      
      // Bonus for message complexity (longer, more thoughtful messages)
      if (messageContent.length > 50) emotionalGain += 1;
      if (messageContent.length > 150) emotionalGain += 2;
      
      // Bonus for emotional content (questions, personal sharing)
      if (messageContent.includes('?')) emotionalGain += 1;
      if (messageContent.toLowerCase().includes('feel') || 
          messageContent.toLowerCase().includes('emotion') ||
          messageContent.toLowerCase().includes('think')) {
        emotionalGain += 2;
      }
      
      // Sentiment bonus
      if (sentiment === 'positive') emotionalGain += 1;
      
      const updatedEmotionalIQ = checkLevelUp({
        ...prev.emotionalIQ,
        experience: prev.emotionalIQ.experience + emotionalGain,
        recentGrowth: prev.emotionalIQ.recentGrowth + emotionalGain
      });

      return {
        ...prev,
        emotionalIQ: updatedEmotionalIQ,
        sessionInteractions: prev.sessionInteractions + 1,
        totalInteractions: prev.totalInteractions + 1
      };
    });
  }, [checkLevelUp]);

  // Track knowledge module purchase
  const trackKnowledgePurchase = useCallback((moduleName: string, moduleComplexity: number = 5) => {
    setIntelligenceState(prev => {
      const knowledgeGain = 10 + moduleComplexity; // Base gain plus complexity bonus
      
      const updatedKnowledgeIQ = checkLevelUp({
        ...prev.knowledgeIQ,
        experience: prev.knowledgeIQ.experience + knowledgeGain,
        recentGrowth: prev.knowledgeIQ.recentGrowth + knowledgeGain
      });

      // Knowledge modules also contribute small amount to emotional IQ (learning empathy)
      const emotionalGain = Math.floor(knowledgeGain * 0.3);
      const updatedEmotionalIQ = checkLevelUp({
        ...prev.emotionalIQ,
        experience: prev.emotionalIQ.experience + emotionalGain,
        recentGrowth: prev.emotionalIQ.recentGrowth + emotionalGain
      });

      return {
        ...prev,
        emotionalIQ: updatedEmotionalIQ,
        knowledgeIQ: updatedKnowledgeIQ
      };
    });
  }, [checkLevelUp]);

  // Track deep conversation (bonding moments)
  const trackDeepConversation = useCallback(() => {
    setIntelligenceState(prev => {
      const emotionalGain = 8; // Significant emotional growth
      const knowledgeGain = 3; // Some knowledge through understanding
      
      const updatedEmotionalIQ = checkLevelUp({
        ...prev.emotionalIQ,
        experience: prev.emotionalIQ.experience + emotionalGain,
        recentGrowth: prev.emotionalIQ.recentGrowth + emotionalGain
      });

      const updatedKnowledgeIQ = checkLevelUp({
        ...prev.knowledgeIQ,
        experience: prev.knowledgeIQ.experience + knowledgeGain,
        recentGrowth: prev.knowledgeIQ.recentGrowth + knowledgeGain
      });

      return {
        ...prev,
        emotionalIQ: updatedEmotionalIQ,
        knowledgeIQ: updatedKnowledgeIQ
      };
    });
  }, [checkLevelUp]);

  // Calculate overall growth rate
  const getOverallGrowthRate = useCallback((): number => {
    const sessionTime = (Date.now() - intelligenceState.sessionStart) / (1000 * 60); // minutes
    const totalGrowth = intelligenceState.emotionalIQ.recentGrowth + intelligenceState.knowledgeIQ.recentGrowth;
    
    if (sessionTime === 0) return 0;
    return Math.floor((totalGrowth / sessionTime) * 10); // Growth per 10 minutes
  }, [intelligenceState]);

  // Reset session tracking (called when session ends or new session starts)
  const resetSessionTracking = useCallback(() => {
    setIntelligenceState(prev => ({
      ...prev,
      emotionalIQ: { ...prev.emotionalIQ, recentGrowth: 0 },
      knowledgeIQ: { ...prev.knowledgeIQ, recentGrowth: 0 },
      sessionInteractions: 0,
      sessionStart: Date.now()
    }));
  }, []);

  return {
    intelligenceState,
    trackChatMessage,
    trackKnowledgePurchase,
    trackDeepConversation,
    getOverallGrowthRate,
    resetSessionTracking
  };
}