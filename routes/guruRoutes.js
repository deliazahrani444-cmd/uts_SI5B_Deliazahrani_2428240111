const router = require('express').Router();
const { createGuru, getAllGuru } = require('../controllers/guruController');

router.post('/', createGuru);
router.get('/', getAllGuru);

module.exports = router;