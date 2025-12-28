const dataService = require('../services/dataService');

class CuisineController {
  // GET /api/v1/cuisines
  async getAllCuisines(req, res) {
    try {
      const cuisineData = dataService.getAllCuisines();

      // Add restaurant counts for each cuisine
      const enrichedCuisines = {};
      
      Object.keys(cuisineData.cuisines).forEach(cuisineKey => {
        const cuisine = cuisineData.cuisines[cuisineKey];
        const restaurants = dataService.getRestaurantsByCuisine(cuisineKey);
        
        enrichedCuisines[cuisineKey] = {
          ...cuisine,
          restaurantCount: restaurants.length,
          averagePrice: this.getAveragePriceForCuisine(restaurants),
          popularRestaurants: restaurants
            .sort((a, b) => b.rating.average - a.rating.average)
            .slice(0, 3)
            .map(r => ({ id: r.id, name: r.name, rating: r.rating.average }))
        };
      });

      res.json({
        success: true,
        data: {
          cuisines: enrichedCuisines,
          dietaryCategories: cuisineData.dietaryCategories,
          priceRanges: cuisineData.priceRanges
        },
        message: `Information for ${Object.keys(enrichedCuisines).length} cuisine types`,
        localContext: 'Cuisine data based on Uppal Kalan food culture and local preferences',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'CUISINES_FETCH_ERROR',
          message: 'Failed to fetch cuisine information',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/cuisines/:cuisine
  async getCuisineInfo(req, res) {
    try {
      const { cuisine } = req.params;
      const cuisineInfo = dataService.getCuisineInfo(cuisine);

      if (!cuisineInfo) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'CUISINE_NOT_FOUND',
            message: `Cuisine '${cuisine}' not found`,
            availableCuisines: ['telangana', 'street_food', 'south_indian', 'north_indian', 'chinese'],
            suggestion: 'Use one of the available cuisine types'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Get restaurants serving this cuisine
      const restaurants = dataService.getRestaurantsByCuisine(cuisine);
      
      // Enrich cuisine info with current data
      const enrichedCuisineInfo = {
        ...cuisineInfo,
        currentStats: {
          restaurantCount: restaurants.length,
          averagePrice: this.getAveragePriceForCuisine(restaurants),
          averageRating: this.getAverageRating(restaurants),
          priceRange: this.getPriceRangeForCuisine(restaurants)
        },
        topRestaurants: restaurants
          .sort((a, b) => b.rating.average - a.rating.average)
          .slice(0, 5)
          .map(r => ({
            id: r.id,
            name: r.name,
            rating: r.rating.average,
            priceRange: `₹${r.priceRange.min}-${r.priceRange.max}`,
            area: r.location.area,
            specialties: r.specialties.slice(0, 3)
          })),
        localRecommendations: this.getLocalRecommendations(cuisine, cuisineInfo),
        bestAreas: this.getBestAreasForCuisine(restaurants)
      };

      res.json({
        success: true,
        data: enrichedCuisineInfo,
        message: `Detailed information for ${cuisineInfo.name}`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'CUISINE_INFO_ERROR',
          message: 'Failed to fetch cuisine information',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/cuisines/dietary/:type
  async getDietaryOptions(req, res) {
    try {
      const { type } = req.params;
      const dietaryInfo = dataService.getDietaryOptions(type);

      if (!dietaryInfo) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'DIETARY_TYPE_NOT_FOUND',
            message: `Dietary type '${type}' not found`,
            availableTypes: ['vegetarian', 'vegan', 'jain', 'halal'],
            suggestion: 'Use one of the available dietary types'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Get restaurants that support this dietary option
      const allRestaurants = dataService.getAllRestaurants();
      const supportingRestaurants = allRestaurants.filter(restaurant => {
        switch (type) {
          case 'vegetarian':
            return restaurant.dietaryOptions.vegetarian;
          case 'vegan':
            return restaurant.dietaryOptions.vegan;
          case 'jain':
            return restaurant.dietaryOptions.jain;
          case 'halal':
            return restaurant.dietaryOptions.halal;
          default:
            return false;
        }
      });

      // Enrich dietary info
      const enrichedDietaryInfo = {
        ...dietaryInfo,
        currentStats: {
          restaurantCount: supportingRestaurants.length,
          coveragePercentage: Math.round((supportingRestaurants.length / allRestaurants.length) * 100),
          averagePrice: this.getAveragePriceForCuisine(supportingRestaurants),
          topAreas: this.getTopAreasForDietaryType(supportingRestaurants)
        },
        recommendedRestaurants: supportingRestaurants
          .sort((a, b) => b.rating.average - a.rating.average)
          .slice(0, 8)
          .map(r => ({
            id: r.id,
            name: r.name,
            rating: r.rating.average,
            cuisine: r.cuisine,
            area: r.location.area,
            priceRange: `₹${r.priceRange.min}-${r.priceRange.max}`
          })),
        tips: this.getDietaryTips(type)
      };

      res.json({
        success: true,
        data: enrichedDietaryInfo,
        message: `Found ${supportingRestaurants.length} restaurants supporting ${type} dietary requirements`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'DIETARY_OPTIONS_ERROR',
          message: 'Failed to fetch dietary options',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // Helper method to get average price for cuisine
  getAveragePriceForCuisine(restaurants) {
    if (restaurants.length === 0) return 0;

    const totalPrice = restaurants.reduce((sum, r) => 
      sum + (r.priceRange.min + r.priceRange.max) / 2, 0
    );
    
    return Math.round(totalPrice / restaurants.length);
  }

  // Helper method to get average rating
  getAverageRating(restaurants) {
    if (restaurants.length === 0) return 0;

    const totalRating = restaurants.reduce((sum, r) => sum + r.rating.average, 0);
    return Math.round((totalRating / restaurants.length) * 10) / 10;
  }

  // Helper method to get price range for cuisine
  getPriceRangeForCuisine(restaurants) {
    if (restaurants.length === 0) return { min: 0, max: 0 };

    const minPrices = restaurants.map(r => r.priceRange.min);
    const maxPrices = restaurants.map(r => r.priceRange.max);

    return {
      min: Math.min(...minPrices),
      max: Math.max(...maxPrices)
    };
  }

  // Helper method to get local recommendations for cuisine
  getLocalRecommendations(cuisineKey, cuisineInfo) {
    const recommendations = [];

    switch (cuisineKey) {
      case 'telangana':
        recommendations.push('Must-try authentic Hyderabadi biryani - the signature dish of the region');
        recommendations.push('Haleem is especially popular during Ramadan season');
        recommendations.push('Pair biryani with Mirchi ka Salan for the complete experience');
        recommendations.push('Best enjoyed at traditional restaurants in Main Road area');
        break;
      
      case 'street_food':
        recommendations.push('Uppal Market is the heart of street food culture');
        recommendations.push('Best times: morning (7-9 AM) and evening (6-8 PM)');
        recommendations.push('Try samosas with mint chutney - a local favorite');
        recommendations.push('Most items are under ₹50, perfect for budget dining');
        break;
      
      case 'south_indian':
        recommendations.push('Perfect for healthy breakfast options');
        recommendations.push('Pesarattu is a local Andhra specialty worth trying');
        recommendations.push('Filter coffee complements the meal perfectly');
        recommendations.push('Most places serve fresh, made-to-order items');
        break;
      
      case 'north_indian':
        recommendations.push('Good variety available in Main Road restaurants');
        recommendations.push('Tandoor items are popular for dinner');
        recommendations.push('Pair with Indian breads like naan or roti');
        recommendations.push('Family-friendly options with moderate pricing');
        break;
      
      case 'chinese':
        recommendations.push('Indo-Chinese fusion is more popular than authentic Chinese');
        recommendations.push('Spicy preparations suit local taste preferences');
        recommendations.push('Good for quick meals and takeaway');
        recommendations.push('Available in most multi-cuisine restaurants');
        break;
      
      default:
        recommendations.push('Explore local variations and preparations');
        recommendations.push('Ask for spice level preferences');
        recommendations.push('Try during recommended meal times');
    }

    return recommendations;
  }

  // Helper method to get best areas for cuisine
  getBestAreasForCuisine(restaurants) {
    const areaCount = {};
    
    restaurants.forEach(restaurant => {
      const area = restaurant.location.area;
      areaCount[area] = (areaCount[area] || 0) + 1;
    });

    return Object.entries(areaCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([area, count]) => ({ area, restaurantCount: count }));
  }

  // Helper method to get top areas for dietary type
  getTopAreasForDietaryType(restaurants) {
    const areaCount = {};
    
    restaurants.forEach(restaurant => {
      const area = restaurant.location.area;
      areaCount[area] = (areaCount[area] || 0) + 1;
    });

    return Object.entries(areaCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([area, count]) => ({ area, count }));
  }

  // Helper method to get dietary tips
  getDietaryTips(type) {
    const tips = {
      vegetarian: [
        'Most South Indian restaurants are vegetarian-friendly',
        'Street food vendors often have separate vegetarian sections',
        'Ask about ghee usage if you prefer vegan options',
        'Uppal Market has many pure vegetarian stalls'
      ],
      vegan: [
        'Check if oil or ghee is used in preparation',
        'Plain dosas and idlis are usually vegan',
        'Some street food items may contain dairy',
        'Ask vendors about ingredients to be sure'
      ],
      jain: [
        'Limited options available - call ahead to confirm',
        'Some South Indian items can be prepared Jain-style',
        'Avoid street food unless specifically Jain-certified',
        'Best to stick to known Jain-friendly restaurants'
      ],
      halal: [
        'Many Telangana restaurants serve halal meat',
        'Biryani places typically offer halal options',
        'Look for halal certification or ask the restaurant',
        'Muslim-owned establishments usually serve halal food'
      ]
    };

    return tips[type] || ['Ask restaurant staff about dietary accommodations'];
  }
}

module.exports = new CuisineController();