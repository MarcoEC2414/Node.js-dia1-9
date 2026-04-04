// routes/menu.routes.js
// Día 3 → estructura con Express Router
// Día 5 → rutas de modificación protegidas con verifyToken
// Día 8 → ruta de filtro por categoría + Bug 1 corregido (POST también protegido)

const express        = require('express');
const router         = express.Router();
const menuController = require('../controllers/menu.controller');
const verifyToken    = require('../middlewares/verifyToken');

// Middleware de validación local para POST — se ejecuta ANTES del controlador
const verificarDatosPlato = (req, res, next) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({
      error: 'Middleware: nombre y precio son obligatorios'
    });
  }
  if (precio <= 0) {
    return res.status(400).json({
      error: 'Middleware: el precio debe ser mayor a cero'
    });
  }

  next(); // datos válidos → continuar al controlador
};

// ── Rutas GET — libres, cualquier cliente puede ver el menú ──
router.get('/',        menuController.obtenerMenu);
router.get('/buscar',  menuController.buscarPlato);

// Ruta de filtro por categoría — libre, va ANTES de /:id para evitar conflicto
router.get('/categoria/:categoria', menuController.filtrarPorCategoria);

// Buscar por _id de MongoDB
router.get('/:id',     menuController.obtenerPlatoPorId);

// ── Rutas de modificación — 🔒 protegidas con JWT ────────────
// Bug 1 del Día 8: POST también necesita verifyToken (faltaba en la versión original)
router.post('/',       verifyToken, verificarDatosPlato, menuController.agregarPlato);
router.put('/:id',     verifyToken, menuController.actualizarPlato);
router.delete('/:id',  verifyToken, menuController.eliminarPlato);

module.exports = router;