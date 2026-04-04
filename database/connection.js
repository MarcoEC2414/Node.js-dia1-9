// database/connection.js
// Día 4 — Conexión a MongoDB con Mongoose
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // Usa la URI del .env (Día 6 la mueve a config/index.js)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurante');
    console.log('MongoDB conectado — restaurante');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    // Sin base de datos el servidor no tiene sentido — detener el proceso
    process.exit(1);
  }
};

module.exports = conectarDB;