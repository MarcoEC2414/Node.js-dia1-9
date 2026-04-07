// middlewares/logger.js
// Día 3 — Middleware global de logging
// Se ejecuta en CADA petición antes de llegar al controlador
// Se registra en app.js con app.use(logger)

const logger = (req, res, next) => {
  const ahora = new Date().toLocaleTimeString();
  console.log(`[${ahora}]  ${req.method}  ${req.url}`);

  // next() es obligatorio — sin él la petición se detiene aquí
  // y el cliente nunca recibe respuesta
  next();
};

module.exports = logger;