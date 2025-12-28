# Uppal Kalan Street Food Guide - Design Specification

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Data Layer    │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (Supabase)    │
│                 │    │                 │    │                 │
│ - React UI      │    │ - REST API      │    │ - PostgreSQL    │
│ - State Mgmt    │    │ - Business      │    │ - File Storage  │
│ - Routing       │    │   Logic         │    │ - JSON Data     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│  Kiro Context   │◄─────────────┘
                        │  (.kiro files)  │
                        │                 │
                        │ - product.md    │
                        │ - Local data    │
                        │ - AI guidance   │
                        └─────────────────┘
```

### Component Architecture

#### Frontend Components Hierarchy
```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── UserActions
│   ├── Main
│   │   ├── SearchSection
│   │   │   ├── SearchBar
│   │   │   ├── FilterPanel
│   │   │   └── QuickFilters
│   │   ├── ResultsSection
│   │   │   ├── RestaurantList
│   │   │   ├── RestaurantCard
│   │   │   └── Pagination
│   │   └── DetailSection
│   │       ├── RestaurantDetail
│   │       ├── MenuDisplay
│   │       ├── ReviewsSection
│   │       └── MapView
│   └── Footer
│       ├── Links
│       ├── Contact
│       └── Credits
```

## User Interface Design

### Design System

#### Color Palette
```css
/* Primary Colors - Inspired by Telangana culture */
--primary-saffron: #FF9933;      /* Warm, inviting */
--primary-deep-orange: #E67E22;  /* Food-focused */
--primary-red: #C0392B;          /* Spice accent */

/* Secondary Colors */
--secondary-green: #27AE60;      /* Fresh, healthy */
--secondary-blue: #3498DB;       /* Trust, reliability */
--secondary-purple: #9B59B6;     /* Premium feel */

/* Neutral Colors */
--neutral-dark: #2C3E50;         /* Text primary */
--neutral-medium: #7F8C8D;       /* Text secondary */
--neutral-light: #ECF0F1;        /* Background */
--neutral-white: #FFFFFF;        /* Cards, modals */

/* Status Colors */
--success-green: #2ECC71;        /* Open, available */
--warning-yellow: #F39C12;       /* Busy, moderate */
--error-red: #E74C3C;           /* Closed, unavailable */
--info-blue: #3498DB;           /* Information */
```

#### Typography
```css
/* Font Stack */
font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;

/* Heading Scales */
--text-4xl: 2.25rem;    /* Main headings */
--text-3xl: 1.875rem;   /* Section headings */
--text-2xl: 1.5rem;     /* Card titles */
--text-xl: 1.25rem;     /* Subheadings */
--text-lg: 1.125rem;    /* Large body */
--text-base: 1rem;      /* Body text */
--text-sm: 0.875rem;    /* Small text */
--text-xs: 0.75rem;     /* Captions */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Spacing System
```css
/* Spacing Scale (Tailwind-inspired) */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
```

### Page Layouts

#### Home Page Layout
```
┌─────────────────────────────────────────────────────┐
│                    Header                           │
│  [Logo] [Navigation] [Search] [User Actions]       │
├─────────────────────────────────────────────────────┤
│                 Hero Section                        │
│  "Discover Authentic Street Food in Uppal Kalan"   │
│  [Large Search Bar] [Quick Filter Buttons]         │
├─────────────────────────────────────────────────────┤
│               Featured Restaurants                  │
│  [Card] [Card] [Card] [Card]                       │
├─────────────────────────────────────────────────────┤
│                Popular Cuisines                     │
│  [Telangana] [Street Food] [North Indian] [More]   │
├─────────────────────────────────────────────────────┤
│                 Recent Reviews                      │
│  [Review Card] [Review Card] [Review Card]          │
├─────────────────────────────────────────────────────┤
│                    Footer                           │
│  [Links] [Contact] [Social] [Credits]              │
└─────────────────────────────────────────────────────┘
```

#### Search Results Layout
```
┌─────────────────────────────────────────────────────┐
│                    Header                           │
├─────────────────────────────────────────────────────┤
│  [Search Bar] [Active Filters] [Sort Options]      │
├─────────┬───────────────────────────────────────────┤
│ Filters │              Results                      │
│         │  ┌─────────────────────────────────────┐  │
│ Price   │  │         Restaurant Card             │  │
│ [●] <₹100│  │  [Image] [Name] [Rating] [Price]   │  │
│ [ ] ₹100-200│ │  [Cuisine] [Distance] [Status]    │  │
│ [ ] >₹200│  │  [Quick Actions: Call|Directions]   │  │
│         │  └─────────────────────────────────────┘  │
│ Cuisine │  ┌─────────────────────────────────────┐  │
│ [●] Telugu│ │         Restaurant Card             │  │
│ [ ] North │  │  [Image] [Name] [Rating] [Price]   │  │
│ [ ] Chinese│ │  [Cuisine] [Distance] [Status]    │  │
│         │  │  [Quick Actions: Call|Directions]   │  │
│ Area    │  └─────────────────────────────────────┘  │
│ [●] Market│  [More Results...]                     │
│ [ ] Main Rd│                                       │
├─────────┴───────────────────────────────────────────┤
│                    Footer                           │
└─────────────────────────────────────────────────────┘
```

#### Restaurant Detail Layout
```
┌─────────────────────────────────────────────────────┐
│                    Header                           │
├─────────────────────────────────────────────────────┤
│  [← Back] [Restaurant Name] [Share] [Favorite]      │
├─────────────────────────────────────────────────────┤
│                 Image Gallery                       │
│  [Main Image] [Thumbnail] [Thumbnail] [Thumbnail]   │
├─────────────────────────────────────────────────────┤
│ Restaurant Info │              Menu                 │
│                 │  ┌─────────────────────────────┐  │
│ ⭐ 4.2 (156)    │  │ Biryani Section             │  │
│ 💰 ₹100-300     │  │ • Chicken Biryani    ₹180  │  │
│ 📍 Uppal Market │  │ • Mutton Biryani     ₹220  │  │
│ 🕒 11AM-10PM    │  │ • Veg Biryani        ₹150  │  │
│ 📞 +91-98765... │  └─────────────────────────────┘  │
│                 │  ┌─────────────────────────────┐  │
│ [Call] [Direct] │  │ Starters Section            │  │
│                 │  │ • Chicken 65         ₹120  │  │
│ Specialties:    │  │ • Paneer Tikka       ₹100  │  │
│ • Authentic     │  │ • Veg Manchurian     ₹90   │  │
│ • Family-friendly│  └─────────────────────────────┘  │
│ • Parking       │                                   │
├─────────────────┴───────────────────────────────────┤
│                    Reviews                          │
│  [Review Card] [Review Card] [Review Card]          │
├─────────────────────────────────────────────────────┤
│                Similar Places                       │
│  [Card] [Card] [Card] [Card]                       │
└─────────────────────────────────────────────────────┘
```

### Component Specifications

#### SearchBar Component
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
  suggestions?: string[];
  loading?: boolean;
}

// Features:
// - Autocomplete with local restaurant names
// - Voice search button
// - Clear button when text is present
// - Loading state during search
// - Keyboard navigation for suggestions
```

#### RestaurantCard Component
```typescript
interface RestaurantCardProps {
  restaurant: Restaurant;
  onFavorite?: (id: string) => void;
  onCall?: (phone: string) => void;
  onDirections?: (address: string) => void;
  compact?: boolean;
}

// Features:
// - Image with fallback
// - Rating with star display
// - Price range indicator
// - Distance calculation
// - Open/closed status
// - Quick action buttons
// - Favorite toggle
```

#### FilterPanel Component
```typescript
interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

// Features:
// - Collapsible sections
// - Multi-select checkboxes
// - Price range slider
// - Distance radius selector
// - Active filter count
// - Reset all functionality
```

## Data Models

### Restaurant Data Model
```typescript
interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  category: 'restaurant' | 'street-vendor' | 'food-court';
  
  // Location
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  
  // Contact
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  
  // Pricing
  pricing: {
    range: 'budget' | 'mid-range' | 'premium';
    minPrice: number;
    maxPrice: number;
    currency: 'INR';
  };
  
  // Operations
  timings: {
    [day: string]: {
      open: string;
      close: string;
    } | null;
  };
  
  // Features
  features: {
    dineIn: boolean;
    takeaway: boolean;
    delivery: boolean;
    parking: boolean;
    ac: boolean;
    wifi: boolean;
    familyFriendly: boolean;
    wheelchairAccessible: boolean;
  };
  
  // Menu & Specialties
  specialties: string[];
  menu?: MenuItem[];
  
  // Dietary Options
  dietaryOptions: {
    vegetarian: boolean;
    vegan: boolean;
    jain: boolean;
    halal: boolean;
    glutenFree: boolean;
  };
  
  // Ratings & Reviews
  rating: {
    average: number;
    count: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  
  // Busy Patterns
  busyHours: {
    day: string;
    hours: string[];
  }[];
  
  // Media
  images: string[];
  
  // Metadata
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Search & Filter Models
```typescript
interface SearchFilters {
  query?: string;
  cuisine?: string[];
  area?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  features?: string[];
  dietaryOptions?: string[];
  openNow?: boolean;
  distance?: number;
}

interface SearchResult {
  restaurants: Restaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: SearchFilters;
  suggestions?: string[];
}
```

## API Design

### Endpoint Structure
```
GET    /api/v1/restaurants
GET    /api/v1/restaurants/:id
GET    /api/v1/restaurants/search
GET    /api/v1/recommendations
GET    /api/v1/areas
GET    /api/v1/cuisines
POST   /api/v1/feedback
```

### Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
  timestamp: string;
}
```

## State Management

### Frontend State Structure
```typescript
interface AppState {
  // Search State
  search: {
    query: string;
    filters: SearchFilters;
    results: Restaurant[];
    loading: boolean;
    error: string | null;
    suggestions: string[];
  };
  
  // Restaurant State
  restaurants: {
    featured: Restaurant[];
    recent: Restaurant[];
    favorites: string[];
    current: Restaurant | null;
  };
  
  // UI State
  ui: {
    sidebarOpen: boolean;
    filterPanelOpen: boolean;
    currentView: 'list' | 'grid' | 'map';
    theme: 'light' | 'dark';
  };
  
  // User State (if needed)
  user: {
    preferences: UserPreferences;
    location: Coordinates | null;
  };
}
```

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **Caching**: React Query for API response caching
- **Bundle Analysis**: Regular bundle size monitoring
- **Critical CSS**: Inline critical styles for faster rendering

### Backend Optimizations
- **Database Indexing**: Proper indexes on search fields
- **Response Caching**: Redis for frequently accessed data
- **Query Optimization**: Efficient database queries
- **Compression**: Gzip compression for API responses
- **Rate Limiting**: Prevent API abuse

### Data Loading Strategies
- **Pagination**: Limit results per page (20 items)
- **Infinite Scroll**: Progressive loading for better UX
- **Prefetching**: Preload likely next pages
- **Skeleton Loading**: Show loading placeholders
- **Error Boundaries**: Graceful error handling

## Accessibility Design

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Management**: Clear focus indicators
- **Alternative Text**: Descriptive alt text for images

### Inclusive Design Features
- **Font Size Options**: User-adjustable text size
- **High Contrast Mode**: Alternative color scheme
- **Reduced Motion**: Respect prefers-reduced-motion
- **Language Support**: Multi-language interface
- **Simple Language**: Clear, concise content

## Security Considerations

### Frontend Security
- **Input Sanitization**: Prevent XSS attacks
- **HTTPS Only**: Secure data transmission
- **Content Security Policy**: Restrict resource loading
- **Dependency Scanning**: Regular security audits
- **Environment Variables**: Secure API key management

### Backend Security
- **Input Validation**: Server-side validation
- **Rate Limiting**: Prevent abuse and DoS
- **CORS Configuration**: Restrict cross-origin requests
- **Error Handling**: Don't expose sensitive information
- **Logging**: Security event monitoring