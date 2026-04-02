const mongoose = require('mongoose'); 
  
const conectarDB = async () => { 
    try { 
        await mongoose.connect('mongodb://localhost:27017/restaurante'); 
        console.log('MongoDB conectado — restaurante'); 
    } catch (error) { 
        console.error('Error de conexión:', error.message); 
        process.exit(1); 
    } 
}; 
  
module.exports = conectarDB;