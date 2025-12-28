# 🍲 Uppal Kalan Street Food Guide

**AI for Bharat Week 5 Challenge Submission**

An AI-powered local food guide that understands Uppal Kalan's street food culture and helps users discover authentic dining experiences using Kiro's context-aware capabilities.

## 🎯 Challenge Overview

**Theme**: Build a tool that understands your specific city or culture  
**Location**: Uppal Kalan, Telangana, India  
**AI Integration**: Kiro with custom local context files  

## ✨ What Makes This Special

- **Local Intelligence**: `.kiro/steering/product.md` teaches Kiro about Uppal Kalan's food culture
- **Smart Recommendations**: AI understands budget constraints, timing, and local preferences  
- **Authentic Data**: 30+ verified local restaurants and street food vendors
- **Cultural Context**: Explains Telangana cuisine and local dining patterns
- **Budget-Aware**: Recommendations aligned with local economic patterns

## 🚀 Features

### Core Functionality
- **Smart Search**: Find food by budget, cuisine, time of day, and location
- **Personalized Recommendations**: AI suggests restaurants based on your preferences
- **Local Vendor Directory**: Comprehensive list of Uppal Kalan eateries
- **Cultural Guide**: Learn about authentic Telangana dishes and ingredients
- **Peak Hours Intelligence**: Know when restaurants are busy or quiet

### User Experience
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Quick Filters**: One-click access to popular searches
- **Detailed Restaurant Pages**: Complete information including menus and reviews
- **Favorites System**: Save your preferred restaurants
- **Real-time Status**: See which restaurants are currently open

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for lightweight state handling
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for consistent iconography

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript support
- **Database**: Supabase (PostgreSQL) for structured data
- **API Style**: RESTful with JSON responses
- **Validation**: Input validation and error handling

### AI Integration
- **Context System**: Kiro steering files for local knowledge
- **Decision Logic**: AI-informed recommendation algorithms
- **Cultural Data**: Structured local food culture information

## 📂 Project Structure

```
uppal-local-guide/
├── .kiro/                          # 🎯 Kiro AI Context (CRITICAL)
│   ├── steering/
│   │   ├── product.md              # Local Uppal Kalan knowledge
│   │   ├── tech.md                 # Technology standards
│   │   ├── structure.md            # Project organization
│   │   ├── api-standards.md        # API conventions
│   │   └── testing-standards.md    # Testing guidelines
│   ├── hooks/                      # Automation hooks
│   └── specs/                      # Project specifications
├── frontend/                       # Next.js application
│   ├── components/                 # React components
│   ├── pages/                      # Next.js pages
│   ├── styles/                     # CSS and styling
│   └── utils/                      # Helper functions
├── backend/                        # Express.js API
│   ├── routes/                     # API endpoints
│   ├── controllers/                # Business logic
│   ├── models/                     # Data models
│   └── services/                   # Core services
├── data/                          # Local restaurant data
│   ├── restaurants.json           # Restaurant database
│   ├── cuisines.json              # Cuisine information
│   └── areas.json                 # Location data
└── docs/                          # Documentation
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/uppal-local-guide.git
   cd uppal-local-guide
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This runs both frontend (http://localhost:3000) and backend (http://localhost:5000) concurrently.

### Individual Services

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

## 🧠 How Kiro Powers Local Intelligence

### The Secret: `.kiro/steering/product.md`

This file is where the magic happens. It contains structured knowledge about Uppal Kalan that Kiro uses to make intelligent recommendations:

```markdown
### Local Context for Kiro
- Geography: Uppal Kalan's location, landmarks, transportation
- Food Culture: Telangana cuisine, street food patterns, pricing
- Dining Patterns: Peak hours, crowd behavior, seasonal changes
- Target Users: Office workers, students, families, tourists
- Budget Profiles: Local economic patterns and price expectations
```

### How Kiro Accelerated Development

1. **Context Understanding**: Instead of hardcoding local knowledge, Kiro learned from structured documentation
2. **Smart Recommendations**: AI automatically considers local factors like budget patterns and cultural preferences
3. **Cultural Authenticity**: Recommendations reflect genuine local food culture, not generic suggestions
4. **Rapid Iteration**: Changes to local context immediately improve recommendation quality

**Time Saved**: What normally takes weeks of manual research and hardcoding was reduced to structured documentation that both humans and AI can understand.

## 📊 Local Data Coverage

### Restaurant Categories
- **Street Food Vendors**: 15+ authentic local vendors
- **Traditional Restaurants**: 10+ established eateries  
- **Modern Outlets**: 8+ contemporary dining options
- **Specialty Shops**: 5+ unique food experiences

### Cuisine Coverage
- **Telangana Specialties**: Biryani, Haleem, Mirchi ka Salan
- **Street Food**: Samosas, Dosas, Chaat varieties
- **Regional**: North Indian, South Indian, Chinese
- **Beverages**: Traditional chai, fresh juices, local drinks

### Price Ranges
- **Ultra Budget** (₹30-50): Street snacks, basic meals
- **Budget** (₹50-100): Complete meals, popular dishes  
- **Mid-Range** (₹100-200): Restaurant dining, specialty items
- **Premium** (₹200+): Fine dining, special occasions

## 🎬 Demo & Screenshots

### Live Demo
🔗 **[Try the Live Application](YOUR_DEPLOYMENT_URL)**

### Video Walkthrough
📹 **[Watch Demo Video](YOUR_YOUTUBE_LINK)** (2 minutes)

### Screenshots

**Home Page - Search Interface**
![Home Page](screenshots/home-page.png)

**Search Results - Restaurant Cards**  
![Search Results](screenshots/search-results.png)

**Restaurant Detail - Complete Information**
![Restaurant Detail](screenshots/restaurant-detail.png)

**Mobile Responsive - Touch-Friendly**
![Mobile View](screenshots/mobile-view.png)

## 🔧 API Documentation

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://your-api-url.com/api/v1
```

### Key Endpoints

**Get Recommendations**
```http
POST /api/v1/recommendations
Content-Type: application/json

{
  "budget": 100,
  "time": "lunch", 
  "cuisine": "telangana"
}
```

**Search Restaurants**
```http
GET /api/v1/restaurants/search?q=biryani&area=uppal-market&maxPrice=200
```

**Restaurant Details**
```http
GET /api/v1/restaurants/:id
```

For complete API documentation, see [API Guide](docs/api/README.md).

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && npm test

# All tests
npm test
```

### Test Coverage
- Unit tests for core components
- API endpoint testing
- Integration tests for search functionality
- Mobile responsiveness testing

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Render)
```bash
# Push to main branch triggers automatic deployment
git push origin main
```

### Environment Setup
1. Set production environment variables
2. Configure database connections
3. Update CORS settings for production domains
4. Test all endpoints in production

## 📝 Blog Post

Read the complete technical writeup on AWS Builder Center:

🔗 **[Building Uppal Kalan Street Food Guide with Kiro](YOUR_BLOG_URL)**

The blog post covers:
- Challenge approach and solution design
- Technical implementation details
- How Kiro's context system works
- Code examples and architecture
- Lessons learned and future improvements

## 🤝 Contributing

Want to add more restaurants or improve the guide?

1. **Add Restaurant Data**: Update `data/restaurants.json`
2. **Enhance Context**: Improve `.kiro/steering/product.md`
3. **Fix Issues**: Check GitHub issues for bugs
4. **Suggest Features**: Open an issue with your idea

### Local Development
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AI for Bharat** for organizing this amazing challenge
- **Kiro** for providing the AI context system that made local intelligence possible
- **Local Vendors** in Uppal Kalan for inspiring authentic food experiences
- **Community** for testing and feedback

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/YOUR_USERNAME/uppal-local-guide/issues)
- **Email**: your.email@example.com
- **Blog**: [Technical writeup](YOUR_BLOG_URL)
- **Demo**: [Live application](YOUR_DEPLOYMENT_URL)

---

**Built with ❤️ for Uppal Kalan food lovers**

*This project demonstrates how AI can understand and serve local communities by learning from structured cultural context, making technology more relevant and useful for specific places and people.*