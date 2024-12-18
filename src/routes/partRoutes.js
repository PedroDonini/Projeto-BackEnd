const express = require('express');
const partController = require('../controllers/partController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', partController.getParts);
router.post('/', authenticate, partController.createPart);
router.put('/:id', authenticate, partController.updatePart);
router.delete('/:id', authenticate, partController.deletePart);

module.exports = router;