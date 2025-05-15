import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Destination } from '@/data/destinations';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Star, 
  Heart, 
  DollarSign,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/app-context';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleViewDetails = () => {
    navigate(`/destination/${destination.id}`);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(destination.id)) {
      removeFromFavorites(destination.id);
    } else {
      addToFavorites(destination.id);
    }
  };
  
  const renderPriceLevel = () => {
    const dollars = [];
    for (let i = 0; i < 5; i++) {
      dollars.push(
        <DollarSign
          key={i}
          className={`h-3.5 w-3.5 ${
            i < destination.priceLevel 
              ? 'text-primary fill-primary' 
              : 'text-muted-foreground'
          }`}
        />
      );
    }
    return dollars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleViewDetails}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <motion.img
              src={destination.images[0]}
              alt={destination.name}
              className="object-cover w-full h-full"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </AspectRatio>
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white h-8 w-8"
              onClick={handleToggleFavorite}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite(destination.id) ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/50 hover:bg-black/60 backdrop-blur-sm text-white">
              {destination.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg truncate">{destination.name}</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{destination.country}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
              <span className="font-medium">{destination.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {destination.shortDescription}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Best: {destination.bestTimeToVisit.slice(0, 2).join(', ')}</span>
            </div>
            <div className="flex">
              {renderPriceLevel()}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DestinationCard;