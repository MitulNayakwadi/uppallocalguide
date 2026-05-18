# 🍲 Uppal Kalan Street Food Guide

> AI-powered local food discovery platform for Uppal Kalan, Hyderabad - Built with Kiro AI for AI for Bharat Week 5

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?logo=express)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple?logo=google)](https://ai.google.dev/)

## ✨ Features

### 🤖 AI-Powered Recommendations (Coming Soon)
- **Natural Language Understanding**: Ask in plain English (e.g., "I want spicy biryani under ₹200")
- **Personalized Suggestions**: Get 2-3 tailored restaurant recommendations
- **Context-Aware**: Understands budget, cuisine, dietary needs, and timing
- **In Development**: This feature is currently being built

### 🔍 Smart Search & Filtering
- Real-time restaurant search
- Filter by budget, time of day, and cuisine type
- Interactive budget slider with visual feedback
- Quick search presets for common scenarios

### 🗺️ Location Intelligence
- Google Maps integration showing Uppal, Hyderabad
- Interactive restaurant markers
- Area-based recommendations
- Local context awareness

### 📊 Rich Restaurant Data
- 5+ featured restaurants with complete details
- Ratings, reviews, and pricing information
- Specialties and popular dishes
- Operating hours and busy times
- Dietary options (vegetarian, vegan, halal, etc.)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google Maps API key (for maps)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/uppal-local-guide.git
cd uppal-local-guide
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Install and setup Ollama**

3. **Configure environment variables**

Create `.env` files with your configuration:

**Backend** (`backend/.env`):
```env
PORT=5001
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_APP_NAME=Uppal Kalan Street Food Guide
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Start the development servers**
```bash
npm run dev
```

This starts both:
- Backend API: http://localhost:5001
- Frontend: http://localhost:3000

## 🔑 Configuration

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Add to `frontend/.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

**⚠️ Security Note**: Never commit `.env` or `.env.local` files to GitHub. Use `.env.example` as a template.

## 📁 Project Structure

```
uppal-local-guide/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                # Next.js app directory
│   │   │   ├── page.tsx        # Main home page
│   │   │   └── layout.tsx      # Root layout
│   │   ├── components/         # React components
│   │   │   ├── recommendation/ # AI recommendation components
│   │   │   ├── restaurant/     # Restaurant display components
│   │   │   └── search/         # Search components
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   └── package.json
│
├── backend/                     # Express.js API server
│   ├── controllers/            # Request handlers
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── utils/                  # Helper functions
│   ├── server.js               # Main server file
│   └── package.json
│
├── data/                        # Restaurant data (JSON)
│   ├── restaurants.json        # Restaurant database
│   ├── cuisines.json          # Cuisine categories
│   └── areas.json             # Area information
│
├── .kiro/                       # Kiro AI context files
│   └── steering/               # AI guidance documents
│       ├── product.md          # Product context
│       ├── tech.md             # Technical standards
│       ├── structure.md        # Project structure
│       ├── api-standards.md    # API conventions
│       └── testing-standards.md # Testing guidelines
│
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── package.json                # Root package config
└── README.md                   # This file
```

## 🎯 Usage Examples

### AI Recommendations

**Budget-Conscious Query:**
```
"I'm a student looking for filling food under ₹100"
```

**Cuisine-Specific:**
```
"Best biryani in Uppal? I love spicy food"
```

**Family Dining:**
```
"Family dinner spot with variety, need parking and AC"
```

**Time-Based:**
```
"Quick breakfast near Uppal Market before 9 AM"
```

### Search & Filter

1. **Budget Slider**: Adjust from ₹30 to ₹500
2. **Time Selection**: Choose breakfast, lunch, evening, or night
3. **Cuisine Filter**: Select from Telangana, Street Food, South Indian, etc.
4. **Quick Searches**: One-click presets for common scenarios

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.1 with React 19.2
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Maps**: Google Maps JavaScript API

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Data Storage**: JSON files
- **Middleware**: CORS, Helmet, Compression
- **Rate Limiting**: express-rate-limit

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Version Control**: Git

## 📡 API Endpoints

### Restaurants
```
GET    /api/v1/restaurants              # Get all restaurants
GET    /api/v1/restaurants/:id          # Get specific restaurant
GET    /api/v1/restaurants/search       # Search restaurants
```

### Recommendations
```
POST   /api/v1/recommendations          # Get personalized recommendations
GET    /api/v1/recommendations/popular  # Get popular recommendations
```

### Search & Filters
```
GET    /api/v1/search                   # General search
GET    /api/v1/areas                    # Get all areas
GET    /api/v1/cuisines                 # Get cuisine types
```

### Health Check
```
GET    /health                          # API health status
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test

# Run with coverage
npm run test:coverage
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
4. Add environment variables in Vercel dashboard
5. Deploy automatically

### Backend (Railway/Render)
1. Push code to GitHub
2. Create new project in [Railway](https://railway.app) or [Render](https://render.com)
3. Connect GitHub repository
4. Set root directory: `backend`
5. Add environment variables
6. Deploy

### Environment Variables for Production
Update these in your deployment platform:
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key
- `PORT`: Backend server port (usually 5001)
- `NODE_ENV`: Set to `production`

## 🤝 Contributing

This project was built for AI for Bharat Week 5 challenge. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **AI for Bharat**: For organizing the challenge
- **Kiro AI**: For providing the AI development platform
- **Google Gemini**: For powering intelligent recommendations
- **Uppal Kalan Community**: For inspiring this local food guide

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the [documentation](./docs)
- Review the [API standards](./.kiro/steering/api-standards.md)

## 🎉 Built With Kiro

This project showcases Kiro AI's capabilities in:
- Understanding local context and culture
- Building full-stack applications
- Integrating multiple APIs
- Creating intelligent recommendation systems
- Following best practices and standards

---

**Made with ❤️ for Uppal Kalan food lovers**

© 2024 Uppal Food Guide. Built for AI for Bharat Week 5.
