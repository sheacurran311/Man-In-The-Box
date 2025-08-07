import { useQuery } from "@tanstack/react-query";

export function useObserverAccess(entityId: string) {
  const { data: accessInfo, isLoading } = useQuery({
    queryKey: ["/api/entity", entityId, "access"],
    enabled: !!entityId,
    retry: false,
  });

  return {
    accessInfo,
    isLoading,
    hasAccess: (accessInfo as any)?.hasAccess || false,
    accessLevel: (accessInfo as any)?.accessLevel || 'none',
  };
}