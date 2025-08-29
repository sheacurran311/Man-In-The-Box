import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface AIServiceHealth {
  hume: boolean;
  voiceflow: boolean;
  heygen: boolean;
}

export interface ConversationResponse {
  text: string;
  emotion?: string;
  audioUrl?: string;
  confidence?: number;
}

export interface VoiceProcessingResult {
  text: string;
  emotion?: string;
  confidence?: number;
}

export function useAIServices() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Health check for AI services
  const { data: healthStatus, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/ai/health'],
    refetchInterval: 30000, // Check every 30 seconds
  });

  // Process voice input
  const voiceProcessingMutation = useMutation({
    mutationFn: async (audioBlob: Blob) => {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      formData.append('format', 'wav');
      
      const response = await fetch('/api/ai/voice/process', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to process voice input');
      }
      
      return response.json();
    },
  });

  // Process text conversation
  const conversationMutation = useMutation({
    mutationFn: async ({ userId, message, sessionData }: { 
      userId: string; 
      message: string; 
      sessionData?: any 
    }) => {
      const response = await fetch('/api/ai/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, message, sessionData }),
      });
      if (!response.ok) throw new Error('Failed to process conversation');
      return response.json();
    },
  });

  // Generate avatar response
  const avatarGenerationMutation = useMutation({
    mutationFn: async ({ text, emotionalContext }: { 
      text: string; 
      emotionalContext?: string 
    }) => {
      const response = await fetch('/api/ai/avatar/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, emotionalContext }),
      });
      if (!response.ok) throw new Error('Failed to generate avatar');
      return response.json();
    },
  });

  // Update character memory
  const memoryUpdateMutation = useMutation({
    mutationFn: async ({ userId, memoryData }: { 
      userId: string; 
      memoryData: any 
    }) => {
      const response = await fetch('/api/ai/memory/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, memoryData }),
      });
      if (!response.ok) throw new Error('Failed to update memory');
      return response.json();
    },
  });

  // Voice recording functions
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });
      
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        voiceProcessingMutation.mutate(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw new Error('Microphone access denied or not available');
    }
  }, [voiceProcessingMutation]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  }, [mediaRecorder, isRecording]);

  // Check if AI services are configured
  const services = healthStatus?.services || {};
  const isConfigured = services;
  const allServicesReady = isConfigured.hume && isConfigured.voiceflow;

  return {
    // Health status
    healthStatus: healthStatus?.data || { status: 'unknown', services: {} },
    healthLoading,
    isConfigured,
    allServicesReady,
    
    // Voice processing
    startRecording,
    stopRecording,
    isRecording,
    voiceProcessing: voiceProcessingMutation,
    
    // Text conversation
    processConversation: conversationMutation.mutateAsync,
    conversationLoading: conversationMutation.isPending,
    
    // Avatar generation
    generateAvatar: avatarGenerationMutation.mutateAsync,
    avatarLoading: avatarGenerationMutation.isPending,
    
    // Memory updates
    updateMemory: memoryUpdateMutation.mutateAsync,
    memoryLoading: memoryUpdateMutation.isPending,
  };
}