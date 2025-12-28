---
inclusion: always
---

# Project Structure & Organization

## Root Directory Layout
```
uppal-local-guide/
├── .kiro/                          # Kiro configuration (NEVER gitignore)
│   ├── steering/                   # Context files for AI
│   ├── hooks/                      # Automation hooks
│   └── specs/                      # Project specifications
├── frontend/                       # Next.js application
├── backend/                        # Express.js API server
├── data/                          # Local data files
├── docs/                          # Project documentation
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── README.md                      # Project overview
└── package.json                   # Root package configuration
```

## Frontend Structure (Next.js)
```
frontend/
├── components/
│   ├── ui/                        # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── search/                    # Search-related components
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   └── SearchResults.tsx
│   ├── restaurant/                # Restaurant components
│   │   ├── RestaurantCard.tsx
│   │   ├── RestaurantDetail.tsx
│   │   └── RestaurantList.tsx
│   └── recommendation/            # Recommendation components
│       ├── RecommendationCard.tsx
│       └── RecommendationList.tsx
├── pages/
│   ├── api/                       # API routes (if using Next.js API)
│   ├── restaurants/
│   │   └── [id].tsx              # Dynamic restaurant pages
│   ├── index.tsx                  # Home page
│   ├── about.tsx                  # About the guide
│   └── _app.tsx                   # App configuration
├── styles/
│   ├── globals.css               # Global styles
│   └── components.css            # Component-specific styles
├── utils/
│   ├── api.ts                    # API client functions
│   ├── constants.ts              # App constants
│   └── helpers.ts                # Utility functions
├── hooks/
│   ├── useRestaurants.ts         # Restaurant data hook
│   ├── useSearch.ts              # Search functionality hook
│   └── useRecommendations.ts     # Recommendations hook
├── types/
│   ├── restaurant.ts             # Restaurant type definitions
│   ├── search.ts                 # Search type definitions
│   └── api.ts                    # API response types
└── public/
    ├── images/                   # Static images
    └── icons/                    # Icon files
```

## Backend Structure (Express.js)
```
backend/
├── routes/
│   ├── restaurants.js            # Restaurant CRUD operations
│   ├── recommendations.js        # Recommendation engine
│   ├── search.js                 # Search functionality
│   └── health.js                 # Health check endpoint
├── controllers/
│   ├── restaurantController.js   # Restaurant business logic
│   ├── recommendationController.js # Recommendation logic
│   └── searchController.js       # Search logic
├── models/
│   ├── Restaurant.js             # Restaurant data model
│   ├── Review.js                 # Review data model
│   └── User.js                   # User data model (if needed)
├── middleware/
│   ├── auth.js                   # Authentication middleware
│   ├── validation.js             # Request validation
│   ├── errorHandler.js           # Error handling
│   └── cors.js                   # CORS configuration
├── services/
│   ├── dataService.js            # Data access layer
│   ├── recommendationService.js  # Recommendation algorithms
│   └── searchService.js          # Search algorithms
├── utils/
│   ├── logger.js                 # Logging utility
│   ├── validators.js             # Input validators
│   └── helpers.js                # General helpers
├── config/
│   ├── database.js               # Database configuration
│   └── app.js                    # App configuration
└── server.js                     # Main server file
```

## Data Directory Structure
```
data/
├── restaurants/
│   ├── uppal-market.json         # Uppal market vendors
│   ├── main-road.json            # Main road restaurants
│   ├── ikea-area.json            # IKEA vicinity food
│   └── ramanthapur.json          # Ramanthapur eateries
├── cuisines/
│   ├── telangana.json            # Telangana cuisine info
│   ├── street-food.json         # Street food categories
│   └── beverages.json            # Local drinks & beverages
├── locations/
│   ├── landmarks.json            # Local landmarks
│   └── areas.json                # Area information
└── meta/
    ├── categories.json           # Food categories
    ├── price-ranges.json        # Price range definitions
    └── timings.json              # Common timing patterns
```

## Component Naming Conventions
- **PascalCase** for component files: `RestaurantCard.tsx`
- **camelCase** for functions and variables: `getRestaurants`
- **kebab-case** for CSS classes: `restaurant-card`
- **UPPER_SNAKE_CASE** for constants: `API_BASE_URL`

## File Organization Principles
1. **Feature-based grouping**: Related components in same directory
2. **Separation of concerns**: UI, logic, and data in separate layers
3. **Reusability**: Common components in shared directories
4. **Type safety**: TypeScript interfaces in dedicated type files
5. **Environment separation**: Different configs for dev/prod

## Import/Export Standards
- Use named exports for components and utilities
- Use default exports only for pages and main modules
- Organize imports: external libraries first, then internal modules
- Use absolute imports with path mapping where possible

## Documentation Structure
```
docs/
├── api/                          # API documentation
│   ├── endpoints.md              # Endpoint specifications
│   └── examples.md               # Request/response examples
├── components/                   # Component documentation
│   └── component-guide.md        # Usage guidelines
├── deployment/                   # Deployment guides
│   ├── frontend.md               # Frontend deployment
│   └── backend.md                # Backend deployment
└── development/                  # Development guides
    ├── setup.md                  # Local setup instructions
    └── contributing.md           # Contribution guidelines
```