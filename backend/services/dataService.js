const fs = require('fs');
const path = require('path');

class DataService {
  constructor() {
    this.restaurants = [];
    this.cuisines = {};
    this.areas = {};
    this.loadData();
  }

  loadData() {
    try {
      // Load restaurants data
      const restaurantsPath = path.join(__dirname, '../../data/restaurants.json');
      this.restaurants = JSON.parse(fs.readFileSync(restaurantsPath, 'utf8'));

      // Load cuisines data
      const cuisinesPath = path.join(__dirname, '../../data/cuisines.json');
      this.cuisines = JSON.parse(fs.readFileSync(cuisinesPath, 'utf8'));

      // Load areas data
      const areasPath = path.join(__dirname, '../../data/areas.json');
      this.areas = JSON.parse(fs.readFileSync(areasPath, 'utf8'));

      console.log(`✅ Data loaded: ${this.restaurants.length} restaurants`);
    } catch (error) {
      console.error('❌ Error loading data:', error.message);
      throw new Error('Failed to load restaurant data');
    }
  }

  // Restaurant methods
  getAllRestaurants() {
    return this.restaurants;
  }

  getRestaurantById(id) {
    return this.restaurants.find(restaurant => restaurant.id === id);
  }

  getRestaurantsByArea(area) {
    const areaKey = area.toLowerCase().replace(/\s+/g, '-');
    return this.restaurants.filter(restaurant => 
      restaurant.location.area.toLowerCase().replace(/\s+/g, '-') === areaKey
    );
  }

  getRestaurantsByCuisine(cuisine) {
    const cuisineKey = cuisine.toLowerCase().replace(/\s+/g, '_');
    return this.restaurants.filter(restaurant =>
      restaurant.cuisine.some(c => 
        c.toLowerCase().replace(/\s+/g, '_') === cuisineKey
      )
    );
  }

  // Search methods
  searchRestaurants(filters) {
    let results = [...this.restaurants];

    // Text search
    if (filters.q) {
      const query = filters.q.toLowerCase();
      results = results.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.specialties.some(specialty => 
          specialty.toLowerCase().includes(query)
        ) ||
        restaurant.cuisine.some(cuisine => 
          cuisine.toLowerCase().includes(query)
        )
      );
    }

    // Cuisine filter
    if (filters.cuisine && filters.cuisine !== 'all') {
      const cuisineKey = filters.cuisine.toLowerCase().replace(/\s+/g, '_');
      results = results.filter(restaurant =>
        restaurant.cuisine.some(c => 
          c.toLowerCase().replace(/\s+/g, '_') === cuisineKey
        )
      );
    }

    // Area filter
    if (filters.area) {
      const areaKey = filters.area.toLowerCase().replace(/\s+/g, '-');
      results = results.filter(restaurant =>
        restaurant.location.area.toLowerCase().replace(/\s+/g, '-') === areaKey
      );
    }

    // Price range filter
    if (filters.minPrice || filters.maxPrice) {
      results = results.filter(restaurant => {
        const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
        const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
        return restaurant.priceRange.min >= min && restaurant.priceRange.max <= max;
      });
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      results = results.filter(restaurant => 
        restaurant.rating.average >= minRating
      );
    }

    // Dietary options filter
    if (filters.vegetarian === 'true') {
      results = results.filter(restaurant => 
        restaurant.dietaryOptions.vegetarian
      );
    }

    if (filters.vegan === 'true') {
      results = results.filter(restaurant => 
        restaurant.dietaryOptions.vegan
      );
    }

    if (filters.halal === 'true') {
      results = results.filter(restaurant => 
        restaurant.dietaryOptions.halal
      );
    }

    // Open now filter (simplified - assumes current time)
    if (filters.openNow === 'true') {
      const now = new Date();
      const currentDay = now.toLocaleLowerCase().substring(0, 3) + 
        now.toLocaleLowerCase().substring(3);
      const currentTime = now.getHours() * 100 + now.getMinutes();

      results = results.filter(restaurant => {
        const todayTiming = restaurant.timings[currentDay];
        if (!todayTiming) return false;
        
        const openTime = parseInt(todayTiming.open.replace(':', ''));
        const closeTime = parseInt(todayTiming.close.replace(':', ''));
        
        return currentTime >= openTime && currentTime <= closeTime;
      });
    }

    return results;
  }

  // Recommendation methods
  getRecommendations(preferences) {
    let results = [...this.restaurants];

    // Budget-based filtering (core Kiro context usage)
    if (preferences.budget) {
      const budget = parseInt(preferences.budget);
      results = results.filter(restaurant => 
        restaurant.priceRange.min <= budget
      );

      // Sort by value for money (rating vs price ratio)
      results.sort((a, b) => {
        const aValue = a.rating.average / (a.priceRange.min + a.priceRange.max) * 2;
        const bValue = b.rating.average / (b.priceRange.min + b.priceRange.max) * 2;
        return bValue - aValue;
      });
    }

    // Time-based recommendations (using local context)
    if (preferences.time) {
      const timePreferences = this.getTimeBasedPreferences(preferences.time);
      results = results.filter(restaurant =>
        timePreferences.cuisines.some(cuisine =>
          restaurant.cuisine.some(c => 
            c.toLowerCase().includes(cuisine.toLowerCase())
          )
        )
      );
    }

    // Cuisine preference
    if (preferences.cuisine && preferences.cuisine !== 'all') {
      const cuisineKey = preferences.cuisine.toLowerCase().replace(/\s+/g, '_');
      results = results.filter(restaurant =>
        restaurant.cuisine.some(c => 
          c.toLowerCase().replace(/\s+/g, '_') === cuisineKey
        )
      );
    }

    // Sort by rating if no other sorting applied
    if (!preferences.budget) {
      results.sort((a, b) => b.rating.average - a.rating.average);
    }

    return results.slice(0, 10); // Return top 10 recommendations
  }

  getTimeBasedPreferences(time) {
    // This uses the local context from product.md
    const timeMap = {
      'breakfast': {
        cuisines: ['South Indian', 'Street Food'],
        specialties: ['Idli', 'Dosa', 'Upma', 'Samosa', 'Chai']
      },
      'lunch': {
        cuisines: ['Telangana', 'North Indian', 'Biryani'],
        specialties: ['Biryani', 'Meals', 'Curries']
      },
      'afternoon': {
        cuisines: ['Street Food', 'Chaat'],
        specialties: ['Chaat', 'Snacks', 'Tea']
      },
      'evening': {
        cuisines: ['Street Food', 'Chaat', 'Telangana'],
        specialties: ['Mirchi Bajji', 'Samosa', 'Chaat']
      },
      'night': {
        cuisines: ['Telangana', 'North Indian'],
        specialties: ['Biryani', 'Dinner meals']
      }
    };

    return timeMap[time] || timeMap['lunch'];
  }

  getPopularRestaurants() {
    return this.restaurants
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 8);
  }

  getBudgetRestaurants(budget) {
    const budgetNum = parseInt(budget);
    return this.restaurants
      .filter(restaurant => restaurant.priceRange.max <= budgetNum)
      .sort((a, b) => b.rating.average - a.rating.average);
  }

  // Cuisine methods
  getAllCuisines() {
    return this.cuisines;
  }

  getCuisineInfo(cuisine) {
    const cuisineKey = cuisine.toLowerCase().replace(/\s+/g, '_');
    return this.cuisines.cuisines[cuisineKey];
  }

  getDietaryOptions(type) {
    return this.cuisines.dietaryCategories[type];
  }

  // Area methods
  getAllAreas() {
    return this.areas;
  }

  getAreaInfo(area) {
    const areaKey = area.toLowerCase().replace(/\s+/g, '-');
    return this.areas.areas[areaKey];
  }

  getAreaRestaurants(area) {
    return this.getRestaurantsByArea(area);
  }

  // Search suggestions
  getSearchSuggestions(query) {
    if (!query || query.length < 2) return [];

    const suggestions = new Set();
    const queryLower = query.toLowerCase();

    this.restaurants.forEach(restaurant => {
      // Restaurant names
      if (restaurant.name.toLowerCase().includes(queryLower)) {
        suggestions.add(restaurant.name);
      }

      // Specialties
      restaurant.specialties.forEach(specialty => {
        if (specialty.toLowerCase().includes(queryLower)) {
          suggestions.add(specialty);
        }
      });

      // Cuisines
      restaurant.cuisine.forEach(cuisine => {
        if (cuisine.toLowerCase().includes(queryLower)) {
          suggestions.add(cuisine);
        }
      });
    });

    return Array.from(suggestions).slice(0, 8);
  }

  getFilterOptions() {
    const cuisines = new Set();
    const areas = new Set();
    let minPrice = Infinity;
    let maxPrice = 0;

    this.restaurants.forEach(restaurant => {
      restaurant.cuisine.forEach(cuisine => cuisines.add(cuisine));
      areas.add(restaurant.location.area);
      minPrice = Math.min(minPrice, restaurant.priceRange.min);
      maxPrice = Math.max(maxPrice, restaurant.priceRange.max);
    });

    return {
      cuisines: Array.from(cuisines).sort(),
      areas: Array.from(areas).sort(),
      priceRange: { min: minPrice, max: maxPrice },
      ratings: [1, 2, 3, 4, 5],
      dietaryOptions: ['vegetarian', 'vegan', 'jain', 'halal']
    };
  }
}

// Create singleton instance
const dataService = new DataService();

module.exports = dataService;