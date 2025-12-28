'use client';

import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Uppal Food Guide</h3>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered local food guide for Uppal Kalan, Telangana. 
              Discover authentic street food and restaurants with local intelligence.
            </p>
            <p className="text-xs text-gray-500">
              Built with Kiro AI for AI for Bharat Week 5
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-400 hover:text-white transition-colors">
                  All Restaurants
                </Link>
              </li>
              <li>
                <Link href="/cuisines" className="text-gray-400 hover:text-white transition-colors">
                  Cuisines
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-gray-400 hover:text-white transition-colors">
                  Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Areas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/areas/uppal-market" className="text-gray-400 hover:text-white transition-colors">
                  Uppal Market
                </Link>
              </li>
              <li>
                <Link href="/areas/main-road" className="text-gray-400 hover:text-white transition-colors">
                  Main Road
                </Link>
              </li>
              <li>
                <Link href="/areas/ikea-area" className="text-gray-400 hover:text-white transition-colors">
                  IKEA Area
                </Link>
              </li>
              <li>
                <Link href="/areas/ramanthapur" className="text-gray-400 hover:text-white transition-colors">
                  Ramanthapur
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Project</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/YOUR_USERNAME/uppal-local-guide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="YOUR_BLOG_URL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Technical Blog
                </a>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About This Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            <p className="flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for Uppal Kalan food lovers
            </p>
          </div>
          <div className="text-sm text-gray-400">
            <p>© 2024 Uppal Food Guide. Built for AI for Bharat Week 5.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}