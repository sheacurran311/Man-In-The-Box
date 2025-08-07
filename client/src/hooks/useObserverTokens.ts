import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useObserverTokens() {
  return useQuery({
    queryKey: ["/api/observer-tokens"],
    retry: false,
  });
}

export function useEntityObserverTokens(entityId: string) {
  return useQuery({
    queryKey: ["/api/entity", entityId, "observer-tokens"],
    enabled: !!entityId,
    retry: false,
  });
}

export function useCreateObserverToken() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (tokenData: {
      observerId: string;
      entityId: string;
      accessLevel: 'video_stream' | 'full_control';
      expiresAt?: Date | null;
    }) => {
      return await apiRequest("/api/observer-tokens", "POST", tokenData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/observer-tokens"] });
      toast({
        title: "Observer Token Created",
        description: "New observer access has been granted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Create Token",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useRevokeObserverToken() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (tokenId: string) => {
      return await apiRequest(`/api/observer-tokens/${tokenId}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/observer-tokens"] });
      toast({
        title: "Observer Token Revoked",
        description: "Observer access has been revoked successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Revoke Token",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}