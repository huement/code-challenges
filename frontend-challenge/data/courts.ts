import { Court } from "../types";

// Placeholder image URL for courts without photos
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/800x600/2C5F2D/FFFFFF?text=Tennis+Court";

// Helper to generate random rating between 3.5 and 5.0
const randomRating = () => Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;

// Helper to generate random review count
const randomReviewCount = () => Math.floor(Math.random() * 300) + 20;

// Helper to generate sample review
const generateReview = (
  id: string,
  user: string,
  comment: string,
  rating: number,
  date: string
) => ({
  id,
  user,
  comment,
  rating,
  date,
});

// Sample amenities combinations
const amenitySets = [
  ["Lights", "Clay", "Pro Shop", "Parking"],
  ["Lights", "Hard Court", "Locker Room", "Parking", "Cafe"],
  ["Lights", "Hard Court", "Pro Shop", "Parking", "Gym"],
  ["Lights", "Grass", "Clay", "Pro Shop", "Parking"],
  ["Lights", "Clay", "Hard Court", "Pro Shop", "Parking", "Restaurant"],
  ["Lights", "Hard Court", "Locker Room", "Parking"],
  ["Lights", "Clay", "Parking"],
  ["Lights", "Hard Court", "Pro Shop", "Parking", "Cafe", "Gym"],
  ["Clay", "Hard Court", "Parking"],
  ["Lights", "Grass", "Parking", "Pro Shop"],
];

// Sample reviews
const sampleReviews = [
  generateReview(
    "r1",
    "Sarah M.",
    "Beautiful courts with excellent maintenance. The clay surface is perfect for training.",
    5,
    "2024-01-15"
  ),
  generateReview(
    "r2",
    "James T.",
    "Great facility but can get crowded on weekends. Lights work well for evening games.",
    4,
    "2024-01-10"
  ),
  generateReview(
    "r3",
    "Emma L.",
    "Well-kept courts with friendly staff. Pro shop has everything you need.",
    5,
    "2024-01-08"
  ),
  generateReview(
    "r4",
    "Pierre D.",
    "Authentic clay courts with professional lighting. The cafe is a nice touch!",
    5,
    "2024-01-12"
  ),
  generateReview(
    "r5",
    "Marie C.",
    "Good courts but booking system could be improved. Surface quality is excellent.",
    4,
    "2024-01-05"
  ),
  generateReview(
    "r6",
    "Michael R.",
    "Top-notch facility with modern amenities. Courts are always in perfect condition.",
    5,
    "2024-01-14"
  ),
  generateReview(
    "r7",
    "Jennifer K.",
    "Love the gym access included. Courts are spacious and well-maintained.",
    5,
    "2024-01-11"
  ),
  generateReview(
    "r8",
    "David W.",
    "Great location and facilities. Only downside is the parking fee.",
    4,
    "2024-01-09"
  ),
  generateReview(
    "r9",
    "Olivia B.",
    "Unique to have both grass and clay courts. Facilities are excellent!",
    5,
    "2024-01-13"
  ),
  generateReview(
    "r10",
    "Thomas H.",
    "Good courts but grass surface needs more frequent maintenance.",
    4,
    "2024-01-07"
  ),
  generateReview(
    "r11",
    "Carlos M.",
    "Absolutely perfect! Best courts in the city. The restaurant serves amazing food after matches.",
    5,
    "2024-01-16"
  ),
  generateReview(
    "r12",
    "Sofia R.",
    "Stunning facility with professional-grade courts. Highly recommended!",
    5,
    "2024-01-12"
  ),
  generateReview(
    "r13",
    "Luis G.",
    "Great atmosphere and excellent maintenance. The clay courts are my favorite.",
    5,
    "2024-01-10"
  ),
  generateReview(
    "r14",
    "Ana P.",
    "Perfect location with amazing facilities. A bit pricey but worth it.",
    4,
    "2024-01-08"
  ),
  generateReview(
    "r15",
    "Hiroshi T.",
    "Clean and well-organized facility. Courts are always available.",
    4,
    "2024-01-11"
  ),
  generateReview(
    "r16",
    "Yuki S.",
    "Good value for money. Simple but effective setup.",
    4,
    "2024-01-06"
  ),
];

const getRandomAmenities = () =>
  amenitySets[Math.floor(Math.random() * amenitySets.length)];
const getRandomReviews = (count: number) => {
  const shuffled = [...sampleReviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const courts: Court[] = [
  {
    id: "1",
    name: "Wimbledon Park Courts",
    address: "123 Tennis Lane, London, UK",
    rating: 4.8,
    reviewCount: 124,
    image: require("../assets/images/wimbledon-park.jpg"),
    amenities: ["Lights", "Clay", "Pro Shop", "Parking"],
    reviews: getRandomReviews(3),
  },
  {
    id: "2",
    name: "Roland Garros Tennis Center",
    address: "456 Court Boulevard, Paris, France",
    rating: 4.6,
    reviewCount: 89,
    image: require("../assets/images/roland-garros.jpg"),
    amenities: ["Lights", "Hard Court", "Locker Room", "Parking", "Cafe"],
    reviews: getRandomReviews(2),
  },
  {
    id: "3",
    name: "Forest Hills Tennis Club",
    address: "789 Green Court Ave, New York, NY",
    rating: 4.7,
    reviewCount: 156,
    image: require("../assets/images/forest-hills.jpg"),
    amenities: ["Lights", "Hard Court", "Pro Shop", "Parking", "Gym"],
    reviews: getRandomReviews(3),
  },
  {
    id: "4",
    name: "Melbourne Tennis Academy",
    address: "321 Aussie Way, Melbourne, Australia",
    rating: 4.5,
    reviewCount: 98,
    image: require("../assets/images/melbourne-academy.jpg"),
    amenities: ["Lights", "Grass", "Clay", "Pro Shop", "Parking"],
    reviews: getRandomReviews(2),
  },
  {
    id: "5",
    name: "Barcelona Tennis Club",
    address: "654 Mediterraneo Street, Barcelona, Spain",
    rating: 4.9,
    reviewCount: 203,
    image: require("../assets/images/barcelona-club.jpg"),
    amenities: [
      "Lights",
      "Clay",
      "Hard Court",
      "Pro Shop",
      "Parking",
      "Restaurant",
    ],
    reviews: getRandomReviews(4),
  },
  {
    id: "6",
    name: "Tokyo Tennis Garden",
    address: "987 Sakura Road, Tokyo, Japan",
    rating: 4.4,
    reviewCount: 67,
    image: require("../assets/images/tokyo-garden.jpg"),
    amenities: ["Lights", "Hard Court", "Locker Room", "Parking"],
    reviews: getRandomReviews(2),
  },
  {
    id: "7",
    name: "Central Park Tennis Center",
    address: "100 Central Park West, New York, NY",
    rating: 4.3,
    reviewCount: 145,
    image: require("../assets/images/random_1.jpg"),
    amenities: getRandomAmenities(),
    reviews: getRandomReviews(2),
  },
  {
    id: "8",
    name: "Riverside Tennis Club",
    address: "250 River Drive, Los Angeles, CA",
    rating: 4.6,
    reviewCount: 112,
    image: require("../assets/images/random_3.jpg"),
    amenities: getRandomAmenities(),
    reviews: getRandomReviews(2),
  },
  {
    id: "9",
    name: "Oakwood Tennis Facility",
    address: "88 Oak Street, Chicago, IL",
    rating: 4.7,
    reviewCount: 98,
    image: require("../assets/images/random_5.jpg"),
    amenities: getRandomAmenities(),
    reviews: getRandomReviews(2),
  },
  // Generate 42 more courts with placeholder images
  ...Array.from({ length: 42 }, (_, i) => {
    const courtNum = i + 10;
    const cities = [
      "Miami",
      "Seattle",
      "Boston",
      "Denver",
      "Phoenix",
      "San Diego",
      "Portland",
      "Austin",
      "Atlanta",
      "Dallas",
      "Houston",
      "Philadelphia",
      "San Francisco",
      "Las Vegas",
      "Orlando",
      "Toronto",
      "Vancouver",
      "Montreal",
      "Sydney",
      "Auckland",
      "Singapore",
      "Dubai",
      "Berlin",
      "Madrid",
      "Rome",
      "Amsterdam",
      "Brussels",
      "Zurich",
      "Stockholm",
      "Copenhagen",
      "Mumbai",
      "Bangkok",
      "Seoul",
      "Hong Kong",
      "Taipei",
      "Jakarta",
      "Manila",
      "Kuala Lumpur",
      "Cape Town",
      "Johannesburg",
      "Cairo",
      "Tel Aviv",
    ];
    const city = cities[i % cities.length];
    const streetNames = [
      "Park",
      "Main",
      "Court",
      "Tennis",
      "Green",
      "Oak",
      "Maple",
      "Elm",
      "River",
      "Lake",
    ];
    const streetName = streetNames[i % streetNames.length];

    return {
      id: String(courtNum),
      name: `${city} Tennis Club`,
      address: `${
        Math.floor(Math.random() * 9999) + 100
      } ${streetName} Street, ${city}`,
      rating: randomRating(),
      reviewCount: randomReviewCount(),
      image: PLACEHOLDER_IMAGE,
      amenities: getRandomAmenities(),
      reviews: getRandomReviews(Math.floor(Math.random() * 3) + 1),
    };
  }),
];
