const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticate, authorizeAdmin, adminController.getAdmins);
router.post('/', authenticate, authorizeAdmin, adminController.createAdmin);
router.delete('/:id', authenticate, authorizeAdmin, adminController.deleteAdmin);

module.exports = router;