'use client';

import React from 'react';
import Link from 'next/link';

const cuisines = [
  {
    id: 'telangana',
    name: 'Telangana',
    emoji: '🍛',
    description: 'Authentic Hyderabadi biryani, haleem, and traditional flavors',
    color: 'from-red-500 to-orange-500',
    specialties: ['Biryani', 'Haleem', 'Mirchi ka Salan']
  },
  {
    id: 'street_food',
    name: 'Street Food',
    emoji: '🥟',
    description: 'Quick, tasty, and budget-friendly local favorites',
    color: 'from-yellow-500 to-orange-500',
    specialties: ['Samosa', 'Chaat', 'Mirchi Bajji']
  },
  {
    id: 'south_indian',
    name: 'South Indian',
    emoji: '🥞',
    description: 'Healthy breakfast options and traditional tiffin items',
    color: 'from-green-500 to-teal-500',
    specialties: ['Dosa', 'Idli', 'Pesarattu']
  },
  {
    id: 'north_indian',
    name: 'North Indian',
    emoji: '🍜',
    description: 'Rich curries, tandoor items, and hearty meals',
    color: 'from-purple-500 to-pink-500',
    specialties: ['Butter Chicken', 'Naan', 'Dal Makhani']
  },
  {
    id: 'chinese',
    name: 'Chinese',
    emoji: '🥢',
    description: 'Spicy Indo-Chinese fusion dishes',
    color: 'from-blue-500 to-indigo-500',
    specialties: ['Manchurian', 'Fried Rice', 'Chilli Chicken']
  },
  {
    id: 'beverages',
    name: 'Beverages',
    emoji: '☕',
    description: 'Traditional chai, fresh juices, and local drinks',
    color: 'from-amber-500 to-yellow-500',
    specialties: ['Filter Coffee', 'Masala Chai', 'Fresh Juice']
  }
];

export default function PopularCuisines() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cuisines.map((cuisine) => (
        <Link 
          key={cuisine.id}
          href={`/cuisines/${cuisine.id}`}
          className="group block"
        >
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${cuisine.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{cuisine.emoji}</div>
                <div className="text-right">
                  <h3 className="text-xl font-bold">{cuisine.name}</h3>
                  <p className="text-sm opacity-90">Cuisine</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {cuisine.description}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Popular Items
                </p>
                <div className="flex flex-wrap gap-1">
                  {cuisine.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Explore restaurants
                </span>
                <div className="text-orange-600 group-hover:text-orange-700">
                  <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}