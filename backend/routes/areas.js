const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

// GET /api/v1/areas - Get all areas
router.get('/', areaController.getAllAreas);

// GET /api/v1/areas/:area - Get specific area info
router.get('/:area', areaController.getAreaInfo);

// GET /api/v1/areas/:area/restaurants - Get restaurants in specific area
router.get('/:area/restaurants', areaController.getAreaRestaurants);

module.exports = router;