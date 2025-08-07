import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useObserverAccess } from "@/hooks/useObserverAccess";
import { useAuth } from "@/hooks/useAuth";
import { Eye, Video, Settings, Lock } from "lucide-react";

interface AccessControlPanelProps {
  entityId: string;
}

export function AccessControlPanel({ entityId }: AccessControlPanelProps) {
  const { user } = useAuth();
  const { accessInfo, isLoading, hasAccess, accessLevel } = useObserverAccess(entityId);

  if (isLoading) {
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">Verifying access permissions...</div>
        </CardContent>
      </Card>
    );
  }

  const getAccessIcon = () => {
    if (!hasAccess) return <Lock className="w-5 h-5 text-red-400" />;
    if (accessLevel === 'full_control') return <Settings className="w-5 h-5 text-green-400" />;
    return <Video className="w-5 h-5 text-cyan-400" />;
  };

  const getAccessBadge = () => {
    if (!hasAccess) {
      return (
        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
          No Access
        </Badge>
      );
    }
    
    if (accessLevel === 'full_control') {
      return (
        <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
          Full Control
        </Badge>
      );
    }
    
    return (
      <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
        Video Stream
      </Badge>
    );
  };

  const getAccessDescription = () => {
    if (user?.role === 'creator') {
      return "You have full creator privileges to this consciousness";
    }
    
    if (!hasAccess) {
      return "You do not have permission to observe this consciousness";
    }
    
    if (accessLevel === 'full_control') {
      return "You can observe and interact with this consciousness";
    }
    
    return "You can observe but not interact with this consciousness";
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-cyan-400 font-orbitron flex items-center gap-2">
          {getAccessIcon()}
          Access Status
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your current permissions for this consciousness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Access Level:</span>
            {getAccessBadge()}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Role:</span>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {user?.role || 'Unknown'}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-400 border-t border-gray-700 pt-4">
            {getAccessDescription()}
          </p>
          
          {!hasAccess && user?.role !== 'creator' && (
            <Button 
              variant="outline" 
              className="w-full bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
              onClick={() => window.location.href = '/api/login'}
            >
              <Eye className="w-4 h-4 mr-2" />
              Request Access
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}