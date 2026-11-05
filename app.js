require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());

// (routes ditambah nanti)

// Paling akhir
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log('Server jalan (sementara)'));