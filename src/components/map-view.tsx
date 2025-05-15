import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Destination } from '@/data/destinations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Need to import leaflet CSS
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  destinations: Destination[];
  selectedDestination?: string;
  onSelectDestination?: (id: string) => void;
  centerPosition?: [number, number];
  zoom?: number;
}

// Custom map icon
const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create different icons for each category
const categoryIcons = {
  beach: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  mountain: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  city: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  countryside: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  historical: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

// Component to change map view when props change
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.5
    });
  }, [center, zoom, map]);
  
  return null;
}

const MapView = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  centerPosition = [20, 0],
  zoom = 2
}: MapViewProps) => {
  const navigate = useNavigate();
  
  // If there's a selected destination, update the center position
  const [center, setCenter] = useState<[number, number]>(centerPosition);
  const [mapZoom, setMapZoom] = useState<number>(zoom);
  
  useEffect(() => {
    if (selectedDestination) {
      const selected = destinations.find(d => d.id === selectedDestination);
      if (selected) {
        setCenter(selected.coordinates);
        setMapZoom(10);
      }
    } else {
      setCenter(centerPosition);
      setMapZoom(zoom);
    }
  }, [selectedDestination, destinations, centerPosition, zoom]);

  const handleMarkerClick = (id: string) => {
    if (onSelectDestination) {
      onSelectDestination(id);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/destination/${id}`);
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ChangeView center={center} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={destination.coordinates}
            icon={categoryIcons[destination.category] || customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(destination.id)
            }}
          >
            <Popup className="custom-popup" minWidth={200} maxWidth={300}>
              <div className="p-1">
                <div className="mb-2">
                  <img 
                    src={destination.images[0]} 
                    alt={destination.name} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                <h3 className="font-bold text-base">{destination.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{destination.country}</p>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm ml-1">{destination.rating.toFixed(1)}</span>
                </div>
                <p className="text-xs mb-2">{destination.shortDescription}</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewDetails(destination.id)}
                >
                  View Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;