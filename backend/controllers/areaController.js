const dataService = require('../services/dataService');

class AreaController {
  // GET /api/v1/areas
  async getAllAreas(req, res) {
    try {
      const areas = dataService.getAllAreas();

      // Add restaurant counts for each area
      const areasWithCounts = {};
      
      Object.keys(areas.areas).forEach(areaKey => {
        const areaData = areas.areas[areaKey];
        const restaurants = dataService.getRestaurantsByArea(areaKey);
        
        areasWithCounts[areaKey] = {
          ...areaData,
          restaurantCount: restaurants.length,
          topCuisines: this.getTopCuisinesInArea(restaurants),
          averagePriceRange: this.getAveragePriceRange(restaurants)
        };
      });

      res.json({
        success: true,
        data: {
          areas: areasWithCounts,
          transportation: areas.transportation,
          demographics: areas.demographics,
          seasonalPatterns: areas.seasonal_patterns
        },
        message: `Information for ${Object.keys(areasWithCounts).length} areas in Uppal Kalan`,
        localContext: 'Area data based on local knowledge and dining patterns',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'AREAS_FETCH_ERROR',
          message: 'Failed to fetch area information',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/areas/:area
  async getAreaInfo(req, res) {
    try {
      const { area } = req.params;
      const areaInfo = dataService.getAreaInfo(area);

      if (!areaInfo) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'AREA_NOT_FOUND',
            message: `Area '${area}' not found`,
            availableAreas: ['uppal-market', 'main-road', 'ikea-area', 'ramanthapur'],
            suggestion: 'Use one of the available area names'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Get restaurants in this area
      const restaurants = dataService.getRestaurantsByArea(area);
      
      // Enrich area info with current data
      const enrichedAreaInfo = {
        ...areaInfo,
        currentStats: {
          restaurantCount: restaurants.length,
          topCuisines: this.getTopCuisinesInArea(restaurants),
          averagePriceRange: this.getAveragePriceRange(restaurants),
          averageRating: this.getAverageRating(restaurants),
          popularRestaurants: restaurants
            .sort((a, b) => b.rating.average - a.rating.average)
            .slice(0, 3)
            .map(r => ({ id: r.id, name: r.name, rating: r.rating.average }))
        },
        diningRecommendations: this.getDiningRecommendations(area, areaInfo)
      };

      res.json({
        success: true,
        data: enrichedAreaInfo,
        message: `Detailed information for ${areaInfo.name}`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'AREA_INFO_ERROR',
          message: 'Failed to fetch area information',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/areas/:area/restaurants
  async getAreaRestaurants(req, res) {
    try {
      const { area } = req.params;
      const { sort = 'rating', limit = 20 } = req.query;
      
      const restaurants = dataService.getAreaRestaurants(area);

      if (restaurants.length === 0) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NO_RESTAURANTS_IN_AREA',
            message: `No restaurants found in area '${area}'`,
            suggestion: 'Try other areas like uppal-market, main-road, or ikea-area'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Sort restaurants
      this.sortRestaurants(restaurants, sort);

      // Limit results if specified
      const limitedResults = limit ? restaurants.slice(0, parseInt(limit)) : restaurants;

      // Get area context for recommendations
      const areaInfo = dataService.getAreaInfo(area);
      
      res.json({
        success: true,
        data: limitedResults,
        areaContext: areaInfo ? {
          name: areaInfo.name,
          description: areaInfo.description,
          bestTimes: areaInfo.bestTimes,
          characteristics: areaInfo.characteristics
        } : null,
        stats: {
          totalInArea: restaurants.length,
          showing: limitedResults.length,
          averageRating: this.getAverageRating(restaurants),
          priceRange: this.getAveragePriceRange(restaurants)
        },
        message: `Found ${restaurants.length} restaurants in ${area}`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'AREA_RESTAURANTS_ERROR',
          message: 'Failed to fetch restaurants in area',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // Helper method to get top cuisines in an area
  getTopCuisinesInArea(restaurants) {
    const cuisineCount = {};
    
    restaurants.forEach(restaurant => {
      restaurant.cuisine.forEach(cuisine => {
        cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
      });
    });

    return Object.entries(cuisineCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([cuisine, count]) => ({ cuisine, count }));
  }

  // Helper method to get average price range
  getAveragePriceRange(restaurants) {
    if (restaurants.length === 0) return { min: 0, max: 0 };

    const totalMin = restaurants.reduce((sum, r) => sum + r.priceRange.min, 0);
    const totalMax = restaurants.reduce((sum, r) => sum + r.priceRange.max, 0);

    return {
      min: Math.round(totalMin / restaurants.length),
      max: Math.round(totalMax / restaurants.length)
    };
  }

  // Helper method to get average rating
  getAverageRating(restaurants) {
    if (restaurants.length === 0) return 0;

    const totalRating = restaurants.reduce((sum, r) => sum + r.rating.average, 0);
    return Math.round((totalRating / restaurants.length) * 10) / 10;
  }

  // Helper method to sort restaurants
  sortRestaurants(restaurants, sortBy) {
    switch (sortBy) {
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
  }

  // Helper method to get dining recommendations for an area
  getDiningRecommendations(areaKey, areaInfo) {
    const recommendations = [];

    switch (areaKey) {
      case 'uppal-market':
        recommendations.push('Best for authentic street food experience');
        recommendations.push('Visit during morning (7-9 AM) or evening (6-8 PM) for freshest options');
        recommendations.push('Try local specialties like samosas and fresh chai');
        recommendations.push('Budget-friendly - most items under ₹100');
        break;
      
      case 'main-road':
        recommendations.push('Great variety of cuisines and price ranges');
        recommendations.push('Good for family dining with parking available');
        recommendations.push('Peak lunch hours (12-2 PM) can be busy');
        recommendations.push('Mix of street food and restaurant options');
        break;
      
      case 'ikea-area':
        recommendations.push('Modern dining with clean, hygienic environment');
        recommendations.push('Perfect for families and groups');
        recommendations.push('Higher price range but good quality');
        recommendations.push('Ample parking and air-conditioned spaces');
        break;
      
      case 'ramanthapur':
        recommendations.push('Traditional restaurants with authentic recipes');
        recommendations.push('Family-run businesses with established reputation');
        recommendations.push('Good for experiencing local food culture');
        recommendations.push('Moderate pricing with generous portions');
        break;
      
      default:
        recommendations.push('Explore local specialties and popular dishes');
        recommendations.push('Check restaurant timings before visiting');
    }

    return recommendations;
  }
}

module.exports = new AreaController();