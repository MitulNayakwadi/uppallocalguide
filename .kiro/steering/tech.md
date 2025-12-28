---
inclusion: always
---

# Technology Stack & Standards

## Frontend Stack
- **Framework**: Next.js 14+ with React 18+
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for lightweight state management
- **HTTP Client**: Axios for API calls
- **Icons**: Lucide React for consistent iconography
- **Maps**: Google Maps API for location services

## Backend Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: Supabase (PostgreSQL) for structured data
- **Authentication**: Supabase Auth (if user features needed)
- **File Storage**: Local JSON files for restaurant data
- **API Documentation**: OpenAPI/Swagger for endpoint documentation

## Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Type Safety**: TypeScript throughout
- **Environment**: dotenv for configuration
- **CORS**: cors middleware for cross-origin requests

## Deployment Strategy
- **Frontend**: Vercel (seamless Next.js deployment)
- **Backend**: Railway or Render for Express API
- **Database**: Supabase cloud (managed PostgreSQL)
- **Domain**: Custom domain if available

## API Design Principles
- RESTful endpoints with clear resource naming
- Consistent JSON response format
- Proper HTTP status codes
- Error handling with descriptive messages
- Request validation and sanitization

## Performance Considerations
- Image optimization with Next.js Image component
- API response caching where appropriate
- Lazy loading for restaurant lists
- Debounced search to reduce API calls
- Mobile-first responsive design

## Security Standards
- Environment variables for sensitive data
- Input validation and sanitization
- CORS configuration for allowed origins
- Rate limiting for API endpoints
- No sensitive data in client-side code

## Code Organization
```
frontend/
├── components/     # Reusable UI components
├── pages/         # Next.js pages and API routes
├── styles/        # Global styles and Tailwind config
├── utils/         # Helper functions and constants
├── hooks/         # Custom React hooks
└── types/         # TypeScript type definitions

backend/
├── routes/        # Express route handlers
├── controllers/   # Business logic
├── models/        # Data models and schemas
├── middleware/    # Custom middleware functions
├── utils/         # Helper functions
└── types/         # TypeScript interfaces
```

## Data Flow
1. User interacts with React components
2. Components call custom hooks for data fetching
3. Hooks make API calls to Express backend
4. Backend processes requests, queries data
5. Structured JSON responses returned to frontend
6. UI updates with new data using state management