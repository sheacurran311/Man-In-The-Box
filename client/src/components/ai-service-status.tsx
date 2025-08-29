import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useAIServices } from '@/hooks/use-ai-services';

const AIServiceStatus = () => {
  const { healthStatus, healthLoading, isConfigured, allServicesReady } = useAIServices();

  const getServiceIcon = (isReady: boolean, isLoading: boolean) => {
    if (isLoading) return <Clock className="h-4 w-4 animate-spin" />;
    return isReady ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertCircle className="h-4 w-4 text-red-400" />;
  };

  const getServiceBadge = (isReady: boolean, isLoading: boolean) => {
    if (isLoading) return <Badge variant="outline">Checking...</Badge>;
    return isReady ? 
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ready</Badge> : 
      <Badge variant="destructive">Not Configured</Badge>;
  };

  const services = [
    { 
      name: 'Hume AI', 
      key: 'hume', 
      description: 'Empathic Voice Interface',
      isReady: isConfigured.hume 
    },
    { 
      name: 'Voiceflow', 
      key: 'voiceflow', 
      description: 'Conversational AI Agent',
      isReady: isConfigured.voiceflow 
    },
    { 
      name: 'HeyGen', 
      key: 'heygen', 
      description: 'Real-time Avatar Generation',
      isReady: isConfigured.heygen 
    },
  ];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-orbitron text-cyber-blue">
          <Zap size={20} />
          AI Services Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Status */}
        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
          <div>
            <p className="font-roboto-mono text-sm font-medium">System Status</p>
            <p className="text-xs text-gray-400">
              {allServicesReady ? 'Full AI Integration Active' : 'Partial Configuration'}
            </p>
          </div>
          {getServiceBadge(allServicesReady, healthLoading)}
        </div>

        {/* Individual Services */}
        <div className="space-y-2">
          {services.map((service) => (
            <div key={service.key} className="flex items-center justify-between p-2 hover:bg-gray-800/30 rounded transition-colors">
              <div className="flex items-center gap-3">
                {getServiceIcon(service.isReady, healthLoading)}
                <div>
                  <p className="font-roboto-mono text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-gray-500">{service.description}</p>
                </div>
              </div>
              {getServiceBadge(service.isReady, healthLoading)}
            </div>
          ))}
        </div>

        {/* Configuration Help */}
        {!allServicesReady && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-400 font-roboto-mono">
              <AlertCircle className="inline w-3 h-3 mr-1" />
              Configure API keys in Replit Secrets to enable full AI integration
            </p>
          </div>
        )}

        {/* Timestamp */}
        {healthStatus.timestamp && (
          <p className="text-xs text-gray-500 font-roboto-mono text-center">
            Last checked: {new Date(healthStatus.timestamp).toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AIServiceStatus;