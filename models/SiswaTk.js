const mongoose = require('mongoose');

const siswatkSchema = new mongoose.Schema({
  nis: {
    type: String,
    required: [true, 'NIS wajib diisi'],
    unique: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true,
  },
  usia: {
    type: Number,
    required: [true, 'Usia wajib diisi'],
    min: [1, 'Usia minimal 1 tahun'],
    max: [25, 'Usia maksimal 25 tahun'],
  },
  kelompok: {
    type: String,
    required: [true, 'Kelompok wajib diisi'],
    trim: true,
  },
  orangTua: {
    type: String,
    default: '',
    trim: true,
  },
  guruId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'guru',
    required: [true, 'Guru wajib dipilih'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('siswatk', siswatkSchema);