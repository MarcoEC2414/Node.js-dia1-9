// controllers/auth.controller.js
const authService = require('../services/auth.service');

// ──────────────────────────────────────────────
// POST /auth/register
// Registra un nuevo administrador del restaurante
// ──────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    // 201 Created — recurso nuevo generado exitosamente
    res.status(201).json({ mensaje: 'Administrador registrado' });
  } catch (error) {
    // 400 Bad Request — cubre email duplicado (duplicate key de Mongo)
    // y otros errores de validación
    res.status(400).json({ error: error.message });
  }
};

// ──────────────────────────────────────────────
// POST /auth/login
// Verifica credenciales y devuelve token JWT
// ──────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    // 200 OK — el login no crea un recurso, solo verifica identidad
    res.status(200).json({ token });
  } catch (error) {
    // 401 Unauthorized — credenciales inválidas (semánticamente correcto)
    res.status(401).json({ error: error.message });
  }
};