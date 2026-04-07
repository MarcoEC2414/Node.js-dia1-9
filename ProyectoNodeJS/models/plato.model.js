// models/plato.model.js
// Día 4 — Schema del menú en MongoDB
// Reemplaza el array let menu = [...] que vivía en el controlador (Días 1-3)
const mongoose = require('mongoose');

const platoSchema = new mongoose.Schema(
  {
    nombre:    { type: String, required: true },
    precio:    { type: Number, required: true, min: 0 },
    stock:     { type: Number, default: 0 },
    categoria: { type: String }
    // "disponible" ya no se guarda — se puede calcular con stock > 0
    // MongoDB genera _id automático, ya no se necesita un id numérico manual
  },
  {
    // Agrega createdAt y updatedAt automáticamente a cada documento
    timestamps: true
  }
);

// 'Plato' → Mongoose crea la colección 'platos' (plural + minúscula automático)
const Plato = mongoose.model('Plato', platoSchema);
module.exports = Plato;