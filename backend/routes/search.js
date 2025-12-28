const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/v1/search - General search with filters
router.get('/', searchController.searchRestaurants);

// GET /api/v1/search/suggestions - Get search suggestions
router.get('/suggestions', searchController.getSearchSuggestions);

// GET /api/v1/search/filters - Get available filter options
router.get('/filters', searchController.getFilterOptions);

module.exports = router;