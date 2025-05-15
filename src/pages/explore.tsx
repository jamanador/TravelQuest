import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Map as MapIcon, Grid, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/context/app-context';
import DestinationCard from '@/components/destination-card';
import MapView from '@/components/map-view';
import FilterSidebar from '@/components/filter-sidebar';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';

const ExplorePage = () => {
  const { filteredDestinations } = useAppContext();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'map'>(window.innerWidth > 768 ? 'grid' : 'map');
  const mapRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Listen for search param changes
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Handle responsive view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // Keep current view on mobile
      } else {
        // Auto-set to grid on desktop
        setView('grid');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
      toast({
        title: "Searching",
        description: `Finding destinations matching "${searchTerm}"`,
      });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const handleDestinationSelect = (id: string) => {
    setSelectedDestination(id);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Destinations</h1>
            <p className="text-muted-foreground">Discover amazing places around the world</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                className="pl-10 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </form>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Mobile Filters Drawer */}
              <div className="block sm:hidden w-full">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center w-full"
                    >
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="px-4 py-6 max-h-[80vh] overflow-auto">
                      <FilterSidebar />
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>

              {/* Desktop Filters Sheet */}
              <div className="hidden sm:block">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                    <FilterSidebar className="h-full" />
                  </SheetContent>
                </Sheet>
              </div>

              {/* View Toggle */}
              <div className="hidden md:block">
                <Tabs value={view} onValueChange={(v) => setView(v as 'grid' | 'map')}>
                  <TabsList>
                    <TabsTrigger value="grid" className="flex items-center">
                      <Grid className="mr-2 h-4 w-4" />
                      Grid
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center">
                      <MapIcon className="mr-2 h-4 w-4" />
                      Map
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Mobile View Toggle */}
              <div className="md:hidden ml-auto">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setView(view === 'grid' ? 'map' : 'grid')}
                >
                  {view === 'grid' ? (
                    <MapIcon className="h-4 w-4" />
                  ) : (
                    <Grid className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {view === 'grid' ? (
                  <div>
                    <div className="mb-4">
                      <p className="text-muted-foreground">
                        {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'} found
                      </p>
                    </div>
                    {filteredDestinations.length > 0 ? (
                      <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      >
                        {filteredDestinations.map((destination) => (
                          <DestinationCard 
                            key={destination.id} 
                            destination={destination}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="rounded-full bg-muted p-6 mb-4">
                          <Search className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                        <p className="text-muted-foreground mb-6">
                          Try adjusting your filters or search terms to find destinations.
                        </p>
                        <Button onClick={handleClearSearch}>Clear filters</Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-[600px] rounded-lg overflow-hidden" ref={mapRef}>
                    <MapView 
                      destinations={filteredDestinations}
                      selectedDestination={selectedDestination || undefined}
                      onSelectDestination={handleDestinationSelect}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;