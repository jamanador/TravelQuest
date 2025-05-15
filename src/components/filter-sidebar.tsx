import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Search, X } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { destinationsData } from '@/data/destinations';

interface FilterSidebarProps {
  className?: string;
}

const categoryOptions = [
  { value: 'beach', label: 'Beach' },
  { value: 'mountain', label: 'Mountain' },
  { value: 'city', label: 'City' },
  { value: 'countryside', label: 'Countryside' },
  { value: 'historical', label: 'Historical' },
];

const FilterSidebar = ({ className = '' }: FilterSidebarProps) => {
  const { destinations, setFilteredDestinations } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 5]);
  const [ratingMin, setRatingMin] = useState(0);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Apply filters whenever any filter changes
  useEffect(() => {
    let filtered = [...destinations];
    let filterCount = 0;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filterCount++;
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(dest => 
        selectedCategories.includes(dest.category)
      );
      filterCount++;
    }

    // Price range filter
    filtered = filtered.filter(dest => 
      dest.priceLevel >= priceRange[0] && dest.priceLevel <= priceRange[1]
    );
    if (priceRange[0] > 1 || priceRange[1] < 5) filterCount++;

    // Rating filter
    if (ratingMin > 0) {
      filtered = filtered.filter(dest => dest.rating >= ratingMin);
      filterCount++;
    }

    // Favorites filter
    if (onlyFavorites) {
      // This would be implemented with a reference to favorites from context
      filterCount++;
    }

    setActiveFilters(filterCount);
    setFilteredDestinations(filtered);
  }, [searchTerm, selectedCategories, priceRange, ratingMin, onlyFavorites, destinations, setFilteredDestinations]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([1, 5]);
    setRatingMin(0);
    setOnlyFavorites(false);
  };

  return (
    <div className={`${className} p-4 h-full overflow-auto`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Reset {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1">
                {activeFilters}
              </Badge>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {/* Filter Accordions */}
        <Accordion type="multiple" defaultValue={['categories', 'price', 'rating']}>
          {/* Categories */}
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <div key={category.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.value}`}
                      checked={selectedCategories.includes(category.value)}
                      onCheckedChange={(checked) => handleCategoryChange(category.value, checked === true)}
                    />
                    <Label
                      htmlFor={`category-${category.value}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Budget</span>
                  <span>Luxury</span>
                </div>
                <Slider
                  defaultValue={[1, 5]}
                  min={1}
                  max={5}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange as (value: number[]) => void}
                />
                <div className="flex justify-between text-sm">
                  <span>{priceRange[0]} ${priceRange[0] === 1 ? '' : '+'}</span>
                  <span>{priceRange[1]} ${priceRange[1] === 5 ? '+' : ''}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating */}
          <AccordionItem value="rating">
            <AccordionTrigger>Minimum Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0]}
                  min={0}
                  max={5}
                  step={0.5}
                  value={[ratingMin]}
                  onValueChange={([value]) => setRatingMin(value)}
                />
                <div className="flex justify-between text-sm">
                  <span>Any</span>
                  <span>{ratingMin > 0 ? `${ratingMin}+ stars` : 'Any rating'}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        {/* Favorites Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="favorites-toggle" className="font-medium">
            Only Favorites
          </Label>
          <Switch
            id="favorites-toggle"
            checked={onlyFavorites}
            onCheckedChange={setOnlyFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;