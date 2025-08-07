import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import VisitorLanding from "@/pages/visitor-landing";
import OwnerLanding from "@/pages/owner-landing";
import VisitorView from "@/pages/visitor-view";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/owner" component={OwnerLanding} />
      <Route path="/visitor" component={VisitorView} />
      <Route path="/landing" component={VisitorLanding} />
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
