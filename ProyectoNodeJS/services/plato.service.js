// services/plato.service.js
// Día 4 — Capa de acceso a datos del menú
// Concentra TODAS las operaciones con MongoDB.
// El controlador nunca toca Mongoose directamente.
const Plato = require('../models/plato.model');

class PlatoService {

  // Equivalente a agregarPlato() del Sprint 0
  async crear(data) {
    const plato = new Plato(data);
    return await plato.save();
  }

  // Equivalente a mostrarMenu() del Sprint 0
  async obtenerTodos() {
    return await Plato.find({});
  }

  // Buscar por _id de MongoDB
  async buscarPorId(id) {
    return await Plato.findById(id);
    // Devuelve null si no existe → el controlador responde 404
  }

  // Buscar por nombre (búsqueda parcial, case-insensitive)
  async buscarPorNombre(nombre) {
    return await Plato.find({
      nombre: { $regex: nombre, $options: 'i' }
    });
  }

  // { new: true } → devuelve el documento DESPUÉS de la modificación
  // Sin esto el cliente recibe los datos ANTES de actualizar (Bug 3 del Día 8)
  async actualizar(id, data) {
    return await Plato.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminar(id) {
    return await Plato.findByIdAndDelete(id);
  }

  // Día 8 — Filtro por categoría (funcionalidad nueva)
  async buscarPorCategoria(categoria) {
    return await Plato.find({ categoria });
  }
}

module.exports = new PlatoService();