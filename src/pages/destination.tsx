import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Calendar, 
  MapPin, 
  Star, 
  DollarSign, 
  Clock, 
  Sun,
  Cloud,
  Droplets,
  Thermometer,
  Wind
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/context/app-context';
import MapView from '@/components/map-view';
import { useToast } from '@/hooks/use-toast';

const DestinationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getDestinationById, isFavorite, addToFavorites, removeFromFavorites } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [weather, setWeather] = useState({
    temp: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30
    condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 40, // Random humidity between 40-80%
    wind: Math.floor(Math.random() * 20) + 5 // Random wind between 5-25 km/h
  });
  
  const destination = id ? getDestinationById(id) : undefined;
  
  useEffect(() => {
    if (!destination) {
      navigate('/not-found');
    }
  }, [destination, navigate]);
  
  if (!destination) {
    return null;
  }
  
  const handleToggleFavorite = () => {
    if (isFavorite(destination.id)) {
      removeFromFavorites(destination.id);
      toast({
        title: "Removed from favorites",
        description: `${destination.name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(destination.id);
      toast({
        title: "Added to favorites",
        description: `${destination.name} has been added to your favorites!`,
      });
    }
  };
  
  const handleAddToPlanner = () => {
    toast({
      title: "Added to planner",
      description: `${destination.name} has been added to your travel planner!`,
    });
  };
  
  const renderPriceLevel = () => {
    const dollars = [];
    for (let i = 0; i < 5; i++) {
      dollars.push(
        <DollarSign
          key={i}
          className={`h-4 w-4 ${
            i < destination.priceLevel 
              ? 'text-primary fill-primary' 
              : 'text-muted-foreground'
          }`}
        />
      );
    }
    return dollars;
  };
  
  const getWeatherIcon = () => {
    switch(weather.condition) {
      case 'Sunny':
        return <Sun className="h-10 w-10 text-amber-500" />;
      case 'Partly Cloudy':
        return <Cloud className="h-10 w-10 text-blue-400" />;
      case 'Cloudy':
        return <Cloud className="h-10 w-10 text-gray-400" />;
      case 'Light Rain':
        return <Droplets className="h-10 w-10 text-blue-500" />;
      default:
        return <Sun className="h-10 w-10 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AspectRatio ratio={21/9} className="h-full">
            <img
              src={destination.images[0]}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </AspectRatio>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-between">
          <div className="pt-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="bg-black/30 hover:bg-black/50 text-white rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {destination.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 text-white mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{destination.country}</span>
                </div>
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                  <span>{destination.rating.toFixed(1)}</span>
                </div>
                
                <Badge className="bg-black/30 hover:bg-black/40 text-white">
                  {destination.category}
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <div className="flex gap-2 justify-end mb-6">
          <Button
            variant="outline"
            className={`gap-2 ${isFavorite(destination.id) ? 'bg-primary/10' : ''}`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite(destination.id) ? 'fill-red-500 text-red-500' : ''}`} />
            {isFavorite(destination.id) ? 'Favorited' : 'Add to Favorites'}
          </Button>
          
          <Button className="gap-2" onClick={handleAddToPlanner}>
            <Calendar className="h-4 w-4" />
            Add to Planner
          </Button>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {destination.description}
                    </p>
                    
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Best Time to Visit</h3>
                        <div className="flex flex-wrap gap-2">
                          {destination.bestTimeToVisit.map((month) => (
                            <Badge key={month} variant="secondary">
                              {month}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Price Level</h3>
                        <div className="flex">
                          {renderPriceLevel()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Activities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {destination.activities.map((activity) => (
                        <Card key={activity} className="bg-muted/50">
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <span>{activity}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Current Weather</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getWeatherIcon()}
                        <div>
                          <div className="text-3xl font-bold">{weather.temp}°C</div>
                          <div className="text-muted-foreground">{weather.condition}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="text-sm text-muted-foreground">Humidity</div>
                          <div className="font-medium">{weather.humidity}%</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-muted-foreground">Wind</div>
                          <div className="font-medium">{weather.wind} km/h</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Quick Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                        <p>{destination.country}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                        <p className="capitalize">{destination.category}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Price Level</h3>
                        <div className="flex">
                          {renderPriceLevel()}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Rating</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>{destination.rating.toFixed(1)} / 5.0</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="photos">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Photos</h2>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {destination.images.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <AspectRatio ratio={4/3}>
                          <img
                            src={image}
                            alt={`${destination.name} ${index + 1}`}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Location</h2>
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <MapView 
                    destinations={[destination]} 
                    centerPosition={destination.coordinates}
                    zoom={10}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activities">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Activities & Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destination.activities.map((activity, index) => (
                    <Card key={activity} className="overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={`https://source.unsplash.com/random/300x200?${activity.toLowerCase().replace(' ', ',')}`}
                          alt={activity}
                          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                        />
                      </AspectRatio>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2">{activity}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Experience the {activity.toLowerCase()} in {destination.name}, one of the most popular activities in the area.
                        </p>
                        <Button variant="outline" className="w-full">Learn More</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DestinationPage;