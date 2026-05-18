import fs from 'fs';
import path from 'path';

// Cache the data to avoid reading files multiple times
let cachedRestaurants: any[] | undefined;
let cachedCuisines: any | undefined;
let cachedAreas: any | undefined;

export function loadRestaurantsData(): any[] {
  if (cachedRestaurants) return cachedRestaurants;
  
  try {
    const dataPath = path.join(process.cwd(), 'data', 'restaurants.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    cachedRestaurants = JSON.parse(data);
    return cachedRestaurants ?? [];
  } catch (error) {
    console.error('Error loading restaurants data:', error);
    return [];
  }
}

export function loadCuisinesData(): any {
  if (cachedCuisines) return cachedCuisines;
  
  try {
    const dataPath = path.join(process.cwd(), 'data', 'cuisines.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    cachedCuisines = JSON.parse(data);
    return cachedCuisines ?? {};
  } catch (error) {
    console.error('Error loading cuisines data:', error);
    return {};
  }
}

export function loadAreasData(): any {
  if (cachedAreas) return cachedAreas;
  
  try {
    const dataPath = path.join(process.cwd(), 'data', 'areas.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    cachedAreas = JSON.parse(data);
    return cachedAreas ?? {};
  } catch (error) {
    console.error('Error loading areas data:', error);
    return {};
  }
}

export function getAllRestaurants(): any[] {
  return loadRestaurantsData();
}

export function getRestaurantById(id: string): any {
  const restaurants = loadRestaurantsData();
  return restaurants.find((r: any) => r.id === id);
}

export function getRestaurantsByArea(area: string): any[] {
  const restaurants = loadRestaurantsData();
  const areaKey = area.toLowerCase().replace(/\s+/g, '-');
  return restaurants.filter((r: any) =>
    r.location.area.toLowerCase().replace(/\s+/g, '-') === areaKey
  );
}

export function getRestaurantsByCuisine(cuisine: string): any[] {
  const restaurants = loadRestaurantsData();
  const cuisineKey = cuisine.toLowerCase().replace(/\s+/g, '_');
  return restaurants.filter((r: any) =>
    r.cuisine.some((c: string) =>
      c.toLowerCase().replace(/\s+/g, '_') === cuisineKey
    )
  );
}

export function searchRestaurants(filters: any): any[] {
  let restaurants = [...loadRestaurantsData()];

  // Text search
  if (filters.q) {
    const query = filters.q.toLowerCase();
    restaurants = restaurants.filter((r: any) =>
      r.name.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.specialties?.some((s: string) => s.toLowerCase().includes(query)) ||
      r.cuisine.some((c: string) => c.toLowerCase().includes(query))
    );
  }

  // Cuisine filter
  if (filters.cuisine && filters.cuisine !== 'all') {
    const cuisineKey = filters.cuisine.toLowerCase().replace(/\s+/g, '_');
    restaurants = restaurants.filter((r: any) =>
      r.cuisine.some((c: string) =>
        c.toLowerCase().replace(/\s+/g, '_') === cuisineKey
      )
    );
  }

  // Area filter
  if (filters.area) {
    const areaKey = filters.area.toLowerCase().replace(/\s+/g, '-');
    restaurants = restaurants.filter((r: any) =>
      r.location.area.toLowerCase().replace(/\s+/g, '-') === areaKey
    );
  }

  // Price range filter
  if (filters.minPrice || filters.maxPrice) {
    restaurants = restaurants.filter((r: any) => {
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      return r.priceRange.min >= min && r.priceRange.max <= max;
    });
  }

  // Rating filter
  if (filters.minRating) {
    const minRating = parseFloat(filters.minRating);
    restaurants = restaurants.filter(
      (r: any) => r.rating.average >= minRating
    );
  }

  return restaurants;
}

export function getPopularRestaurants(limit = 10): any[] {
  const restaurants = loadRestaurantsData();
  return restaurants
    .sort((a: any, b: any) => b.rating.average - a.rating.average)
    .slice(0, limit);
}

export function getBudgetRestaurants(budget: number): any[] {
  const restaurants = loadRestaurantsData();
  return restaurants.filter(
    (r: any) => r.priceRange.min <= budget && r.priceRange.max >= budget
  );
}
