// database/connection.js
// Día 6 — usa mongoUri de config en lugar de process.env directo
const mongoose       = require('mongoose');
const { mongoUri }   = require('../config');

const conectarDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado — restaurante');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;