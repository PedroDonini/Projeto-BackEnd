const express = require('express');
const carController = require('../controllers/carController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', carController.getCars);
router.post('/', authenticate, carController.createCar);
router.put('/:id', authenticate, carController.updateCar);
router.delete('/:id', authenticate, carController.deleteCar);

module.exports = router;
