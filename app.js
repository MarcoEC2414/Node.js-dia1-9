// app.js — Punto de entrada del Restaurante Node
// Integra todo lo construido en los Días 1 al 5:
//   Día 1 → setup NPM
//   Día 2 → HTTP nativo (reemplazado por Express en Día 3)
//   Día 3 → Express + controllers + middlewares
//   Día 4 → MongoDB con Mongoose
//   Día 5 → Autenticación JWT

const express    = require('express');
const conectarDB = require('./database/connection');

// Importar routers
const menuRouter = require('./routes/menu.routes');
const authRouter = require('./routes/auth.routes');

// Importar middleware global de logging (Día 3)
const logger = require('./middlewares/logger');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────────────────
// Habilita leer el body JSON automáticamente (antes eran ~10 líneas con eventos data/end)
app.use(express.json());

// Logger: registra método + ruta en cada petición
app.use(logger);

// ── Conexión a MongoDB ────────────────────────────────────────
conectarDB();

// ── Rutas ─────────────────────────────────────────────────────
// Rutas de autenticación — POST /auth/register y POST /auth/login
app.use('/auth', authRouter);

// Rutas del menú — GET libres + POST/PUT/DELETE protegidas con JWT
app.use('/menu', menuRouter);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Restaurante Node API',
    version: '5.0.0',
    rutas: {
      publicas:    ['GET /menu', 'GET /menu/:id', 'GET /menu/buscar'],
      auth:        ['POST /auth/register', 'POST /auth/login'],
      protegidas:  ['POST /menu', 'PUT /menu/:id', 'DELETE /menu/:id']
    }
  });
});

// ── Exportar app para tests (Día 7) ─────────────────────────
// Se exporta ANTES de listen para que supertest no necesite un puerto real
module.exports = app;

// Solo levantar el servidor si NO estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Restaurante corriendo en http://localhost:${PORT}`);
  });
}