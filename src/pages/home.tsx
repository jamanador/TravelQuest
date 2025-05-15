import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Globe, 
  Map, 
  Heart, 
  Calendar,
  Package,
  Search,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/app-context';
import DestinationCard from '@/components/destination-card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HomePage = () => {
  const navigate = useNavigate();
  const { destinations } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredDestinations, setFeaturedDestinations] = useState(destinations.slice(0, 4));
  
  const goToExplore = () => {
    navigate('/explore');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?search=${searchTerm}`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AspectRatio ratio={16 / 9} className="h-full">
            <img
              src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg"
              alt="Hero background"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </AspectRatio>
        </div>
        
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col justify-center h-full max-w-4xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Discover Your Next Adventure
              </h1>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Explore breathtaking destinations around the world, find hidden gems, and create unforgettable memories.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="relative max-w-2xl"
            >
              <form onSubmit={handleSearch} className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Where would you like to go?"
                  className="pl-10 pr-20 py-6 text-lg w-full rounded-full shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-full"
                >
                  Explore
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose TravelQuest?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to plan your perfect trip, from discovering destinations to creating detailed itineraries.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Globe className="h-12 w-12 text-primary" />,
                title: "Discover",
                description: "Find amazing destinations all around the world with detailed information."
              },
              {
                icon: <Map className="h-12 w-12 text-primary" />,
                title: "Explore",
                description: "Interactive maps to explore destinations and nearby attractions."
              },
              {
                icon: <Heart className="h-12 w-12 text-primary" />,
                title: "Save",
                description: "Save your favorite destinations to revisit later."
              },
              {
                icon: <Calendar className="h-12 w-12 text-primary" />,
                title: "Plan",
                description: "Create detailed travel plans and itineraries for your trips."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:bg-muted/50"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold">Featured Destinations</h2>
              <p className="text-muted-foreground">Explore our handpicked destinations</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button 
                variant="outline" 
                onClick={goToExplore}
                className="hidden sm:flex items-center"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
              />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button onClick={goToExplore}>
              View All Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Read about the experiences of travelers who have used TravelQuest to plan their journeys.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York",
                text: "TravelQuest made it incredibly easy to plan our family vacation to Bali. The map feature helped us find hidden gems we would have missed otherwise!",
                rating: 5
              },
              {
                name: "Michael Chen",
                location: "Toronto",
                text: "I've used many travel apps, but none compare to TravelQuest. The detailed information about each destination is extremely helpful.",
                rating: 4.5
              },
              {
                name: "Amelia Rodriguez",
                location: "Madrid",
                text: "Planning my European tour was a breeze with TravelQuest. I loved how I could save favorites and create a custom itinerary.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(testimonial.rating) 
                              ? 'text-amber-500 fill-amber-500' 
                              : i < testimonial.rating 
                                ? 'text-amber-500 fill-amber-500/50' 
                                : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Begin exploring amazing destinations and plan your next unforgettable journey today.
            </p>
            <Button 
              size="lg" 
              onClick={goToExplore} 
              variant="secondary"
              className="font-semibold"
            >
              Explore Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;