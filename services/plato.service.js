const Plato = require('../models/plato'); 
  
class PlatoService { 
    async crear(data) { 
        const plato = new Plato(data); 
        return await plato.save(); 
    } 
    async obtenerTodos() { 
        return await Plato.find({}); 
    } 
    async buscarPorId(id) { 
        return await Plato.findById(id); 
    } 
    async actualizar(id, data) { 
        return await Plato.findByIdAndUpdate(id, data, { new: true }); 
    } 
    async eliminar(id) { 
        return await Plato.findByIdAndDelete(id); 
    } 
} 
  
module.exports = new PlatoService(); 