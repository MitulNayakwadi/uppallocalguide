---
inclusion: always
---

# API Standards & Conventions

## Base URL Structure
```
Development: http://localhost:3001/api/v1
Production: https://uppal-guide-api.railway.app/api/v1
```

## Endpoint Naming Conventions
- Use **plural nouns** for resources: `/restaurants`, `/recommendations`
- Use **kebab-case** for multi-word endpoints: `/food-categories`
- Use **RESTful patterns**: GET, POST, PUT, DELETE
- Include **version prefix**: `/api/v1/`

## Core Endpoints

### Restaurant Endpoints
```
GET    /api/v1/restaurants              # Get all restaurants
GET    /api/v1/restaurants/:id          # Get specific restaurant
GET    /api/v1/restaurants/search       # Search restaurants
POST   /api/v1/restaurants              # Add new restaurant (admin)
PUT    /api/v1/restaurants/:id          # Update restaurant (admin)
DELETE /api/v1/restaurants/:id          # Delete restaurant (admin)
```

### Recommendation Endpoints
```
GET    /api/v1/recommendations          # Get personalized recommendations
POST   /api/v1/recommendations/feedback # Submit recommendation feedback
GET    /api/v1/recommendations/popular  # Get popular recommendations
```

### Search & Filter Endpoints
```
GET    /api/v1/search                   # General search
GET    /api/v1/search/suggestions       # Search suggestions/autocomplete
GET    /api/v1/filters                  # Available filter options
```

### Location & Context Endpoints
```
GET    /api/v1/areas                    # Get all areas in Uppal Kalan
GET    /api/v1/areas/:area/restaurants  # Restaurants in specific area
GET    /api/v1/cuisines                 # Available cuisine types
GET    /api/v1/food-categories          # Food categories
```

## Request/Response Format

### Standard Response Structure
```json
{
  "success": true,
  "data": {
    // Actual response data
  },
  "message": "Success message",
  "timestamp": "2024-01-15T10:30:00Z",
  "pagination": {  // Only for paginated responses
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": {
    "code": "RESTAURANT_NOT_FOUND",
    "message": "Restaurant with ID 123 not found",
    "details": "The requested restaurant does not exist in our database"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Query Parameters

### Search Parameters
```
?q=biryani                    # Search query
?cuisine=telangana           # Filter by cuisine
?area=uppal-market           # Filter by area
?minPrice=50                 # Minimum price filter
?maxPrice=200                # Maximum price filter
?rating=4                    # Minimum rating
?openNow=true                # Currently open restaurants
?vegetarian=true             # Vegetarian options only
```

### Pagination Parameters
```
?page=1                      # Page number (default: 1)
?limit=20                    # Items per page (default: 20, max: 100)
?sort=rating                 # Sort field
?order=desc                  # Sort order (asc/desc)
```

## Restaurant Data Model
```json
{
  "id": "rest_001",
  "name": "Uppal Market Biryani Corner",
  "description": "Authentic Hyderabadi biryani served fresh daily",
  "cuisine": ["telangana", "indian"],
  "category": "restaurant",
  "area": "uppal-market",
  "address": {
    "street": "Main Market Road",
    "area": "Uppal Market",
    "city": "Hyderabad",
    "state": "Telangana",
    "pincode": "500039",
    "coordinates": {
      "lat": 17.4065,
      "lng": 78.5691
    }
  },
  "contact": {
    "phone": "+91-9876543210",
    "whatsapp": "+91-9876543210"
  },
  "pricing": {
    "range": "budget",
    "minPrice": 80,
    "maxPrice": 250,
    "currency": "INR"
  },
  "timings": {
    "monday": { "open": "11:00", "close": "22:00" },
    "tuesday": { "open": "11:00", "close": "22:00" },
    "wednesday": { "open": "11:00", "close": "22:00" },
    "thursday": { "open": "11:00", "close": "22:00" },
    "friday": { "open": "11:00", "close": "22:00" },
    "saturday": { "open": "11:00", "close": "23:00" },
    "sunday": { "open": "11:00", "close": "23:00" }
  },
  "features": {
    "dineIn": true,
    "takeaway": true,
    "delivery": false,
    "parking": true,
    "ac": false,
    "wifi": false,
    "familyFriendly": true,
    "wheelchairAccessible": false
  },
  "specialties": [
    "Chicken Biryani",
    "Mutton Biryani",
    "Vegetable Biryani",
    "Raita",
    "Shorba"
  ],
  "dietaryOptions": {
    "vegetarian": true,
    "vegan": false,
    "jain": true,
    "halal": true
  },
  "rating": {
    "average": 4.2,
    "count": 156,
    "breakdown": {
      "5": 45,
      "4": 78,
      "3": 25,
      "2": 6,
      "1": 2
    }
  },
  "busyHours": [
    { "day": "monday", "hours": ["13:00-14:00", "20:00-21:00"] },
    { "day": "sunday", "hours": ["12:00-15:00", "19:00-22:00"] }
  ],
  "images": [
    "/images/restaurants/rest_001_1.jpg",
    "/images/restaurants/rest_001_2.jpg"
  ],
  "tags": ["biryani", "authentic", "budget-friendly", "local-favorite"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## HTTP Status Codes
- **200 OK**: Successful GET, PUT requests
- **201 Created**: Successful POST requests
- **204 No Content**: Successful DELETE requests
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server errors

## Rate Limiting
- **General endpoints**: 100 requests per minute per IP
- **Search endpoints**: 50 requests per minute per IP
- **Admin endpoints**: 20 requests per minute per authenticated user

## Caching Strategy
- **Restaurant data**: Cache for 1 hour
- **Search results**: Cache for 15 minutes
- **Static data** (cuisines, areas): Cache for 24 hours
- **Recommendations**: No caching (personalized)

## Error Codes
```
RESTAURANT_NOT_FOUND     # Restaurant doesn't exist
INVALID_SEARCH_QUERY     # Search query is malformed
AREA_NOT_SUPPORTED       # Area not in Uppal Kalan
INVALID_PRICE_RANGE      # Price range parameters invalid
RATING_OUT_OF_RANGE      # Rating must be 1-5
MISSING_REQUIRED_FIELD   # Required field missing in request
VALIDATION_ERROR         # Input validation failed
RATE_LIMIT_EXCEEDED      # Too many requests
INTERNAL_ERROR           # Server error
```

## Authentication (Future Enhancement)
```
Authorization: Bearer <jwt_token>

# For admin endpoints:
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/profile
```

## API Documentation
- Use **OpenAPI 3.0** specification
- Generate docs with **Swagger UI**
- Include **example requests/responses**
- Document **error scenarios**
- Provide **Postman collection** for testing