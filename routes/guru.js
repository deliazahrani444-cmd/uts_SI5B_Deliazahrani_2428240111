const express = require('express');
const router = express.Router();
const { createGuru, getAllGuru } = require('../controllers/guruController');

router.post('/', createGuru);
router.get('/', getAllGuru);

module.exports = router;