import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

// Pages
import HomePage from '@/pages/home';
import ExplorePage from '@/pages/explore';
import DestinationPage from '@/pages/destination';
import FavoritesPage from '@/pages/favorites';
import PlannerPage from '@/pages/planner';
import NotFoundPage from '@/pages/not-found';

// Layouts
import MainLayout from '@/layouts/main-layout';

// Context
import { AppProvider } from '@/context/app-context';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to TravelQuest",
        description: "Discover amazing destinations around the world!",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [toast]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-pulse text-4xl font-bold text-primary">
            TravelQuest
          </div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="travel-quest-theme">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="destination/:id" element={<DestinationPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="planner" element={<PlannerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;