// middlewares/logger.js 
const logger = (req, res, next) => { 
    const ahora = new Date().toLocaleTimeString(); 
    console.log(`[${ahora}]  ${req.method}  ${req.url}`); 
    next(); // sin next() la petición se detiene aquí 
}; 

// Agregar en routes/menu.routes.js antes de module.exports 
  
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
    
    next(); // ¡Pase libre!
}; 

module.exports = { 
    logger, 
    verificarDatosPlato 
};

// Modificar la ruta POST para usar el middleware 
// Antes:  router.post('/', menuController.agregarPlato); 
// Ahora: 
