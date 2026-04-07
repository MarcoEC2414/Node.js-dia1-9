// app.js — Día 7
// Se agrega module.exports = app para que supertest pueda usarlo
// app.listen solo se ejecuta si NO estamos en modo test

const express    = require('express');
const conectarDB = require('./database/connection');
const { port }   = require('./config');

const menuRouter = require('./routes/menu.routes');
const authRouter = require('./routes/auth.routes');
const logger     = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(logger);

conectarDB();

app.use('/auth', authRouter);
app.use('/menu', menuRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Restaurante Node API',
    version: '7.0.0',
    rutas: {
      publicas:   ['GET /menu', 'GET /menu/:id', 'GET /menu/buscar', 'GET /menu/categoria/:cat'],
      auth:       ['POST /auth/register', 'POST /auth/login'],
      protegidas: ['POST /menu', 'PUT /menu/:id', 'DELETE /menu/:id']
    }
  });
});

// Exportar app ANTES de listen — supertest necesita la app, no el servidor
module.exports = app;

// Solo levantar el servidor si NO estamos corriendo tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Restaurante corriendo en http://localhost:${port}`);
  });
}