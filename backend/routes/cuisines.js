const express = require('express');
const router = express.Router();
const cuisineController = require('../controllers/cuisineController');

// GET /api/v1/cuisines - Get all cuisines
router.get('/', cuisineController.getAllCuisines);

// GET /api/v1/cuisines/:cuisine - Get specific cuisine info
router.get('/:cuisine', cuisineController.getCuisineInfo);

// GET /api/v1/cuisines/dietary/:type - Get dietary options
router.get('/dietary/:type', cuisineController.getDietaryOptions);

module.exports = router;