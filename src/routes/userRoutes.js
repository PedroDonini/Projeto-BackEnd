const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, userController.getUsers);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;