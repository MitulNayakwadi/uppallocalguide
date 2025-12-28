const dataService = require('../services/dataService');

class RestaurantController {
  // GET /api/v1/restaurants
  async getAllRestaurants(req, res) {
    try {
      const { page = 1, limit = 20, sort = 'rating' } = req.query;
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      let restaurants = dataService.getAllRestaurants();

      // Sorting
      switch (sort) {
        case 'rating':
          restaurants.sort((a, b) => b.rating.average - a.rating.average);
          break;
        case 'price_low':
          restaurants.sort((a, b) => a.priceRange.min - b.priceRange.min);
          break;
        case 'price_high':
          restaurants.sort((a, b) => b.priceRange.max - a.priceRange.max);
          break;
        case 'name':
          restaurants.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          restaurants.sort((a, b) => b.rating.average - a.rating.average);
      }

      // Pagination
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      const paginatedResults = restaurants.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: paginatedResults,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: restaurants.length,
          totalPages: Math.ceil(restaurants.length / limitNum)
        },
        message: `Retrieved ${paginatedResults.length} restaurants`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'RESTAURANTS_FETCH_ERROR',
          message: 'Failed to fetch restaurants',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/restaurants/:id
  async getRestaurantById(req, res) {
    try {
      const { id } = req.params;
      const restaurant = dataService.getRestaurantById(id);

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'RESTAURANT_NOT_FOUND',
            message: `Restaurant with ID '${id}' not found`,
            suggestion: 'Check the restaurant ID and try again'
          },
          timestamp: new Date().toISOString()
        });
      }

      res.json({
        success: true,
        data: restaurant,
        message: `Restaurant '${restaurant.name}' retrieved successfully`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'RESTAURANT_FETCH_ERROR',
          message: 'Failed to fetch restaurant details',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/restaurants/area/:area
  async getRestaurantsByArea(req, res) {
    try {
      const { area } = req.params;
      const restaurants = dataService.getRestaurantsByArea(area);

      if (restaurants.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NO_RESTAURANTS_IN_AREA',
            message: `No restaurants found in area '${area}'`,
            suggestion: 'Try searching in other areas like uppal-market, main-road, or ikea-area'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Sort by rating
      restaurants.sort((a, b) => b.rating.average - a.rating.average);

      res.json({
        success: true,
        data: restaurants,
        message: `Found ${restaurants.length} restaurants in ${area}`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'AREA_RESTAURANTS_FETCH_ERROR',
          message: 'Failed to fetch restaurants by area',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/restaurants/cuisine/:cuisine
  async getRestaurantsByCuisine(req, res) {
    try {
      const { cuisine } = req.params;
      const restaurants = dataService.getRestaurantsByCuisine(cuisine);

      if (restaurants.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NO_RESTAURANTS_FOR_CUISINE',
            message: `No restaurants found for cuisine '${cuisine}'`,
            suggestion: 'Try cuisines like telangana, street-food, south-indian, or north-indian'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Sort by rating
      restaurants.sort((a, b) => b.rating.average - a.rating.average);

      res.json({
        success: true,
        data: restaurants,
        message: `Found ${restaurants.length} restaurants serving ${cuisine} cuisine`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'CUISINE_RESTAURANTS_FETCH_ERROR',
          message: 'Failed to fetch restaurants by cuisine',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new RestaurantController();