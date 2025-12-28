'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchPreferences } from '@/types/restaurant';

interface SearchBarProps {
  onSearch: (preferences: SearchPreferences) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [budget, setBudget] = useState(100);
  const [time, setTime] = useState<SearchPreferences['time']>('lunch');
  const [cuisine, setCuisine] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      budget,
      time,
      cuisine: cuisine === 'all' ? undefined : cuisine
    });
  };

  const getBudgetLabel = (value: number) => {
    if (value <= 50) return 'Ultra Budget';
    if (value <= 100) return 'Budget Friendly';
    if (value <= 200) return 'Mid Range';
    return 'Premium';
  };

  const getBudgetDescription = (value: number) => {
    if (value <= 50) return 'Street food & snacks';
    if (value <= 100) return 'Complete meals';
    if (value <= 200) return 'Restaurant dining';
    return 'Fine dining';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Budget Slider */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Budget (₹)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="30"
              max="500"
              step="10"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #ea580c 0%, #ea580c ${((budget - 30) / (500 - 30)) * 100}%, #e5e7eb ${((budget - 30) / (500 - 30)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">₹{budget}</div>
              <div className="text-sm font-medium text-gray-700">{getBudgetLabel(budget)}</div>
              <div className="text-xs text-gray-500">{getBudgetDescription(budget)}</div>
            </div>
          </div>
        </div>

        {/* Time of Day */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            When are you eating?
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value as SearchPreferences['time'])}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="breakfast">🌅 Breakfast (7-11 AM)</option>
            <option value="lunch">🌞 Lunch (12-2 PM)</option>
            <option value="afternoon">☀️ Afternoon (2-5 PM)</option>
            <option value="evening">🌆 Evening (5-8 PM)</option>
            <option value="night">🌙 Night (8 PM+)</option>
          </select>
          <div className="text-xs text-gray-500">
            {time === 'breakfast' && 'Perfect for idli, dosa, samosas, and chai'}
            {time === 'lunch' && 'Great for biryani, meals, and hearty dishes'}
            {time === 'afternoon' && 'Ideal for snacks and light bites'}
            {time === 'evening' && 'Popular for chaat, street food, and dinner'}
            {time === 'night' && 'Best for full meals and family dining'}
          </div>
        </div>

        {/* Cuisine Preference */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Cuisine Preference
          </label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="all">🍽️ All Cuisines</option>
            <option value="telangana">🍛 Telangana (Biryani, Haleem)</option>
            <option value="street_food">🥟 Street Food (Samosa, Chaat)</option>
            <option value="south_indian">🥞 South Indian (Dosa, Idli)</option>
            <option value="north_indian">🍜 North Indian (Curries, Naan)</option>
            <option value="chinese">🥢 Chinese (Indo-Chinese)</option>
          </select>
          <div className="text-xs text-gray-500">
            {cuisine === 'telangana' && 'Authentic Hyderabadi flavors and traditional recipes'}
            {cuisine === 'street_food' && 'Quick, tasty, and budget-friendly options'}
            {cuisine === 'south_indian' && 'Healthy, fermented foods and breakfast items'}
            {cuisine === 'north_indian' && 'Rich curries and tandoor specialties'}
            {cuisine === 'chinese' && 'Spicy Indo-Chinese fusion dishes'}
            {cuisine === 'all' && 'Get recommendations from all available cuisines'}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Search className="h-5 w-5 mr-2" />
          Find Perfect Recommendations
        </button>
      </div>

      {/* Quick Filters */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-3">Quick searches:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '🥟 Cheap Eats (₹50)', budget: 50, time: 'afternoon', cuisine: 'street_food' },
            { label: '🍛 Lunch Biryani (₹150)', budget: 150, time: 'lunch', cuisine: 'telangana' },
            { label: '🌅 Breakfast Special (₹80)', budget: 80, time: 'breakfast', cuisine: 'south_indian' },
            { label: '🌆 Evening Snacks (₹60)', budget: 60, time: 'evening', cuisine: 'street_food' },
          ].map((quick, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setBudget(quick.budget);
                setTime(quick.time as SearchPreferences['time']);
                setCuisine(quick.cuisine);
              }}
              className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
            >
              {quick.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}