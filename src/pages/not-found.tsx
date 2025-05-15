import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background p-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-md w-full text-center"
      >
        <motion.div variants={item} className="mb-6">
          <Map className="h-20 w-20 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground text-lg">
            The destination you're looking for seems to be off the map.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/explore">
              <Search className="mr-2 h-4 w-4" />
              Explore Destinations
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;