import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';
import { useAIServices } from '@/hooks/use-ai-services';
import { Badge } from '@/components/ui/badge';

const VoiceInterface = () => {
  const { 
    startRecording, 
    stopRecording, 
    isRecording, 
    voiceProcessing,
    isConfigured 
  } = useAIServices();

  const [lastResult, setLastResult] = useState<any>(null);

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  // Update last result when voice processing completes
  if (voiceProcessing.isSuccess && voiceProcessing.data !== lastResult) {
    setLastResult(voiceProcessing.data);
  }

  const isVoiceReady = isConfigured.hume;

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
          <Volume2 size={20} />
          Voice Interface
          {!isVoiceReady && (
            <Badge variant="outline" className="text-xs">
              Configure Hume AI
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recording Controls */}
        <div className="text-center space-y-4">
          <div className="relative">
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={!isVoiceReady || voiceProcessing.isPending}
              size="lg"
              className={`
                relative w-16 h-16 rounded-full transition-all duration-300
                ${isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50' 
                  : 'bg-cyber-blue hover:bg-cyber-dark'
                }
                ${!isVoiceReady ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {voiceProcessing.isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isRecording ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
            
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping"></div>
            )}
          </div>

          <div className="space-y-1">
            <p className="font-roboto-mono text-sm">
              {voiceProcessing.isPending ? 'Processing...' :
               isRecording ? 'Recording - Click to stop' : 
               'Click to start recording'}
            </p>
            
            {!isVoiceReady && (
              <p className="text-xs text-yellow-400">
                Voice processing requires Hume AI configuration
              </p>
            )}
          </div>
        </div>

        {/* Processing Status */}
        {voiceProcessing.isPending && (
          <div className="flex items-center justify-center gap-2 p-3 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30">
            <Loader2 className="h-4 w-4 animate-spin text-cyber-blue" />
            <span className="text-sm font-roboto-mono text-cyber-blue">
              Analyzing speech and emotion...
            </span>
          </div>
        )}

        {/* Last Result */}
        {lastResult?.data && (
          <div className="space-y-3 p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
            <h4 className="font-orbitron text-sm text-cyber-blue">Last Voice Analysis</h4>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-roboto-mono text-gray-400">Transcription:</span>
                <p className="text-gray-200 mt-1">{lastResult.data.text}</p>
              </div>
              
              {lastResult.data.emotion && (
                <div>
                  <span className="font-roboto-mono text-gray-400">Emotion:</span>
                  <Badge variant="outline" className="ml-2">
                    {lastResult.data.emotion}
                  </Badge>
                </div>
              )}
              
              {lastResult.data.confidence && (
                <div>
                  <span className="font-roboto-mono text-gray-400">Confidence:</span>
                  <span className="ml-2 text-gray-200">
                    {Math.round(lastResult.data.confidence * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error State */}
        {voiceProcessing.isError && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs text-red-400 font-roboto-mono">
              Voice processing failed: {voiceProcessing.error?.message}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;