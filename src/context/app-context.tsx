import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Destination, destinationsData } from '@/data/destinations';

interface AppContextProps {
  destinations: Destination[];
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getDestinationById: (id: string) => Destination | undefined;
  filteredDestinations: Destination[];
  setFilteredDestinations: (destinations: Destination[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [destinations] = useState<Destination[]>(destinationsData);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinationsData);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (id: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favId) => favId !== id));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const getDestinationById = (id: string) => {
    return destinations.find((dest) => dest.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        destinations,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getDestinationById,
        filteredDestinations,
        setFilteredDestinations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}