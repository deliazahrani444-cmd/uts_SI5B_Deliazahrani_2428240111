const mongoose = require('mongoose');

const guruSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode wajib diisi'],
    unique: true,
    trim: true,
    uppercase: true, // disimpan huruf besar
  },
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true,
  },
});

module.exports = mongoose.model('Guru', guruSchema);