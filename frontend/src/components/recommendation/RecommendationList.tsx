'use client';

import React from 'react';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { Restaurant } from '@/types/restaurant';

interface RecommendationListProps {
  restaurants: Restaurant[];
}

export default function RecommendationList({ restaurants }: RecommendationListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🤔</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No recommendations found
        </h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your preferences or budget to see more options.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <h4 className="font-medium text-blue-900 mb-2">💡 Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li>• Increase your budget range</li>
            <li>• Try different cuisine types</li>
            <li>• Consider different meal times</li>
            <li>• Explore "All Cuisines" option</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="text-center">
        <p className="text-lg text-gray-700">
          Found <span className="font-bold text-orange-600">{restaurants.length}</span> perfect matches for you!
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Recommendations powered by Kiro AI with local Uppal Kalan knowledge
        </p>
      </div>

      {/* Restaurant grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            showRecommendationReason={true}
          />
        ))}
      </div>

      {/* Local context note */}
      <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-6 text-center">
        <h4 className="font-semibold text-gray-900 mb-2">🧠 Local Intelligence</h4>
        <p className="text-gray-700 text-sm">
          These recommendations consider Uppal Kalan's unique food culture, local pricing patterns, 
          peak dining hours, and authentic taste preferences. Our AI understands the difference between 
          morning chai at the market and evening biryani on Main Road.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Search Again
        </button>
        <button 
          onClick={() => window.location.href = '/restaurants'}
          className="px-6 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Browse All Restaurants
        </button>
      </div>
    </div>
  );
}