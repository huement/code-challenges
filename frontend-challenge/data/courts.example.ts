import { Court } from "../types";

// EXAMPLE: How to use local images
// Replace the image URLs in courts.ts with require() statements like this:

export const courts: Court[] = [
  {
    id: "1",
    name: "Wimbledon Park Courts",
    address: "123 Tennis Lane, London, UK",
    rating: 4.8,
    reviewCount: 124,
    // OLD WAY (URL):
    // image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80',

    // NEW WAY (local image):
    image: require("../assets/images/wimbledon-park.jpg"),
    // OR use a number ID:
    // image: require('../assets/images/court-1.jpg'),

    amenities: ["Lights", "Clay", "Pro Shop", "Parking"],
    reviews: [
      // ... reviews
    ],
  },
  // ... more courts
];

// IMPORTANT NOTES:
// 1. TypeScript might complain about require() returning a number
//    We'll need to update the Court type to accept both string | number
// 2. Make sure image paths are relative to this file
// 3. After adding images, you may need to restart Metro bundler
