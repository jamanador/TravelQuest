import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  CalendarCheck, 
  Plus, 
  Globe, 
  Map, 
  Search,
  Plane,
  Hotel,
  Navigation,
  Trash2,
  ClipboardList,
  Pencil,
  Map as MapIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  destinations: string[];
  tasks: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}

const PlannerPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('travel-plans');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newTrip, setNewTrip] = useState<Partial<Trip>>({
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    destinations: [],
    tasks: []
  });
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem('travel-plans', JSON.stringify(trips));
  }, [trips]);

  const handleCreateTrip = () => {
    if (!newTrip.name) {
      toast({
        title: "Missing information",
        description: "Please enter a trip name.",
        variant: "destructive"
      });
      return;
    }

    const trip: Trip = {
      id: Date.now().toString(),
      name: newTrip.name || 'Untitled Trip',
      description: newTrip.description || '',
      startDate: newTrip.startDate || new Date(),
      endDate: newTrip.endDate || new Date(),
      destinations: newTrip.destinations || [],
      tasks: newTrip.tasks || []
    };

    setTrips([...trips, trip]);
    setIsCreating(false);
    setNewTrip({
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      destinations: [],
      tasks: []
    });

    toast({
      title: "Trip created",
      description: `${trip.name} has been created successfully.`
    });
  };

  const handleAddTask = (tripId: string) => {
    if (!taskText.trim()) return;

    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          tasks: [
            ...trip.tasks,
            {
              id: Date.now().toString(),
              text: taskText,
              completed: false
            }
          ]
        };
      }
      return trip;
    }));

    setTaskText('');
  };

  const handleToggleTask = (tripId: string, taskId: string, completed: boolean) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return {
          ...trip,
          tasks: trip.tasks.map(task => 
            task.id === taskId ? { ...task, completed } : task
          )
        };
      }
      return trip;
    }));
  };

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
    toast({
      title: "Trip deleted",
      description: "The trip has been deleted successfully."
    });
  };

  const handleExplore = () => {
    navigate('/explore');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-start mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Travel Planner</h1>
            <p className="text-muted-foreground">Plan and organize your trips</p>
          </div>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new trip plan.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="trip-name">Trip Name</Label>
                  <Input
                    id="trip-name"
                    placeholder="Summer Vacation"
                    value={newTrip.name}
                    onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="trip-description">Description (Optional)</Label>
                  <Input
                    id="trip-description"
                    placeholder="A brief description of your trip"
                    value={newTrip.description}
                    onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date</Label>
                    <Calendar
                      mode="single"
                      selected={newTrip.startDate}
                      onSelect={(date) => date && setNewTrip({ ...newTrip, startDate: date })}
                      className="rounded-md border"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <Calendar
                      mode="single"
                      selected={newTrip.endDate}
                      onSelect={(date) => date && setNewTrip({ ...newTrip, endDate: date })}
                      className="rounded-md border"
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" onClick={handleCreateTrip}>Create Trip</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <motion.div key={trip.id} variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{trip.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {trip.description && <p className="mb-4 text-sm text-muted-foreground">{trip.description}</p>}
                      
                      <Accordion type="single" collapsible defaultValue="tasks">
                        <AccordionItem value="tasks">
                          <AccordionTrigger className="text-base font-medium">
                            <div className="flex items-center">
                              <ClipboardList className="mr-2 h-4 w-4" />
                              Tasks
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <Input
                                  placeholder="Add a task..."
                                  value={taskText}
                                  onChange={(e) => setTaskText(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask(trip.id)}
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleAddTask(trip.id)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="space-y-2">
                                {trip.tasks.length === 0 ? (
                                  <p className="text-sm text-muted-foreground">No tasks yet. Add some tasks to get started.</p>
                                ) : (
                                  trip.tasks.map((task) => (
                                    <div key={task.id} className="flex items-start space-x-2">
                                      <Checkbox
                                        id={`task-${task.id}`}
                                        checked={task.completed}
                                        onCheckedChange={(checked) => 
                                          handleToggleTask(trip.id, task.id, checked === true)
                                        }
                                      />
                                      <Label
                                        htmlFor={`task-${task.id}`}
                                        className={`text-sm leading-none pt-0.5 ${
                                          task.completed ? 'line-through text-muted-foreground' : ''
                                        }`}
                                      >
                                        {task.text}
                                      </Label>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="destinations">
                          <AccordionTrigger className="text-base font-medium">
                            <div className="flex items-center">
                              <MapIcon className="mr-2 h-4 w-4" />
                              Destinations
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {trip.destinations && trip.destinations.length > 0 ? (
                              <div className="space-y-2">
                                {trip.destinations.map((dest, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span>{dest}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-2">
                                <p className="text-sm text-muted-foreground mb-2">No destinations added yet</p>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleExplore}
                                  className="w-full"
                                >
                                  <Search className="mr-2 h-3 w-3" />
                                  Browse Destinations
                                </Button>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        {Math.floor((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24) + 1)} days
                      </div>
                      <Button variant="outline" size="sm">
                        <Pencil className="mr-2 h-3 w-3" />
                        Edit Trip
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="mb-4 p-6 bg-primary/5 rounded-full">
                <CalendarCheck className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No trips planned</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Start planning your next adventure by creating a new trip.
              </p>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Trip
              </Button>
            </div>
          )}
        </motion.div>

        {trips.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 pt-8 border-t"
          >
            <h2 className="text-2xl font-semibold mb-6">Travel Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Plane className="h-10 w-10 text-primary" />,
                  title: "Booking Flights",
                  description: "Book your flights 2-3 months in advance for the best prices. Use flight comparison websites to find the best deals."
                },
                {
                  icon: <Hotel className="h-10 w-10 text-primary" />,
                  title: "Accommodation",
                  description: "Consider location, reviews, and amenities when booking accommodation. Book well in advance for popular destinations."
                },
                {
                  icon: <Navigation className="h-10 w-10 text-primary" />,
                  title: "Local Transportation",
                  description: "Research local transportation options before your trip. Consider purchasing travel passes for savings on public transport."
                }
              ].map((tip, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        {tip.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlannerPage;