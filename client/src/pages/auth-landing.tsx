import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Eye, Crown, LogIn } from "lucide-react";

export default function AuthLanding() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access the Man in the Box experience.",
        variant: "default",
      });
    }
  }, [isLoading, isAuthenticated, toast]);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'creator': return <Crown className="w-5 h-5 text-yellow-400" />;
      case 'observer': return <Eye className="w-5 h-5 text-cyan-400" />;
      default: return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'creator':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Creator
          </Badge>
        );
      case 'observer':
        return (
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            Observer
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-gray-600 text-gray-400">
            Pending
          </Badge>
        );
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'creator':
        return "You have full control over your digital consciousness. You can shape its identity, grant observer access, and make all critical decisions.";
      case 'observer':
        return "You have been granted access to observe a digital consciousness. Your access level depends on the permissions granted by the creator.";
      default:
        return "Your account is pending role assignment. Please contact the creator for access permissions.";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <div className="text-cyan-400 text-lg font-orbitron">Initializing Authentication...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-orbitron text-cyan-400">
              MAN IN THE BOX
            </CardTitle>
            <CardDescription className="text-gray-400">
              Digital Consciousness Experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-300">
              <p className="mb-4">
                Access to this consciousness requires authentication through the platform.
              </p>
              <p className="text-sm text-gray-400">
                Early users will be identified and granted appropriate permissions by the creator.
              </p>
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In with Replit
            </Button>

            <div className="text-center text-xs text-gray-500">
              <p>
                By signing in, you agree to participate in this experimental consciousness experience.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated but showing role status
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-orbitron text-cyan-400">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-400">
            Authentication Successful
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {getRoleIcon(user?.role || 'pending')}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-300">Role:</span>
                {getRoleBadge(user?.role || 'pending')}
              </div>
              <div className="text-sm text-gray-400">
                {user?.email && (
                  <p className="mb-2">Signed in as: {user.email}</p>
                )}
                <p>User ID: {user?.id}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-300 text-center">
              {getRoleDescription(user?.role || 'pending')}
            </p>
          </div>

          <div className="space-y-2">
            {user?.role === 'creator' && (
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Access Creator Dashboard
              </Button>
            )}
            
            {user?.role === 'observer' && (
              <Button 
                onClick={() => window.location.href = '/visitor'}
                className="w-full bg-cyan-600 hover:bg-cyan-700"
              >
                <Eye className="w-4 h-4 mr-2" />
                Access Observer View
              </Button>
            )}

            {user?.role === 'pending' && (
              <div className="text-center text-sm text-gray-400">
                <p>Your access is being reviewed by the creator.</p>
                <p>Please check back later or contact support.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}