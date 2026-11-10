const mongoose = require('mongoose');

const guruSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode wajib diisi'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true,
  },
});

module.exports = mongoose.model('guru', guruSchema);