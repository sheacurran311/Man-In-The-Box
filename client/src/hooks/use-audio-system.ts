import { useEffect, useRef, useState } from "react";

interface AudioTrack {
  id: string;
  url: string;
  volume: number;
  loop: boolean;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

interface AudioSystemState {
  ambientTrack: string | null;
  sfxQueue: string[];
  masterVolume: number;
  isEnabled: boolean;
}

export function useAudioSystem() {
  const [state, setState] = useState<AudioSystemState>({
    ambientTrack: null,
    sfxQueue: [],
    masterVolume: 0.3,
    isEnabled: true,
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<Map<string, AudioBufferSourceNode>>(new Map());
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());

  // Initialize Web Audio API context
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Preload audio buffers for sci-fi soundscape
        await preloadAudioBuffers();
      } catch (error) {
        console.warn("Audio initialization failed:", error);
        setState(prev => ({ ...prev, isEnabled: false }));
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Preload audio buffers using procedurally generated sounds
  const preloadAudioBuffers = async () => {
    const context = audioContextRef.current;
    if (!context) return;

    // Generate ambient sci-fi drone
    const ambientBuffer = createAmbientDrone(context, 30); // 30 second loop
    audioBuffersRef.current.set('ambient_drone', ambientBuffer);

    // Generate electrical hum for cube
    const electricalBuffer = createElectricalHum(context, 10);
    audioBuffersRef.current.set('electrical_hum', electricalBuffer);

    // Generate emotional state sounds
    const calmBuffer = createCalmAmbient(context, 15);
    audioBuffersRef.current.set('emotional_calm', calmBuffer);

    const anxiousBuffer = createAnxiousAmbient(context, 15);
    audioBuffersRef.current.set('emotional_anxious', anxiousBuffer);

    const curiousBuffer = createCuriousAmbient(context, 15);
    audioBuffersRef.current.set('emotional_curious', curiousBuffer);

    // Generate UI interaction sounds
    const clickBuffer = createClickSound(context);
    audioBuffersRef.current.set('ui_click', clickBuffer);

    const messageBuffer = createMessageSound(context);
    audioBuffersRef.current.set('message_received', messageBuffer);

    const typingBuffer = createTypingSound(context);
    audioBuffersRef.current.set('ai_typing', typingBuffer);

    // Generate destruction sequence sounds
    const warningBuffer = createWarningSound(context);
    audioBuffersRef.current.set('destruction_warning', warningBuffer);

    const burnBuffer = createBurnSequence(context, 10);
    audioBuffersRef.current.set('burn_sequence', burnBuffer);
  };

  // Procedural audio generation functions
  const createAmbientDrone = (context: AudioContext, duration: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // Layer multiple sine waves for rich ambient texture
        const freq1 = 40 + Math.sin(time * 0.1) * 10; // Low frequency drift
        const freq2 = 80 + Math.sin(time * 0.05) * 5;
        const freq3 = 120 + Math.sin(time * 0.03) * 3;
        
        channelData[i] = 
          (Math.sin(2 * Math.PI * freq1 * time) * 0.3 +
           Math.sin(2 * Math.PI * freq2 * time) * 0.2 +
           Math.sin(2 * Math.PI * freq3 * time) * 0.1) * 
          (0.5 + 0.5 * Math.sin(time * 0.02)); // Slow amplitude modulation
      }
    }
    return buffer;
  };

  const createElectricalHum = (context: AudioContext, duration: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // 60Hz electrical hum with harmonics
        const fundamental = Math.sin(2 * Math.PI * 60 * time) * 0.4;
        const harmonic2 = Math.sin(2 * Math.PI * 120 * time) * 0.2;
        const harmonic3 = Math.sin(2 * Math.PI * 180 * time) * 0.1;
        // Add some random noise for realism
        const noise = (Math.random() - 0.5) * 0.05;
        
        channelData[i] = fundamental + harmonic2 + harmonic3 + noise;
      }
    }
    return buffer;
  };

  const createCalmAmbient = (context: AudioContext, duration: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // Soft, warm tones
        const wave1 = Math.sin(2 * Math.PI * 110 * time) * 0.2; // A2 note
        const wave2 = Math.sin(2 * Math.PI * 165 * time) * 0.15; // E3 note
        const wave3 = Math.sin(2 * Math.PI * 220 * time) * 0.1; // A3 note
        
        channelData[i] = (wave1 + wave2 + wave3) * Math.exp(-time * 0.1);
      }
    }
    return buffer;
  };

  const createAnxiousAmbient = (context: AudioContext, duration: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // Dissonant, tension-building tones
        const freq1 = 200 + Math.sin(time * 3) * 50; // Wavering frequency
        const freq2 = 300 + Math.sin(time * 2.5) * 30;
        const tension = Math.sin(2 * Math.PI * freq1 * time) * 0.2 +
                       Math.sin(2 * Math.PI * freq2 * time) * 0.15;
        
        // Add irregular pulses
        const pulse = Math.sin(time * 8) > 0.7 ? 0.1 : 0;
        
        channelData[i] = tension + pulse;
      }
    }
    return buffer;
  };

  const createCuriousAmbient = (context: AudioContext, duration: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // Bright, ascending tones with sparkle effects
        const baseFreq = 400 + Math.sin(time * 0.5) * 100;
        const sparkle = Math.sin(2 * Math.PI * (baseFreq + Math.sin(time * 10) * 200) * time) * 0.15;
        const chime = Math.sin(2 * Math.PI * 800 * time) * 0.1 * Math.exp(-time * 2);
        
        channelData[i] = sparkle + chime;
      }
    }
    return buffer;
  };

  const createClickSound = (context: AudioContext): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * 0.1; // 100ms click
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        const envelope = Math.exp(-time * 50);
        const click = Math.sin(2 * Math.PI * 800 * time) * envelope * 0.3;
        channelData[i] = click;
      }
    }
    return buffer;
  };

  const createMessageSound = (context: AudioContext): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * 0.5; // 500ms notification
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        const envelope = Math.exp(-time * 3);
        const tone1 = Math.sin(2 * Math.PI * 600 * time) * envelope * 0.2;
        const tone2 = Math.sin(2 * Math.PI * 900 * time) * envelope * 0.1;
        channelData[i] = tone1 + tone2;
      }
    }
    return buffer;
  };

  const createTypingSound = (context: AudioContext): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * 2; // 2 second typing pattern
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // Simulated AI processing sounds
        const processing = Math.sin(2 * Math.PI * 1200 * time) * 0.1 * 
                          (Math.sin(time * 10) > 0.5 ? 1 : 0);
        channelData[i] = processing;
      }
    }
    return buffer;
  };

  const createWarningSound = (context: AudioContext): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * 3; // 3 second warning
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        // Alternating warning tones
        const freq = time % 1 < 0.5 ? 400 : 600;
        const warning = Math.sin(2 * Math.PI * freq * time) * 0.3;
        channelData[i] = warning;
      }
    }
    return buffer;
  };

  const createBurnSequence = (context: AudioContext, duration: number): AudioBuffer => {
    const sampleRate = context.sampleRate;
    const length = sampleRate * duration;
    const buffer = context.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const time = i / sampleRate;
        const progress = time / duration;
        
        // Building intensity with crackling effects
        const baseFreq = 100 + progress * 400;
        const crackle = (Math.random() - 0.5) * 0.3 * progress;
        const burn = Math.sin(2 * Math.PI * baseFreq * time) * 0.2 * progress;
        
        channelData[i] = burn + crackle;
      }
    }
    return buffer;
  };

  // Play audio with fade effects
  const playAudio = (soundId: string, options: Partial<AudioTrack> = {}) => {
    if (!state.isEnabled || !audioContextRef.current) return;

    const context = audioContextRef.current;
    const buffer = audioBuffersRef.current.get(soundId);
    
    if (!buffer) {
      console.warn(`Audio buffer not found: ${soundId}`);
      return;
    }

    const source = context.createBufferSource();
    const gainNode = context.createGain();
    
    source.buffer = buffer;
    source.loop = options.loop || false;
    
    // Set up audio routing
    source.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Set initial volume
    const volume = (options.volume || 1) * state.masterVolume;
    gainNode.gain.setValueAtTime(0, context.currentTime);
    
    // Fade in
    const fadeInTime = options.fadeInDuration || 0.1;
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + fadeInTime);
    
    // Store references
    audioNodesRef.current.set(soundId, source);
    gainNodesRef.current.set(soundId, gainNode);
    
    source.start();
    
    return source;
  };

  // Stop audio with fade out
  const stopAudio = (soundId: string, fadeOutDuration = 0.5) => {
    const source = audioNodesRef.current.get(soundId);
    const gainNode = gainNodesRef.current.get(soundId);
    
    if (source && gainNode && audioContextRef.current) {
      const context = audioContextRef.current;
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + fadeOutDuration);
      
      setTimeout(() => {
        source.stop();
        audioNodesRef.current.delete(soundId);
        gainNodesRef.current.delete(soundId);
      }, fadeOutDuration * 1000);
    }
  };

  // Set ambient track based on emotional state
  const setEmotionalAmbient = (emotion: string) => {
    const currentAmbient = state.ambientTrack;
    let newTrack: string | null = null;

    switch (emotion.toLowerCase()) {
      case 'calm':
      case 'content':
        newTrack = 'emotional_calm';
        break;
      case 'anxious':
      case 'fearful':
        newTrack = 'emotional_anxious';
        break;
      case 'curious':
      case 'excited':
        newTrack = 'emotional_curious';
        break;
      default:
        newTrack = 'ambient_drone';
    }

    if (currentAmbient && currentAmbient !== newTrack) {
      stopAudio(currentAmbient, 2.0);
    }

    if (newTrack && newTrack !== currentAmbient) {
      playAudio(newTrack, { 
        loop: true, 
        volume: 0.4,
        fadeInDuration: 2.0 
      });
      
      setState(prev => ({ ...prev, ambientTrack: newTrack }));
    }
  };

  // Play UI sound effects
  const playUISound = (soundId: string) => {
    playAudio(soundId, { volume: 0.6 });
  };

  // Control master volume
  const setMasterVolume = (volume: number) => {
    setState(prev => ({ ...prev, masterVolume: Math.max(0, Math.min(1, volume)) }));
  };

  // Toggle audio system
  const toggleAudio = () => {
    setState(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  return {
    state,
    playAudio,
    stopAudio,
    setEmotionalAmbient,
    playUISound,
    setMasterVolume,
    toggleAudio,
  };
}