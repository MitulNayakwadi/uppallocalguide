const dataService = require('../services/dataService');

class SearchController {
  // GET /api/v1/search
  async searchRestaurants(req, res) {
    try {
      const filters = req.query;
      
      // Validate search query
      if (!filters.q && !filters.cuisine && !filters.area && !filters.minPrice && !filters.maxPrice) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_SEARCH_CRITERIA',
            message: 'At least one search parameter is required',
            availableFilters: [
              'q (search query)',
              'cuisine (cuisine type)',
              'area (location area)',
              'minPrice, maxPrice (price range)',
              'rating (minimum rating)',
              'vegetarian, vegan, halal (dietary options)',
              'openNow (currently open)'
            ]
          },
          timestamp: new Date().toISOString()
        });
      }

      const results = dataService.searchRestaurants(filters);
      
      // Pagination
      const page = parseInt(filters.page) || 1;
      const limit = parseInt(filters.limit) || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = results.slice(startIndex, endIndex);

      // Sort results
      const sortBy = filters.sort || 'relevance';
      this.sortResults(paginatedResults, sortBy, filters.q);

      res.json({
        success: true,
        data: paginatedResults,
        searchInfo: {
          query: filters.q || '',
          filters: this.getActiveFilters(filters),
          totalResults: results.length,
          searchTime: new Date().toISOString()
        },
        pagination: {
          page,
          limit,
          total: results.length,
          totalPages: Math.ceil(results.length / limit)
        },
        message: results.length > 0 
          ? `Found ${results.length} restaurants matching your search`
          : 'No restaurants found matching your criteria',
        suggestions: results.length === 0 ? this.getSearchSuggestions(filters) : null,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'SEARCH_ERROR',
          message: 'Failed to search restaurants',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/search/suggestions
  async getSearchSuggestions(req, res) {
    try {
      const { q } = req.query;

      if (!q || q.length < 2) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_QUERY',
            message: 'Query must be at least 2 characters long',
            example: '/api/v1/search/suggestions?q=bir'
          },
          timestamp: new Date().toISOString()
        });
      }

      const suggestions = dataService.getSearchSuggestions(q);

      res.json({
        success: true,
        data: suggestions,
        query: q,
        message: `Found ${suggestions.length} suggestions for "${q}"`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'SUGGESTIONS_ERROR',
          message: 'Failed to get search suggestions',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/search/filters
  async getFilterOptions(req, res) {
    try {
      const filterOptions = dataService.getFilterOptions();

      res.json({
        success: true,
        data: filterOptions,
        message: 'Available filter options',
        usage: {
          cuisines: 'Use with ?cuisine=telangana',
          areas: 'Use with ?area=uppal-market',
          priceRange: 'Use with ?minPrice=50&maxPrice=200',
          ratings: 'Use with ?rating=4',
          dietaryOptions: 'Use with ?vegetarian=true'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'FILTER_OPTIONS_ERROR',
          message: 'Failed to get filter options',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // Helper method to sort search results
  sortResults(results, sortBy, query) {
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case 'price_low':
        results.sort((a, b) => a.priceRange.min - b.priceRange.min);
        break;
      case 'price_high':
        results.sort((a, b) => b.priceRange.max - a.priceRange.max);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'relevance':
      default:
        if (query) {
          // Sort by relevance to search query
          results.sort((a, b) => {
            const aScore = this.calculateRelevanceScore(a, query);
            const bScore = this.calculateRelevanceScore(b, query);
            return bScore - aScore;
          });
        } else {
          // Default to rating if no query
          results.sort((a, b) => b.rating.average - a.rating.average);
        }
        break;
    }
  }

  // Helper method to calculate relevance score
  calculateRelevanceScore(restaurant, query) {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Name match (highest weight)
    if (restaurant.name.toLowerCase().includes(queryLower)) {
      score += 10;
      if (restaurant.name.toLowerCase().startsWith(queryLower)) {
        score += 5; // Bonus for starting with query
      }
    }

    // Specialty match
    restaurant.specialties.forEach(specialty => {
      if (specialty.toLowerCase().includes(queryLower)) {
        score += 5;
      }
    });

    // Cuisine match
    restaurant.cuisine.forEach(cuisine => {
      if (cuisine.toLowerCase().includes(queryLower)) {
        score += 3;
      }
    });

    // Description match
    if (restaurant.description.toLowerCase().includes(queryLower)) {
      score += 2;
    }

    // Rating bonus (higher rated restaurants get slight boost)
    score += restaurant.rating.average * 0.5;

    return score;
  }

  // Helper method to get active filters
  getActiveFilters(filters) {
    const active = {};
    
    if (filters.cuisine) active.cuisine = filters.cuisine;
    if (filters.area) active.area = filters.area;
    if (filters.minPrice) active.minPrice = filters.minPrice;
    if (filters.maxPrice) active.maxPrice = filters.maxPrice;
    if (filters.rating) active.rating = filters.rating;
    if (filters.vegetarian) active.vegetarian = filters.vegetarian;
    if (filters.vegan) active.vegan = filters.vegan;
    if (filters.halal) active.halal = filters.halal;
    if (filters.openNow) active.openNow = filters.openNow;

    return active;
  }

  // Helper method to generate search suggestions when no results
  getSearchSuggestions(filters) {
    const suggestions = [];

    if (filters.q) {
      suggestions.push(`Try searching for "${filters.q}" without other filters`);
      suggestions.push('Check spelling or try different keywords');
    }

    if (filters.cuisine) {
      suggestions.push('Try popular cuisines: telangana, street-food, south-indian');
    }

    if (filters.area) {
      suggestions.push('Try different areas: uppal-market, main-road, ikea-area');
    }

    if (filters.minPrice || filters.maxPrice) {
      suggestions.push('Adjust your price range - most meals are ₹50-200');
    }

    if (suggestions.length === 0) {
      suggestions.push('Try broader search terms');
      suggestions.push('Remove some filters to see more results');
      suggestions.push('Search for popular items: biryani, samosa, dosa');
    }

    return suggestions;
  }
}

module.exports = new SearchController();