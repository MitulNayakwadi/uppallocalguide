export interface Restaurant {
  id: string;
  name: string;
  type: string;
  cuisine: string[];
  category: 'restaurant' | 'street-vendor' | 'food-court';
  priceRange: {
    min: number;
    max: number;
    currency: string;
    range: 'budget' | 'mid-range' | 'premium';
  };
  location: {
    area: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  specialties: string[];
  timings: {
    [day: string]: {
      open: string;
      close: string;
    } | null;
  };
  features: {
    dineIn: boolean;
    takeaway: boolean;
    delivery: boolean;
    parking: boolean;
    ac: boolean;
    wifi: boolean;
    familyFriendly: boolean;
    wheelchairAccessible: boolean;
  };
  dietaryOptions: {
    vegetarian: boolean;
    vegan: boolean;
    jain: boolean;
    halal: boolean;
    glutenFree: boolean;
  };
  rating: {
    average: number;
    count: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  busyHours: {
    day: string;
    hours: string[];
  }[];
  description: string;
  highlights: string;
  tags: string[];
  contact?: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
  recommendationReason?: string;
}

export interface SearchFilters {
  q?: string;
  cuisine?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  halal?: boolean;
  openNow?: boolean;
}

export interface SearchPreferences {
  budget?: number;
  time?: 'breakfast' | 'lunch' | 'afternoon' | 'evening' | 'night';
  cuisine?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
    details?: string;
  };
}