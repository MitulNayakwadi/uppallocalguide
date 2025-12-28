'use client';

import { useState, useEffect } from 'react';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  priceRange: {
    min: number;
    max: number;
  };
  location: {
    area: string;
  };
  rating: {
    average: number;
    count: number;
  };
  specialties: string[];
  timings: any;
  features: any;
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/v1/restaurants');
      const data = await response.json();
      
      if (data.success) {
        setRestaurants(data.data);
      } else {
        setError('Failed to load restaurants');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const cuisineMatch = selectedCuisine === 'all' || restaurant.cuisine.some(c => 
      c.toLowerCase().includes(selectedCuisine.toLowerCase())
    );
    const areaMatch = selectedArea === 'all' || restaurant.location.area === selectedArea;
    return cuisineMatch && areaMatch;
  });

  const uniqueCuisines = [...new Set(restaurants.flatMap(r => r.cuisine))];
  const uniqueAreas = [...new Set(restaurants.map(r => r.location.area))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                <span className="text-white text-xl">🍲</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Uppal Food Guide</h1>
                <p className="text-xs text-gray-500">📍 Uppal Kalan, Telangana</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="/restaurants" className="text-orange-600 font-semibold">Restaurants</a>
              <a href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            🍽️ All Restaurants
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Discover all the amazing food spots in Uppal Kalan
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🍽️ Filter by Cuisine
              </label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="all">All Cuisines</option>
                {uniqueCuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📍 Filter by Area
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="all">All Areas</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
              <p className="text-xl text-gray-600">Loading restaurants...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <div>
                <h3 className="font-semibold">Error loading restaurants</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Restaurants Grid */}
        {!loading && !error && (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-center">
                Showing {filteredRestaurants.length} of {restaurants.length} restaurants
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 hover:border-orange-200 transform hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-r from-orange-400 to-red-400 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">🍽️</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                        ⭐ {restaurant.rating.average}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                      {restaurant.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-orange-600 font-bold text-lg">
                        ₹{restaurant.priceRange.min} - ₹{restaurant.priceRange.max}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        {restaurant.location.area}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {restaurant.cuisine.slice(0, 3).map((cuisineType, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {cuisineType}
                        </span>
                      ))}
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                      <p className="text-sm text-gray-700 line-clamp-1">
                        {restaurant.specialties.slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors font-medium text-sm">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm">
                        📍 Directions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && !error && filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={() => {
                setSelectedCuisine('all');
                setSelectedArea('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              Made with ❤️ for Uppal Kalan food lovers
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Uppal Food Guide. Built for AI for Bharat Week 5.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}