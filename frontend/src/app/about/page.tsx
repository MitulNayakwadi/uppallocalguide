export default function AboutPage() {
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
            <div className="flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="/restaurants" className="text-gray-700 hover:text-orange-600 transition-colors">Restaurants</a>
              <a href="/about" className="text-orange-600 font-semibold">About</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            About Uppal Kalan Street Food Guide
          </h1>
          <p className="text-xl text-gray-700">
            Your AI-powered companion for discovering authentic food experiences in Uppal Kalan
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We're on a mission to help residents and visitors discover the best food experiences in Uppal Kalan, Hyderabad. 
            From street-side samosas to traditional biryani, we make it easy to find your perfect meal based on your budget, 
            time, and preferences.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Built with local knowledge and powered by Kiro AI, we understand the unique food culture of Uppal Kalan - 
            from morning chai at the market to evening biryani on Main Road.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Smart Search</h3>
                <p className="text-gray-600 text-sm">Filter by budget, time, and cuisine to find exactly what you're craving</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Budget-Aware</h3>
                <p className="text-gray-600 text-sm">Find great food within your price range, from ₹20 street snacks to ₹500 meals</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Time-Based</h3>
                <p className="text-gray-600 text-sm">Get recommendations based on meal time - breakfast, lunch, or dinner</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🍽️</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Local Expertise</h3>
                <p className="text-gray-600 text-sm">Curated by locals who know the best spots in Uppal Kalan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Built With Kiro AI</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This project was built using Kiro AI for the AI for Bharat Week 5 challenge. Kiro helped us:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Understand local food culture and preferences</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Build a full-stack application with Next.js and Express</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Create intelligent recommendation algorithms</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span>Design a user-friendly interface with modern styling</span>
            </li>
          </ul>
        </div>

        {/* Local Context Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 About Uppal Kalan</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Uppal Kalan is a vibrant neighborhood in Hyderabad's eastern zone, known for its diverse food scene. 
            From traditional Telangana cuisine to modern food courts, the area offers something for everyone.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏪</div>
              <div className="font-semibold text-gray-900">12+ Restaurants</div>
              <div className="text-sm text-gray-600">Featured locations</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-semibold text-gray-900">₹20-500</div>
              <div className="text-sm text-gray-600">Price range</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🍛</div>
              <div className="font-semibold text-gray-900">10+ Cuisines</div>
              <div className="text-sm text-gray-600">Food varieties</div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💬 Get In Touch</h2>
          <p className="text-gray-700 mb-6">
            Have suggestions for restaurants we should add? Found an error? We'd love to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/YOUR_USERNAME/uppal-local-guide" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all"
            >
              View on GitHub
            </a>
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
