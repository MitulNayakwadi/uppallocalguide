'use client';

import { useState } from 'react';

export default function AIRecommendations() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-12 border-2 border-purple-200">
      <div className="text-center">
        <div className="inline-block mb-4">
          <span className="text-6xl">🚧</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <span>🤖</span>
          <span>AI-Powered Recommendations</span>
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-4">
            <p className="text-lg font-semibold text-yellow-800 mb-2">
              🔨 Feature In Progress
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're working on integrating advanced AI recommendations to help you discover 
              the perfect restaurants based on your preferences. This feature will understand 
              natural language queries like "I want spicy biryani under ₹200" and provide 
              personalized suggestions.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 mb-4">
              <strong>Coming Soon:</strong>
            </p>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Natural language understanding for food preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Personalized restaurant recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Budget-aware suggestions with specific dishes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Context-aware tips (best time to visit, what to order)</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>In the meantime, use the search and filter options below to find great restaurants! 👇</p>
          </div>
        </div>
      </div>
    </div>
  );
}
