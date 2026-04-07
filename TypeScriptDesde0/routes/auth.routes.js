// routes/auth.routes.js
const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/auth.controller');

// POST /auth/register — libre, cualquiera puede crear una cuenta de admin
router.post('/register', authController.register);

// POST /auth/login — libre, devuelve el JWT si las credenciales son válidas
router.post('/login', authController.login);

module.exports = router;