'use client';

import { useState } from 'react';

interface Restaurant {
  id?: string;
  name: string;
  description: string;
  rating?: {
    average: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  location?: {
    area: string;
  };
  cuisine?: string[];
}

interface QuickSearch {
  label: string;
  budget: number;
  time: string;
  cuisine: string;
}

export default function Home() {
  const [budget, setBudget] = useState<number>(100);
  const [time, setTime] = useState<string>('lunch');
  const [cuisine, setCuisine] = useState<string>('all');
  const [recommendations, setRecommendations] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowResults(false);
    
    try {
      const response = await fetch('http://localhost:5001/api/v1/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget: budget,
          time: time,
          cuisine: cuisine === 'all' ? undefined : cuisine
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setRecommendations(data.data);
        setShowResults(true);
      } else {
        setError(data.error?.message || 'No restaurants found matching your criteria');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getBudgetLabel = (value: number): string => {
    if (value <= 50) return 'Ultra Budget';
    if (value <= 100) return 'Budget Friendly';
    if (value <= 200) return 'Mid Range';
    return 'Premium';
  };

  const getBudgetDescription = (value: number): string => {
    if (value <= 50) return 'Street food & snacks';
    if (value <= 100) return 'Complete meals';
    if (value <= 200) return 'Restaurant dining';
    return 'Fine dining';
  };

  const getTimeEmoji = (timeValue: string): string => {
    const timeEmojis: Record<string, string> = {
      'breakfast': '🌅',
      'lunch': '🌞',
      'afternoon': '☀️',
      'evening': '🌆',
      'night': '🌙'
    };
    return timeEmojis[timeValue] || '🍽️';
  };

  const quickSearches: QuickSearch[] = [
    { label: '🥟 Cheap Eats', budget: 50, time: 'afternoon', cuisine: 'Street Food' },
    { label: '🍛 Lunch Biryani', budget: 150, time: 'lunch', cuisine: 'Telangana' },
    { label: '🌅 Breakfast Special', budget: 80, time: 'breakfast', cuisine: 'South Indian' },
    { label: '🌆 Evening Snacks', budget: 60, time: 'evening', cuisine: 'Chaat' },
  ];

  const handleQuickSearch = (quick: QuickSearch): void => {
    setBudget(quick.budget);
    setTime(quick.time);
    setCuisine(quick.cuisine);
  };

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
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Restaurants</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block animate-bounce-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🍲 Uppal Kalan Street Food Guide
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            Discover authentic food experiences powered by Kiro AI
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From street-side samosas to traditional biryani - find your perfect meal with local intelligence
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🔍 Find Your Perfect Meal
          </h2>
          
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Budget Slider */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  💰 Budget (₹)
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="10"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ea580c 0%, #ea580c ${((budget - 30) / (500 - 30)) * 100}%, #fed7aa ${((budget - 30) / (500 - 30)) * 100}%, #fed7aa 100%)`
                    }}
                  />
                  <div className="text-center bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3">
                    <div className="text-3xl font-bold text-orange-600">₹{budget}</div>
                    <div className="text-sm font-semibold text-gray-700">{getBudgetLabel(budget)}</div>
                    <div className="text-xs text-gray-500">{getBudgetDescription(budget)}</div>
                  </div>
                </div>
              </div>

              {/* Time Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  🕒 When are you eating?
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-lg font-medium"
                >
                  <option value="breakfast">🌅 Breakfast (7-11 AM)</option>
                  <option value="lunch">🌞 Lunch (12-2 PM)</option>
                  <option value="afternoon">☀️ Afternoon (2-5 PM)</option>
                  <option value="evening">🌆 Evening (5-8 PM)</option>
                  <option value="night">🌙 Night (8 PM+)</option>
                </select>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  {time === 'breakfast' && 'Perfect for idli, dosa, samosas, and chai'}
                  {time === 'lunch' && 'Great for biryani, meals, and hearty dishes'}
                  {time === 'afternoon' && 'Ideal for snacks and light bites'}
                  {time === 'evening' && 'Popular for chaat, street food, and dinner'}
                  {time === 'night' && 'Best for full meals and family dining'}
                </div>
              </div>

              {/* Cuisine Selector */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  🍽️ Cuisine Preference
                </label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-lg font-medium"
                >
                  <option value="all">🍽️ All Cuisines</option>
                  <option value="Telangana">🍛 Telangana (Biryani, Haleem)</option>
                  <option value="Street Food">🥟 Street Food (Samosa, Chaat)</option>
                  <option value="South Indian">🥞 South Indian (Dosa, Idli)</option>
                  <option value="Multi-Cuisine">🍜 Multi-Cuisine (Variety)</option>
                  <option value="Chaat">🌶️ Chaat (Spicy Snacks)</option>
                </select>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  {cuisine === 'Telangana' && 'Authentic Hyderabadi flavors and traditional recipes'}
                  {cuisine === 'Street Food' && 'Quick, tasty, and budget-friendly options'}
                  {cuisine === 'South Indian' && 'Healthy, fermented foods and breakfast items'}
                  {cuisine === 'Multi-Cuisine' && 'International and local food varieties'}
                  {cuisine === 'Chaat' && 'Spicy street snacks and evening treats'}
                  {cuisine === 'all' && 'Get recommendations from all available cuisines'}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="text-center space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Finding Recommendations...
                  </>
                ) : (
                  <>
                    🔍 Find Perfect Recommendations
                  </>
                )}
              </button>
              
              {showResults && (
                <button
                  type="button"
                  onClick={() => {
                    setShowResults(false);
                    setRecommendations([]);
                    setError('');
                  }}
                  className="ml-4 inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium text-base rounded-xl hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                >
                  🔄 Clear Results
                </button>
              )}
            </div>

            {/* Quick Searches */}
            <div className="border-t border-orange-100 pt-6">
              <p className="text-sm font-semibold text-gray-600 mb-3 text-center">⚡ Quick searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {quickSearches.map((quick, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleQuickSearch(quick)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full hover:from-orange-200 hover:to-red-200 transition-all duration-200 text-sm font-medium border border-orange-200 hover:border-orange-300"
                  >
                    {quick.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8 animate-slide-up">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <div>
                <h3 className="font-semibold">Oops! Something went wrong</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && recommendations.length > 0 && (
          <div className="mb-12 animate-fade-in">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-slide-up">
              <div className="flex items-center">
                <span className="text-xl mr-2">🎉</span>
                <div>
                  <h3 className="font-semibold">Great! Found {recommendations.length} perfect match{recommendations.length > 1 ? 'es' : ''}</h3>
                  <p>Based on your ₹{budget} budget, {time} timing, and {cuisine === 'all' ? 'all cuisines' : cuisine} preference</p>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              🎯 Your Personalized Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((restaurant, index) => (
                <div key={restaurant.id || index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 hover:border-orange-200 transform hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-r from-orange-400 to-red-400 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">🍽️</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                        ⭐ {restaurant.rating?.average || '4.0'}
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/90 text-orange-600 px-2 py-1 rounded-lg text-xs font-semibold">
                        Perfect Match
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {restaurant.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-orange-600 font-bold text-lg">
                        ₹{restaurant.priceRange?.min || '50'} - ₹{restaurant.priceRange?.max || '200'}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        {restaurant.location?.area || 'Uppal'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(restaurant.cuisine || ['Indian']).slice(0, 3).map((cuisineType: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {cuisineType}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Default Restaurant Cards */}
        {!showResults && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              ⭐ Featured Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Biryani House Uppal",
                  description: "Authentic dum pukht biryani made with traditional Hyderabadi recipes. Family-friendly restaurant known for consistent quality.",
                  price: "₹120 - ₹280",
                  rating: "4.5",
                  area: "Main Road",
                  cuisines: ["Telangana", "Biryani", "Indian"]
                },
                {
                  name: "Uppal Market Samosa Corner",
                  description: "Famous for crispy samosas and traditional chai. A favorite breakfast spot for locals and office workers.",
                  price: "₹20 - ₹80",
                  rating: "4.3",
                  area: "Uppal Market",
                  cuisines: ["Street Food", "Snacks"]
                },
                {
                  name: "South Indian Tiffin Center",
                  description: "Fresh idlis, crispy dosas, and authentic filter coffee. Perfect for morning tiffin and healthy breakfast options.",
                  price: "₹40 - ₹120",
                  rating: "4.4",
                  area: "Main Road",
                  cuisines: ["South Indian", "Breakfast"]
                }
              ].map((restaurant, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 hover:border-orange-200 transform hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-r from-orange-400 to-red-400 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">🍽️</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                        ⭐ {restaurant.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {restaurant.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-orange-600 font-bold text-lg">
                        {restaurant.price}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        {restaurant.area}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {restaurant.cuisines.map((cuisine, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {cuisine}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Context Section */}
        <div className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 rounded-2xl p-8 text-center border border-orange-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🧠 Powered by Local Intelligence
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Our AI understands Uppal Kalan's unique food culture, from morning chai at the market 
              to evening biryani on Main Road. Every recommendation considers local pricing patterns, 
              peak dining hours, and authentic taste preferences.
            </p>
            <p className="text-gray-600 mb-6">
              Built with Kiro AI using local context and cultural knowledge for authentic recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/70 px-4 py-2 rounded-full">🏪 30+ Local Vendors</span>
              <span className="bg-white/70 px-4 py-2 rounded-full">🍛 Authentic Telangana Cuisine</span>
              <span className="bg-white/70 px-4 py-2 rounded-full">💰 Budget-Aware Recommendations</span>
              <span className="bg-white/70 px-4 py-2 rounded-full">⏰ Peak Hours Intelligence</span>
            </div>
          </div>
        </div>
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