const express = require('express');
const installController = require('../controllers/installController');
const router = express.Router();

router.get('/install', installController.install);

module.exports = router;