const Guru = require('../models/guru');

exports.createGuru = async (req, res) => {
  const { kode, nama } = req.body ?? {};
  const guru = await Guru.create({ kode, nama });
  res.status(201).json(guru);
};

exports.getAllGuru = async (req, res) => {
  const data = await Guru.find();
  res.status(200).json(data);
};