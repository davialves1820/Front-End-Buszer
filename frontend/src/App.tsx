import { Toaster } from './components/ui/toaster'
import { Toaster as Sonner } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import { routes } from "./routes";
import { usePageTracking } from "./hooks/user-track-page";

const queryClient = new QueryClient()

const App = () => {
  usePageTracking(); 

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          {routes.map((r, i) => (
            <Route key={i} path={r.path} element={r.element} />
          ))}
        </Routes>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
