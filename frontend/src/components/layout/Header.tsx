'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Uppal Food Guide</h1>
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Uppal Kalan, Telangana
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/restaurants" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Restaurants
            </Link>
            <Link 
              href="/cuisines" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Cuisines
            </Link>
            <Link 
              href="/areas" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Areas
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}