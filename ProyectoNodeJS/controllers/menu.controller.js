// controllers/menu.controller.js
// Día 3 → estructura con Express
// Día 4 → conectado a MongoDB mediante PlatoService
// Día 5 → rutas POST/PUT/DELETE protegidas con verifyToken (en el router)
// Día 8 → filtrarPorCategoria agregado

const platoService = require('../services/plato.service');

// ──────────────────────────────────────────────
// GET /menu
// Devuelve todos los platos del menú
// Equivalente a mostrarMenu() del Sprint 0
// ──────────────────────────────────────────────
exports.obtenerMenu = async (req, res) => {
  try {
    const platos = await platoService.obtenerTodos();
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// GET /menu/buscar?nombre=xxx
// Búsqueda parcial por nombre (case-insensitive)
// Equivalente a buscarPlatoPorNombre() del Sprint 0
// ──────────────────────────────────────────────
exports.buscarPlato = async (req, res) => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      return res.status(400).json({ error: 'Parámetro nombre requerido' });
    }

    const platos = await platoService.buscarPorNombre(nombre);
    if (!platos || platos.length === 0) {
      return res.status(404).json({ error: `Plato '${nombre}' no encontrado` });
    }

    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// GET /menu/:id
// Busca un plato por su _id de MongoDB
// ──────────────────────────────────────────────
exports.obtenerPlatoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await platoService.buscarPorId(id);

    // findById devuelve null si no existe
    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }

    res.status(200).json(plato);
  } catch (error) {
    // Un _id con formato incorrecto lanza CastError → llega aquí como 500
    res.status(500).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// POST /menu  🔒 requiere verifyToken
// Agrega un plato nuevo al menú
// Equivalente a agregarPlato() del Sprint 0
// ──────────────────────────────────────────────
exports.agregarPlato = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ error: 'nombre y precio son obligatorios' });
    }

    const nuevo = await platoService.crear(req.body);
    res.status(201).json({ mensaje: 'Plato creado', plato: nuevo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// PUT /menu/:id  🔒 requiere verifyToken
// Actualiza precio, stock u otros campos de un plato
// Equivalente a actualizarStock() del Sprint 0
// ──────────────────────────────────────────────
exports.actualizarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await platoService.actualizar(id, req.body);

    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }

    res.status(200).json({ mensaje: 'Plato actualizado', plato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// DELETE /menu/:id  🔒 requiere verifyToken
// Elimina un plato del menú
// ──────────────────────────────────────────────
exports.eliminarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    const plato = await platoService.eliminar(id);

    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }

    res.status(200).json({ mensaje: 'Plato eliminado', plato });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// GET /menu/categoria/:categoria
// Día 8 — Filtro por categoría (funcionalidad nueva)
// Ruta libre — no requiere token
// ──────────────────────────────────────────────
exports.filtrarPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const platos = await platoService.buscarPorCategoria(categoria);
    // Devuelve [] si no hay platos de esa categoría — nunca 404
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};