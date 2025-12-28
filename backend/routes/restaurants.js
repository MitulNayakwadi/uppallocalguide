const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// GET /api/v1/restaurants - Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// GET /api/v1/restaurants/:id - Get specific restaurant
router.get('/:id', restaurantController.getRestaurantById);

// GET /api/v1/restaurants/area/:area - Get restaurants by area
router.get('/area/:area', restaurantController.getRestaurantsByArea);

// GET /api/v1/restaurants/cuisine/:cuisine - Get restaurants by cuisine
router.get('/cuisine/:cuisine', restaurantController.getRestaurantsByCuisine);

module.exports = router;