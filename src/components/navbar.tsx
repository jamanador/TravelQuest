import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  Heart, 
  Calendar, 
  Menu, 
  X, 
  Search,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';

const NavLinks = [
  { path: '/', label: 'Home', icon: <Globe className="h-4 w-4" /> },
  { path: '/explore', label: 'Explore', icon: <MapPin className="h-4 w-4" /> },
  { path: '/favorites', label: 'Favorites', icon: <Heart className="h-4 w-4" /> },
  { path: '/planner', label: 'Planner', icon: <Calendar className="h-4 w-4" /> },
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-background/95 backdrop-blur-sm border-b' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Globe className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="font-bold text-2xl tracking-tight">TravelQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors
                  ${location.pathname === link.path 
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground/70 hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground/70 hover:text-primary"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] p-0">
                  <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between mb-8">
                      <Link to="/" className="flex items-center space-x-2">
                        <Globe className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl">TravelQuest</span>
                      </Link>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                    
                    <div className="space-y-2">
                      {NavLinks.map((link) => (
                        <SheetClose asChild key={link.path}>
                          <Link
                            to={link.path}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors
                              ${location.pathname === link.path 
                                ? 'bg-primary/10 text-primary' 
                                : 'hover:bg-muted'
                              }`}
                          >
                            {link.icon}
                            <span>{link.label}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        {searchOpen && (
          <motion.div 
            className="mt-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search destinations..." 
                className="pl-9 w-full" 
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;