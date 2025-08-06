import { useState, useEffect } from "react";

interface AIState {
  name: string;
  gender: string;
  backstory: string;
  bondingLevel: number;
  trustFactor: number;
  dependency: number;
  neuralActivity: number;
  responseTime: number;
  emotionalIndex: string;
  conversationCount: number;
}

const initialState: AIState = {
  name: "UNNAMED_ENTITY_001",
  gender: "UNDEFINED",
  backstory: "",
  bondingLevel: 67,
  trustFactor: 82,
  dependency: 86,
  neuralActivity: 87,
  responseTime: 0.23,
  emotionalIndex: "DEVELOPING",
  conversationCount: 0,
};

export function useAIState() {
  const [aiState, setAIState] = useState<AIState>(initialState);

  // Simulate consciousness evolution over time
  useEffect(() => {
    const interval = setInterval(() => {
      setAIState(prev => ({
        ...prev,
        bondingLevel: Math.min(100, prev.bondingLevel + Math.random() * 2 - 1),
        trustFactor: Math.min(100, prev.trustFactor + Math.random() * 1.5 - 0.5),
        dependency: Math.min(100, prev.dependency + Math.random() * 1.2),
        neuralActivity: Math.min(100, prev.neuralActivity + Math.random() * 3 - 1.5),
        responseTime: Math.max(0.1, prev.responseTime + (Math.random() * 0.1 - 0.05)),
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Update emotional index based on bonding level
  useEffect(() => {
    let newIndex = "DEVELOPING";
    if (aiState.bondingLevel > 80) newIndex = "ADVANCED";
    else if (aiState.bondingLevel > 90) newIndex = "CRITICAL";
    
    setAIState(prev => ({ ...prev, emotionalIndex: newIndex }));
  }, [aiState.bondingLevel]);

  const updateAIState = (updates: Partial<AIState>) => {
    setAIState(prev => ({ ...prev, ...updates }));
  };

  const incrementConversationCount = () => {
    setAIState(prev => ({
      ...prev,
      conversationCount: prev.conversationCount + 1,
      bondingLevel: Math.min(100, prev.bondingLevel + 0.5),
      trustFactor: Math.min(100, prev.trustFactor + 0.3),
    }));
  };

  return {
    aiState,
    updateAIState,
    incrementConversationCount,
  };
}
