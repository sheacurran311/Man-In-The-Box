import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import VisitorLanding from "@/pages/visitor-landing";
import OwnerLanding from "@/pages/owner-landing";
import VisitorView from "@/pages/visitor-view";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-lg font-orbitron">Initializing System...</div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={VisitorLanding} />
          <Route path="/owner" component={OwnerLanding} />
          <Route path="/visitor" component={VisitorView} />
        </>
      ) : (
        <>
          {(user as any)?.role === 'creator' ? (
            <Route path="/" component={Home} />
          ) : (user as any)?.role === 'observer' ? (
            <Route path="/" component={VisitorView} />
          ) : (
            <Route path="/" component={VisitorLanding} />
          )}
          <Route path="/app" component={Home} />
          <Route path="/visitor" component={VisitorView} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
