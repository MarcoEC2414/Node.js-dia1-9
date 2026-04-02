const mongoose = require('mongoose');

// 1. Definimos el Schema (El "Contrato" o molde)
const platoSchema = new mongoose.Schema({ 
    nombre:    { type: String,  required: true }, 
    precio:    { type: Number,  required: true, min: 0 }, 
    stock:     { type: Number,  default: 0 }, 
    categoria: { type: String } 
}, { timestamps: true }); 

// 2. Creamos el Modelo (La "Herramienta" para interactuar con la base de datos)
const Plato = mongoose.model('Plato', platoSchema);

// 3. Lo exportamos para usarlo en otros archivos
module.exports = Plato;