export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Court {
  id: string;
  name: string;
  address: string;
  rating: number; // 1-5 float
  reviewCount: number;
  image: string | number; // URL string or local image require() number
  amenities: string[];
  reviews: Review[];
}
