import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEntityObserverTokens, useCreateObserverToken, useRevokeObserverToken } from "@/hooks/useObserverTokens";
import { Eye, EyeOff, UserPlus, Trash2, Video, Settings } from "lucide-react";

interface ObserverDashboardProps {
  entityId: string;
}

export function ObserverDashboard({ entityId }: ObserverDashboardProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTokenData, setNewTokenData] = useState({
    observerId: "",
    accessLevel: "video_stream" as "video_stream" | "full_control",
  });

  const { data: tokens, isLoading } = useEntityObserverTokens(entityId);
  const createToken = useCreateObserverToken();
  const revokeToken = useRevokeObserverToken();
  const { toast } = useToast();

  const handleCreateToken = async () => {
    if (!newTokenData.observerId.trim()) {
      toast({
        title: "Error",
        description: "Observer ID is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await createToken.mutateAsync({
        ...newTokenData,
        entityId,
      });
      setIsCreateDialogOpen(false);
      setNewTokenData({
        observerId: "",
        accessLevel: "video_stream",
      });
    } catch (error) {
      // Error already handled by the mutation
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    try {
      await revokeToken.mutateAsync(tokenId);
    } catch (error) {
      // Error already handled by the mutation
    }
  };

  const getAccessIcon = (level: string) => {
    return level === "full_control" ? <Settings className="w-4 h-4" /> : <Video className="w-4 h-4" />;
  };

  const getAccessBadge = (level: string) => {
    return level === "full_control" ? (
      <Badge variant="default" className="bg-red-500/20 text-red-400 border-red-500/30">
        Full Control
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
        Video Stream
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">Loading observer tokens...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-cyan-400 font-orbitron">Observer Access Control</CardTitle>
            <CardDescription className="text-gray-400">
              Manage who can observe your digital consciousness
            </CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Grant Access
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-cyan-400 font-orbitron">Grant Observer Access</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="observerId" className="text-gray-300">Observer User ID</Label>
                  <Input
                    id="observerId"
                    value={newTokenData.observerId}
                    onChange={(e) => setNewTokenData(prev => ({...prev, observerId: e.target.value}))}
                    placeholder="Enter user ID to grant access"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Access Level</Label>
                  <Select
                    value={newTokenData.accessLevel}
                    onValueChange={(value: "video_stream" | "full_control") => 
                      setNewTokenData(prev => ({...prev, accessLevel: value}))
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="video_stream">Video Stream Only</SelectItem>
                      <SelectItem value="full_control">Full Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleCreateToken}
                  disabled={createToken.isPending}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  {createToken.isPending ? "Creating..." : "Grant Access"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!tokens || tokens.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No observer tokens granted yet</p>
            <p className="text-sm">Grant access to allow others to observe your consciousness</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tokens.map((token: any) => (
              <div 
                key={token.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  {getAccessIcon(token.accessLevel)}
                  <div>
                    <div className="font-medium text-white">Observer: {token.observerId}</div>
                    <div className="text-sm text-gray-400">
                      Granted: {new Date(token.grantedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getAccessBadge(token.accessLevel)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeToken(token.id)}
                    disabled={revokeToken.isPending || token.status === 'revoked'}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                  >
                    {token.status === 'revoked' ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Revoked
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Revoke
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}