// routes/menu.routes.js 
const express = require('express'); 
const router = express.Router(); 
const menuController = require('../controllers/menu.controller'); 
const { verificarDatosPlato } = require('../middlewares/logger');
  
// GET /menu 
router.get('/:id', menuController.buscarPlato); 
router.get('/', menuController.obtenerMenu); 
  
// GET /menu/buscar?nombre=xxx 
router.get('/buscar', menuController.buscarPlato); 
  
// POST /menu 
router.post('/', verificarDatosPlato, menuController.agregarPlato);
  
// DELETE /menu/:id 
router.delete('/:id', menuController.eliminarPlato); 

// PUT /menu/:id 
router.put('/:id', menuController.actualizarPlato); 
  
module.exports = router; 