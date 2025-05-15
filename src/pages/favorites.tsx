import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/app-context';
import DestinationCard from '@/components/destination-card';
import { Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { destinations, favorites } = useAppContext();
  const navigate = useNavigate();
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  
  useEffect(() => {
    const favDests = destinations.filter(dest => favorites.includes(dest.id));
    setFavoriteDestinations(favDests);
  }, [destinations, favorites]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleExplore = () => {
    navigate('/explore');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground">Your saved destinations</p>
        </motion.div>

        <div className="mt-8">
          {favoriteDestinations.length > 0 ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favoriteDestinations.map((destination) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination}
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-4 p-6 bg-primary/5 rounded-full">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Start exploring destinations and add them to your favorites to see them here.
              </p>
              <Button onClick={handleExplore}>
                <Search className="mr-2 h-4 w-4" />
                Explore Destinations
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;