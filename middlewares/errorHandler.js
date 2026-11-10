class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan` });
};

// harus 4 parameter agar dikenali Express sebagai error handler
const errorHandler = (err, req, res, next) => {
  // Body JSON rusak
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // ID bukan ObjectId (jangan sebut nama model)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Format ID tidak valid' });
  }

  // Pelanggaran schema
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Data tidak valid',
      detail: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Nilai unik bentrok
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'data';
    return res.status(409).json({ message: `Nilai ${field} sudah digunakan` });
  }

  // Galat yang sengaja dilempar
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Galat tak terduga: tanpa stack trace ke client
  console.error(err);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
};

module.exports = { AppError, notFoundHandler, errorHandler };