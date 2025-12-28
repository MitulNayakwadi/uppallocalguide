const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// POST /api/v1/recommendations - Get personalized recommendations
router.post('/', recommendationController.getRecommendations);

// GET /api/v1/recommendations/popular - Get popular restaurants
router.get('/popular', recommendationController.getPopularRecommendations);

// GET /api/v1/recommendations/budget/:budget - Get budget-based recommendations
router.get('/budget/:budget', recommendationController.getBudgetRecommendations);

// POST /api/v1/recommendations/feedback - Submit recommendation feedback
router.post('/feedback', recommendationController.submitFeedback);

module.exports = router;