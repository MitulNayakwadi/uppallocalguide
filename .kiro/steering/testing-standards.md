---
inclusion: always
---

# Testing Standards & Guidelines

## Testing Philosophy
- **Test behavior, not implementation**: Focus on what the code does, not how
- **Write tests first when possible**: TDD approach for critical features
- **Keep tests simple and readable**: Tests should be easy to understand
- **Test the happy path and edge cases**: Cover both success and failure scenarios
- **Mock external dependencies**: Isolate units under test

## Testing Stack

### Frontend Testing
- **Testing Framework**: Jest + React Testing Library
- **Component Testing**: @testing-library/react
- **User Interaction**: @testing-library/user-event
- **Mocking**: MSW (Mock Service Worker) for API mocking
- **Coverage**: Jest coverage reports

### Backend Testing
- **Testing Framework**: Jest + Supertest
- **API Testing**: Supertest for HTTP endpoint testing
- **Database Testing**: In-memory database or test database
- **Mocking**: Jest mocks for external services
- **Integration Testing**: Test complete request/response cycles

## Test Organization

### Frontend Test Structure
```
frontend/
├── __tests__/
│   ├── components/
│   │   ├── SearchBar.test.tsx
│   │   ├── RestaurantCard.test.tsx
│   │   └── RecommendationList.test.tsx
│   ├── pages/
│   │   ├── index.test.tsx
│   │   └── restaurants/[id].test.tsx
│   ├── hooks/
│   │   ├── useRestaurants.test.ts
│   │   └── useSearch.test.ts
│   └── utils/
│       ├── api.test.ts
│       └── helpers.test.ts
├── __mocks__/
│   ├── api.ts                    # Mock API responses
│   └── data.ts                   # Mock data
└── setupTests.ts                 # Test configuration
```

### Backend Test Structure
```
backend/
├── __tests__/
│   ├── routes/
│   │   ├── restaurants.test.js
│   │   ├── recommendations.test.js
│   │   └── search.test.js
│   ├── controllers/
│   │   ├── restaurantController.test.js
│   │   └── recommendationController.test.js
│   ├── services/
│   │   ├── dataService.test.js
│   │   └── searchService.test.js
│   └── utils/
│       ├── validators.test.js
│       └── helpers.test.js
├── __mocks__/
│   ├── database.js               # Mock database
│   └── testData.js               # Test fixtures
└── setupTests.js                 # Test configuration
```

## Testing Categories

### 1. Unit Tests
Test individual functions and components in isolation.

**Frontend Example**:
```javascript
// SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for food...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'biryani' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('biryani');
  });
});
```

**Backend Example**:
```javascript
// restaurantController.test.js
const request = require('supertest');
const app = require('../app');

describe('GET /api/v1/restaurants', () => {
  test('returns list of restaurants', async () => {
    const response = await request(app)
      .get('/api/v1/restaurants')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
```

### 2. Integration Tests
Test how different parts work together.

```javascript
// search.integration.test.js
describe('Search Integration', () => {
  test('search returns filtered restaurants', async () => {
    const response = await request(app)
      .get('/api/v1/search')
      .query({ q: 'biryani', area: 'uppal-market' })
      .expect(200);
    
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringContaining('biryani'),
          area: 'uppal-market'
        })
      ])
    );
  });
});
```

### 3. Component Tests
Test React components with user interactions.

```javascript
// RestaurantCard.test.tsx
import { render, screen } from '@testing-library/react';
import RestaurantCard from '../components/RestaurantCard';

const mockRestaurant = {
  id: 'rest_001',
  name: 'Test Restaurant',
  cuisine: ['telangana'],
  rating: { average: 4.2, count: 100 },
  pricing: { minPrice: 80, maxPrice: 200 }
};

describe('RestaurantCard', () => {
  test('displays restaurant information correctly', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getByText('₹80 - ₹200')).toBeInTheDocument();
  });
});
```

## Test Data Management

### Mock Data Structure
```javascript
// __mocks__/testData.js
export const mockRestaurants = [
  {
    id: 'rest_001',
    name: 'Uppal Biryani House',
    cuisine: ['telangana', 'indian'],
    area: 'uppal-market',
    rating: { average: 4.5, count: 200 },
    pricing: { minPrice: 100, maxPrice: 300 }
  },
  {
    id: 'rest_002',
    name: 'Street Food Corner',
    cuisine: ['street-food'],
    area: 'main-road',
    rating: { average: 4.0, count: 85 },
    pricing: { minPrice: 30, maxPrice: 100 }
  }
];

export const mockSearchResults = {
  success: true,
  data: mockRestaurants,
  pagination: {
    page: 1,
    limit: 20,
    total: 2,
    totalPages: 1
  }
};
```

### API Mocking with MSW
```javascript
// __mocks__/handlers.js
import { rest } from 'msw';
import { mockRestaurants, mockSearchResults } from './testData';

export const handlers = [
  rest.get('/api/v1/restaurants', (req, res, ctx) => {
    return res(ctx.json({
      success: true,
      data: mockRestaurants
    }));
  }),
  
  rest.get('/api/v1/search', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    const filteredResults = mockRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(query?.toLowerCase() || '')
    );
    
    return res(ctx.json({
      success: true,
      data: filteredResults
    }));
  })
];
```

## Test Coverage Requirements
- **Minimum coverage**: 80% for all code
- **Critical paths**: 95% coverage for core features
- **Components**: Test all props and user interactions
- **API endpoints**: Test all success and error scenarios
- **Utilities**: 100% coverage for helper functions

## Testing Commands
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## Continuous Integration
- Run tests on every pull request
- Require passing tests before merge
- Generate coverage reports
- Fail build if coverage drops below threshold

## Testing Best Practices

### Do's ✅
- Write descriptive test names
- Test one thing per test
- Use arrange-act-assert pattern
- Mock external dependencies
- Test error conditions
- Keep tests independent
- Use meaningful assertions

### Don'ts ❌
- Don't test implementation details
- Don't write overly complex tests
- Don't ignore failing tests
- Don't test third-party libraries
- Don't use real databases in unit tests
- Don't hardcode test data in tests

## Performance Testing
- **Load testing**: Test API endpoints under load
- **Response time**: Ensure API responses under 200ms
- **Memory usage**: Monitor memory leaks in long-running tests
- **Database queries**: Test query performance with large datasets

## Accessibility Testing
- **Screen reader compatibility**: Test with screen readers
- **Keyboard navigation**: Ensure all features work with keyboard
- **Color contrast**: Test color accessibility
- **ARIA labels**: Verify proper ARIA attributes