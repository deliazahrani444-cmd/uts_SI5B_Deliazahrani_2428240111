const express = require('express');
const router = express.Router();
const {
  createSiswa,
  getAllSiswa,
  getSiswaById,
} = require('../controllers/siswaTkController');

router.post('/', createSiswa);
router.get('/', getAllSiswa);
router.get('/:id', getSiswaById);

module.exports = router;