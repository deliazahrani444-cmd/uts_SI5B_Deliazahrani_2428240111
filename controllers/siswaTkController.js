const Siswatk = require('../models/siswatk');
const { AppError } = require('../middlewares/errorHandler');

exports.createSiswa = async (req, res) => {
  // hanya ambil field yang diizinkan, sisanya diabaikan
  const { nis, nama, usia, kelompok, orangTua, guruId } = req.body ?? {};
  const siswa = await Siswatk.create({ nis, nama, usia, kelompok, orangTua, guruId });
  res.status(201).json(siswa);
};

exports.getAllSiswa = async (req, res) => {
  const { kelompok, sort } = req.query;
  const filter = {};

  // cek typeof string supaya aman dari ?kelompok[$ne]=x
  if (typeof kelompok === 'string') filter.kelompok = kelompok;

  let query = Siswatk.find(filter);
  if (typeof sort === 'string' && sort) query = query.sort({ [sort]: 1 });

  const data = await query;
  res.status(200).json(data);
};

exports.getSiswaById = async (req, res) => {
  const siswa = await Siswatk.findById(req.params.id).populate('guruId', 'kode nama');
  if (!siswa) throw new AppError('Data siswa tidak ditemukan', 404);
  res.status(200).json(siswa);
};