require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uts_paw2';

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
app.use(express.json());

const guruRoutes = require('./routes/guruRoutes');
const siswatkRoutes = require('./routes/siswatkRoutes');

app.use('/guru', guruRoutes);
app.use('/siswa-tk', siswatkRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB terhubung');

    await Promise.all(Object.values(mongoose.models).map((m) => m.init()));

    app.listen(PORT, () => {
      console.log(`Server jalan di port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Gagal koneksi MongoDB:', err.message);
    process.exit(1);
  }
};

start();