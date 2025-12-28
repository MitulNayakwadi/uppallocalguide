const dataService = require('../services/dataService');

class RecommendationController {
  // POST /api/v1/recommendations
  async getRecommendations(req, res) {
    try {
      const preferences = req.body;
      
      // Validate required preferences
      if (!preferences.budget && !preferences.time && !preferences.cuisine) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_PREFERENCES',
            message: 'At least one preference (budget, time, or cuisine) is required',
            suggestion: 'Provide budget (number), time (breakfast/lunch/dinner), or cuisine preference'
          },
          timestamp: new Date().toISOString()
        });
      }

      // Get recommendations using Kiro context
      const recommendations = dataService.getRecommendations(preferences);

      if (recommendations.length === 0) {
        return res.json({
          success: true,
          data: [],
          message: 'No restaurants match your preferences. Try adjusting your criteria.',
          suggestions: [
            'Increase your budget range',
            'Try different cuisine types',
            'Consider different time slots'
          ],
          timestamp: new Date().toISOString()
        });
      }

      res.json({
        success: true,
        data: recommendations,
        preferences: preferences,
        message: `Found ${recommendations.length} personalized recommendations`,
        localContext: {
          note: 'Recommendations based on Uppal Kalan local food culture and dining patterns',
          source: 'Kiro AI with local context from .kiro/steering/product.md'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'RECOMMENDATION_ERROR',
          message: 'Failed to generate recommendations',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/recommendations/popular
  async getPopularRecommendations(req, res) {
    try {
      const popularRestaurants = dataService.getPopularRestaurants();

      res.json({
        success: true,
        data: popularRestaurants,
        message: 'Popular restaurants in Uppal Kalan',
        criteria: 'Based on ratings and local popularity',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'POPULAR_RECOMMENDATIONS_ERROR',
          message: 'Failed to fetch popular recommendations',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // GET /api/v1/recommendations/budget/:budget
  async getBudgetRecommendations(req, res) {
    try {
      const { budget } = req.params;
      const budgetNum = parseInt(budget);

      if (isNaN(budgetNum) || budgetNum <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BUDGET',
            message: 'Budget must be a positive number',
            example: 'Use /api/v1/recommendations/budget/100 for ₹100 budget'
          },
          timestamp: new Date().toISOString()
        });
      }

      const budgetRestaurants = dataService.getBudgetRestaurants(budget);

      if (budgetRestaurants.length === 0) {
        return res.json({
          success: true,
          data: [],
          message: `No restaurants found within ₹${budget} budget`,
          suggestion: `Try increasing budget to ₹${budgetNum + 50} or more`,
          timestamp: new Date().toISOString()
        });
      }

      // Add budget context
      const budgetCategory = this.getBudgetCategory(budgetNum);
      
      res.json({
        success: true,
        data: budgetRestaurants,
        budget: {
          amount: budgetNum,
          category: budgetCategory.name,
          description: budgetCategory.description,
          localContext: budgetCategory.localContext
        },
        message: `Found ${budgetRestaurants.length} restaurants within ₹${budget}`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'BUDGET_RECOMMENDATIONS_ERROR',
          message: 'Failed to fetch budget recommendations',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // POST /api/v1/recommendations/feedback
  async submitFeedback(req, res) {
    try {
      const { restaurantId, rating, helpful, comment } = req.body;

      if (!restaurantId || !rating) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_FEEDBACK_DATA',
            message: 'Restaurant ID and rating are required',
            required: ['restaurantId', 'rating'],
            optional: ['helpful', 'comment']
          },
          timestamp: new Date().toISOString()
        });
      }

      // In a real app, this would save to database
      // For now, we'll just acknowledge the feedback
      console.log('Feedback received:', { restaurantId, rating, helpful, comment });

      res.json({
        success: true,
        message: 'Thank you for your feedback! It helps improve our recommendations.',
        data: {
          restaurantId,
          rating,
          helpful,
          comment,
          submittedAt: new Date().toISOString()
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'FEEDBACK_SUBMISSION_ERROR',
          message: 'Failed to submit feedback',
          details: error.message
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  // Helper method to generate recommendation reasons
  getRecommendationReason(restaurant, preferences) {
    const reasons = [];

    if (preferences.budget) {
      const budget = parseInt(preferences.budget);
      if (restaurant.priceRange.max <= budget) {
        reasons.push(`Fits your ₹${budget} budget perfectly`);
      }
      
      // Value for money calculation
      const valueRatio = restaurant.rating.average / ((restaurant.priceRange.min + restaurant.priceRange.max) / 2);
      if (valueRatio > 0.02) {
        reasons.push('Excellent value for money');
      }
    }

    if (preferences.time) {
      const timeContext = {
        'breakfast': 'Perfect for morning meals',
        'lunch': 'Great lunch option',
        'afternoon': 'Ideal for afternoon snacks',
        'evening': 'Popular evening dining spot',
        'night': 'Good for dinner'
      };
      reasons.push(timeContext[preferences.time] || 'Suitable for your timing');
    }

    if (preferences.cuisine) {
      if (restaurant.cuisine.includes(preferences.cuisine)) {
        reasons.push(`Authentic ${preferences.cuisine} cuisine`);
      }
    }

    // Local context reasons
    if (restaurant.rating.average >= 4.0) {
      reasons.push('Highly rated by locals');
    }

    if (restaurant.tags && restaurant.tags.includes('local-favorite')) {
      reasons.push('Local favorite in Uppal Kalan');
    }

    if (restaurant.tags && restaurant.tags.includes('authentic')) {
      reasons.push('Known for authentic preparation');
    }

    return reasons.length > 0 ? reasons.join(', ') : 'Matches your preferences';
  }

  // Helper method to categorize budget
  getBudgetCategory(budget) {
    if (budget <= 50) {
      return {
        name: 'Ultra Budget',
        description: 'Street food and basic snacks',
        localContext: 'Perfect for Uppal Market street vendors and chai stalls'
      };
    } else if (budget <= 100) {
      return {
        name: 'Budget Friendly',
        description: 'Complete meals and popular dishes',
        localContext: 'Great for local restaurants and biryani joints'
      };
    } else if (budget <= 200) {
      return {
        name: 'Mid Range',
        description: 'Restaurant dining with variety',
        localContext: 'Good for family dining and specialty restaurants'
      };
    } else {
      return {
        name: 'Premium',
        description: 'Fine dining and special occasions',
        localContext: 'IKEA area restaurants and premium dining experiences'
      };
    }
  }
}

module.exports = new RecommendationController();