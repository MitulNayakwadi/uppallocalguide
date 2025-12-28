'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock, Phone, Utensils, IndianRupee } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  showRecommendationReason?: boolean;
}

export default function RestaurantCard({ restaurant, showRecommendationReason = false }: RestaurantCardProps) {
  const formatPriceRange = () => {
    return `₹${restaurant.priceRange.min} - ₹${restaurant.priceRange.max}`;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-green-400';
    if (rating >= 3.5) return 'bg-yellow-500';
    if (rating >= 3.0) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'budget': return 'text-green-600 bg-green-100';
      case 'mid-range': return 'text-blue-600 bg-blue-100';
      case 'premium': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isOpenNow = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayTiming = restaurant.timings[currentDay];
    if (!todayTiming) return false;
    
    const openTime = parseInt(todayTiming.open.replace(':', ''));
    const closeTime = parseInt(todayTiming.close.replace(':', ''));
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-r from-orange-400 to-red-400 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Utensils className="h-16 w-16 text-white opacity-50" />
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-4 left-4">
          <div className={`${getRatingColor(restaurant.rating.average)} text-white px-2 py-1 rounded-lg flex items-center text-sm font-semibold`}>
            <Star className="h-4 w-4 mr-1 fill-current" />
            {restaurant.rating.average}
          </div>
        </div>

        {/* Price range badge */}
        <div className="absolute top-4 right-4">
          <div className={`${getPriceRangeColor(restaurant.priceRange.range)} px-2 py-1 rounded-lg text-sm font-medium`}>
            {restaurant.priceRange.range.replace('-', ' ')}
          </div>
        </div>

        {/* Open/Closed status */}
        <div className="absolute bottom-4 right-4">
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
            isOpenNow() 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {isOpenNow() ? 'Open Now' : 'Closed'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {restaurant.name}
          </h3>
          
          {/* Cuisine tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {restaurant.cuisine.slice(0, 3).map((cuisine, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
              >
                {cuisine}
              </span>
            ))}
            {restaurant.cuisine.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{restaurant.cuisine.length - 3} more
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {restaurant.location.area}
          </div>

          {/* Price */}
          <div className="flex items-center text-gray-700 font-semibold">
            <IndianRupee className="h-4 w-4 mr-1" />
            {formatPriceRange()}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Specialties */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-1">
            {restaurant.specialties.slice(0, 4).map((specialty, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {specialty}
              </span>
            ))}
            {restaurant.specialties.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{restaurant.specialties.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Recommendation reason */}
        {showRecommendationReason && restaurant.recommendationReason && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Why recommended:</span> {restaurant.recommendationReason}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            {restaurant.features.dineIn && (
              <span className="flex items-center">
                <Utensils className="h-3 w-3 mr-1" />
                Dine-in
              </span>
            )}
            {restaurant.features.takeaway && (
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Takeaway
              </span>
            )}
            {restaurant.features.delivery && (
              <span>🚚 Delivery</span>
            )}
          </div>
          <div className="text-right">
            <div className="text-gray-700 font-medium">
              {restaurant.rating.count} reviews
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link 
            href={`/restaurants/${restaurant.id}`}
            className="flex-1 bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            View Details
          </Link>
          {restaurant.contact?.phone && (
            <a 
              href={`tel:${restaurant.contact.phone}`}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
              title="Call Restaurant"
            >
              <Phone className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}