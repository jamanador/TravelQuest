export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  shortDescription: string;
  rating: number;
  images: string[];
  coordinates: [number, number];
  priceLevel: 1 | 2 | 3 | 4 | 5;
  activities: string[];
  bestTimeToVisit: string[];
  category: 'beach' | 'mountain' | 'city' | 'countryside' | 'historical';
}

export const destinationsData: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    description: 'Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its dramatic views, stunning sunsets, white-washed houses, and its very own active volcano. Fira and Oia are the islands most stunning settlements, perched on the edge of the caldera. The island also has black, red, and white beaches, which are created by the volcanic nature of the soil. Santorinis sunset has been voted many times as the most beautiful sunset in the world.',
    shortDescription: 'A stunning volcanic island with white-washed buildings and breathtaking sunsets.',
    rating: 4.8,
    images: [
      'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
      'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',
      'https://images.pexels.com/photos/2549648/pexels-photo-2549648.jpeg'
    ],
    coordinates: [36.3932, 25.4615],
    priceLevel: 4,
    activities: ['Sunset Watching', 'Wine Tasting', 'Boat Tours', 'Beach', 'Historical Sites'],
    bestTimeToVisit: ['May', 'June', 'September', 'October'],
    category: 'beach'
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It\'s famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses. It\'s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district. The city has 17 UNESCO World Heritage Sites and over 1600 Buddhist temples and 400 Shinto shrines.',
    shortDescription: 'Ancient imperial capital with stunning temples, shrines, and gardens.',
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
      'https://images.pexels.com/photos/3444212/pexels-photo-3444212.png',
      'https://images.pexels.com/photos/5240511/pexels-photo-5240511.jpeg'
    ],
    coordinates: [35.0116, 135.7681],
    priceLevel: 3,
    activities: ['Temple Visits', 'Tea Ceremony', 'Garden Tours', 'Traditional Cuisine', 'Cultural Experiences'],
    bestTimeToVisit: ['March', 'April', 'October', 'November'],
    category: 'historical'
  },
  {
    id: '3',
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it\'s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views. Its exact former use remains a mystery. The site is incredibly preserved and offers insights into the Incan civilization, making it one of the most famous and spectacular sets of ruins in the world.',
    shortDescription: 'Ancient Incan citadel set amongst breathtaking mountain scenery.',
    rating: 4.9,
    images: [
      'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
      'https://images.pexels.com/photos/6474344/pexels-photo-6474344.jpeg',
      'https://images.pexels.com/photos/6474478/pexels-photo-6474478.jpeg'
    ],
    coordinates: [-13.1631, -72.5450],
    priceLevel: 3,
    activities: ['Hiking', 'Archaeological Tours', 'Photography', 'Cultural Experiences', 'Mountain Climbing'],
    bestTimeToVisit: ['April', 'May', 'September', 'October'],
    category: 'mountain'
  },
  {
    id: '4',
    name: 'Paris',
    country: 'France',
    description: 'Paris, France\'s capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré. The city is also known for its museums and architectural landmarks: the Louvre exhibits over 38,000 objects including Mona Lisa.',
    shortDescription: 'The City of Light, known for art, fashion, gastronomy, and culture.',
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
      'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
      'https://images.pexels.com/photos/2344/cars-france-landmark-lights.jpg'
    ],
    coordinates: [48.8566, 2.3522],
    priceLevel: 4,
    activities: ['Sightseeing', 'Museum Visits', 'Fine Dining', 'Shopping', 'River Cruise'],
    bestTimeToVisit: ['April', 'May', 'June', 'September', 'October'],
    category: 'city'
  },
  {
    id: '5',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as the cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats. It\'s a perfect blend of natural beauty, spiritual significance, and vibrant culture.',
    shortDescription: 'Tropical paradise with stunning beaches, rice terraces, and vibrant culture.',
    rating: 4.6,
    images: [
      'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
      'https://images.pexels.com/photos/5759239/pexels-photo-5759239.jpeg',
      'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg'
    ],
    coordinates: [-8.4095, 115.1889],
    priceLevel: 2,
    activities: ['Beach Activities', 'Temple Visits', 'Surfing', 'Yoga', 'Rice Terrace Trekking'],
    bestTimeToVisit: ['April', 'May', 'June', 'September', 'October'],
    category: 'beach'
  },
  {
    id: '6',
    name: 'New York City',
    country: 'United States',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that\'s among the world\'s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square. Known as "The Big Apple," New York is a global hub for art, culture, food, and fashion.',
    shortDescription: 'The Big Apple - a metropolis known for its iconic skyline and cultural diversity.',
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
      'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg',
      'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg'
    ],
    coordinates: [40.7128, -74.0060],
    priceLevel: 5,
    activities: ['Sightseeing', 'Broadway Shows', 'Museum Visits', 'Shopping', 'Central Park'],
    bestTimeToVisit: ['April', 'May', 'September', 'October', 'December'],
    category: 'city'
  },
  {
    id: '7',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'The Swiss Alps are the portion of the Alps mountain range that lies within Switzerland. Because of their central position within the entire Alpine range, they are also known as the Central Alps. The Swiss Alps form a large part of the topography of Switzerland, constituting about 60% of the country\'s total area. They are famous for their dramatic peaks, pristine lakes, and world-class skiing resorts, making Switzerland one of the most popular tourist destinations in the world.',
    shortDescription: 'Majestic mountain range with pristine lakes and world-class ski resorts.',
    rating: 4.9,
    images: [
      'https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg',
      'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      'https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg'
    ],
    coordinates: [46.8182, 8.2275],
    priceLevel: 5,
    activities: ['Skiing', 'Snowboarding', 'Hiking', 'Mountain Climbing', 'Scenic Train Rides'],
    bestTimeToVisit: ['December', 'January', 'February', 'July', 'August'],
    category: 'mountain'
  },
  {
    id: '8',
    name: 'Tuscany',
    country: 'Italy',
    description: 'Tuscany is a region in central Italy with an area of about 23,000 square kilometers and a population of about 3.8 million inhabitants. The regional capital is Florence. Tuscany is known for its landscapes, history, artistic legacy, and its influence on high culture. It is regarded as the birthplace of the Italian Renaissance and has been home to many figures influential in the history of art and science, and contains well-known museums such as the Uffizi and the Palazzo Pitti.',
    shortDescription: 'Rolling hills, vineyards, and Renaissance art in the heart of Italy.',
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/1797144/pexels-photo-1797144.jpeg',
      'https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg',
      'https://images.pexels.com/photos/358/vacation-village-houses-mountains.jpg'
    ],
    coordinates: [43.7711, 11.2486],
    priceLevel: 3,
    activities: ['Wine Tasting', 'Cooking Classes', 'Art Tours', 'Countryside Drives', 'Historical Tours'],
    bestTimeToVisit: ['April', 'May', 'June', 'September', 'October'],
    category: 'countryside'
  }
];