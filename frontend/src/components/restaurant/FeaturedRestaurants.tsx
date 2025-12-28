'use client';

import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { recommendationApi } from '@/utils/api';

export default function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeaturedRestaurants();
  }, []);

  const fetchFeaturedRestaurants = async () => {
    try {
      const data = await recommendationApi.getPopular();
      setRestaurants(data.data.slice(0, 6)); // Show top 6
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Featured restaurants error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
              <div className="h-20 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">😕</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Unable to load featured restaurants
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={fetchFeaturedRestaurants}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No featured restaurants available
        </h3>
        <p className="text-gray-600">
          Check back later for our top recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600">
          Top-rated restaurants loved by locals and visitors
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      <div className="text-center">
        <a 
          href="/restaurants"
          className="inline-flex items-center px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
        >
          View All Restaurants
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}